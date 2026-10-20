import type { CSSProperties } from "react";

/** Stages: 0 background/photo, 1 title, 2 name, 3 message, 4 sender. Undefined = all visible. */
export function stage(reveal: number | undefined, n: number): CSSProperties {
  return reveal === undefined || reveal >= n ? {} : { opacity: 0 };
}
