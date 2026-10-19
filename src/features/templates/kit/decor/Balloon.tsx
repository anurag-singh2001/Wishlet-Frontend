"use client";
import { motion } from "framer-motion";
import { type DecorProps, useDecorMotion } from "./motion";

interface BalloonProps extends DecorProps {
  color?: string;
}

export function Balloon({
  className,
  size = 80,
  animate,
  color = "#f43f5e",
}: BalloonProps): React.JSX.Element {
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
      <ellipse cx="30" cy="34" rx="26" ry="32" fill={color} />
      <ellipse cx="20" cy="22" rx="6" ry="10" fill="#fff" opacity="0.35" />
      <path d="M26 65h8l-4 6z" fill={color} />
      <path d="M30 71c-6 8 6 14 0 28" stroke="#9ca3af" strokeWidth="1.5" fill="none" />
    </motion.svg>
  );
}
