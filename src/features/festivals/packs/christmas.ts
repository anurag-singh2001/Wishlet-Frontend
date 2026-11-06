import type { FestivalPack } from "../types";

// Server-safe data only: no components, so the root layout can import it.
export const CHRISTMAS: FestivalPack = {
  id: "christmas",
  name: "Christmas",
  colors: {
    brand: "#B3122E",
    accent: "#E9B949",
    ground: "#FBF7F0",
    statusBar: "#0E2A22",
    heroFrom: "#0E2A22",
    heroTo: "#16452F",
  },
  hero: {
    eyebrow: "Merry Christmas",
    headline: "Wrap up a little joy this Christmas.",
    subtitle:
      "Pick a snowy design, add your warmest wishes and a photo, and send one private link. Ready in about a minute.",
    ctaLabel: "Send some Christmas cheer 🎄",
  },
  bannerText: "Merry Christmas! 🎄 Send a cosy wish to someone you love.",
  appIconAlias: "Christmas",
  favicon: "/festive/christmas.svg",
  defaultDates: { 2026: "2026-12-25", 2027: "2027-12-25" },
};
