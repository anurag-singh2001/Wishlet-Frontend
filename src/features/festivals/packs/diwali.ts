import type { FestivalPack } from "../types";

// Server-safe data only: no components, so the root layout can import it.
export const DIWALI: FestivalPack = {
  id: "diwali",
  name: "Diwali",
  colors: {
    brand: "#8E2145",
    accent: "#F5A524",
    ground: "#FFF6E8",
    statusBar: "#2B1148",
    heroFrom: "#2B1148",
    heroTo: "#6B1535",
  },
  hero: {
    eyebrow: "Festival of Lights",
    headline: "Send a little light this Diwali.",
    subtitle:
      "Pick a glowing design, add your blessings and a photo, and send one private link. Ready in about a minute.",
    ctaLabel: "Light up someone's Diwali 🪔",
  },
  bannerText: "Happy Diwali! 🪔 Send a glowing wish to someone you love.",
  appIconAlias: "Diwali",
  favicon: "/festive/diwali.svg",
  defaultDates: { 2026: "2026-11-08" },
};
