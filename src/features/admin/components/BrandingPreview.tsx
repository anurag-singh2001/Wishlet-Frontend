import React from "react";
import type { Branding } from "@/features/site-config/types";

/** Live swatch of the chosen colors (independent of the currently applied theme). */
export function BrandingPreview({ branding }: { branding: Branding }): React.ReactElement {
  const { primary, accent, bg } = branding.colors;
  return (
    <div
      aria-label="Color preview"
      className="flex flex-wrap items-center gap-3 rounded-card border border-hairline p-4"
      style={{ background: bg }}
    >
      <span
        className="rounded-control px-5 py-3 text-[15px] font-bold text-white"
        style={{ background: primary }}
      >
        {branding.appName || "App"} button
      </span>
      <span
        className="rounded-full px-3 py-1 text-[13px] font-semibold text-ink"
        style={{ background: accent }}
      >
        Accent
      </span>
    </div>
  );
}
