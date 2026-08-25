import React from "react";
import Link from "next/link";

export type BrandingTheme = "rose" | "sky" | "emerald" | "slate" | "neutral";

interface WishletBrandingProps {
  /** Visual theme — should match the template's color palette */
  theme?: BrandingTheme;
  /** Additional CSS class names for the outer wrapper */
  className?: string;
}

const themeStyles: Record<BrandingTheme, { accent: string; cta: string }> = {
  rose:    { accent: "text-rose-900",    cta: "text-rose-400 hover:text-rose-600" },
  sky:     { accent: "text-sky-600",     cta: "text-sky-400 hover:text-sky-600" },
  emerald: { accent: "text-emerald-700", cta: "text-emerald-400 hover:text-emerald-600" },
  slate:   { accent: "text-slate-700",   cta: "text-slate-400 hover:text-slate-600" },
  neutral: { accent: "text-slate-600",   cta: "text-slate-400 hover:text-slate-500" },
};

/**
 * Subtle Wishlet branding + viral CTA shown at the bottom of every
 * public Wishlet. Themes allow it to blend with each template's
 * visual identity.
 *
 * Usage inside a template:
 *   <WishletBranding theme="rose" />
 */
export function WishletBranding({ theme = "neutral", className = "" }: WishletBrandingProps) {
  const styles = themeStyles[theme];

  return (
    <div className={`flex flex-col items-center gap-2 opacity-50 hover:opacity-80 transition-opacity duration-300 ${className}`}>
      <p className="text-xs text-slate-500 font-medium tracking-wide">
        Made with ✨ <span className={`font-bold ${styles.accent}`}>Wishlet</span>
      </p>
      <Link
        href="/"
        className={`text-xs font-semibold tracking-wide ${styles.cta} transition-colors duration-200`}
      >
        Create yours →
      </Link>
    </div>
  );
}
