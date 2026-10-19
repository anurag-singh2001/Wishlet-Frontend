"use client";
import { motion } from "framer-motion";
import { type DecorProps, useDecorMotion } from "./motion";

interface HeartProps extends DecorProps {
  color?: string;
}

export function Heart({
  className,
  size = 40,
  animate,
  color = "#f43f5e",
}: HeartProps): React.JSX.Element {
  const motionProps = useDecorMotion(animate);
  return (
    <motion.svg
      viewBox="0 0 100 90"
      width={size}
      height={size * 0.9}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...motionProps}
    >
      <path
        d="M50 85C10 55 2 35 12 18 22 4 42 6 50 24 58 6 78 4 88 18c10 17 2 37-38 67z"
        fill={color}
      />
    </motion.svg>
  );
}
