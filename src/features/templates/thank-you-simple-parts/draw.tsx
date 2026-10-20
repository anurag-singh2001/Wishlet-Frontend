"use client";
import { motion, useReducedMotion } from "framer-motion";

const INK = "#b4532a";

interface DrawProps {
  delay?: number;
  className?: string;
}

function useDraw(delay: number, duration: number): object {
  const reduced = useReducedMotion();
  if (reduced) return { initial: false };
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration, delay, ease: "easeInOut" },
  };
}

/** Hand-drawn underline that draws itself in (static when motion is reduced). */
export function DrawUnderline({ delay = 0.6, className }: DrawProps): React.JSX.Element {
  const draw = useDraw(delay, 1);
  return (
    <svg viewBox="0 0 200 20" className={className} aria-hidden="true" focusable="false">
      <motion.path
        d="M4 12C40 4 70 16 105 9s60-4 91 2"
        stroke={INK}
        strokeWidth={3.5}
        strokeLinecap="round"
        fill="none"
        {...draw}
      />
    </svg>
  );
}

/** Outline heart scribbled in with a pen stroke. */
export function DrawHeart({ delay = 0.4, className }: DrawProps): React.JSX.Element {
  const draw = useDraw(delay, 1.4);
  return (
    <svg viewBox="0 0 100 90" className={className} aria-hidden="true" focusable="false">
      <motion.path
        d="M50 85C10 55 2 35 12 18 22 4 42 6 50 24 58 6 78 4 88 18c10 17 2 37-38 67z"
        stroke="#e11d48"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        {...draw}
      />
    </svg>
  );
}
