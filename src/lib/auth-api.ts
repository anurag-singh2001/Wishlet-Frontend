import { API_URL, type ReactionId } from "./api";
import { authHeaders, type AuthSession, type AuthUser } from "./auth-token";

/** Public OAuth web client id (safe to ship); override per environment if needed. */
export const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "1075546711165-5o07m2m1kqjdcmotirkcdg8t96ehe9hr.apps.googleusercontent.com";

export interface OwnedWishSummary {
  slug: string;
  occasion: string;
  templateId: string;
  recipientName: string | null;
  createdAt: string;
  expiresAt: string | null;
  viewCount: number;
  reactions: Record<ReactionId, number>;
  reactionsEnabled: boolean;
}

async function failure(res: Response): Promise<Error> {
  const body = (await res.json().catch(() => ({}))) as { error?: string };
  return new Error(body.error || (res.status === 401 ? "UNAUTHORIZED" : "API_ERROR"));
}

/** Exchanges a Google ID token (from Google Identity Services) for a Wishlet session. */
export async function signInWithGoogle(credential: string): Promise<AuthSession> {
  const res = await fetch(`${API_URL}/api/v1/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });
  if (!res.ok) throw await failure(res);
  return res.json() as Promise<AuthSession>;
}

/** Throws Error("UNAUTHORIZED") when the session is missing or expired. */
export async function getMe(): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/api/v1/me`, { headers: authHeaders() });
  if (!res.ok) throw await failure(res);
  return ((await res.json()) as { user: AuthUser }).user;
}

export async function getMyWishes(): Promise<OwnedWishSummary[]> {
  const res = await fetch(`${API_URL}/api/v1/me/wishes`, { headers: authHeaders() });
  if (!res.ok) throw await failure(res);
  return ((await res.json()) as { wishes: OwnedWishSummary[] }).wishes;
}

/** Moves wishes created on this device (proved by their delete tokens) into the account. */
export async function claimWishes(wishes: { slug: string; token: string }[]): Promise<number> {
  const res = await fetch(`${API_URL}/api/v1/me/wishes/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ wishes }),
  });
  if (!res.ok) throw await failure(res);
  return ((await res.json()) as { claimed: number }).claimed;
}
