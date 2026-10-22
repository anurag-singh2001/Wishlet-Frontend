/**
 * Wishlet session (issued by the backend after Google sign-in), kept in localStorage.
 * All access is wrapped: storage can be unavailable (private mode, blocked site data).
 */
const KEY = "wishlet:auth";

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthSession): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    // storage unavailable: the session lasts for this page only
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

/** `Authorization` header when signed in, otherwise nothing. */
export function authHeaders(): Record<string, string> {
  const token = getSession()?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
