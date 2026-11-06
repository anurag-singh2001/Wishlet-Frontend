"use client";

import { useEffect } from "react";
import { setFestivalStatusBar } from "@/lib/native/status-bar";
import { useActiveFestival } from "./FestivalProvider";

/** Android app only: tints the status bar with the festival colour. Renders nothing. */
export function FestivalStatusBar(): null {
  const color = useActiveFestival()?.colors.statusBar ?? null;
  useEffect(() => {
    void setFestivalStatusBar(color);
  }, [color]);
  return null;
}
