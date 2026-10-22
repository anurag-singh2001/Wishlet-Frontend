import type { ApiTemplate, BuilderState } from "@/features/builder/types";
import { authHeaders } from "./auth-token";

/** Single source of the backend base URL (also the one point for the Capacitor app). */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(
  /\/+$/,
  "",
);

export interface ApiWish {
  id: string;
  slug: string;
  templateId: string;
  occasion: string;
  content: {
    recipientName?: string;
    senderName?: string;
    message?: string;
    photos?: string[];
    voiceUrl?: string;
    voiceDuration?: number;
    /** Missing = true (older wishes). */
    reactionsEnabled?: boolean;
    [key: string]: unknown;
  };
  createdAt: string;
  /** null = old wish that never expires. */
  expiresAt: string | null;
}

export type ReactionId = "heart" | "moved" | "party" | "laugh";

/** Display order and emoji for each reaction. */
export const REACTIONS: { id: ReactionId; emoji: string; label: string }[] = [
  { id: "heart", emoji: "❤️", label: "Love" },
  { id: "moved", emoji: "🥹", label: "Moved" },
  { id: "party", emoji: "🎉", label: "Celebrate" },
  { id: "laugh", emoji: "😂", label: "Haha" },
];

export interface WishStats {
  viewCount: number;
  createdAt: string;
  expiresAt?: string | null;
  /** Creator-only reaction counts. */
  reactions?: Record<ReactionId, number>;
  reactionsEnabled?: boolean;
}

export type UploadKind = "image" | "audio";

export interface CreatedWish {
  id: string;
  slug: string;
  url: string;
  deleteToken: string;
  expiresAt?: string;
}

export interface UploadSignature {
  apiKey: string;
  timestamp: number | string;
  signature: string;
  folder: string;
  uploadUrl: string;
  /** Extra signed fields (e.g. allowed_formats) that must be sent with the upload unchanged. */
  params?: Record<string, string>;
}

async function errorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const body = (await res.json()) as { message?: string };
    return body.message || fallback;
  } catch {
    return fallback;
  }
}

export async function getTemplates(): Promise<{ templates: ApiTemplate[] }> {
  const res = await fetch(`${API_URL}/api/v1/templates`);
  if (!res.ok) throw new Error("Failed to load templates");
  return res.json() as Promise<{ templates: ApiTemplate[] }>;
}

export async function createWish(payload: BuilderState): Promise<CreatedWish> {
  const res = await fetch(`${API_URL}/api/v1/wishes`, {
    method: "POST",
    // Signed in: the wish is also saved to the account.
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({
      templateId: payload.templateId,
      occasion: payload.occasion,
      content: {
        recipientName: payload.recipientName,
        senderName: payload.senderName,
        message: payload.message,
        photos: payload.photos,
        photoPublicId: payload.photoPublicId,
        voiceUrl: payload.voice?.url,
        voicePublicId: payload.voice?.publicId,
        voiceDuration: payload.voice?.duration,
        reactionsEnabled: payload.reactionsEnabled ?? true,
      },
    }),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Failed to generate wish"));
  return res.json() as Promise<CreatedWish>;
}

/** Throws Error("NOT_FOUND") on 404, Error("EXPIRED") on 410 and Error("API_ERROR") on other failures. */
export async function getWish(slug: string, init?: RequestInit): Promise<ApiWish> {
  const res = await fetch(`${API_URL}/api/v1/wishes/${slug}`, init);
  if (!res.ok) {
    throw new Error(
      res.status === 404 ? "NOT_FOUND" : res.status === 410 ? "EXPIRED" : "API_ERROR",
    );
  }
  return res.json() as Promise<ApiWish>;
}

/** Records one view; callers should treat failures as non-fatal. */
export async function recordWishView(slug: string): Promise<{ viewCount: number }> {
  const res = await fetch(`${API_URL}/api/v1/wishes/${slug}/view`, { method: "POST" });
  if (!res.ok) throw new Error("API_ERROR");
  return res.json() as Promise<{ viewCount: number }>;
}

/** Owner proof: this device's delete token and/or the signed-in session. */
function ownerHeaders(token?: string | null): Record<string, string> {
  return { ...(token ? { "x-delete-token": token } : {}), ...authHeaders() };
}

/** Throws Error("FORBIDDEN"|"NOT_FOUND"|"API_ERROR"). Requires the delete token or a signed-in owner. */
export async function getWishStats(slug: string, token?: string | null): Promise<WishStats> {
  const res = await fetch(`${API_URL}/api/v1/wishes/${slug}/stats`, {
    headers: ownerHeaders(token),
  });
  if (!res.ok) {
    throw new Error(
      res.status === 403
        ? "FORBIDDEN"
        : res.status === 404
          ? "NOT_FOUND"
          : res.status === 410
            ? "EXPIRED"
            : "API_ERROR",
    );
  }
  return res.json() as Promise<WishStats>;
}

export async function deleteWish(slug: string, token?: string | null): Promise<void> {
  const res = await fetch(`${API_URL}/api/v1/wishes/${slug}`, {
    method: "DELETE",
    headers: ownerHeaders(token),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Failed to delete wish"));
}

/** Returns null when a signature cannot be obtained (caller falls back to server upload). */
export async function getUploadSignature(
  kind: UploadKind = "image",
): Promise<UploadSignature | null> {
  const res = await fetch(`${API_URL}/api/v1/uploads/signature`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind }),
  });
  if (!res.ok) return null;
  return res.json() as Promise<UploadSignature>;
}

/**
 * Signed direct upload to Cloudinary. Returns null if no signature is available (photos then
 * use the server fallback; audio has none). Throws on a failed upload.
 */
export async function uploadToCloudinary(
  file: Blob,
  kind: UploadKind,
  filename = kind === "audio" ? "voice.webm" : "photo.jpg",
): Promise<{ url: string; publicId: string; duration?: number } | null> {
  const sig = await getUploadSignature(kind);
  if (!sig) return null;
  const form = new FormData();
  form.append("file", file, filename);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);
  for (const [key, value] of Object.entries(sig.params ?? {})) form.append(key, value);
  const res = await fetch(sig.uploadUrl, { method: "POST", body: form });
  if (!res.ok) throw new Error("UPLOAD_FAILED");
  const data = (await res.json()) as { secure_url: string; public_id: string; duration?: number };
  return { url: data.secure_url, publicId: data.public_id, duration: data.duration };
}

/** Sets (or clears with null) this device's reaction. Throws Error(code) e.g. "REACTIONS_DISABLED". */
export async function reactToWish(
  slug: string,
  reaction: ReactionId | null,
  voterId: string,
): Promise<{ reaction: ReactionId | null }> {
  const res = await fetch(`${API_URL}/api/v1/wishes/${slug}/reactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reaction, voterId }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || "API_ERROR");
  }
  return res.json() as Promise<{ reaction: ReactionId | null }>;
}

/** Creator-only settings, authorised by the delete token. */
export async function updateWishSettings(
  slug: string,
  token: string | null | undefined,
  settings: { reactionsEnabled: boolean },
): Promise<{ reactionsEnabled: boolean }> {
  const res = await fetch(`${API_URL}/api/v1/wishes/${slug}/settings`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...ownerHeaders(token) },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Couldn't update settings"));
  return res.json() as Promise<{ reactionsEnabled: boolean }>;
}

export async function uploadImageFallback(
  file: Blob,
  filename: string,
): Promise<{ url: string; publicId: string | null }> {
  const formData = new FormData();
  formData.append("file", file, filename);
  const res = await fetch(`${API_URL}/api/v1/uploads/image`, { method: "POST", body: formData });
  if (!res.ok) {
    throw new Error(await errorMessage(res, "Failed to upload image. Please try again."));
  }
  const data = (await res.json()) as { url: string; publicId?: string };
  return { url: data.url, publicId: data.publicId || null };
}
