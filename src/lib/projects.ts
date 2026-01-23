'use server';

import { db, schema } from './db';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { deployService, deleteService as apiDeleteService, DeployServicePayload } from './api';

const { projects, projectServices } = schema;

export type Project = schema.Project;
export type ProjectService = schema.ProjectService;

// Get all projects
export async function getProjects(): Promise<Project[]> {
  return db.select().from(projects).orderBy(projects.createdAt);
}

// Get a single project by ID
export async function getProject(id: string): Promise<Project | undefined> {
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0];
}

// Get services for a project
export async function getProjectServices(projectId: string): Promise<ProjectService[]> {
  return db.select().from(projectServices).where(eq(projectServices.projectId, projectId));
}

// Create a new project (draft state - no services deployed yet)
export async function createProject(name: string): Promise<Project> {
  const id = uuidv4();
  const now = new Date().toISOString();
  
  await db.insert(projects).values({
    id,
    name,
    status: 'draft',
    createdAt: now,
    updatedAt: now,
  });
  
  return { id, name, status: 'draft', createdAt: now, updatedAt: now };
}

// Deploy services for a project and activate it
export async function activateProject(
  projectId: string, 
  enabledProviders: Array<{ name: string; version: string }>
): Promise<{ success: boolean; deployedServices: ProjectService[]; errors: string[] }> {
  const project = await getProject(projectId);
  if (!project) {
    return { success: false, deployedServices: [], errors: ['Project not found'] };
  }
  
  // Update project status to creating
  await db.update(projects)
    .set({ status: 'creating', updatedAt: new Date().toISOString() })
    .where(eq(projects.id, projectId));
  
  const deployedServices: ProjectService[] = [];
  const errors: string[] = [];
  
  // Deploy each service
  for (const provider of enabledProviders) {
    try {
      const payload: DeployServicePayload = {
        name: `[OPENAPPS] [${project.name}]-${provider.name}`,
        provider: provider.name,
        providerVersion: provider.version,
        plan: { id: 0 },
        config: {},
      };
      
      const deployed = await deployService(payload);
      const now = new Date().toISOString();
      
      // Link service to project
      await db.insert(projectServices).values({
        projectId,
        serviceId: deployed.id,
        providerName: provider.name,
        providerVersion: provider.version,
        createdAt: now,
      });
      
      const [service] = await db.select()
        .from(projectServices)
        .where(eq(projectServices.serviceId, deployed.id))
        .limit(1);
      
      if (service) {
        deployedServices.push(service);
      }
    } catch (err) {
      errors.push(`Failed to deploy ${provider.name}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }
  
  // Update project status
  const finalStatus = errors.length === 0 ? 'active' : (deployedServices.length > 0 ? 'active' : 'error');
  await db.update(projects)
    .set({ status: finalStatus, updatedAt: new Date().toISOString() })
    .where(eq(projects.id, projectId));
  
  return { success: errors.length === 0, deployedServices, errors };
}

// Delete a project and all its services
export async function deleteProject(id: string): Promise<{ success: boolean; errors: string[] }> {
  const services = await getProjectServices(id);
  const errors: string[] = [];
  
  // Delete each service from API
  for (const service of services) {
    try {
      await apiDeleteService(service.serviceId);
    } catch (err) {
      errors.push(`Failed to delete service ${service.serviceId}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }
  
  // Delete project (cascades to project_services)
  await db.delete(projects).where(eq(projects.id, id));
  
  return { success: errors.length === 0, errors };
}

// Add a single service to an existing project
export async function addServiceToProject(
  projectId: string,
  provider: { name: string; version: string }
): Promise<{ success: boolean; service?: ProjectService; error?: string }> {
  const project = await getProject(projectId);
  if (!project) {
    return { success: false, error: 'Project not found' };
  }
  
  try {
    const payload: DeployServicePayload = {
      name: `[OPENAPPS] [${project.name}]-${provider.name}`,
      provider: provider.name,
      providerVersion: provider.version,
      plan: { id: 0 },
      config: {},
    };
    
    const deployed = await deployService(payload);
    const now = new Date().toISOString();
    
    await db.insert(projectServices).values({
      projectId,
      serviceId: deployed.id,
      providerName: provider.name,
      providerVersion: provider.version,
      createdAt: now,
    });
    
    const [service] = await db.select()
      .from(projectServices)
      .where(eq(projectServices.serviceId, deployed.id))
      .limit(1);
    
    return { success: true, service };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// Remove a service from a project
export async function removeServiceFromProject(
  projectId: string,
  serviceId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Delete from API
    await apiDeleteService(serviceId);
    
    // Remove from database
    await db.delete(projectServices)
      .where(eq(projectServices.serviceId, serviceId));
    
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
