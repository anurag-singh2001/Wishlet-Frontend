import React from "react";
import { motion, type Transition } from "framer-motion";
import { Star, Trophy } from "../kit/decor";

interface CoverProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-expanded"?: boolean;
  className: string;
  reduced: boolean;
  transition: Transition;
}

/** Tap-to-open screen shown before the celebration. */
export function Cover({ className, reduced, transition, ...rest }: CoverProps): React.JSX.Element {
  return (
    <motion.button
      type="button"
      key="cover"
      {...rest}
      aria-label="Open your congratulations message"
      initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.2, filter: "blur(6px)" }}
      transition={transition}
      className={`relative z-20 flex max-w-sm cursor-pointer flex-col items-center rounded-2xl text-center ${className}`}
    >
      <motion.div
        animate={reduced ? {} : { rotate: [-4, 4, -4], y: [0, -8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-6"
      >
        <Star size={36} color="#f472b6" className="absolute -left-8 top-0" />
        <Star size={26} color="#22d3ee" className="absolute -right-6 top-6" />
        <Trophy size={120} colors={["#fbbf24", "#8b5cf6"]} />
      </motion.div>
      <h2 className="mb-2 text-2xl font-extrabold text-violet-900">Big news inside!</h2>
      <p className="text-xs motion-safe:animate-pulse font-black uppercase tracking-[0.25em] text-pink-500">
        Tap to celebrate
      </p>
    </motion.button>
  );
}
