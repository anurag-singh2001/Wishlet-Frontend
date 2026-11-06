"use client";
import React from "react";
import { motion } from "framer-motion";
import { WishPhoto } from "../components/WishPhoto";

// Deterministic snowflakes (no Math.random, so server and client markup match).
const FLAKES = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37) % 100,
  size: 2 + (i % 4),
  dur: 9 + (i % 5) * 2,
  delay: (i * 0.7) % 8,
  drift: i % 2 ? 14 : -14,
}));

/** Full-screen snowfall; a light static dusting under reduced motion. */
export function Snowfall({ reduced }: { reduced: boolean }): React.JSX.Element {
  return (
    <>
      {FLAKES.map((f, i) =>
        reduced ? (
          <span
            key={i}
            className="absolute rounded-full bg-white/60"
            style={{ left: `${f.x}%`, top: `${(i * 53) % 100}%`, width: f.size, height: f.size }}
          />
        ) : (
          <motion.span
            key={i}
            className="absolute -top-2 rounded-full bg-white/80"
            style={{ left: `${f.x}%`, width: f.size, height: f.size }}
            animate={{ y: ["0vh", "105vh"], x: [0, f.drift, 0] }}
            transition={{ duration: f.dur, repeat: Infinity, ease: "linear", delay: f.delay }}
          />
        ),
      )}
    </>
  );
}

/** A simple layered pine with a gold star and a few baubles. */
export function PineTree({ size }: { size: number }): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 12 L74 46 H26 Z" fill="#2F7A4E" />
      <path d="M50 28 L80 66 H20 Z" fill="#256A42" />
      <path d="M50 46 L86 86 H14 Z" fill="#1D5A37" />
      <rect x="45" y="86" width="10" height="9" rx="1.5" fill="#7A4A2A" />
      <path
        d="M50 3 l2.6 5.4 5.9.8-4.3 4.1 1 5.8L50 16.4l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"
        fill="#E9B949"
      />
      <circle cx="40" cy="42" r="3" fill="#E33A4F" />
      <circle cx="60" cy="58" r="3" fill="#E9B949" />
      <circle cx="36" cy="74" r="3" fill="#5AA9E6" />
      <circle cx="64" cy="78" r="3" fill="#E33A4F" />
    </svg>
  );
}

interface GlobeProps {
  photoUrl: string | null;
  reduced: boolean;
}

/** Glass snow globe on a gold base; the photo (or a pine) sits inside with swirling snow. */
export function SnowGlobe({ photoUrl, reduced }: GlobeProps): React.JSX.Element {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="relative h-[200px] w-[200px] overflow-hidden rounded-full border-2 border-white/40 bg-[radial-gradient(circle_at_50%_35%,#2b5d78_0%,#123247_70%)] shadow-[0_0_50px_rgba(173,216,230,0.35),inset_0_-12px_30px_rgba(0,0,0,0.35)]"
        animate={reduced ? undefined : { rotate: [0, -2, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 flex items-center justify-center pb-6">
          {photoUrl ? (
            <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#E9B949]">
              <WishPhoto src={photoUrl} alt="A festive memory" className="h-full w-full" />
            </div>
          ) : (
            <PineTree size={120} />
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 rounded-[50%_50%_0_0] bg-white/90" />
        {FLAKES.slice(0, 14).map((f, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${10 + ((f.x * 0.8) % 80)}%`,
              top: `${(i * 29) % 70}%`,
              width: 3,
              height: 3,
            }}
            animate={reduced ? undefined : { y: [0, 40, 0], opacity: [0.9, 0.4, 0.9] }}
            transition={{
              duration: f.dur / 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: f.delay / 2,
            }}
          />
        ))}
        <div className="absolute left-8 top-6 h-14 w-6 -rotate-[25deg] rounded-full bg-white/25 blur-[2px]" />
      </motion.div>
      <div className="-mt-3 h-10 w-[170px] rounded-b-2xl rounded-t-md bg-[linear-gradient(180deg,#f2cf6b_0%,#b9862b_100%)] shadow-[0_8px_20px_rgba(0,0,0,0.35)]" />
    </div>
  );
}
