'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { AppCatalog } from '@/components/AppCatalog';
import { ProjectDashboard } from '@/components/ProjectDashboard';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { useAuth } from '@/context/AuthContext';
import {
  ServiceProvider,
  DeployedService,
  listProviders,
  listServices,
  getServiceDetails,
} from '@/lib/api';
import {
  getProjects,
  getProjectServices,
  createProject,
  activateProject,
  removeServiceFromProject,
  Project,
  ProjectService,
} from '@/lib/projects';

export default function Dashboard() {
  const { isAuthenticated, teamId } = useAuth();
  
  // Core data
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [deployedServices, setDeployedServices] = useState<DeployedService[]>([]);
  const [serviceDetails, setServiceDetails] = useState<Record<string, Record<string, unknown>>>({});
  
  // Project state
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectServices, setProjectServices] = useState<ProjectService[]>([]);
  
  // UI state
  const [enabledProviders, setEnabledProviders] = useState<Set<string>>(new Set());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // Load providers from API
        const providersData = await listProviders();
        setProviders(providersData);
        
        // Load deployed services from API
        if (isAuthenticated && teamId) {
          const servicesData = await listServices();
          setDeployedServices(servicesData);
          
          // Load details for synchronized services
          const detailsMap: Record<string, Record<string, unknown>> = {};
          await Promise.all(
            servicesData
              .filter((s) => s.status.state === 'synchronized')
              .map(async (service) => {
                try {
                  detailsMap[service.id] = await getServiceDetails(service.id);
                } catch {
                  // Ignore individual errors
                }
              })
          );
          setServiceDetails(detailsMap);
        }
        
        // Load projects from database
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

  // Load project services when current project changes
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

  // Toggle provider enabled state
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

  // Create project handler
  const handleCreateProject = async (name: string): Promise<{ success: boolean; errors?: string[] }> => {
    try {
      // Create project in database
      const project = await createProject(name);
      
      // Get enabled providers with version info
      const enabledProvidersList = providers.filter((p) => enabledProviders.has(p.name));
      
      if (enabledProvidersList.length === 0) {
        return { success: false, errors: ['No applications selected'] };
      }
      
      // Activate project (deploy services)
      const result = await activateProject(
        project.id,
        enabledProvidersList.map((p) => ({ name: p.name, version: p.version }))
      );
      
      if (result.success) {
        // Refresh projects list
        const updatedProjects = await getProjects();
        setProjects(updatedProjects);
        
        // Clear enabled providers
        setEnabledProviders(new Set());
        
        // Refresh deployed services
        const servicesData = await listServices();
        setDeployedServices(servicesData);
        
        showNotification('success', `Project "${name}" created successfully`);
        return { success: true };
      } else {
        return { success: false, errors: result.errors };
      }
    } catch (err) {
      return {
        success: false,
        errors: [err instanceof Error ? err.message : 'Unknown error'],
      };
    }
  };

  // Remove service from project
  const handleRemoveService = async (serviceId: string) => {
    if (!currentProject) return;
    
    if (!confirm('Are you sure you want to remove this application?')) return;
    
    const result = await removeServiceFromProject(currentProject.id, serviceId);
    
    if (result.success) {
      // Refresh project services
      const services = await getProjectServices(currentProject.id);
      setProjectServices(services);
      
      // Refresh deployed services
      const servicesData = await listServices();
      setDeployedServices(servicesData);
      
      showNotification('success', 'Application removed');
    } else {
      showNotification('error', result.error || 'Failed to remove application');
    }
  };

  // Provider details handler (placeholder)
  const handleProviderDetails = (provider: ServiceProvider) => {
    console.log('Show details for:', provider.name);
    // TODO: Implement details modal
  };

  // Get enabled providers as array for dialog
  const enabledProvidersArray = providers.filter((p) => enabledProviders.has(p.name));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col">
        <header className="border-b border-gray-800 bg-gray-900/80">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-lg font-bold text-gray-100">OpenApps</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md p-8 rounded-xl border border-gray-800 bg-gray-900/50">
            <h2 className="text-xl font-semibold text-gray-100 mb-2">
              Configuration Required
            </h2>
            <p className="text-gray-400 mb-4">
              Please configure the following environment variables:
            </p>
            <div className="text-left bg-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300">
              <code className="block">NEXT_PUBLIC_CSA_API_TOKEN=&lt;token&gt;</code>
              <code className="block">NEXT_PUBLIC_CSA_TEAM_ID=&lt;team-id&gt;</code>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
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

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        enabledProviders={enabledProvidersArray}
        onCreateProject={handleCreateProject}
      />

      {/* Notification Toast */}
      {notification && (
        <div
          className={`toast ${
            notification.type === 'success' ? 'toast-success' : 'toast-error'
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}
