import type { FestivalPack } from "../types";

// Server-safe data only: no components, so the root layout can import it.
export const NEW_YEAR: FestivalPack = {
  id: "newyear",
  name: "New Year",
  colors: {
    brand: "#2B2F77",
    accent: "#E8B931",
    ground: "#F7F6FB",
    statusBar: "#0B1026",
    heroFrom: "#0B1026",
    heroTo: "#2A1F4D",
  },
  hero: {
    eyebrow: "Happy New Year",
    headline: "Ring in the new year with a wish they'll remember.",
    subtitle:
      "Pick a sparkling design, add your hopes for their year and a photo, and send one private link. Ready in about a minute.",
    ctaLabel: "Send a New Year wish 🎆",
  },
  bannerText: "Happy New Year! 🎆 Start someone's year with a sparkling wish.",
  appIconAlias: "Newyear",
  favicon: "/festive/newyear.svg",
  defaultDates: { 2027: "2027-01-01", 2028: "2028-01-01" },
};
