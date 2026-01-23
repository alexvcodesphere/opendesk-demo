'use client';

import { Project, ProjectService } from '@/lib/projects';
import { ServiceProvider, DeployedService } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LayoutGrid, Zap, Bell, Search, ExternalLink, Trash2 } from 'lucide-react';

interface ProjectDashboardProps {
  project: Project;
  services: ProjectService[];
  deployedServices: DeployedService[];
  serviceDetails: Record<string, Record<string, unknown>>;
  providers: ServiceProvider[];
  onRemoveService: (serviceId: string) => void;
  onBackToCatalog: () => void;
}

export function ProjectDashboard({
  project,
  services,
  deployedServices,
  serviceDetails,
  providers,
  onRemoveService,
  onBackToCatalog,
}: ProjectDashboardProps) {
  // Match project services with deployed services and providers
  const enrichedServices = services.map((projectService) => {
    const deployed = deployedServices.find((d) => d.id === projectService.serviceId);
    const provider = providers.find(
      (p) => p.name === projectService.providerName && p.version === projectService.providerVersion
    );
    const details = serviceDetails[projectService.serviceId];
    
    return {
      ...projectService,
      deployed,
      provider,
      details,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">
            Welcome to {project.name}!
          </h1>
          <p className="text-gray-400 mt-1">Access your project applications</p>
        </div>
        <Button variant="outline" onClick={onBackToCatalog}>
          Back to Catalog
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search for applications..."
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<LayoutGrid className="w-5 h-5 text-violet-400" />}
          value={services.length}
          label="Available Applications"
        />
        <StatCard
          icon={<Zap className="w-5 h-5 text-green-400" />}
          value={enrichedServices.filter((s) => s.deployed?.status.state === 'synchronized').length}
          label="Active Sessions"
        />
        <StatCard
          icon={<Bell className="w-5 h-5 text-amber-400" />}
          value={0}
          label="New Notifications"
        />
      </div>

      {/* Applications */}
      <div>
        <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-violet-600 rounded-full" />
          Your Applications
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrichedServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onRemove={() => onRemoveService(service.serviceId)}
            />
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>No applications in this project yet.</p>
            <Button variant="outline" className="mt-4" onClick={onBackToCatalog}>
              Add Applications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-800 bg-gray-900/50">
      {icon}
      <div>
        <p className="text-2xl font-bold text-gray-100">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  onRemove,
}: {
  service: {
    id: number;
    serviceId: string;
    providerName: string;
    providerVersion: string;
    deployed?: DeployedService;
    provider?: ServiceProvider;
    details?: Record<string, unknown>;
  };
  onRemove: () => void;
}) {
  const { provider, deployed, details } = service;
  const displayName = provider?.displayName || service.providerName;
  const description = provider?.description || 'Managed service application';
  
  // Get hostname from details if available
  const hostname = details?.hostname as string | undefined;
  const links = details?.links as Record<string, string> | undefined;
  const primaryLink = hostname || (links ? Object.values(links)[0] : undefined);

  const isActive = deployed?.status.state === 'synchronized';

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          {provider?.iconUrl ? (
            <img
              src={provider.iconUrl}
              alt={displayName}
              className="w-12 h-12 rounded-lg object-contain bg-gray-800 p-2"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-white font-bold text-lg">
              {displayName.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-base">{displayName}</CardTitle>
            <p className="text-xs text-gray-400">
              {isActive ? (
                <span className="text-green-400">● Active</span>
              ) : (
                <span className="text-yellow-400">● Pending</span>
              )}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-gray-400 line-clamp-2 flex-1">
          {description}
        </p>
        
        <div className="flex gap-2 mt-4">
          {primaryLink && (
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              asChild
            >
              <a href={primaryLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Open
              </a>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-400 hover:text-red-300 hover:bg-red-600/20"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
