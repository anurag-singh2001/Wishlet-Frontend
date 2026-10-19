"use client";
import { useReducedMotion } from "framer-motion";

/** Shared props for decor SVGs. Static when `animate` is off or motion is reduced. */
export function useDecorMotion(animate: boolean | undefined): object {
  const reduced = useReducedMotion();
  if (!animate || reduced) return {};
  return {
    initial: { opacity: 0, scale: 0.8, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };
}

export interface DecorProps {
  className?: string;
  size?: number;
  animate?: boolean;
}
