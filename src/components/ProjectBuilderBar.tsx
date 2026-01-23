'use client';

import { ServiceProvider } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { X, FolderPlus, Hammer } from 'lucide-react';

interface ProjectBuilderBarProps {
  enabledProviders: ServiceProvider[];
  onRemoveProvider: (provider: ServiceProvider) => void;
  onCreateProject: () => void;
}

export function ProjectBuilderBar({ enabledProviders, onRemoveProvider, onCreateProject }: ProjectBuilderBarProps) {
  if (enabledProviders.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Label and count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-primary">
              <Hammer className="w-5 h-5" />
              <span className="font-semibold">Building New Project</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {enabledProviders.length} app{enabledProviders.length !== 1 ? 's' : ''} selected
            </span>
          </div>

          {/* Center: App chips */}
          <div className="hidden md:flex items-center gap-2 flex-1 justify-center overflow-x-auto">
            {enabledProviders.slice(0, 5).map((provider) => (
              <div
                key={provider.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm"
              >
                {provider.iconUrl ? (
                  <img src={provider.iconUrl} alt="" className="w-4 h-4 rounded" />
                ) : (
                  <div className="w-4 h-4 rounded bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold">
                    {provider.displayName.charAt(0)}
                  </div>
                )}
                <span className="max-w-[100px] truncate">{provider.displayName}</span>
                <button
                  onClick={() => onRemoveProvider(provider)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {enabledProviders.length > 5 && (
              <span className="text-sm text-muted-foreground">
                +{enabledProviders.length - 5} more
              </span>
            )}
          </div>

          {/* Right: Create button */}
          <Button onClick={onCreateProject} size="lg" className="shrink-0">
            <FolderPlus className="w-4 h-4" />
            Name & Create Project
          </Button>
        </div>
      </div>
    </div>
  );
}
