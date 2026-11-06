"use client";

import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { iconAliasFor, syncAppIcon } from "@/lib/native/app-icon";
import { useSiteConfig } from "@/features/site-config/hooks/use-site-config";

/**
 * Android app only: swaps the launcher icon to the live festival's when the app goes to the
 * background (switching while foregrounded can close the app on some launchers). Ignores the
 * ?festival preview. Renders nothing; no-op on the web.
 */
export function AppIconSync(): null {
  const { activeFestival, isFallback } = useSiteConfig();
  // Fallback config means the API hasn't answered: keep whatever icon is set.
  const desired = useRef<string | null>(null);
  useEffect(() => {
    desired.current = isFallback ? null : iconAliasFor(activeFestival);
  }, [activeFestival, isFallback]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform() || window.self !== window.top) return;
    let cancelled = false;
    let remove: (() => void) | undefined;
    void import("@capacitor/app")
      .then(async ({ App }) => {
        const handle = await App.addListener("appStateChange", ({ isActive }) => {
          if (!isActive && desired.current) void syncAppIcon(desired.current);
        });
        if (cancelled) void handle.remove();
        else remove = () => void handle.remove();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      remove?.();
    };
  }, []);
  return null;
}
