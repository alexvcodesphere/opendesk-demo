'use client';

import { DeployedService, ServiceProvider } from '@/lib/api';
import { ServiceAccordion } from './ServiceAccordion';

interface ModuleGridProps {
  providers: ServiceProvider[];
  deployedServices: DeployedService[];
  serviceDetails: Record<string, Record<string, unknown>>;
  onRemove: (service: DeployedService) => void;
  onDetails: (service: DeployedService) => void;
  onEdit: (service: DeployedService) => void;
  onCreateNew: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
}

export function ModuleGrid({
  providers,
  deployedServices,
  serviceDetails,
  onRemove,
  onDetails,
  onEdit,
  onCreateNew,
  onRefresh,
  isLoading,
  isRefreshing,
}: ModuleGridProps) {
  // Find provider for a deployed service to get iconUrl, displayName, etc.
  const getProviderForService = (service: DeployedService) => {
    return providers.find(
      (p) => p.name === service.provider && p.version === service.providerVersion
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <section>
          <h2 className="section-header">Module werden geladen...</h2>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="module-card animate-pulse">
                <div className="h-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Filter to only OpenDesk services that are not deleted/deleting
  // Handle both old format (provider as string) and new format (provider as object)
  const activeServices = deployedServices.filter((s) => {
    const providerName = typeof s.provider === 'string' ? s.provider : s.provider?.name;
    return providerName === 'opendesk' && s.status.state !== 'deleted' && s.status.state !== 'deleting';
  });

  return (
    <div className="space-y-8">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-header mb-0">Bereitgestellte Dienste</h2>
          <p className="text-sm text-gray-500 mt-1">
            {activeServices.length > 0 
              ? `${activeServices.length} Dienst${activeServices.length !== 1 ? 'e' : ''} aktiv`
              : 'Noch keine Dienste bereitgestellt'}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[var(--gov-primary)] hover:bg-[var(--gov-primary)]/5 rounded transition-colors disabled:opacity-50"
        >
          <svg 
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isRefreshing ? 'Aktualisieren...' : 'Aktualisieren'}
        </button>
      </div>

      {/* Service Accordions */}
      <div className="space-y-4">
        {activeServices.map((service, index) => (
          <ServiceAccordion
            key={service.id}
            service={service}
            provider={getProviderForService(service)}
            details={serviceDetails[service.id]}
            onRemove={onRemove}
            onDetails={onDetails}
            onEdit={onEdit}
            defaultExpanded={index === 0} // First one expanded by default
          />
        ))}
      </div>

      {/* Add New Service Button */}
      <button
        onClick={onCreateNew}
        className="w-full p-6 border-2 border-dashed border-gray-300 hover:border-[var(--gov-primary)] hover:bg-[var(--gov-primary)]/5 rounded-lg transition-all group"
      >
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 bg-[var(--gov-primary)]/10 group-hover:bg-[var(--gov-primary)]/20 rounded-full flex items-center justify-center transition-colors">
            <svg className="w-6 h-6 text-[var(--gov-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="text-left">
            <span className="font-semibold text-gray-700 group-hover:text-[var(--gov-primary)]">
              Neuen Dienst erstellen
            </span>
            <p className="text-sm text-gray-500 group-hover:text-[var(--gov-primary-light)]">
              OpenDesk Bürolösung konfigurieren
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
