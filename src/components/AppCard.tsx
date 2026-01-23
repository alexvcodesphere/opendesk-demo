'use client';

import { ServiceProvider } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, Info } from 'lucide-react';

interface AppCardProps {
  provider: ServiceProvider;
  isEnabled: boolean;
  onToggle: () => void;
  onDetails: () => void;
}

export function AppCard({ provider, isEnabled, onToggle, onDetails }: AppCardProps) {
  return (
    <Card className={`flex flex-col h-full transition-all ${isEnabled ? 'ring-2 ring-primary shadow-md' : 'hover:shadow-md'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {provider.iconUrl ? (
            <img
              src={provider.iconUrl}
              alt={provider.displayName}
              className="w-12 h-12 rounded-lg object-contain bg-muted p-2"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              {provider.displayName.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{provider.displayName}</CardTitle>
            <CardDescription className="text-xs mt-0.5">
              {provider.category} • v{provider.version}
            </CardDescription>
          </div>
          {isEnabled && (
            <Badge variant="success" className="shrink-0">Added</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-3">
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {provider.description}
        </p>
        
        {provider.category && (
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className="text-xs">{provider.category}</Badge>
          </div>
        )}
        
        <div className="flex gap-2 mt-auto pt-2">
          <Button 
            onClick={onToggle} 
            variant={isEnabled ? 'outline' : 'default'} 
            className="flex-1" 
            size="sm"
          >
            {isEnabled ? (
              <>
                <Check className="w-4 h-4" />
                In Project
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Project
              </>
            )}
          </Button>
          <Button onClick={onDetails} variant="ghost" size="sm">
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
