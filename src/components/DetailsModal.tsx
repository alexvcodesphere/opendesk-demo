'use client';

import { useState, useEffect } from 'react';
import { DeployedService, ServiceProvider, getServiceDetails } from '@/lib/api';

interface DetailsModalProps {
  service: DeployedService;
  provider?: ServiceProvider;
  onClose: () => void;
}

export function DetailsModal({ service, provider, onClose }: DetailsModalProps) {
  const [details, setDetails] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getServiceDetails(service.id);
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Details');
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [service.id]);

  const copyToClipboard = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getStatusLabel = (state: string) => {
    const labels: Record<string, string> = {
      'creating': 'Wird erstellt',
      'updating': 'Wird aktualisiert',
      'synchronized': 'Synchronisiert',
      'deleting': 'Wird gelöscht',
      'deleted': 'Gelöscht',
      'unknown': 'Unbekannt',
      'invalid provider': 'Ungültiger Anbieter',
    };
    return labels[state] || state;
  };

  const getStatusColor = (state: string) => {
    const colors: Record<string, string> = {
      'creating': 'text-purple-600 bg-purple-100',
      'updating': 'text-yellow-600 bg-yellow-100',
      'synchronized': 'text-green-600 bg-green-100',
      'deleting': 'text-red-600 bg-red-100',
      'deleted': 'text-gray-600 bg-gray-100',
      'unknown': 'text-gray-600 bg-gray-100',
      'invalid provider': 'text-red-600 bg-red-100',
    };
    return colors[state] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          {provider?.iconUrl ? (
            <img 
              src={provider.iconUrl} 
              alt={provider.displayName}
              className="w-12 h-12 rounded-xl object-contain bg-[var(--gov-primary)]/5 p-2"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-[var(--gov-primary)]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--gov-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[var(--gov-primary-dark)]">
              {service.name}
            </h2>
            <p className="text-sm text-gray-500">
              {provider?.displayName || (typeof service.provider === 'string' ? service.provider : service.provider?.name)} v{typeof service.provider === 'string' ? service.providerVersion : service.provider?.version}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status.state)}`}>
            {getStatusLabel(service.status.state)}
          </span>
        </div>

        {/* Category Badge */}
        {provider?.category && (
          <div className="mb-4">
            <span className="category-badge">{provider.category}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gov-primary)]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Connection Details */}
        {details && !isLoading && (
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--gov-primary-dark)]">Verbindungsdetails</h3>
            
            <div className="connection-info space-y-3">
              {Object.entries(details).map(([key, value]) => {
                if (value === null || value === undefined || typeof value === 'object') return null;
                const stringValue = String(value);
                const isSecret = key.toLowerCase().includes('password') || key.toLowerCase().includes('secret');
                
                return (
                  <div key={key} className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">{key}</span>
                      <p className="font-mono text-sm truncate">
                        {isSecret ? '••••••••' : stringValue}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(key, stringValue)}
                      className="copy-btn"
                    >
                      {copiedKey === key ? (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Kopiert
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Kopieren
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No details available */}
        {!isLoading && !error && details && Object.keys(details).length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>Keine Verbindungsdetails verfügbar.</p>
            <p className="text-sm mt-1">Der Service wird möglicherweise noch erstellt.</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t">
          <button onClick={onClose} className="btn-secondary flex-1">
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
