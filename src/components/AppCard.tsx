'use client';

import { ServiceProvider } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Info } from 'lucide-react';

interface AppCardProps {
  provider: ServiceProvider;
  isEnabled: boolean;
  onToggle: () => void;
  onDetails: () => void;
}

export function AppCard({ provider, isEnabled, onToggle, onDetails }: AppCardProps) {
  // Generate tags based on provider metadata
  const tags: string[] = [];
  if (provider.category) {
    tags.push(provider.category);
  }
  // Could add more logic here based on provider properties

  return (
    <Card className="flex flex-col h-full hover:border-gray-700 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {provider.iconUrl ? (
            <img
              src={provider.iconUrl}
              alt={provider.displayName}
              className="w-12 h-12 rounded-lg object-contain bg-gray-800 p-2"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-white font-bold text-lg">
              {provider.displayName.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{provider.displayName}</CardTitle>
            <CardDescription className="text-xs mt-0.5">
              {provider.category} • v{provider.version}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-3">
        <p className="text-sm text-gray-400 line-clamp-3 flex-1">
          {provider.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-2">
          <Button
            onClick={onToggle}
            variant={isEnabled ? 'success' : 'default'}
            className="flex-1"
            size="sm"
          >
            {isEnabled ? (
              <>
                <Check className="w-4 h-4" />
                Enabled
              </>
            ) : (
              'Enable'
            )}
          </Button>
          <Button
            onClick={onDetails}
            variant="outline"
            size="sm"
          >
            <Info className="w-4 h-4" />
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
