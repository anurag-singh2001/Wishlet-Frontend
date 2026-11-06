export interface FestivalColors {
  /** Primary brand colour (buttons, header). */
  brand: string;
  /** Accent (marigold / gold highlights). */
  accent: string;
  /** Page background; kept light enough for the standard dark ink. */
  ground: string;
  /** Android status bar colour. */
  statusBar: string;
  /** Dark hero panel gradient, start and end. */
  heroFrom: string;
  heroTo: string;
}

export interface FestivalPack {
  id: string;
  name: string;
  colors: FestivalColors;
  hero: { eyebrow: string; headline: string; subtitle: string; ctaLabel: string };
  /** Shown when the admin has no banner of their own. */
  bannerText: string;
  /** Launcher icon alias name (used by the Android app in Phase 3). */
  appIconAlias: string;
  /** Public path of the festive favicon. */
  favicon: string;
  /** Festival date by year, ISO yyyy-mm-dd. */
  defaultDates: Record<number, string>;
}
