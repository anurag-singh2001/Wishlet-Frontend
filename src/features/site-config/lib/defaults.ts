import { OCCASIONS } from "@/features/builder/lib/occasions";
import { templateRegistry } from "@/features/templates/registry";
import type { Branding, SiteConfig } from "../types";

export const DEFAULT_BRANDING: Branding = {
  appName: "Wishlet",
  logoUrl: null,
  logoPublicId: null,
  faviconUrl: null,
  colors: { primary: "#4f46e5", accent: "#f59e0b", bg: "#ffffff" },
  banner: { enabled: false, text: "", link: null },
  feedbackUrl: null,
};

export const DEFAULT_FEEDBACK_URL = "https://forms.gle/5zA5dNXDY2PexPHx9";

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
