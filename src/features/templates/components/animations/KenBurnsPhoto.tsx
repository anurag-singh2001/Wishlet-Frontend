"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface KenBurnsPhotoProps {
  src: string;
  alt: string;
  className?: string;
  /** Seconds for one pan/zoom cycle. */
  duration?: number;
}

export function KenBurnsPhoto({
  src,
  alt,
  className = "",
  duration = 20,
}: KenBurnsPhotoProps): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.15, 1], x: ["0%", "-3%", "0%"], y: ["0%", "-2%", "0%"] }
        }
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
