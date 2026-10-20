"use client";

import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ConfettiBurst } from "@/features/templates/components/animations/ConfettiBurst";
import { setStatusBar } from "@/lib/native/status-bar";

const FLAG = "wishlet:intro-shown";
const SAFETY_MS = 4000;
const SHOW_MS = 1500;
const COLORS = ["#FFC94A", "#FF7A59", "#FDA4CF", "#7EE2A8", "#FFFFFF"];

const NATIVE_CSS = `html.native-app{overscroll-behavior-y:none}
html.native-app body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
html.native-app input,html.native-app textarea,html.native-app [contenteditable],html.native-app [data-selectable]{-webkit-user-select:text;user-select:text}`;

async function hideSplash(): Promise<void> {
  try {
    const { SplashScreen } = await import("@capacitor/splash-screen");
    await SplashScreen.hide();
  } catch {
    // plugin unavailable
  }
}

function alreadyShown(): boolean {
  try {
    return sessionStorage.getItem(FLAG) === "1";
  } catch {
    return false;
  }
}

function markShown(): void {
  try {
    sessionStorage.setItem(FLAG, "1");
  } catch {
    // storage unavailable
  }
}

/**
 * Android app only: tags <html> for native polish, hides the native splash and plays a short
 * intro once per cold start. Renders nothing on the web.
 */
export function AppIntro(): React.JSX.Element | null {
  const reduced = useReducedMotion();
  const [native, setNative] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Previews render the app in iframes; only the top-level window plays the intro.
    if (!Capacitor.isNativePlatform() || window.self !== window.top) return;
    document.documentElement.classList.add("native-app");
    void setStatusBar("LIGHT");
    const skip = alreadyShown() || reduced === true;
    markShown();
    // Platform is only known on the client, after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNative(true);
    void hideSplash();
    if (skip) return;
    setPlaying(true);
    const end = window.setTimeout(() => setPlaying(false), SHOW_MS);
    const safety = window.setTimeout(() => {
      setPlaying(false);
      void hideSplash();
    }, SAFETY_MS);
    return () => {
      window.clearTimeout(end);
      window.clearTimeout(safety);
    };
  }, [reduced]);

  if (!native) return null;
  return (
    <>
      <style>{NATIVE_CSS}</style>
      <AnimatePresence>
        {playing && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 overflow-hidden bg-brand"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <motion.svg
              width="112"
              height="112"
              viewBox="0 0 24 24"
              initial={{ scale: 0.2, rotate: -120, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <path
                d="M12 1c.5 6 4.5 10.5 11 11-6.5.5-10.5 5-11 11-.5-6-4.5-10.5-11-11 6.5-.5 10.5-5 11-11z"
                fill="#fff"
              />
            </motion.svg>
            <motion.span
              className="font-display text-5xl font-extrabold tracking-tight text-white"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
            >
              Wishlet
            </motion.span>
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.01 }}
            >
              <ConfettiBurst count={44} colors={COLORS} origin={{ x: 50, y: 45 }} spread={220} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
