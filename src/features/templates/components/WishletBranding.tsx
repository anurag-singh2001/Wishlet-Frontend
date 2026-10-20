import React from "react";
import Link from "next/link";

export type BrandingTheme = "rose" | "sky" | "emerald" | "slate" | "neutral" | "night" | "gold";

interface WishletBrandingProps {
  /** Visual theme: should match the template's color palette */
  theme?: BrandingTheme;
  /** Additional CSS class names for the outer wrapper */
  className?: string;
}

// Colours are picked for >=4.5:1 on each theme's background.
// "night" and "gold" are for templates on dark backgrounds.
const themeStyles: Record<BrandingTheme, { muted: string; accent: string; cta: string }> = {
  rose: { muted: "text-slate-600", accent: "text-rose-900", cta: "text-rose-800" },
  sky: { muted: "text-slate-600", accent: "text-sky-800", cta: "text-sky-800" },
  emerald: { muted: "text-slate-600", accent: "text-emerald-800", cta: "text-emerald-800" },
  slate: { muted: "text-slate-600", accent: "text-slate-800", cta: "text-slate-800" },
  neutral: { muted: "text-slate-600", accent: "text-slate-800", cta: "text-slate-800" },
  night: { muted: "text-slate-300", accent: "text-white", cta: "text-white" },
  gold: { muted: "text-amber-100", accent: "text-amber-200", cta: "text-amber-200" },
};

/**
 * Readable Wishlet footer + viral CTA shown at the bottom of every public Wishlet.
 *
 * Usage inside a template:
 *   <WishletBranding theme="rose" />
 */
export function WishletBranding({
  theme = "neutral",
  className = "",
}: WishletBrandingProps): React.ReactElement {
  const styles = themeStyles[theme];

  return (
    <footer className={`flex justify-center px-4 py-3 ${className}`}>
      <Link
        href="/"
        className={`inline-flex min-h-11 items-center rounded-full px-3 text-xs font-medium tracking-wide ${styles.muted} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current`}
      >
        <span>
          Made with <span className={`font-bold ${styles.accent}`}>Wishlet</span> &middot;{" "}
          <span className={`font-semibold underline underline-offset-2 ${styles.cta}`}>
            Make one for a friend
          </span>
        </span>
      </Link>
    </footer>
  );
}
