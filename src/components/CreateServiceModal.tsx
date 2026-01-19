'use client';

import { useState } from 'react';
import { DeployedService } from '@/lib/api';

// Module SVG icons
const MODULE_ICONS: Record<string, React.ReactNode> = {
  'CS_JITSI_ENABLED': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  'CS_XWIKI_ENABLED': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  'CS_ELEMENT_ENABLED': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  'CS_CRYPTPAD_ENABLED': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  'CS_COLLABORA_ENABLED': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  'CS_OXAPPSUITE_ENABLED': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  'CS_OPENPROJECT_ENABLED': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
};

// OpenDesk submodules configuration
const OPENDESK_MODULES = [
  { id: 'CS_JITSI_ENABLED', name: 'Jitsi Meet', description: 'Sichere Videokonferenzen' },
  { id: 'CS_XWIKI_ENABLED', name: 'XWiki', description: 'Wissensdatenbank' },
  { id: 'CS_ELEMENT_ENABLED', name: 'Element', description: 'Verschlüsselte Kommunikation' },
  { id: 'CS_CRYPTPAD_ENABLED', name: 'CryptPad', description: 'Kollaborative Dokumente' },
  { id: 'CS_COLLABORA_ENABLED', name: 'Collabora', description: 'Office-Bearbeitung' },
  { id: 'CS_OXAPPSUITE_ENABLED', name: 'OX App Suite', description: 'E-Mail & Kalender' },
  { id: 'CS_OPENPROJECT_ENABLED', name: 'OpenProject', description: 'Projektmanagement' },
];

interface CreateServiceModalProps {
  onClose: () => void;
  onDeploy?: (payload: {
    name: string;
    provider: string;
    providerVersion: string;
    plan: { id: number };
    config: Record<string, boolean>;
  }) => Promise<void>;
  editingService?: DeployedService;
  onUpdate?: (id: string, config: Record<string, boolean>) => Promise<void>;
}

export function CreateServiceModal({ onClose, onDeploy, editingService, onUpdate }: CreateServiceModalProps) {
  const isEditMode = !!editingService;
  
  const [name, setName] = useState(editingService?.name || '');
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>(() => {
    if (editingService?.config) {
      const config: Record<string, boolean> = {};
      for (const [key, value] of Object.entries(editingService.config)) {
        if (typeof value === 'boolean') {
          config[key] = value;
        }
      }
      return config;
    }
    return {};
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleModule = (moduleId: string) => {
    setSelectedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const selectAll = () => {
    const allSelected: Record<string, boolean> = {};
    OPENDESK_MODULES.forEach((m) => {
      allSelected[m.id] = true;
    });
    setSelectedModules(allSelected);
  };

  const selectNone = () => {
    setSelectedModules({});
  };

  const handleSubmit = async () => {
    if (!isEditMode && !name.trim()) {
      setError('Bitte geben Sie einen Dienstnamen ein.');
      return;
    }

    if (selectedCount === 0) {
      setError('Bitte wählen Sie mindestens ein Modul aus.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditMode && onUpdate && editingService) {
        await onUpdate(editingService.id, selectedModules);
      } else if (onDeploy) {
        await onDeploy({
          name: name.trim(),
          provider: 'opendesk',
          providerVersion: 'v1',
          plan: { id: 0 },
          config: selectedModules,
        });
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : isEditMode ? 'Aktualisierung fehlgeschlagen' : 'Bereitstellung fehlgeschlagen');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCount = Object.values(selectedModules).filter(Boolean).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Header with blue accent */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-[var(--gov-primary)]">
          <div className="w-10 h-10 bg-[var(--gov-primary)]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--gov-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isEditMode ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              )}
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[var(--gov-primary-dark)]">
              {isEditMode ? 'Dienst bearbeiten' : 'Neuen Dienst erstellen'}
            </h2>
            <p className="text-sm text-gray-500">
              {isEditMode ? `${editingService?.name} - Module anpassen` : 'OpenDesk Bürolösung konfigurieren'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Name Input - only for create mode */}
        {!isEditMode && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dienstname <span className="text-[var(--gov-accent)]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. Abteilung Finanzen"
              className="input-field"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              Eindeutiger Name für diese OpenDesk-Instanz
            </p>
          </div>
        )}

        {/* Submodules Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">
              Module auswählen
              <span className="ml-2 text-[var(--gov-primary)] font-normal">
                ({selectedCount}/{OPENDESK_MODULES.length})
              </span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectAll}
                disabled={isSubmitting}
                className="text-xs text-[var(--gov-primary)] hover:underline disabled:opacity-50"
              >
                Alle
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={selectNone}
                disabled={isSubmitting}
                className="text-xs text-gray-500 hover:underline disabled:opacity-50"
              >
                Keine
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {OPENDESK_MODULES.map((module) => {
              const isSelected = selectedModules[module.id];
              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  disabled={isSubmitting}
                  className={`
                    relative p-3 text-left transition-all
                    border-2 hover:border-[var(--gov-primary)]
                    ${isSelected 
                      ? 'bg-[var(--gov-primary)]/5 border-[var(--gov-primary)]' 
                      : 'bg-white border-gray-200'
                    }
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <div className={`
                      w-5 h-5 border-2 flex items-center justify-center flex-shrink-0
                      ${isSelected 
                        ? 'bg-[var(--gov-primary)] border-[var(--gov-primary)]' 
                        : 'border-gray-300'
                      }
                    `}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    
                    <span className="text-[var(--gov-primary)]">{MODULE_ICONS[module.id]}</span>
                    
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 text-sm">{module.name}</div>
                      <div className="text-xs text-gray-500 truncate">{module.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-600 text-red-700 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {selectedCount > 0 
              ? `${selectedCount} Modul${selectedCount > 1 ? 'e' : ''} werden bereitgestellt`
              : 'Keine Module ausgewählt'
            }
          </p>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            >
              Abbrechen
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || selectedCount === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditMode ? 'Speichern...' : 'Erstellen...'}
                </span>
              ) : (
                isEditMode ? 'Änderungen speichern' : 'Dienst erstellen'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
