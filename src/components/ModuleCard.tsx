'use client';

import { ServiceProvider, DeployedService } from '@/lib/api';

interface ModuleCardProps {
  provider?: ServiceProvider;
  deployed?: DeployedService;
  details?: Record<string, unknown>;
  onDeploy?: (provider: ServiceProvider) => void;
  onRemove?: (service: DeployedService) => void;
  onDetails?: (service: DeployedService) => void;
  onEdit?: (service: DeployedService) => void;
}

export function ModuleCard({ provider, deployed, details, onDeploy, onRemove, onDetails, onEdit }: ModuleCardProps) {
  const isDeployed = !!deployed;
  const displayName = provider?.displayName || deployed?.name || 'Unbekanntes Modul';
  const description = provider?.description || 'Verwaltungsmodul für digitale Behördenprozesse.';
  const version = deployed?.providerVersion || provider?.version;
  const category = provider?.category;
  const iconUrl = provider?.iconUrl;
  // Module metadata with icons and URL patterns
  const moduleMetadata: Record<string, { name: string; icon: string; urlPath: string; description: string }> = {
    'CS_JITSI_ENABLED': { 
      name: 'Jitsi Meet', 
      icon: '🎥', 
      urlPath: 'jitsi',
      description: 'Videokonferenzen'
    },
    'CS_XWIKI_ENABLED': { 
      name: 'XWiki', 
      icon: '📚', 
      urlPath: 'wiki',
      description: 'Wissensdatenbank'
    },
    'CS_ELEMENT_ENABLED': { 
      name: 'Element', 
      icon: '💬', 
      urlPath: 'element',
      description: 'Matrix Chat'
    },
    'CS_CRYPTPAD_ENABLED': { 
      name: 'CryptPad', 
      icon: '📝', 
      urlPath: 'cryptpad',
      description: 'Dokumente'
    },
    'CS_COLLABORA_ENABLED': { 
      name: 'Collabora', 
      icon: '📊', 
      urlPath: 'collabora',
      description: 'Office Suite'
    },
    'CS_OXAPPSUITE_ENABLED': { 
      name: 'OX App Suite', 
      icon: '📧', 
      urlPath: 'mail',
      description: 'E-Mail & Kalender'
    },
    'CS_OPENPROJECT_ENABLED': { 
      name: 'OpenProject', 
      icon: '📋', 
      urlPath: 'project',
      description: 'Projektmanagement'
    },
  };

  // Get hostname from service details (HOSTNAME field)
  const getHostname = (): string => {
    if (!deployed) return '';
    
    // Debug: log the details to see what we have
    console.log('Service details for', deployed.name, ':', details);
    
    if (details && typeof details['HOSTNAME'] === 'string') {
      return details['HOSTNAME'] as string;
    }
    
    // Fallback: generate from service name
    const baseHost = deployed.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `https://${baseHost}.opendesk.gov.de`;
  };

  // Get enabled submodules with URLs
  const getEnabledSubmodules = () => {
    if (!deployed?.config) return [];
    
    const hostname = getHostname();
    
    return Object.entries(deployed.config)
      .filter(([, value]) => value === true)
      .map(([key]) => {
        const meta = moduleMetadata[key];
        if (!meta) return null;
        return {
          ...meta,
          key,
          url: `${hostname}/${meta.urlPath}`
        };
      })
      .filter(Boolean) as Array<{ name: string; icon: string; urlPath: string; description: string; key: string; url: string }>;
  };

  const enabledSubmodules = getEnabledSubmodules();

  const getStatusDotClass = () => {
    if (!deployed) return 'inactive';
    const state = deployed.status.state;
    if (state === 'synchronized') return 'active';
    if (state === 'creating' || state === 'updating') return 'pending';
    if (state === 'deleting' || state === 'deleted' || state === 'invalid provider') return 'error';
    return 'inactive';
  };

  const getStatusLabel = () => {
    if (!deployed) return 'Verfügbar';
    const labels: Record<string, string> = {
      'creating': 'Wird erstellt',
      'updating': 'Aktualisiert',
      'synchronized': 'Aktiv',
      'deleting': 'Wird gelöscht',
      'deleted': 'Gelöscht',
      'unknown': 'Unbekannt',
      'invalid provider': 'Fehler',
    };
    return labels[deployed.status.state] || 'Aktiv';
  };

  return (
    <div className="module-card flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Icon from API or fallback */}
          {iconUrl ? (
            <img 
              src={iconUrl} 
              alt={displayName}
              className="w-10 h-10 rounded-lg object-contain bg-[var(--gov-primary)]/5 p-1.5"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-10 h-10 rounded-lg bg-[var(--gov-primary)]/10 flex items-center justify-center ${iconUrl ? 'hidden' : ''}`}>
            <ModuleIcon name={typeof deployed?.provider === 'string' ? deployed.provider : deployed?.provider?.name || provider?.name || ''} />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--gov-primary-dark)]">
              {isDeployed ? deployed.name : displayName}
            </h3>
            {isDeployed && provider?.displayName && (
              <span className="text-xs text-gray-500">{provider.displayName}</span>
            )}
            {!isDeployed && version && (
              <span className="text-xs text-gray-500">v{version}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`status-dot ${getStatusDotClass()}`} />
          <span className="text-xs text-gray-600">
            {getStatusLabel()}
          </span>
        </div>
      </div>

      {/* Category Badge */}
      {category && !isDeployed && (
        <div className="mb-3">
          <span className="category-badge">{category}</span>
        </div>
      )}

      {/* Show enabled submodules for deployed OpenDesk services - prominent display */}
      {isDeployed && deployed.provider === 'opendesk' && enabledSubmodules.length > 0 && (
        <div className="mb-4 -mx-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
            Aktive Module ({enabledSubmodules.length})
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {enabledSubmodules.map((module) => (
              <a
                key={module.key}
                href={module.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-1.5 bg-[var(--gov-primary)]/5 hover:bg-[var(--gov-primary)]/10 border border-[var(--gov-primary)]/20 hover:border-[var(--gov-primary)]/40 transition-all group"
                title={`${module.name} öffnen`}
              >
                <span className="text-base leading-none">{module.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[var(--gov-primary-dark)] truncate">{module.name}</div>
                  <div className="text-[10px] text-gray-500 truncate">{module.description}</div>
                </div>
                <svg className="w-3 h-3 text-gray-400 group-hover:text-[var(--gov-primary)] flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Description only for non-OpenDesk or when no modules */}
      {(!isDeployed || deployed.provider !== 'opendesk' || enabledSubmodules.length === 0) && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {description}
        </p>
      )}

      {provider?.plans && provider.plans.length > 0 && !isDeployed && (
        <div className="mb-4">
          <span className="text-xs font-medium text-gray-500">
            {provider.plans.length} Tarif{provider.plans.length > 1 ? 'e' : ''} verfügbar
          </span>
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        {isDeployed ? (
          <>
            <button 
              onClick={() => onDetails?.(deployed!)}
              className="btn-primary text-sm flex-1"
            >
              Details
            </button>
            {deployed.provider === 'opendesk' && (
              <button 
                onClick={() => onEdit?.(deployed)}
                className="btn-secondary text-sm flex-1"
              >
                Bearbeiten
              </button>
            )}
            <button
              onClick={() => onRemove?.(deployed!)}
              className="text-sm px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </>
        ) : (
          <button
            onClick={() => onDeploy?.(provider!)}
            className="btn-primary text-sm flex-1"
          >
            Bereitstellen
          </button>
        )}
      </div>
    </div>
  );
}

function ModuleIcon({ name }: { name: string }) {
  const lowerName = name.toLowerCase();
  
  // Database icon
  if (lowerName.includes('postgres') || lowerName.includes('mysql') || lowerName.includes('mariadb') || lowerName.includes('mongo')) {
    return (
      <svg className="w-5 h-5 text-[var(--gov-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    );
  }
  
  // Cache/Redis icon
  if (lowerName.includes('redis') || lowerName.includes('cache')) {
    return (
      <svg className="w-5 h-5 text-[var(--gov-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  }

  // Storage/S3 icon
  if (lowerName.includes('s3') || lowerName.includes('storage')) {
    return (
      <svg className="w-5 h-5 text-[var(--gov-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    );
  }

  // ArgoCD/DevOps icon
  if (lowerName.includes('argo') || lowerName.includes('cd')) {
    return (
      <svg className="w-5 h-5 text-[var(--gov-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    );
  }
  
  // Default module icon
  return (
    <svg className="w-5 h-5 text-[var(--gov-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
