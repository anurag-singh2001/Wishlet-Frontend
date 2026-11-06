import { DIWALI } from "./packs/diwali";
import type { FestivalPack } from "./types";

// Server-safe: data only. Decor components are loaded lazily in components/FestivalDecor.tsx.
export const FESTIVAL_PACKS: Record<string, FestivalPack> = {
  [DIWALI.id]: DIWALI,
};

export function getFestivalPack(id: string | null | undefined): FestivalPack | null {
  if (!id || !Object.prototype.hasOwnProperty.call(FESTIVAL_PACKS, id)) return null;
  return FESTIVAL_PACKS[id];
}
