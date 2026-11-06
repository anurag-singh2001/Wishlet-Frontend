"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { useActiveFestival } from "./FestivalProvider";

// One lazy chunk per pack; nothing loads when no festival is active.
const DECOR: Record<string, ComponentType> = {
  diwali: dynamic(() => import("../packs/diwali-decor")),
};

/** Decorative overlay for the active festival; place inside a `relative overflow-hidden` box. */
export function FestivalDecor(): React.JSX.Element | null {
  const pack = useActiveFestival();
  const Decor = pack ? DECOR[pack.id] : undefined;
  return Decor ? <Decor /> : null;
}
