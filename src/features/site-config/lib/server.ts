import { API_URL } from "@/lib/api";
import { DEFAULT_BRANDING } from "./branding-defaults";
import type { Branding } from "../types";

/** Branding for the root layout; any failure yields the defaults. */
export async function getServerBranding(): Promise<Branding> {
  try {
    const res = await fetch(`${API_URL}/api/v1/config`, { next: { revalidate: 60 } });
    if (!res.ok) return DEFAULT_BRANDING;
    const data = (await res.json()) as { branding?: Partial<Branding> };
    const b = data.branding ?? {};
    return {
      ...DEFAULT_BRANDING,
      ...b,
      colors: { ...DEFAULT_BRANDING.colors, ...b.colors },
      banner: { ...DEFAULT_BRANDING.banner, ...b.banner },
    };
  } catch {
    return DEFAULT_BRANDING;
  }
}
