import type { Branding } from "@/features/site-config/types";

export interface CatalogOccasion {
  id: string;
  label: string;
  tint: string;
  kind: "core" | "festival";
  enabled: boolean;
  order: number;
  festiveLook: boolean;
  startsAt: string | null;
  endsAt: string | null;
  badge: string | null;
  status: "off" | "scheduled" | "live" | "ended";
}

export interface CatalogTemplate {
  id: string;
  enabled: boolean;
  order: number;
  featured: boolean;
  badge: string | null;
}

export interface Catalog {
  occasions: CatalogOccasion[];
  templates: CatalogTemplate[];
}

export type CatalogUpdate = { occasions: Omit<CatalogOccasion, "kind" | "status">[] };

export interface AdminConfig {
  branding: Branding;
  catalog: Catalog;
}

export interface AdminStats {
  totals: { wishes: number; views: number; reactions: number; users: number };
  perDay: { date: string; wishes: number }[];
  perOccasion: { occasion: string; wishes: number }[];
  perTemplate: { templateId: string; wishes: number }[];
}

export interface AdminOwner {
  id: string;
  email: string;
  name: string | null;
  blockedAt: string | null;
}

export interface AdminWish {
  id: string;
  slug: string;
  occasion: string;
  templateId: string;
  viewCount: number;
  createdAt: string;
  owner: AdminOwner | null;
}

export interface AdminWishPage {
  items: AdminWish[];
  total: number;
  page: number;
}
