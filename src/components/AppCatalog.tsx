'use client';

import { useState, useMemo } from 'react';
import { ServiceProvider } from '@/lib/api';
import { AppCard } from './AppCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LayoutGrid, Zap, Users, Bell } from 'lucide-react';

interface AppCatalogProps {
  providers: ServiceProvider[];
  enabledProviders: Set<string>; // Set of provider names that are enabled
  onToggleProvider: (provider: ServiceProvider) => void;
  onProviderDetails: (provider: ServiceProvider) => void;
  onCreateProject: () => void;
  stats?: {
    projectCount: number;
    activeUsers?: number;
  };
}

export function AppCatalog({
  providers,
  enabledProviders,
  onToggleProvider,
  onProviderDetails,
  onCreateProject,
  stats,
}: AppCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Get unique categories from providers
  const categories = useMemo(() => {
    const cats = new Set<string>();
    providers.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ['All', ...Array.from(cats), 'Enabled'];
  }, [providers]);

  // Filter providers
  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        provider.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        activeFilter === 'All' ||
        (activeFilter === 'Enabled' && enabledProviders.has(provider.name)) ||
        provider.category === activeFilter;

      return matchesSearch && matchesCategory;
    });
  }, [providers, searchQuery, activeFilter, enabledProviders]);

  const enabledCount = enabledProviders.size;

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<LayoutGrid className="w-5 h-5 text-violet-400" />}
          value={providers.length}
          label="Available Apps"
        />
        <StatCard
          icon={<Zap className="w-5 h-5 text-green-400" />}
          value={enabledCount}
          label="Enabled Apps"
        />
        <StatCard
          icon={<Users className="w-5 h-5 text-blue-400" />}
          value={stats?.projectCount ?? 0}
          label="Projects"
        />
        <StatCard
          icon={<Bell className="w-5 h-5 text-amber-400" />}
          value={stats?.activeUsers ?? 0}
          label="Active Users"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeFilter === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
              {cat === 'Enabled' && enabledCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-xs">
                  {enabledCount}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Create Project CTA */}
      {enabledCount > 0 && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-violet-600/20 to-violet-800/20 border border-violet-600/30">
          <div>
            <p className="font-medium text-gray-100">
              {enabledCount} app{enabledCount > 1 ? 's' : ''} selected
            </p>
            <p className="text-sm text-gray-400">
              Create a project to deploy your selected applications
            </p>
          </div>
          <Button onClick={onCreateProject} size="lg">
            Create Project
          </Button>
        </div>
      )}

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

      {/* Empty State */}
      {filteredProviders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No applications found matching your criteria.</p>
        </div>
      )}
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
