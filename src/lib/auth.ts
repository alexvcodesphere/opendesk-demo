// Auth abstraction layer - Environment variables only
// No frontend configuration needed

const isBrowser = typeof window !== 'undefined';

export function getToken(): string | null {
  return process.env.NEXT_PUBLIC_CSA_API_TOKEN || null;
}

export function getTeamId(): string | null {
  return process.env.NEXT_PUBLIC_CSA_TEAM_ID || null;
}

export function isAuthenticated(): boolean {
  return !!getToken() && !!getTeamId();
}

// Legacy exports for compatibility
export const authProvider = {
  getToken,
  setToken: () => {},
  clearToken: () => {},
  isAuthenticated,
};

export function setTeamId() {}
export function isTeamIdFromEnv() { return true; }
