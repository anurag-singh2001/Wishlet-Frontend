"use client";
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Deterministic pseudo-random in [0,1) so render stays pure. */
function rand(i: number, k: number): number {
  const x = Math.sin((i + 1) * 12.9898 + (k + 1) * 78.233 + 0.5) * 43758.5453;
  return x - Math.floor(x);
}

interface ConfettiBurstProps {
  count?: number;
  colors?: string[];
  /** Origin as percentages of the container. */
  origin?: { x: number; y: number };
  /** Change this value to re-fire the burst. */
  trigger?: unknown;
  spread?: number;
}

export function ConfettiBurst({
  count = 40,
  colors = ["#f43f5e", "#facc15", "#38bdf8", "#a78bfa"],
  origin = { x: 50, y: 50 },
  trigger = 0,
  spread = 260,
}: ConfettiBurstProps): React.JSX.Element | null {
  const prefersReducedMotion = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        let k = 0;
        const angle = rand(i, k++) * Math.PI * 2;
        const dist = spread * (0.4 + rand(i, k++) * 0.6);
        return {
          id: i,
          color: colors[i % colors.length],
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 40,
          rotate: rand(i, k++) * 720 - 360,
          // Whole pixels: fractional sizes serialize differently on server and client (hydration warning).
          w: Math.round(6 + rand(i, k++) * 6),
          h: Math.round(4 + rand(i, k++) * 6),
          duration: 1.1 + rand(i, k++) * 0.9,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, spread, trigger],
  );

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={`${String(trigger)}-${p.id}`}
          className="absolute block rounded-[1px]"
          style={{
            left: `${origin.x}%`,
            top: `${origin.y}%`,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 160], opacity: [1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
