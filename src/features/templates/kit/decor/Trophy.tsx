"use client";
import { motion } from "framer-motion";
import { type DecorProps, useDecorMotion } from "./motion";

interface TrophyProps extends DecorProps {
  colors?: [string, string];
}

export function Trophy({
  className,
  size = 80,
  animate,
  colors = ["#facc15", "#a16207"],
}: TrophyProps): React.JSX.Element {
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
      <path d="M28 10h44v30c0 14-10 24-22 24S28 54 28 40z" fill={colors[0]} />
      <path
        d="M28 18H12c0 16 6 24 18 26M72 18h16c0 16-6 24-18 26"
        stroke={colors[0]}
        strokeWidth="5"
        fill="none"
      />
      <rect x="45" y="62" width="10" height="16" fill={colors[1]} />
      <rect x="30" y="78" width="40" height="10" rx="3" fill={colors[1]} />
    </motion.svg>
  );
}
