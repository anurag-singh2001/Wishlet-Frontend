"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface EnvelopeProps {
  opening: boolean;
  onOpen: () => void;
}

const FLAP = "M0 0H320L160 130Z";

/** Paper-texture envelope with a tappable wax seal. Inline SVG only. */
export function Envelope({ opening, onOpen }: EnvelopeProps): React.JSX.Element {
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={opening}
      aria-label="Open your birthday wish"
      className="relative block w-full max-w-[320px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-md"
    >
      <motion.svg
        viewBox="-10 -10 340 250"
        className="w-full overflow-visible drop-shadow-[0_18px_28px_rgba(120,53,15,0.22)]"
        aria-hidden="true"
        animate={reduce || opening ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <filter id="bm-paper" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
            <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.12 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <linearGradient id="bm-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fffaf0" />
            <stop offset="1" stopColor="#f6e9d3" />
          </linearGradient>
          <radialGradient id="bm-wax" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#fb7185" />
            <stop offset="1" stopColor="#9f1239" />
          </radialGradient>
        </defs>
        <rect width="320" height="220" rx="6" fill="url(#bm-body)" />
        <rect width="320" height="220" rx="6" fill="#fff" filter="url(#bm-paper)" />
        <path d="M0 220L130 105M320 220L190 105" stroke="#e7d3b3" strokeWidth="1.5" />
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
          animate={{ scaleY: opening && !reduce ? -1 : 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <path d={FLAP} fill="#fbf0dc" stroke="#e7d3b3" strokeWidth="1.5" />
          <path d={FLAP} fill="#fff" filter="url(#bm-paper)" />
        </motion.g>
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          animate={
            opening
              ? { scale: [1, 1.25, 0], opacity: [1, 1, 0], rotate: [0, -8, 20] }
              : reduce
                ? undefined
                : { scale: [1, 1.07, 1] }
          }
          transition={
            opening ? { duration: 0.5 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <circle cx="160" cy="128" r="26" fill="url(#bm-wax)" />
          <circle cx="160" cy="128" r="19" fill="none" stroke="#fda4af" strokeOpacity="0.55" />
          <path
            d="M160 140c-9-7-12-11-12-16a6.5 6.5 0 0 1 12-3 6.5 6.5 0 0 1 12 3c0 5-3 9-12 16Z"
            fill="#fecdd3"
            fillOpacity="0.85"
          />
        </motion.g>
      </motion.svg>
    </button>
  );
}
