import type { CSSProperties } from "react";
import { mix } from "@/features/site-config/lib/theme";
import { FESTIVAL_PACKS } from "../registry";
import type { FestivalPack } from "../types";

/** CSS variables for a pack; same tokens as branding, so it overrides them. */
export function festivalVars(pack: FestivalPack): Record<string, string> {
  const { brand, accent, ground } = pack.colors;
  return {
    "--brand-primary": brand,
    "--brand-primary-hover": mix(brand, 0, 0.15),
    "--brand-primary-deep": mix(brand, 0, 0.35),
    "--brand-primary-soft": mix(brand, 255, 0.92),
    "--brand-accent": accent,
    "--brand-bg": ground,
  };
}

export function festivalStyle(pack: FestivalPack | null): CSSProperties {
  return (pack ? festivalVars(pack) : {}) as CSSProperties;
}

/**
 * Inline script for the ?festival preview. Layouts don't get searchParams, so this sets the
 * CSS variables and favicon before first paint. The real festival is themed on the server.
 */
export function previewScript(): string {
  const map: Record<string, { vars: Record<string, string>; icon: string }> = {};
  for (const p of Object.values(FESTIVAL_PACKS)) {
    map[p.id] = { vars: festivalVars(p), icon: p.favicon };
  }
  return (
    `(function(){try{var m=${JSON.stringify(map)};` +
    `var p=new URLSearchParams(location.search).get("festival");` +
    `if(!p||!Object.prototype.hasOwnProperty.call(m,p))return;var e=m[p];` +
    `for(var k in e.vars)document.documentElement.style.setProperty(k,e.vars[k]);` +
    `document.querySelectorAll('link[rel~="icon"]').forEach(function(l){l.href=e.icon});` +
    `}catch(_){}})();`
  );
}
