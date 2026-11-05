import { API_URL } from "@/lib/api";
import type { SiteConfig } from "../types";

export async function getSiteConfig(): Promise<SiteConfig> {
  const res = await fetch(`${API_URL}/api/v1/config`);
  if (!res.ok) throw new Error("Failed to load config");
  return res.json() as Promise<SiteConfig>;
}
