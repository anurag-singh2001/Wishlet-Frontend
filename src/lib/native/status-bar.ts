import { Capacitor } from "@capacitor/core";

/** Android app only: set the status bar icon style and colour. No-op on the web. */
export async function setStatusBar(
  style: "LIGHT" | "DARK",
  color: string = "#4F46E5",
): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { StatusBar, Style } = await import("@capacitor/status-bar");
    await StatusBar.setStyle({ style: style === "LIGHT" ? Style.Dark : Style.Light });
    await StatusBar.setBackgroundColor({ color });
  } catch {
    // plugin unavailable
  }
}
