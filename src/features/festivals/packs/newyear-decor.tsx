"use client";

import { motion, useReducedMotion } from "framer-motion";

// Firework bursts: x / y (%), radius (px), colour, start delay (s).
const BURSTS = [
  { x: 12, y: 22, r: 34, color: "#E8B931", delay: 0 },
  { x: 86, y: 16, r: 42, color: "#FF4F8B", delay: 1.4 },
  { x: 70, y: 70, r: 28, color: "#7DD3FC", delay: 2.6 },
  { x: 30, y: 78, r: 24, color: "#E8B931", delay: 3.8 },
];
const RAYS = Array.from({ length: 12 }, (_, i) => (i * Math.PI * 2) / 12);

function Burst({ r, color }: { r: number; color: string }): React.JSX.Element {
  const s = r * 2 + 8;
  return (
    <svg width={s} height={s} viewBox={`${-r - 4} ${-r - 4} ${s} ${s}`}>
      {RAYS.map((a) => (
        <line
          key={a}
          x1={Math.cos(a) * r * 0.35}
          y1={Math.sin(a) * r * 0.35}
          x2={Math.cos(a) * r}
          y2={Math.sin(a) * r}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      <circle r="2.5" fill="#fff" />
    </svg>
  );
}

/** Firework bursts that bloom and fade in turn (a top band on phones, the whole hero on desktop). */
export default function NewYearDecor(): React.JSX.Element {
  const reduce = useReducedMotion() === true;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden md:inset-0 md:h-auto"
    >
      {BURSTS.map((b, i) => (
        <motion.div
          key={b.x}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${i > 2 ? "max-md:hidden" : ""}`}
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
          initial={reduce ? { opacity: 0.5 } : { opacity: 0, scale: 0.2 }}
          animate={reduce ? undefined : { opacity: [0, 1, 0.8, 0], scale: [0.2, 1, 1.1, 1.15] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, delay: b.delay }}
        >
          <Burst r={b.r} color={b.color} />
        </motion.div>
      ))}
    </div>
  );
}
