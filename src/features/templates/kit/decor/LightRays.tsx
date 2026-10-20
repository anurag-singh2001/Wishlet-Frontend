"use client";
import { motion } from "framer-motion";
import { type DecorProps, useDecorMotion } from "./motion";

interface LightRaysProps extends DecorProps {
  color?: string;
  rays?: number;
}

export function LightRays({
  className,
  size = 400,
  animate,
  color = "#fde68a",
  rays = 12,
}: LightRaysProps): React.JSX.Element {
  const motionProps = useDecorMotion(animate);
  return (
    <motion.svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...motionProps}
    >
      {Array.from({ length: rays }).map((_, i) => (
        <path
          key={i}
          d="M0 0L-9 -100H9z"
          fill={color}
          opacity="0.35"
          transform={`rotate(${(360 / rays) * i})`}
        />
      ))}
    </motion.svg>
  );
}
