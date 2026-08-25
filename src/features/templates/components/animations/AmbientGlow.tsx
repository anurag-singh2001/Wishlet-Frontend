import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AmbientGlowProps {
  color1?: string;
  color2?: string;
  opacity?: number;
}

export function AmbientGlow({
  color1 = "#fecdd3", // rose-200 default
  color2 = "#e0e7ff", // indigo-200 default
  opacity = 0.4,
}: AmbientGlowProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity }}>
      <motion.div
        animate={{
          x: ["0%", "5%", "-5%", "0%"],
          y: ["0%", "-5%", "5%", "0%"],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full filter blur-[80px] opacity-60"
        style={{ backgroundColor: color1 }}
      />
      <motion.div
        animate={{
          x: ["0%", "-5%", "5%", "0%"],
          y: ["0%", "5%", "-5%", "0%"],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full filter blur-[80px] opacity-60"
        style={{ backgroundColor: color2 }}
      />
    </div>
  );
}
