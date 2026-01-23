'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { AppCatalog } from '@/components/AppCatalog';
import { ProjectDashboard } from '@/components/ProjectDashboard';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { ProviderDetailsDialog } from '@/components/ProviderDetailsDialog';
import { useAuth } from '@/context/AuthContext';
import { ServiceProvider, DeployedService, listProviders, listServices, getServiceDetails } from '@/lib/api';
import { getProjects, getProjectServices, createProject, activateProject, removeServiceFromProject, Project, ProjectService } from '@/lib/projects';

export default function Dashboard() {
  const { isAuthenticated, teamId } = useAuth();
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [deployedServices, setDeployedServices] = useState<DeployedService[]>([]);
  const [serviceDetails, setServiceDetails] = useState<Record<string, Record<string, unknown>>>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectServices, setProjectServices] = useState<ProjectService[]>([]);
  const [enabledProviders, setEnabledProviders] = useState<Set<string>>(new Set());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const providersData = await listProviders();
        // Filter out opendesk provider
        setProviders(providersData.filter((p) => p.name !== 'opendesk'));
        if (isAuthenticated && teamId) {
          const servicesData = await listServices();
          setDeployedServices(servicesData);
          const detailsMap: Record<string, Record<string, unknown>> = {};
          await Promise.all(
            servicesData
              .filter((s) => s.status.state === 'synchronized')
              .map(async (service) => {
                try {
                  detailsMap[service.id] = await getServiceDetails(service.id);
                } catch {}
              })
          );
          setServiceDetails(detailsMap);
        }
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [isAuthenticated, teamId]);

  useEffect(() => {
    async function loadProjectServices() {
      if (currentProject) {
        const services = await getProjectServices(currentProject.id);
        setProjectServices(services);
      } else {
        setProjectServices([]);
      }
    }
    loadProjectServices();
  }, [currentProject]);

  const handleToggleProvider = useCallback((provider: ServiceProvider) => {
    setEnabledProviders((prev) => {
      const next = new Set(prev);
      if (next.has(provider.name)) {
        next.delete(provider.name);
      } else {
        next.add(provider.name);
      }
      return next;
    });
  }, []);

  const handleCreateProject = async (name: string): Promise<{ success: boolean; errors?: string[] }> => {
    try {
      const project = await createProject(name);
      const enabledProvidersList = providers.filter((p) => enabledProviders.has(p.name));
      if (enabledProvidersList.length === 0) {
        return { success: false, errors: ['No applications selected'] };
      }
      const result = await activateProject(
        project.id,
        enabledProvidersList.map((p) => ({ name: p.name, version: p.version }))
      );
      if (result.success) {
        const updatedProjects = await getProjects();
        setProjects(updatedProjects);
        setEnabledProviders(new Set());
        const servicesData = await listServices();
        setDeployedServices(servicesData);
        showNotification('success', `Project "${name}" created successfully`);
        return { success: true };
      } else {
        return { success: false, errors: result.errors };
      }
    } catch (err) {
      return { success: false, errors: [err instanceof Error ? err.message : 'Unknown error'] };
    }
  };

  const handleRemoveService = async (serviceId: string) => {
    if (!currentProject) return;
    if (!confirm('Are you sure you want to remove this application?')) return;
    const result = await removeServiceFromProject(currentProject.id, serviceId);
    if (result.success) {
      const services = await getProjectServices(currentProject.id);
      setProjectServices(services);
      const servicesData = await listServices();
      setDeployedServices(servicesData);
      showNotification('success', 'Application removed');
    } else {
      showNotification('error', result.error || 'Failed to remove application');
    }
  };

  const handleProviderDetails = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
  };

  const enabledProvidersArray = providers.filter((p) => enabledProviders.has(p.name));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border bg-background/80">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">O</span>
              </div>
              <span className="text-lg font-bold">OpenApps</span>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md p-8 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-2">Configuration Required</h2>
            <p className="text-muted-foreground mb-4">
              Please configure the following environment variables:
            </p>
            <div className="text-left bg-muted rounded-lg p-4 font-mono text-sm">
              <code className="block">NEXT_PUBLIC_CSA_API_TOKEN=&lt;token&gt;</code>
              <code className="block">NEXT_PUBLIC_CSA_TEAM_ID=&lt;team-id&gt;</code>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        projects={projects}
        currentProject={currentProject}
        onSelectProject={setCurrentProject}
        onCreateProject={() => setIsCreateDialogOpen(true)}
      />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {currentProject ? (
          <ProjectDashboard
            project={currentProject}
            services={projectServices}
            deployedServices={deployedServices}
            serviceDetails={serviceDetails}
            providers={providers}
            onRemoveService={handleRemoveService}
            onBackToCatalog={() => setCurrentProject(null)}
          />
        ) : (
          <AppCatalog
            providers={providers}
            enabledProviders={enabledProviders}
            onToggleProvider={handleToggleProvider}
            onProviderDetails={handleProviderDetails}
            onCreateProject={() => setIsCreateDialogOpen(true)}
            stats={{ projectCount: projects.length }}
          />
        )}
      </main>

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        enabledProviders={enabledProvidersArray}
        onCreateProject={handleCreateProject}
      />

      <ProviderDetailsDialog
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
      />

      {notification && (
        <div className={`toast ${notification.type === 'success' ? 'toast-success' : 'toast-error'}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

