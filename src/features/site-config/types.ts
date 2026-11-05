export interface Branding {
  appName: string;
  logoUrl: string | null;
  logoPublicId: string | null;
  faviconUrl: string | null;
  colors: { primary: string; accent: string; bg: string };
  banner: { enabled: boolean; text: string; link: string | null };
  feedbackUrl: string | null;
}

export interface ConfigOccasion {
  id: string;
  label: string;
  tint: string;
  badge: string | null;
}

export interface ConfigTemplate {
  id: string;
  name: string;
  occasion: string;
  description: string;
  featured: boolean;
  badge: string | null;
}

export interface SiteConfig {
  branding: Branding;
  occasions: ConfigOccasion[];
  templates: ConfigTemplate[];
}
