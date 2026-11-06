import { getFestivalPack } from "../registry";
import type { FestivalPack } from "../types";

/** Preview (?festival=<id>, known packs only) wins over the live festival from config. */
export function resolveActiveFestival(
  preview: string | null | undefined,
  active: string | null | undefined,
): FestivalPack | null {
  return getFestivalPack(preview) ?? getFestivalPack(active);
}
