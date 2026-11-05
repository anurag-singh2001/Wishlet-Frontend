import type { Branding } from "../types";

// Server-safe: no template or component imports, so the root layout can use it.
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
