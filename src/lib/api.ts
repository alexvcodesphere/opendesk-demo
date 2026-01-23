// API layer for Codesphere Managed Services
import { authProvider, getTeamId, getToken } from './auth';

const API_BASE = process.env.NEXT_PUBLIC_CSA_API_URL || 'https://csa-demo.codesphere-demo.com/api';

// Types - aligned with cs-api.js OpenAPI spec

export interface ServicePlan {
  id: number;
  name: string;
  description: string;
  parameters: Record<string, {
    pricedAs?: 'cpu-tenths' | 'free' | 'network-bandwidth-mbps' | 'ram-mb' | 'replicas' | 'storage-mb';
    schema: Record<string, unknown>;
  }>;
}

export interface ServiceProvider {
  name: string;
  version: string;
  author: string;
  category: string;
  description: string;
  displayName: string;
  iconUrl: string;
  configSchema: Record<string, unknown>;
  detailsSchema: Record<string, unknown>;
  secretsSchema: Record<string, unknown>;
  plans: ServicePlan[];
}

export type ServiceStatus = 
  | { state: 'creating' }
  | { state: 'updating' }
  | { state: 'synchronized'; detailsRef: string }
  | { state: 'deleting'; deletedAt: string }
  | { state: 'deleted'; deletedAt: string }
  | { state: 'unknown' }
  | { state: 'invalid provider' };

export interface DeployedService {
  id: string;
  name: string;
  // Can be string (legacy) or object (new format)
  provider: string | { name: string; version: string };
  providerVersion?: string; // Legacy field, may not exist in new format
  plan: {
    id: number;
    parameters: Record<string, number>;
  };
  config: Record<string, unknown>;
  status: ServiceStatus;
}

export interface DeployServicePayload {
  name: string;
  provider: string;
  providerVersion: string;
  plan: { id: number; parameters?: Record<string, number> };
  config?: Record<string, unknown>;
  secrets?: Record<string, unknown>;
  teamId?: number;
}

export interface UpdateServicePayload {
  name?: string;
  plan?: { id: number; parameters: Record<string, number> };
  config?: Record<string, unknown>;
  secrets?: Record<string, unknown>;
}

// API helpers - Simple logging for debugging
function log(prefix: string, message: string, data?: unknown) {
  const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
  if (data) {
    console.log(`[${timestamp}] ${prefix} ${message}`, typeof data === 'object' ? JSON.stringify(data) : data);
  } else {
    console.log(`[${timestamp}] ${prefix} ${message}`);
  }
}

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = authProvider.getToken();
  const method = options.method || 'GET';
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const requestBody = options.body ? JSON.parse(options.body as string) : undefined;
  log('→', `${method} ${endpoint}`, requestBody);

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorJson;
    try { errorJson = JSON.parse(errorText); } catch { errorJson = null; }
    
    log('✗', `${response.status} ${endpoint}`, errorJson || errorText);
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  log('✓', `${response.status} ${endpoint}`);
  return data;
}

// API methods
export async function listProviders(): Promise<ServiceProvider[]> {
  return apiFetch<ServiceProvider[]>('/managed-services/providers');
}

export async function listServices(): Promise<DeployedService[]> {
  const teamId = getTeamId();
  if (!teamId) throw new Error('Team ID nicht konfiguriert');
  return apiFetch<DeployedService[]>(`/managed-services?team=${encodeURIComponent(teamId)}&includeDeleted=false`);
}

export async function deployService(payload: DeployServicePayload): Promise<DeployedService> {
  const teamId = getTeamId();
  if (!teamId) throw new Error('Team ID nicht konfiguriert');
  
  return apiFetch<DeployedService>('/managed-services', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name,
      teamId: parseInt(teamId, 10),
      provider: {
        name: payload.provider,
        version: payload.providerVersion,
      },
      config: payload.config || {},
      secrets: payload.secrets || {},
      plan: {
        id: payload.plan.id,
        parameters: payload.plan.parameters || {},
      },
    }),
  });
}

export async function deleteService(id: string): Promise<void> {
  const token = getToken();
  
  const response = await fetch(`${API_BASE}/managed-services/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }
  // DELETE returns 200 with no body
}

export async function getServiceDetails(id: string): Promise<Record<string, unknown>> {
  return apiFetch<Record<string, unknown>>(`/managed-services/${id}`);
}

export async function updateService(id: string, payload: UpdateServicePayload): Promise<DeployedService> {
  return apiFetch<DeployedService>(`/managed-services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
