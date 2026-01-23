'use client';

import { useState, useMemo } from 'react';
import { ServiceProvider } from '@/lib/api';
import { Project } from '@/lib/projects';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus, Loader2 } from 'lucide-react';

interface AddServicePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providers: ServiceProvider[];
  excludeProviders?: Set<string>;
  onAddService: (provider: ServiceProvider) => Promise<void>;
  project?: Project | null;
}

export function AddServicePicker({ open, onOpenChange, providers, excludeProviders, onAddService, project }: AddServicePickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const availableProviders = useMemo(() => {
    return providers.filter(p => {
      const notExcluded = !excludeProviders?.has(p.name);
      const matchesSearch = searchQuery === '' ||
        p.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return notExcluded && matchesSearch;
    });
  }, [providers, excludeProviders, searchQuery]);

  const handleAddService = async (provider: ServiceProvider) => {
    setLoadingProvider(provider.name);
    try {
      await onAddService(provider);
      onOpenChange(false);
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
          <DialogDescription>
            {project ? `Add an application to "${project.name}"` : 'Select an application to add'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        <ScrollArea className="h-[400px] -mx-6 px-6">
          {availableProviders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? 'No applications found matching your search.' : 'No applications available to add.'}
            </div>
          ) : (
            <div className="space-y-2">
              {availableProviders.map((provider) => (
                <div
                  key={provider.name}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {provider.iconUrl ? (
                      <img
                        src={provider.iconUrl}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-sm font-bold text-primary">${provider.displayName.charAt(0)}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-sm font-bold text-primary">{provider.displayName.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{provider.displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{provider.category} • v{provider.version}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddService(provider)}
                    disabled={loadingProvider !== null}
                  >
                    {loadingProvider === provider.name ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
