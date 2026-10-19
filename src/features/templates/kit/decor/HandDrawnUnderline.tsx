"use client";
import { motion } from "framer-motion";
import { type DecorProps, useDecorMotion } from "./motion";

interface HandDrawnUnderlineProps extends DecorProps {
  color?: string;
  strokeWidth?: number;
}

export function HandDrawnUnderline({
  className,
  size = 200,
  animate,
  color = "#f43f5e",
  strokeWidth = 4,
}: HandDrawnUnderlineProps): React.JSX.Element {
  const motionProps = useDecorMotion(animate);
  return (
    <motion.svg
      viewBox="0 0 200 20"
      width={size}
      height={size * 0.1}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...motionProps}
    >
      <path
        d="M4 12C40 4 70 16 105 9s60-4 91 2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  );
}
