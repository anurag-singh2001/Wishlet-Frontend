"use client";
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Balloon } from "../kit/decor";
import { ConfettiBurst } from "../components/animations/ConfettiBurst";

export const NEON_COLORS = ["#ff2e97", "#22d3ee", "#a3ff12", "#b967ff", "#ffe600"];

const SPOTS = [
  { left: 8, top: 14, color: NEON_COLORS[0], size: 46, delay: 0 },
  { left: 90, top: 22, color: NEON_COLORS[1], size: 40, delay: 0.8 },
  { left: 10, top: 52, color: NEON_COLORS[2], size: 38, delay: 1.5 },
  { left: 90, top: 56, color: NEON_COLORS[3], size: 48, delay: 0.4 },
  { left: 91, top: 36, color: NEON_COLORS[4], size: 34, delay: 1.1 },
];

/** Floating neon balloons; tapping one pops it into confetti, then it floats back. */
export function NeonBalloons(): React.JSX.Element {
  const reduced = useReducedMotion();
  const [popped, setPopped] = useState<number[]>([]);
  const [burst, setBurst] = useState({ n: 0, x: 50, y: 50, color: NEON_COLORS[0] });

  const pop = (i: number): void => {
    const s = SPOTS[i];
    setPopped((p) => [...p, i]);
    setBurst((b) => ({ n: b.n + 1, x: s.left, y: s.top, color: s.color }));
    window.setTimeout(() => setPopped((p) => p.filter((v) => v !== i)), 3000);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {SPOTS.map((s, i) =>
        popped.includes(i) ? null : (
          <motion.button
            key={i}
            type="button"
            aria-label="Pop the balloon"
            onClick={() => pop(i)}
            className="pointer-events-auto absolute cursor-pointer p-1"
            style={{
              left: `calc(${s.left}% - ${s.size / 2}px)`,
              top: `calc(${s.top}% - ${s.size * 0.8}px)`,
              filter: `drop-shadow(0 0 10px ${s.color})`,
            }}
            animate={reduced ? {} : { y: [0, -16, 0], rotate: [-4, 4, -4] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            }}
            whileTap={{ scale: 1.2 }}
          >
            <Balloon size={s.size} color={s.color} />
          </motion.button>
        ),
      )}
      {burst.n > 0 && (
        <ConfettiBurst
          count={36}
          colors={[burst.color, ...NEON_COLORS]}
          origin={{ x: burst.x, y: burst.y }}
          trigger={burst.n}
          spread={200}
        />
      )}
    </div>
  );
}
