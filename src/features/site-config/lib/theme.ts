import type { CSSProperties } from "react";
import { DEFAULT_BRANDING } from "./branding-defaults";
import type { Branding } from "../types";

const HEX = /^#[0-9a-f]{6}$/i;

function mix(hex: string, target: number, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(c + (target - c) * amount),
  );
  return `#${ch.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

/** CSS variables that override the brand tokens; only values that differ from the defaults. */
export function themeVars(branding: Branding): CSSProperties {
  const { primary, accent, bg } = branding.colors;
  const d = DEFAULT_BRANDING.colors;
  const vars: Record<string, string> = {};
  if (HEX.test(primary) && primary.toLowerCase() !== d.primary) {
    vars["--brand-primary"] = primary;
    vars["--brand-primary-hover"] = mix(primary, 0, 0.15);
    vars["--brand-primary-deep"] = mix(primary, 0, 0.35);
    vars["--brand-primary-soft"] = mix(primary, 255, 0.92);
  }
  if (HEX.test(accent) && accent.toLowerCase() !== d.accent) vars["--brand-accent"] = accent;
  if (HEX.test(bg) && bg.toLowerCase() !== d.bg) vars["--brand-bg"] = bg;
  return vars as CSSProperties;
}
