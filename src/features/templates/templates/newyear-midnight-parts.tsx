"use client";
import React from "react";
import { motion } from "framer-motion";

// Deterministic champagne bubbles (no Math.random, so server and client markup match).
const BUBBLES = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 41) % 100,
  size: 4 + (i % 5) * 2,
  dur: 7 + (i % 4) * 2,
  delay: (i * 0.9) % 7,
}));

/** Golden bubbles rising from the bottom edge; a static scatter under reduced motion. */
export function Bubbles({ reduced }: { reduced: boolean }): React.JSX.Element {
  return (
    <>
      {BUBBLES.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-[#f5d77a]/60 bg-[#f5d77a]/10"
          style={{
            left: `${b.x}%`,
            width: b.size,
            height: b.size,
            ...(reduced ? { top: `${(i * 47) % 100}%` } : { bottom: -12 }),
          }}
          animate={reduced ? undefined : { y: ["0vh", "-105vh"], opacity: [0, 0.9, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeOut", delay: b.delay }}
        />
      ))}
    </>
  );
}

const RAYS = Array.from({ length: 16 }, (_, i) => (i * Math.PI * 2) / 16);

interface FireworkProps {
  x: string;
  y: string;
  r: number;
  color: string;
  delay: number;
  reduced: boolean;
}

/** One firework burst that blooms and fades on a loop. */
export function Firework({ x, y, r, color, delay, reduced }: FireworkProps): React.JSX.Element {
  const s = r * 2 + 8;
  return (
    <motion.svg
      width={s}
      height={s}
      viewBox={`${-r - 4} ${-r - 4} ${s} ${s}`}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
      initial={reduced ? { opacity: 0.45 } : { opacity: 0, scale: 0.2 }}
      animate={reduced ? undefined : { opacity: [0, 1, 0.7, 0], scale: [0.2, 1, 1.08, 1.12] }}
      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.4, delay }}
    >
      {RAYS.map((a) => (
        <line
          key={a}
          x1={Math.cos(a) * r * 0.3}
          y1={Math.sin(a) * r * 0.3}
          x2={Math.cos(a) * r}
          y2={Math.sin(a) * r}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </motion.svg>
  );
}

/** Two champagne flutes clinking, with a little spark where they meet. */
export function Flutes({ size }: { size: number }): React.JSX.Element {
  const glass = (
    <>
      <path d="M-11 0 h22 l-3 30 a8 8 0 0 1 -16 0 z" fill="#f5d77a" fillOpacity="0.9" />
      <path d="M-11 0 h22 l-1 10 h-20 z" fill="#fff" fillOpacity="0.85" />
      <path d="M0 38 v26 M-10 64 h20" stroke="#f5d77a" strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 120 100" aria-hidden="true">
      <g transform="translate(42 26) rotate(-14)">{glass}</g>
      <g transform="translate(78 26) rotate(14)">{glass}</g>
      <path
        d="M60 4v8M54 8l3 3M66 8l-3 3"
        stroke="#FF4F8B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
