"use client";
import { motion } from "framer-motion";
import { type DecorProps, useDecorMotion } from "./motion";

interface RingsProps extends DecorProps {
  color?: string;
}

export function Rings({
  className,
  size = 120,
  animate,
  color = "#d4af37",
}: RingsProps): React.JSX.Element {
  const motionProps = useDecorMotion(animate);
  return (
    <motion.svg
      viewBox="0 0 120 80"
      width={size}
      height={size * 0.67}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...motionProps}
    >
      <circle cx="45" cy="42" r="26" stroke={color} strokeWidth="5" fill="none" />
      <circle cx="75" cy="42" r="26" stroke={color} strokeWidth="5" fill="none" opacity="0.85" />
      <path d="M60 10l6 7-6 7-6-7z" fill={color} />
    </motion.svg>
  );
}
