import { API_URL } from "@/lib/api";
import { getFestivalPack } from "../registry";
import type { FestivalPack } from "../types";

/** The live festival with "festive look" on (from config); any failure means none. */
export async function getServerFestival(): Promise<FestivalPack | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/config`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { activeFestival?: unknown };
    return typeof data.activeFestival === "string" ? getFestivalPack(data.activeFestival) : null;
  } catch {
    return null;
  }
}
