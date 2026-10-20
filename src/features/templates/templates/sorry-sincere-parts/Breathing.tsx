import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Slow breathing halo behind the content (static when motion is reduced). */
export function Breathing(): React.JSX.Element {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[120vw] max-h-[720px] w-[120vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(186,196,235,0.55) 0%, rgba(205,196,236,0.28) 42%, transparent 70%)",
      }}
      initial={{ opacity: 0.6, scale: 1 }}
      animate={reduced ? undefined : { opacity: [0.5, 1, 0.5], scale: [0.92, 1.08, 0.92] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
