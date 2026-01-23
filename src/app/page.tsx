'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { AppCatalog } from '@/components/AppCatalog';
import { ProjectDashboard } from '@/components/ProjectDashboard';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { ProviderDetailsDialog } from '@/components/ProviderDetailsDialog';
import { useAuth } from '@/context/AuthContext';
import { ServiceProvider, DeployedService, listProviders, listServices, getServiceDetails } from '@/lib/api';
import { getProjects, getProjectServices, createProject, activateProject, removeServiceFromProject, deleteProject, addServiceToProject, Project, ProjectService } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Dashboard() {
  const { isAuthenticated, teamId, isLoggedIn, userName, login, logout } = useAuth();
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [deployedServices, setDeployedServices] = useState<DeployedService[]>([]);
  const [serviceDetails, setServiceDetails] = useState<Record<string, Record<string, unknown>>>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectServices, setProjectServices] = useState<ProjectService[]>([]);
  const [enabledProviders, setEnabledProviders] = useState<Set<string>>(new Set());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState<{ serviceId: string; details: Record<string, unknown> } | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Prefetch providers immediately (even before login) for faster perceived performance
  useEffect(() => {
    async function prefetchProviders() {
      try {
        const providersData = await listProviders();
        const hiddenProviders = ['opendesk', 'object-storage'];
        setProviders(providersData.filter((p) => !hiddenProviders.includes(p.name)));
      } catch (err) {
        console.error('Failed to prefetch providers:', err);
      }
    }
    prefetchProviders();
  }, []);

  // Load remaining data once authenticated
  useEffect(() => {
    async function loadData() {
      if (!isLoggedIn) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
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
  }, [isAuthenticated, teamId, isLoggedIn]);

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

  const handleCreateProject = async (name: string): Promise<{ success: boolean; errors?: string[]; projectId?: string }> => {
    try {
      const project = await createProject(name);
      const enabledProvidersList = providers.filter((p) => enabledProviders.has(p.name));
      
      // Allow creating empty projects (no services selected)
      if (enabledProvidersList.length === 0) {
        const updatedProjects = await getProjects();
        setProjects(updatedProjects);
        showNotification('success', `Project "${name}" created successfully (no applications)`);
        return { success: true, projectId: project.id };
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
        return { success: true, projectId: project.id };
      } else {
        return { success: false, errors: result.errors };
      }
    } catch (err) {
      return { success: false, errors: [err instanceof Error ? err.message : 'Unknown error'] };
    }
  };

  const handleGoToProject = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setCurrentProject(project);
    }
  };

  const handleAddServiceToProject = async (provider: ServiceProvider) => {
    if (!currentProject) return;
    const result = await addServiceToProject(currentProject.id, { name: provider.name, version: provider.version });
    if (result.success) {
      const services = await getProjectServices(currentProject.id);
      setProjectServices(services);
      const servicesData = await listServices();
      setDeployedServices(servicesData);
      showNotification('success', `Added ${provider.displayName} to project`);
    } else {
      showNotification('error', result.error || 'Failed to add service');
    }
  };

  const handleDeleteProjectFromDashboard = async () => {
    if (!currentProject) return;
    if (!confirm(`Are you sure you want to delete project "${currentProject.name}"? This will also remove all associated services.`)) return;
    const result = await deleteProject(currentProject.id);
    if (result.success) {
      setCurrentProject(null);
      const updatedProjects = await getProjects();
      setProjects(updatedProjects);
      const servicesData = await listServices();
      setDeployedServices(servicesData);
      showNotification('success', `Project deleted`);
    } else {
      showNotification('error', result.errors.join(', ') || 'Failed to delete project');
    }
  };

  const handleServiceDetails = (serviceId: string, details: Record<string, unknown>) => {
    setSelectedServiceDetails({ serviceId, details });
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

  const handleDeleteProject = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete project "${project.name}"? This will also remove all associated services.`)) return;
    const result = await deleteProject(project.id);
    if (result.success) {
      const updatedProjects = await getProjects();
      setProjects(updatedProjects);
      if (currentProject?.id === project.id) {
        setCurrentProject(null);
      }
      const servicesData = await listServices();
      setDeployedServices(servicesData);
      showNotification('success', `Project "${project.name}" deleted`);
    } else {
      showNotification('error', result.errors.join(', ') || 'Failed to delete project');
    }
  };

  const enabledProvidersArray = providers.filter((p) => enabledProviders.has(p.name));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = login(loginUsername, loginPassword);
    if (!success) {
      setLoginError('Invalid username or password');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  // Show login form if not logged in
  if (!isLoggedIn) {
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
          <div className="w-full max-w-sm p-8 rounded-lg border border-border bg-card shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-xl bg-primary flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-2xl">O</span>
              </div>
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground text-sm mt-1">Sign in to OpenApps</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input
                  type="text"
                  placeholder="Enter username..."
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  placeholder="Enter password..."
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              {loginError && (
                <p className="text-destructive text-sm">{loginError}</p>
              )}
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border bg-background/80">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">O</span>
              </div>
              <span className="text-lg font-bold">OpenApps</span>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
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
        onDeleteProject={handleDeleteProject}
        userName={userName}
        onLogout={logout}
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
            onDeleteProject={handleDeleteProjectFromDashboard}
            onAddService={handleAddServiceToProject}
            onServiceDetails={handleServiceDetails}
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
        onGoToProject={handleGoToProject}
      />

      <ProviderDetailsDialog
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
      />

      {/* Service Details Dialog */}
      {selectedServiceDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedServiceDetails(null)}>
          <div className="bg-card border border-border rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Service Details</h3>
              <div className="space-y-3">
                {Object.entries(selectedServiceDetails.details).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-muted-foreground uppercase">{key}</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded break-all">
                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                    </code>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedServiceDetails(null)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className={`toast ${notification.type === 'success' ? 'toast-success' : 'toast-error'}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

