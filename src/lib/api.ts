import type { ApiTemplate, BuilderState } from "@/features/builder/types";

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
    [key: string]: unknown;
  };
  createdAt: string;
  /** null = old wish that never expires. */
  expiresAt: string | null;
}

export interface WishStats {
  viewCount: number;
  createdAt: string;
  expiresAt?: string | null;
}

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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      templateId: payload.templateId,
      occasion: payload.occasion,
      content: {
        recipientName: payload.recipientName,
        senderName: payload.senderName,
        message: payload.message,
        photos: payload.photos,
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

/** Throws Error("FORBIDDEN"|"NOT_FOUND"|"API_ERROR"). Requires the owner's delete token. */
export async function getWishStats(slug: string, token: string): Promise<WishStats> {
  const res = await fetch(`${API_URL}/api/v1/wishes/${slug}/stats`, {
    headers: { "x-delete-token": token },
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

export async function deleteWish(slug: string, token: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/v1/wishes/${slug}`, {
    method: "DELETE",
    headers: { "x-delete-token": token },
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Failed to delete wish"));
}

/** Returns null when a signature cannot be obtained (caller falls back to server upload). */
export async function getUploadSignature(): Promise<UploadSignature | null> {
  const res = await fetch(`${API_URL}/api/v1/uploads/signature`, { method: "POST" });
  if (!res.ok) return null;
  return res.json() as Promise<UploadSignature>;
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
