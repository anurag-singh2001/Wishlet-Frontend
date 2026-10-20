"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

/**
 * Android app only: the hardware back button goes back in the site's history,
 * and closes the app from the first page. Renders nothing; no-op on the web.
 */
export function NativeBackButton(): null {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let cancelled = false;
    let remove: (() => void) | undefined;
    void import("@capacitor/app").then(async ({ App }) => {
      const handle = await App.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack) window.history.back();
        else void App.exitApp();
      });
      if (cancelled) void handle.remove();
      else remove = () => void handle.remove();
    });
    return () => {
      cancelled = true;
      remove?.();
    };
  }, []);
  return null;
}
