"use client";
import React from "react";
import { motion } from "framer-motion";

const GOLD = "#f5c04a";
const MARIGOLD = "#ff9f1c";

/** Clay lamp with a flickering flame and a warm halo. */
export function Diya({
  size = 64,
  delay = 0,
  reduced = false,
}: {
  size?: number;
  delay?: number;
  reduced?: boolean;
}): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="diya-glow">
          <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="24" r="22" fill="url(#diya-glow)" />
      <motion.path
        d="M32 6c5 7 7 11 7 15a7 7 0 0 1-14 0c0-4 2-8 7-15z"
        fill={MARIGOLD}
        style={{ transformOrigin: "32px 28px" }}
        animate={reduced ? undefined : { scaleY: [1, 1.15, 0.95, 1], opacity: [1, 0.85, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, delay, ease: "easeInOut" }}
      />
      <path d="M32 14c2.5 4 3.5 6 3.5 8a3.5 3.5 0 0 1-7 0c0-2 1-4 3.5-8z" fill="#fff4b8" />
      <path d="M6 34h52c-3 12-13 20-26 20S9 46 6 34z" fill="#b5532a" />
      <path d="M6 34h52c-1 3-2 5-4 7H10c-2-2-3-4-4-7z" fill="#d9773f" />
      <path
        d="M18 44h28"
        stroke={GOLD}
        strokeWidth="2"
        strokeDasharray="2 4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Slowly turning rangoli that draws itself in. */
export function Rangoli({
  size = 220,
  reduced = false,
}: {
  size?: number;
  reduced?: boolean;
}): React.JSX.Element {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  const colors = ["#ff5d8f", MARIGOLD, GOLD, "#7b5cff"];
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      animate={reduced ? undefined : { rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
    >
      {petals.map((deg, i) => (
        <motion.path
          key={deg}
          d="M0 -20 C 22 -45, 18 -75, 0 -92 C -18 -75, -22 -45, 0 -20z"
          transform={`rotate(${deg})`}
          fill={colors[i % colors.length]}
          fillOpacity={0.22}
          stroke={colors[i % colors.length]}
          strokeWidth={2}
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2 + i * 0.12, ease: "easeOut" }}
        />
      ))}
      <circle r="18" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="3 5" />
      <circle r="7" fill={MARIGOLD} />
    </motion.svg>
  );
}

const BURSTS = [
  { x: "14%", y: "12%", color: GOLD, delay: 0.6 },
  { x: "82%", y: "8%", color: "#ff5d8f", delay: 2.1 },
  { x: "70%", y: "30%", color: "#9be7ff", delay: 3.4 },
  { x: "22%", y: "38%", color: MARIGOLD, delay: 4.6 },
];

/** Soft looping firework bursts in the sky. */
export function Fireworks({ reduced = false }: { reduced?: boolean }): React.JSX.Element | null {
  if (reduced) return null;
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <>
      {BURSTS.map((b) => (
        <motion.svg
          key={`${b.x}-${b.y}`}
          width="110"
          height="110"
          viewBox="-50 -50 100 100"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: b.x, top: b.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1.15], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, delay: b.delay, repeat: Infinity, repeatDelay: 4 }}
          aria-hidden="true"
        >
          {rays.map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <line
                x1="0"
                y1="-12"
                x2="0"
                y2="-40"
                stroke={b.color}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="0" cy="-45" r="2.5" fill={b.color} />
            </g>
          ))}
        </motion.svg>
      ))}
    </>
  );
}

const STARS = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 60}%`,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.4,
}));

/** Twinkling stars across the upper sky (deterministic positions, SSR-safe). */
export function Stars({ reduced = false }: { reduced?: boolean }): React.JSX.Element {
  return (
    <>
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#fff4dc]"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={reduced ? undefined : { opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.6, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </>
  );
}
