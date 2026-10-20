"use client";
import { motion } from "framer-motion";
import { type DecorProps, useDecorMotion } from "./motion";

interface PetalProps extends DecorProps {
  color?: string;
}

export function Petal({
  className,
  size = 30,
  animate,
  color = "#fda4af",
}: PetalProps): React.JSX.Element {
  const motionProps = useDecorMotion(animate);
  return (
    <motion.svg
      viewBox="0 0 60 100"
      width={size}
      height={size * 1.67}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...motionProps}
    >
      <path d="M30 4C60 30 58 70 30 96 2 70 0 30 30 4z" fill={color} />
      <path d="M30 14v74" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
    </motion.svg>
  );
}
