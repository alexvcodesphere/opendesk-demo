'use client';

import { useState, useMemo } from 'react';
import { ServiceProvider } from '@/lib/api';
import { AppCard } from './AppCard';
import { ProjectBuilderBar } from './ProjectBuilderBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LayoutGrid, Zap, Users, FolderPlus } from 'lucide-react';

interface AppCatalogProps {
  providers: ServiceProvider[];
  enabledProviders: Set<string>;
  onToggleProvider: (provider: ServiceProvider) => void;
  onProviderDetails: (provider: ServiceProvider) => void;
  onCreateProject: () => void;
  stats?: { projectCount: number; activeUsers?: number };
}

export function AppCatalog({
  providers, enabledProviders, onToggleProvider, onProviderDetails, onCreateProject, stats,
}: AppCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    providers.forEach((p) => { if (p.category) cats.add(p.category); });
    return ['All', ...Array.from(cats), 'In Project'];
  }, [providers]);

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const matchesSearch = searchQuery === '' ||
        provider.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeFilter === 'All' ||
        (activeFilter === 'In Project' && enabledProviders.has(provider.name)) ||
        provider.category === activeFilter;
      return matchesSearch && matchesCategory;
    });
  }, [providers, searchQuery, activeFilter, enabledProviders]);

  const enabledCount = enabledProviders.size;
  const enabledProvidersList = providers.filter((p) => enabledProviders.has(p.name));

  return (
    <div className="space-y-6 pb-24"> {/* Extra padding for sticky bar */}
      {/* Header with context */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Application Catalog</h1>
          <p className="text-muted-foreground mt-1">
            Select applications to add to your new project
          </p>
        </div>
        {enabledCount === 0 && (
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-lg">
            <FolderPlus className="w-4 h-4" />
            Click "Add to Project" on apps below to start building
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<LayoutGrid className="w-5 h-5 text-primary" />} value={providers.length} label="Available Apps" />
        <StatCard icon={<Zap className="w-5 h-5 text-success" />} value={enabledCount} label="In Your Project" />
        <StatCard icon={<Users className="w-5 h-5 text-primary" />} value={stats?.projectCount ?? 0} label="Your Projects" />
        <StatCard icon={<FolderPlus className="w-5 h-5 text-primary" />} value={stats?.activeUsers ?? 0} label="Active Users" />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="text" placeholder="Search applications..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <Button key={cat} variant={activeFilter === cat ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter(cat)}>
              {cat}
              {cat === 'In Project' && enabledCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary-foreground/20 rounded text-xs">{enabledCount}</span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProviders.map((provider) => (
          <AppCard 
            key={`${provider.name}-${provider.version}`} 
            provider={provider} 
            isEnabled={enabledProviders.has(provider.name)} 
            onToggle={() => onToggleProvider(provider)} 
            onDetails={() => onProviderDetails(provider)} 
          />
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-12"><p className="text-muted-foreground">No applications found matching your criteria.</p></div>
      )}

      {/* Sticky Project Builder Bar */}
      <ProjectBuilderBar
        enabledProviders={enabledProvidersList}
        onRemoveProvider={onToggleProvider}
        onCreateProject={onCreateProject}
      />
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card shadow-sm">
      {icon}
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
