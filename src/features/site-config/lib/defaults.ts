import { OCCASIONS } from "@/features/builder/lib/occasions";
import { templateRegistry } from "@/features/templates/registry";
import type { SiteConfig } from "../types";
import { DEFAULT_BRANDING } from "./branding-defaults";

/** Used while loading or when the API is down, so the site keeps working. */
export const FALLBACK_CONFIG: SiteConfig = {
  branding: DEFAULT_BRANDING,
  occasions: OCCASIONS.map((o) => ({ id: o.id, label: o.label, tint: o.tint, badge: null })),
  templates: Object.values(templateRegistry).map((t) => ({
    id: t.id,
    name: t.name,
    occasion: t.occasion,
    description: t.description,
    featured: false,
    badge: null,
  })),
};
