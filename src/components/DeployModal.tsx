'use client';

import { useState } from 'react';
import { ServiceProvider, DeployServicePayload } from '@/lib/api';

interface DeployModalProps {
  provider: ServiceProvider;
  onClose: () => void;
  onDeploy: (payload: DeployServicePayload) => Promise<void>;
}

export function DeployModal({ provider, onClose, onDeploy }: DeployModalProps) {
  const [name, setName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(provider.plans[0]?.id || 0);
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    if (!name.trim()) {
      setError('Bitte geben Sie einen Namen ein.');
      return;
    }

    setIsDeploying(true);
    setError(null);

    try {
      await onDeploy({
        name: name.trim(),
        provider: provider.name,
        providerVersion: provider.version,
        plan: { id: selectedPlan },
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bereitstellung fehlgeschlagen');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--gov-blue)]/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--gov-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--gov-blue-dark)]">
              Modul bereitstellen
            </h2>
            <p className="text-sm text-gray-500">
              {provider.name} v{provider.version}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modulname *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. Bürgeramt-Datenbank"
              className="input-field"
              disabled={isDeploying}
            />
          </div>

          {provider.plans.length > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tarif auswählen
              </label>
              <div className="space-y-2">
                {provider.plans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedPlan === plan.id
                        ? 'border-[var(--gov-blue)] bg-[var(--gov-blue)]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={selectedPlan === plan.id}
                      onChange={(e) => setSelectedPlan(Number(e.target.value))}
                      className="text-[var(--gov-blue)]"
                      disabled={isDeploying}
                    />
                    <div>
                      <span className="font-medium">{plan.name}</span>
                      {plan.description && (
                        <p className="text-xs text-gray-500">{plan.description}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
            disabled={isDeploying}
          >
            Abbrechen
          </button>
          <button
            onClick={handleDeploy}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
            disabled={isDeploying}
          >
            {isDeploying ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Wird bereitgestellt...
              </>
            ) : (
              'Bereitstellen'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
