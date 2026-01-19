'use client';

import { useState } from 'react';
import { DeployedService, ServiceProvider } from '@/lib/api';

// Module metadata with SVG icon components
const MODULE_ICONS: Record<string, React.ReactNode> = {
  'CS_JITSI_ENABLED': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  'CS_XWIKI_ENABLED': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  'CS_ELEMENT_ENABLED': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  'CS_CRYPTPAD_ENABLED': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  'CS_COLLABORA_ENABLED': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  'CS_OXAPPSUITE_ENABLED': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  'CS_OPENPROJECT_ENABLED': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
};

const MODULE_METADATA: Record<string, { name: string; urlPath: string; description: string }> = {
  'CS_JITSI_ENABLED': { name: 'Jitsi Meet', urlPath: 'jitsi', description: 'Videokonferenzen' },
  'CS_XWIKI_ENABLED': { name: 'XWiki', urlPath: 'wiki', description: 'Wissensdatenbank' },
  'CS_ELEMENT_ENABLED': { name: 'Element', urlPath: 'element', description: 'Matrix Chat' },
  'CS_CRYPTPAD_ENABLED': { name: 'CryptPad', urlPath: 'cryptpad', description: 'Dokumente' },
  'CS_COLLABORA_ENABLED': { name: 'Collabora', urlPath: 'collabora', description: 'Office Suite' },
  'CS_OXAPPSUITE_ENABLED': { name: 'OX App Suite', urlPath: 'mail', description: 'E-Mail & Kalender' },
  'CS_OPENPROJECT_ENABLED': { name: 'OpenProject', urlPath: 'project', description: 'Projektmanagement' },
};

interface ServiceAccordionProps {
  service: DeployedService;
  provider?: ServiceProvider;
  details?: Record<string, unknown>;
  onRemove: (service: DeployedService) => void;
  onDetails: (service: DeployedService) => void;
  onEdit: (service: DeployedService) => void;
  defaultExpanded?: boolean;
}

export function ServiceAccordion({ 
  service, 
  provider, 
  details, 
  onRemove, 
  onDetails, 
  onEdit,
  defaultExpanded = true 
}: ServiceAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Get enabled modules
  const enabledModules = Object.entries(service.config || {})
    .filter(([, value]) => value === true)
    .map(([key]) => {
      const meta = MODULE_METADATA[key];
      if (!meta) return null;
      
      // Get hostname from details (API returns lowercase 'hostname')
      let hostname = '';
      if (details && typeof details['hostname'] === 'string') {
        hostname = details['hostname'];
      } else if (details && typeof details['HOSTNAME'] === 'string') {
        hostname = details['HOSTNAME'] as string;
      } else {
        const baseHost = service.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        hostname = `https://${baseHost}.opendesk.gov.de`;
      }
      
      return {
        ...meta,
        key,
        url: `${hostname}/${meta.urlPath}`
      };
    })
    .filter(Boolean) as Array<{ name: string; urlPath: string; description: string; key: string; url: string }>;

  const getStatusDotClass = () => {
    const state = service.status.state;
    if (state === 'synchronized') return 'active';
    if (state === 'creating' || state === 'updating') return 'pending';
    if (state === 'deleting' || state === 'deleted' || state === 'invalid provider') return 'error';
    return 'inactive';
  };

  const getStatusLabel = () => {
    const labels: Record<string, string> = {
      'creating': 'Wird erstellt',
      'updating': 'Aktualisiert',
      'synchronized': 'Aktiv',
      'deleting': 'Wird gelöscht',
      'deleted': 'Gelöscht',
      'unknown': 'Unbekannt',
      'invalid provider': 'Ungültig',
    };
    return labels[service.status.state] || service.status.state;
  };

  return (
    <div className="module-card overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          {/* Expand/Collapse Icon */}
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          
          {/* Service Name & Info */}
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[var(--gov-primary-dark)]">{service.name}</h3>
              <span className="px-2 py-0.5 bg-[var(--gov-primary)]/10 text-[var(--gov-primary)] text-xs font-medium rounded">
                {provider?.displayName || 'OpenDesk'}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {enabledModules.length} Modul{enabledModules.length !== 1 ? 'e' : ''} aktiv
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className={`status-dot ${getStatusDotClass()}`} />
            <span className="text-sm text-gray-600">{getStatusLabel()}</span>
          </div>
        </div>
      </button>
      
      {/* Expanded Content - Modules */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {/* Module Cards Row */}
          <div className="p-4 bg-gray-50/50">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {enabledModules.map((module) => (
                <a
                  key={module.key}
                  href={module.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-36 p-3 bg-white border border-gray-200 rounded-lg hover:border-[var(--gov-primary)] hover:shadow-sm transition-all group"
                >
                  <div className="mb-2 text-[var(--gov-primary)]">
                    {MODULE_ICONS[module.key]}
                  </div>
                  <div className="font-medium text-sm text-gray-800 group-hover:text-[var(--gov-primary)]">
                    {module.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{module.description}</div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-[var(--gov-primary)]">
                    <span>Öffnen</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
              
              {enabledModules.length === 0 && (
                <div className="text-sm text-gray-500 italic">
                  Keine Module aktiviert
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex gap-2">
              <button
                onClick={() => onDetails(service)}
                className="btn-primary text-sm"
              >
                Details
              </button>
              <button
                onClick={() => onEdit(service)}
                className="btn-secondary text-sm"
              >
                Bearbeiten
              </button>
            </div>
            <button
              onClick={() => onRemove(service)}
              className="text-sm px-3 py-2 text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Entfernen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
