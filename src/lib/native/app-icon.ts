import { Capacitor, registerPlugin } from "@capacitor/core";
import { getFestivalPack } from "@/features/festivals/registry";

interface AppIconPlugin {
  setIcon(options: { name: string }): Promise<void>;
  getIcon(): Promise<{ name: string }>;
}

const AppIcon = registerPlugin<AppIconPlugin>("AppIcon");

const DEFAULT_ICON = "Default";

// Wave-1 festival id -> launcher alias suffix, for festivals whose pack isn't built yet.
// A pack's own `appIconAlias` wins when it exists.
const WAVE1_ALIASES: Record<string, string> = {
  diwali: "Diwali",
  christmas: "Christmas",
  newyear: "Newyear",
  lohri: "Lohri",
  sankranti: "Sankranti",
  republicday: "Republicday",
  holi: "Holi",
  eid: "Eid",
};

/** Launcher alias suffix for the live festival ("Default" when none or unknown). */
export function iconAliasFor(festivalId: string | null | undefined): string {
  if (!festivalId) return DEFAULT_ICON;
  const pack = getFestivalPack(festivalId);
  if (pack) return pack.appIconAlias;
  return Object.prototype.hasOwnProperty.call(WAVE1_ALIASES, festivalId)
    ? WAVE1_ALIASES[festivalId]
    : DEFAULT_ICON;
}

/**
 * Android app only: switch the home-screen icon if it differs from `name`.
 * Safe on old APKs without the plugin (the call throws and is swallowed). No-op on the web.
 */
export async function syncAppIcon(name: string): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { name: current } = await AppIcon.getIcon();
    if (current !== name) await AppIcon.setIcon({ name });
  } catch {
    // plugin missing (old APK) or switch failed
  }
}
