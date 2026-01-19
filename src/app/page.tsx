'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { ModuleGrid } from '@/components/ModuleGrid';
import { CreateServiceModal } from '@/components/CreateServiceModal';
import { DetailsModal } from '@/components/DetailsModal';
import { useAuth } from '@/context/AuthContext';
import {
  ServiceProvider,
  DeployedService,
  listProviders,
  listServices,
  deployService,
  deleteService,
  updateService,
  getServiceDetails,
} from '@/lib/api';

export default function Dashboard() {
  const { isAuthenticated, teamId } = useAuth();
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [deployedServices, setDeployedServices] = useState<DeployedService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<DeployedService | null>(null);
  const [selectedService, setSelectedService] = useState<DeployedService | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [serviceDetails, setServiceDetails] = useState<Record<string, Record<string, unknown>>>({});

  const [isRefreshing, setIsRefreshing] = useState(false);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Load cached data on mount, then fetch fresh data
  useEffect(() => {
    // Load from cache first for instant display
    const cachedProviders = localStorage.getItem('opengov_providers');
    const cachedServices = localStorage.getItem('opengov_services');
    const cachedDetails = localStorage.getItem('opengov_details');
    
    if (cachedProviders) {
      try { setProviders(JSON.parse(cachedProviders)); } catch { /* Invalid */ }
    }
    if (cachedServices) {
      try { setDeployedServices(JSON.parse(cachedServices)); } catch { /* Invalid */ }
    }
    if (cachedDetails) {
      try { setServiceDetails(JSON.parse(cachedDetails)); } catch { /* Invalid */ }
    }

    // Then fetch fresh data if authenticated
    if (isAuthenticated && teamId) {
      // Fetch services first (more important)
      listServices()
        .then((servicesData) => {
          setDeployedServices(servicesData);
          localStorage.setItem('opengov_services', JSON.stringify(servicesData));
        })
        .catch((err) => console.error('Failed to fetch services:', err));

      // Fetch providers in background (less critical)
      listProviders()
        .then((providersData) => {
          setProviders(providersData);
          localStorage.setItem('opengov_providers', JSON.stringify(providersData));
        })
        .catch((err) => console.error('Failed to fetch providers:', err));
    }
  }, [isAuthenticated, teamId]);

  // Fetch details for any synchronized services that don't have cached details
  useEffect(() => {
    const fetchMissingDetails = async () => {
      // Debug: log all services and their states
      console.log('All services:', deployedServices.map(s => ({ name: s.name, state: s.status.state, id: s.id })));
      console.log('Current serviceDetails keys:', Object.keys(serviceDetails));
      
      const synchronizedServices = deployedServices.filter(
        (s) => s.status.state === 'synchronized' && !serviceDetails[s.id]
      );
      
      // Also try 'updating' state as the screenshot showed
      const allActiveServices = deployedServices.filter(
        (s) => (s.status.state === 'synchronized' || s.status.state === 'updating') && !serviceDetails[s.id]
      );
      
      console.log('Synchronized services needing details:', synchronizedServices.length);
      console.log('All active services needing details:', allActiveServices.length);
      
      if (allActiveServices.length === 0) return;
      
      console.log('Fetching missing details for', allActiveServices.length, 'services');
      
      const newDetails: Record<string, Record<string, unknown>> = { ...serviceDetails };
      
      await Promise.all(
        allActiveServices.map(async (service) => {
          try {
            console.log('Fetching details for service:', service.name, service.id);
            const details = await getServiceDetails(service.id);
            console.log('Got details for', service.name, ':', details);
            newDetails[service.id] = details;
          } catch (err) {
            console.error('Failed to fetch details for', service.name, err);
          }
        })
      );
      
      setServiceDetails(newDetails);
      localStorage.setItem('opengov_details', JSON.stringify(newDetails));
    };
    
    console.log('useEffect triggered - services:', deployedServices.length, 'authenticated:', isAuthenticated);
    
    if (deployedServices.length > 0 && isAuthenticated) {
      fetchMissingDetails();
    }
  }, [deployedServices, isAuthenticated]);

  // Manual refresh - fetches both providers and services
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      const [providersData, servicesData] = await Promise.all([
        listProviders(),
        teamId ? listServices().catch(() => []) : Promise.resolve([]),
      ]);
      
      setProviders(providersData);
      setDeployedServices(servicesData as DeployedService[]);
      
      // Fetch details for each synchronized service to get HOSTNAME
      const detailsMap: Record<string, Record<string, unknown>> = {};
      const synchronizedServices = (servicesData as DeployedService[]).filter(
        (s) => s.status.state === 'synchronized'
      );
      
      await Promise.all(
        synchronizedServices.map(async (service) => {
          try {
            const details = await getServiceDetails(service.id);
            detailsMap[service.id] = details;
          } catch {
            // Ignore errors for individual services
          }
        })
      );
      setServiceDetails(detailsMap);
      
      // Cache providers, services, and details
      localStorage.setItem('opengov_providers', JSON.stringify(providersData));
      localStorage.setItem('opengov_services', JSON.stringify(servicesData));
      localStorage.setItem('opengov_details', JSON.stringify(detailsMap));
      showNotification('success', 'Daten aktualisiert');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Module');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDeploy = async (payload: {
    name: string;
    provider: string;
    providerVersion: string;
    plan: { id: number };
    config: Record<string, boolean>;
  }) => {
    await deployService({
      ...payload,
      plan: payload.plan,
    });
    
    showNotification('success', `Dienst "${payload.name}" erfolgreich bereitgestellt`);
    setIsCreateModalOpen(false);
    
    // Reload services from API with loading animation
    setIsRefreshing(true);
    try {
      const servicesData = await listServices();
      setDeployedServices(servicesData);
      localStorage.setItem('opengov_services', JSON.stringify(servicesData));
    } catch (err) {
      console.error('Failed to reload services:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRemove = async (service: DeployedService) => {
    if (!confirm(`Möchten Sie den Dienst "${service.name}" wirklich entfernen?`)) {
      return;
    }

    try {
      await deleteService(service.id);
      setDeployedServices((prev) => {
        const updated = prev.filter((s) => s.id !== service.id);
        localStorage.setItem('opengov_services', JSON.stringify(updated));
        return updated;
      });
      showNotification('success', `Dienst "${service.name}" entfernt`);
    } catch (err) {
      showNotification('error', err instanceof Error ? err.message : 'Entfernen fehlgeschlagen');
    }
  };

  const handleDetails = (service: DeployedService) => {
    setSelectedService(service);
  };

  const handleEdit = (service: DeployedService) => {
    setEditingService(service);
  };

  const handleUpdate = async (id: string, config: Record<string, boolean>) => {
    const updatedService = await updateService(id, { config });
    setDeployedServices((prev) => {
      const updated = prev.map((s) => (s.id === id ? updatedService : s));
      localStorage.setItem('opengov_services', JSON.stringify(updated));
      return updated;
    });
    showNotification('success', `Dienst erfolgreich aktualisiert`);
    setEditingService(null);
  };

  // Find provider for a deployed service
  const getProviderForService = (service: DeployedService) => {
    return providers.find(
      (p) => p.name === service.provider && p.version === service.providerVersion
    );
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
        {/* Hero Section */}
        {isAuthenticated && (
          <div className="mb-8 p-6 bg-gradient-to-r from-[var(--gov-primary)] to-[var(--gov-primary-light)] text-white rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Willkommen beim OpenDesk Portal</h2>
                <p className="text-white/80 text-sm">Verwalten Sie Ihre souveränen Bürolösungen</p>
              </div>
              <div className="hidden md:flex items-center gap-3 text-xs">
                <span className="px-3 py-1.5 bg-white/15 rounded">BSI-konform</span>
                <span className="px-3 py-1.5 bg-white/15 rounded">Open Source</span>
                <span className="px-3 py-1.5 bg-white/15 rounded">DSGVO</span>
              </div>
            </div>
          </div>
        )}

        {/* Not Authenticated State */}
        {!isAuthenticated && (
          <div className="module-card text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--gov-primary)]/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-[var(--gov-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--gov-primary-dark)] mb-2">
              Umgebungsvariablen erforderlich
            </h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              Bitte konfigurieren Sie die folgenden Umgebungsvariablen in Ihrer .env.local Datei:
            </p>
            <div className="connection-info text-left max-w-md mx-auto text-sm">
              <code className="block">NEXT_PUBLIC_CSA_API_TOKEN=&lt;token&gt;</code>
              <code className="block">NEXT_PUBLIC_CSA_TEAM_ID=&lt;team-id&gt;</code>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Server nach Änderung neu starten
            </p>
          </div>
        )}

        {/* Error State */}
        {error && isAuthenticated && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Erneut versuchen
            </button>
          </div>
        )}

        {/* Module Grid */}
        {isAuthenticated && !error && (
          <ModuleGrid
            providers={providers}
            deployedServices={deployedServices}
            serviceDetails={serviceDetails}
            onRemove={handleRemove}
            onDetails={handleDetails}
            onEdit={handleEdit}
            onCreateNew={() => setIsCreateModalOpen(true)}
            onRefresh={handleRefresh}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
          />
        )}

        {/* Create/Edit Service Modal */}
        {(isCreateModalOpen || editingService) && (
          <CreateServiceModal
            onClose={() => {
              setIsCreateModalOpen(false);
              setEditingService(null);
            }}
            onDeploy={handleDeploy}
            editingService={editingService || undefined}
            onUpdate={handleUpdate}
          />
        )}

        {/* Details Modal */}
        {selectedService && (
          <DetailsModal
            service={selectedService}
            provider={getProviderForService(selectedService)}
            onClose={() => setSelectedService(null)}
          />
        )}

        {/* Notification Toast */}
        {notification && (
          <div
            className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg z-50 transition-all ${
              notification.type === 'success'
                ? 'bg-[var(--gov-accent)] text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {notification.message}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gov-primary)] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider">OpenDesk Portal</h3>
              <p className="text-white/70 text-xs">
                Souveräne Bürolösungen für den öffentlichen Sektor
              </p>
            </div>
            <p className="text-xs text-white/50">
              Demo-Anwendung
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
