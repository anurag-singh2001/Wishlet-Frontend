import { CHRISTMAS } from "./packs/christmas";
import { DIWALI } from "./packs/diwali";
import { NEW_YEAR } from "./packs/newyear";
import type { FestivalPack } from "./types";

// Server-safe: data only. Decor components are loaded lazily in components/FestivalDecor.tsx.
export const FESTIVAL_PACKS: Record<string, FestivalPack> = {
  [DIWALI.id]: DIWALI,
  [CHRISTMAS.id]: CHRISTMAS,
  [NEW_YEAR.id]: NEW_YEAR,
};

export function getFestivalPack(id: string | null | undefined): FestivalPack | null {
  if (!id || !Object.prototype.hasOwnProperty.call(FESTIVAL_PACKS, id)) return null;
  return FESTIVAL_PACKS[id];
}
