"use client";
import React, { useState } from "react";
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
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return <></>;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent motion-safe:animate-pulse"
        />
      )}
      <motion.img
        src={src}
        alt={alt}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
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
