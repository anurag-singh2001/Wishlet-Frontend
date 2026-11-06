"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { OCCASIONS, type OccasionInfo } from "@/features/builder/lib/occasions";
import type { ApiTemplate } from "@/features/builder/types";
import { FALLBACK_CONFIG } from "../lib/defaults";
import { getSiteConfig } from "../lib/site-config-api";
import type { Branding, SiteConfig } from "../types";

export interface ResolvedSiteConfig {
  branding: Branding;
  occasions: (OccasionInfo & { badge: string | null; kind: "core" | "festival" })[];
  activeFestival: string | null;
  templates: ApiTemplate[];
  /** True while loading or when the API failed (bundled defaults are shown). */
  isFallback: boolean;
}

export function resolveConfig(config: SiteConfig, isFallback: boolean): ResolvedSiteConfig {
  return {
    branding: config.branding,
    isFallback,
    activeFestival: config.activeFestival ?? null,
    occasions: config.occasions.map((o) => {
      const local = OCCASIONS.find((x) => x.id === o.id);
      return {
        id: o.id,
        label: o.label || local?.label || o.id,
        tint: o.tint || local?.tint || "#EEF0FF",
        properNoun: local?.properNoun,
        badge: o.badge,
        kind: o.kind ?? local?.kind ?? "core",
      };
    }),
    templates: config.templates.map((t) => ({
      id: t.id,
      name: t.name,
      occasion: t.occasion,
      description: t.description,
      featured: t.featured,
      badge: t.badge,
    })),
  };
}

export function useSiteConfig(): ResolvedSiteConfig {
  const { data } = useQuery({
    queryKey: ["site-config"],
    queryFn: getSiteConfig,
    retry: 1,
    staleTime: 60 * 1000,
  });
  return useMemo(() => resolveConfig(data ?? FALLBACK_CONFIG, !data), [data]);
}
