"use client";
import { motion } from "framer-motion";
import { type DecorProps, useDecorMotion } from "./motion";

interface StarProps extends DecorProps {
  color?: string;
}

export function Star({
  className,
  size = 40,
  animate,
  color = "#facc15",
}: StarProps): React.JSX.Element {
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
      <path d="M50 5l13 30 32 3-24 22 7 32-28-17-28 17 7-32L5 38l32-3z" fill={color} />
    </motion.svg>
  );
}
