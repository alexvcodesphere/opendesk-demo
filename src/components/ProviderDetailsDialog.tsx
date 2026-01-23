'use client';

import { ServiceProvider } from '@/lib/api';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProviderDetailsDialogProps {
  provider: ServiceProvider | null;
  onClose: () => void;
}

export function ProviderDetailsDialog({ provider, onClose }: ProviderDetailsDialogProps) {
  if (!provider) return null;

  return (
    <Dialog open={!!provider} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {provider.iconUrl ? (
              <img
                src={provider.iconUrl}
                alt={provider.displayName}
                className="w-16 h-16 rounded-lg object-contain bg-muted p-2"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">
                {provider.displayName.charAt(0)}
              </div>
            )}
            <div>
              <DialogTitle className="text-xl">{provider.displayName}</DialogTitle>
              <DialogDescription className="mt-1">
                {provider.category} • v{provider.version}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold mb-1">Description</h4>
            <p className="text-sm text-muted-foreground">{provider.description}</p>
          </div>

          {/* Author */}
          {provider.author && (
            <div>
              <h4 className="text-sm font-semibold mb-1">Author</h4>
              <p className="text-sm text-muted-foreground">{provider.author}</p>
            </div>
          )}

          {/* Category */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Category</h4>
            <Badge variant="outline">{provider.category}</Badge>
          </div>

          {/* Plans */}
          {provider.plans && provider.plans.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Available Plans</h4>
              <div className="space-y-2">
                {provider.plans.map((plan) => (
                  <div key={plan.id} className="p-3 rounded-md border border-border bg-muted/50">
                    <p className="font-medium">{plan.name}</p>
                    {plan.description && (
                      <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
