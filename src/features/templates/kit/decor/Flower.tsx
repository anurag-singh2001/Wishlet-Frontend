"use client";
import { motion } from "framer-motion";
import { type DecorProps, useDecorMotion } from "./motion";

interface FlowerProps extends DecorProps {
  colors?: [string, string];
}

export function Flower({
  className,
  size = 80,
  animate,
  colors = ["#f9a8d4", "#facc15"],
}: FlowerProps): React.JSX.Element {
  const motionProps = useDecorMotion(animate);
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...motionProps}
    >
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse
          key={r}
          cx="50"
          cy="28"
          rx="15"
          ry="24"
          fill={colors[0]}
          transform={`rotate(${r} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="11" fill={colors[1]} />
    </motion.svg>
  );
}
