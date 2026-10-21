"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";

/**
 * Android app only: the marketing landing page (`/`) is the website's home, not the app's.
 * Every "home" link (close buttons, logo, footer, error pages) lands on `/`, so in the app
 * we swap it for the app home. `replace` keeps `/` out of history, so Back still works.
 */
export function NativeHomeRedirect(): null {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/" || !Capacitor.isNativePlatform() || window.self !== window.top) return;
    router.replace("/app");
  }, [pathname, router]);

  return null;
}
