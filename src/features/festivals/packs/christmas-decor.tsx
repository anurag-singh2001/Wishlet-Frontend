"use client";

import { motion, useReducedMotion } from "framer-motion";

// String-light bulbs along a sagging wire: x (%), drop below the top (px), colour, twinkle phase (s).
const BULBS = [
  { x: 5, y: 14, color: "#E33A4F", delay: 0 },
  { x: 16, y: 26, color: "#E9B949", delay: 0.6 },
  { x: 28, y: 33, color: "#3FA36B", delay: 1.2 },
  { x: 40, y: 35, color: "#5AA9E6", delay: 0.3 },
  { x: 52, y: 33, color: "#E33A4F", delay: 0.9 },
  { x: 64, y: 28, color: "#E9B949", delay: 1.5 },
  { x: 76, y: 20, color: "#3FA36B", delay: 0.4 },
  { x: 88, y: 12, color: "#5AA9E6", delay: 1.1 },
];

// Falling snowflakes: x (%), size (px), fall duration (s), start delay (s).
const FLAKES = [
  { x: 8, size: 6, dur: 9, delay: 0 },
  { x: 21, size: 4, dur: 11, delay: 2 },
  { x: 34, size: 5, dur: 8, delay: 4 },
  { x: 47, size: 3, dur: 12, delay: 1 },
  { x: 59, size: 6, dur: 10, delay: 3 },
  { x: 71, size: 4, dur: 9, delay: 5 },
  { x: 83, size: 5, dur: 11, delay: 0.5 },
  { x: 94, size: 3, dur: 10, delay: 2.5 },
];

/** Twinkling string lights along the top and gentle snowfall. Static under prefers-reduced-motion. */
export default function ChristmasDecor(): React.JSX.Element {
  const reduce = useReducedMotion() === true;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-x-0 top-0 h-12 w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <path
          d="M0 6 Q50 46 100 4"
          fill="none"
          stroke="#2E4A3C"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {BULBS.map((b) => (
        <motion.span
          key={b.x}
          className="absolute h-3 w-2 -translate-x-1/2 rounded-b-full rounded-t-[40%]"
          style={{
            left: `${b.x}%`,
            top: b.y,
            background: b.color,
            boxShadow: `0 0 10px 2px ${b.color}`,
          }}
          animate={reduce ? undefined : { opacity: [1, 0.45, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        />
      ))}
      {!reduce &&
        FLAKES.map((f) => (
          <motion.span
            key={f.x}
            className="absolute top-0 rounded-full bg-white/80"
            style={{ left: `${f.x}%`, width: f.size, height: f.size }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 420, opacity: [0, 1, 1, 0], x: [0, 8, -6, 4] }}
            transition={{ duration: f.dur, repeat: Infinity, ease: "linear", delay: f.delay }}
          />
        ))}
    </div>
  );
}
