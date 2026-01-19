'use client';

import { useAuth } from '@/context/AuthContext';

export function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header className="gov-header">
        <div className="gov-header-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Official-looking emblem */}
              <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center border border-white/20">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  {/* Bundesadler-inspired eagle silhouette */}
                  <path d="M12 2L9 5H6v3l-3 3 3 3v3h3l3 3 3-3h3v-3l3-3-3-3V5h-3l-3-3zm0 4a1 1 0 110 2 1 1 0 010-2zm-3 3a1 1 0 110 2 1 1 0 010-2zm6 0a1 1 0 110 2 1 1 0 010-2zm-3 3a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  OpenDesk Portal
                </h1>
                <p className="text-xs text-white/70 font-medium tracking-wide uppercase">
                  Bundesverwaltung • Digitale Dienste
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Official Status */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20">
                <span className={`status-dot ${isAuthenticated ? 'active' : 'inactive'}`} />
                <span className="text-sm font-medium">
                  {isAuthenticated ? 'Authentifiziert' : 'Nicht konfiguriert'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
