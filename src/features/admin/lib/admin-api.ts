import { API_URL } from "@/lib/api";
import { authHeaders } from "@/lib/auth-token";
import type { Branding } from "@/features/site-config/types";
import type { AdminConfig, AdminStats, AdminWishPage, Catalog } from "../types";

/** Throws Error("FORBIDDEN"|"UNAUTHORIZED") or Error(message from the API). */
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const isForm = init.body instanceof FormData;
  const res = await fetch(`${API_URL}/api/v1/admin${path}`, {
    ...init,
    headers: {
      ...(init.body && !isForm ? { "Content-Type": "application/json" } : {}),
      ...authHeaders(),
    },
  });
  if (res.status === 403) throw new Error("FORBIDDEN");
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message || "Request failed");
  }
  return res.json() as Promise<T>;
}

const put = (body: unknown): RequestInit => ({ method: "PUT", body: JSON.stringify(body) });

export const getAdminConfig = (): Promise<AdminConfig> => request("/config");

export const saveBranding = (b: Branding): Promise<Branding> => request("/config/branding", put(b));

export const saveCatalog = (c: Catalog): Promise<Catalog> => request("/config/catalog", put(c));

export function uploadLogo(file: File): Promise<{ url: string; publicId: string }> {
  const form = new FormData();
  form.append("file", file, file.name);
  return request("/logo", { method: "POST", body: form });
}

export const getAdminStats = (days: number): Promise<AdminStats> => request(`/stats?days=${days}`);

export const getAdminWishes = (q: string, page: number): Promise<AdminWishPage> =>
  request(`/wishes?q=${encodeURIComponent(q)}&page=${page}`);

export const deleteAdminWish = (id: string): Promise<unknown> =>
  request(`/wishes/${id}`, { method: "DELETE" });

export const setUserBlocked = (id: string, blocked: boolean): Promise<unknown> =>
  request(`/users/${id}/${blocked ? "block" : "unblock"}`, { method: "POST" });
