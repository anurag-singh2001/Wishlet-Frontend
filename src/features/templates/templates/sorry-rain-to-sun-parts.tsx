"use client";
import { motion, useReducedMotion } from "framer-motion";

const DROP_COUNT = 32;

/** Deterministic drop layout (no Math.random, so SSR and client match). */
const DROPS = Array.from({ length: DROP_COUNT }, (_, i) => ({
  left: ((i * 37) % 100) + (i % 3) * 0.7,
  height: 38 + ((i * 13) % 34),
  duration: 1.3 + ((i * 7) % 10) / 10,
  delay: ((i * 11) % 20) / 10,
}));

/** Grey-blue rainy sky that fades to a warm sunrise when `sunny` is true. */
export function SkyBackdrop({ sunny }: { sunny: boolean }): React.JSX.Element {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-[#64748b] via-[#94a3b8] to-[#cbd5e1]" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#fde4c8] via-[#fcd5b0] to-[#fbbf8e]"
        initial={false}
        animate={{ opacity: sunny ? 1 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
    </div>
  );
}

/** Thin falling streaks, transform and opacity only. Fades out when `visible` is false. */
export function Rain({ visible }: { visible: boolean }): React.JSX.Element | null {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 2.2, ease: "easeInOut" }}
    >
      {DROPS.map((d, i) => (
        <motion.span
          key={i}
          className="absolute top-0 w-px rounded-full bg-slate-100/60"
          style={{ left: `${d.left}%`, height: d.height }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: "105vh", opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </motion.div>
  );
}
