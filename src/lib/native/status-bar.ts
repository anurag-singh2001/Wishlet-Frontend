import { Capacitor } from "@capacitor/core";

const DEFAULT_COLOR = "#4F46E5";
let festivalColor: string | null = null;
let lastStyle: "LIGHT" | "DARK" = "LIGHT";

/** Android app only: set the status bar icon style and colour. No-op on the web. */
export async function setStatusBar(
  style: "LIGHT" | "DARK",
  color: string = DEFAULT_COLOR,
): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  lastStyle = style;
  // A live festival's colour wins over the default, whichever call runs first.
  const applied = color === DEFAULT_COLOR && festivalColor ? festivalColor : color;
  try {
    const { StatusBar, Style } = await import("@capacitor/status-bar");
    await StatusBar.setStyle({ style: style === "LIGHT" ? Style.Dark : Style.Light });
    await StatusBar.setBackgroundColor({ color: applied });
  } catch {
    // plugin unavailable
  }
}

/** Tint the status bar for the active festival (null restores the default). No-op on the web. */
export async function setFestivalStatusBar(color: string | null): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  festivalColor = color;
  await setStatusBar(lastStyle);
}
