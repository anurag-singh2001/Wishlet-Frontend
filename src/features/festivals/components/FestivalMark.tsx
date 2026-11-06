"use client";

import { DiwaliMark } from "../packs/diwali-mark";
import { useActiveFestival } from "./FestivalProvider";

/** Festive variant of the Wishlet mark, or null when no festival is active. */
export function FestivalMark({
  size,
  onDark = false,
}: {
  size: number;
  onDark?: boolean;
}): React.JSX.Element | null {
  const pack = useActiveFestival();
  if (pack?.id === "diwali") return <DiwaliMark size={size} onDark={onDark} />;
  return null;
}
