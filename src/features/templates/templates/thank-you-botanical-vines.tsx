"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Flower } from "../kit/decor";

const STROKE = "#7c9a82";
const LEAVES: Array<[number, number, number]> = [
  [34, 150, -40],
  [60, 110, 30],
  [30, 70, -35],
  [58, 34, 35],
];

/** Vine that draws itself and grows leaves and a flower. `flip` mirrors it. */
export function Vine({ flip, delay = 0 }: { flip?: boolean; delay?: number }): React.JSX.Element {
  const reduced = useReducedMotion();
  const grow = (d: number): object =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 2.2, delay: delay + d, ease: "easeInOut" },
        };
  return (
    <div
      className="absolute top-0 w-24 sm:w-32 pointer-events-none"
      style={flip ? { right: 0, transform: "scaleX(-1)" } : { left: 0 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 90 200" className="w-full h-auto" fill="none">
        <motion.path
          d="M20 0C50 40 10 80 45 120S30 170 40 200"
          stroke={STROKE}
          strokeWidth="2.5"
          strokeLinecap="round"
          {...grow(0)}
        />
        {LEAVES.map(([x, y, r], i) => (
          <motion.ellipse
            key={i}
            cx={x}
            cy={y}
            rx="14"
            ry="6"
            fill="#a8c3a9"
            transform={`rotate(${r} ${x} ${y})`}
            style={{ transformOrigin: `${x}px ${y}px` }}
            {...(reduced
              ? {}
              : {
                  initial: { scale: 0, opacity: 0 },
                  animate: { scale: 1, opacity: 0.9 },
                  transition: { duration: 0.8, delay: delay + 0.8 + i * 0.35 },
                })}
          />
        ))}
      </svg>
      <Flower
        size={44}
        animate
        colors={["#f6d5c8", "#e9b96e"]}
        className="absolute -bottom-3 left-6"
      />
    </div>
  );
}
