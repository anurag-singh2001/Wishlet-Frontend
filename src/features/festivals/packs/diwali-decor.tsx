"use client";

import { motion, useReducedMotion } from "framer-motion";

// Hanging diyas: x position (%), string length (px), size (px), flicker phase (s).
const DIYAS = [
  { x: 6, len: 46, size: 34, delay: 0 },
  { x: 22, len: 84, size: 28, delay: 0.5 },
  { x: 40, len: 38, size: 24, delay: 1.1 },
  { x: 61, len: 92, size: 30, delay: 0.3 },
  { x: 78, len: 54, size: 36, delay: 0.8 },
  { x: 93, len: 78, size: 26, delay: 1.4 },
];

interface DiyaProps {
  size: number;
  flicker: boolean;
  delay: number;
}

function Diya({ size, flicker, delay }: DiyaProps): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <radialGradient id="diya-glow">
          <stop offset="0" stopColor="#FFC95C" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFC95C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diya-bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD56B" />
          <stop offset="1" stopColor="#C77B12" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="13" r="13" fill="url(#diya-glow)" />
      <motion.g
        style={{ transformOrigin: "20px 20px" }}
        animate={
          flicker
            ? { scaleY: [1, 1.14, 0.94, 1.08, 1], scaleX: [1, 0.92, 1.04, 0.96, 1] }
            : undefined
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <path d="M20 4c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z" fill="#FFB02E" />
        <path
          d="M20 9c1.6 2.2 2.4 3.6 2.4 5a2.4 2.4 0 0 1-4.8 0c0-1.4.8-2.8 2.4-5z"
          fill="#FFF0B0"
        />
      </motion.g>
      <path d="M3 20h34c-1 8-7 13-17 13S4 28 3 20z" fill="url(#diya-bowl)" />
      <path d="M8 23h24" stroke="#8E4A06" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}

/** Soft-flickering diyas hanging from the top edge. Static under prefers-reduced-motion. */
export default function DiwaliDecor(): React.JSX.Element {
  const reduce = useReducedMotion() === true;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 md:h-40">
      {DIYAS.map((d, i) => (
        <div
          key={d.x}
          className={`absolute top-0 flex -translate-x-1/2 flex-col items-center ${i % 2 ? "max-md:hidden" : ""}`}
          style={{ left: `${d.x}%` }}
        >
          <span
            className="w-px bg-gradient-to-b from-transparent to-[#F5C46B]/80"
            style={{ height: d.len }}
          />
          <Diya size={d.size} flicker={!reduce} delay={d.delay} />
        </div>
      ))}
    </div>
  );
}
