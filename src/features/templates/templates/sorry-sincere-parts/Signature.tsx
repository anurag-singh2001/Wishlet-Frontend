import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SignatureProps {
  senderName: string;
  delay: number;
  /** Compress the draw-in so it finishes in about a second. */
  quick?: boolean;
}

/** "I'm sorry" in script, revealed left to right like ink being drawn. */
export function Signature({ senderName, delay, quick }: SignatureProps): React.JSX.Element {
  const reduced = useReducedMotion();
  return (
    <div className="flex w-full flex-col items-center">
      <motion.p
        className="px-2 text-5xl leading-tight text-[#5b6aa8] sm:text-6xl"
        style={{ fontFamily: "var(--font-great-vibes), cursive" }}
        initial={reduced ? false : { clipPath: "inset(-10% 100% -10% 0)" }}
        animate={{ clipPath: "inset(-10% 0% -10% 0)" }}
        transition={{ duration: quick ? 0.8 : 2.6, delay, ease: "easeInOut" }}
      >
        I&apos;m sorry
      </motion.p>
      <svg viewBox="0 0 200 12" className="mt-1 h-3 w-40" fill="none" aria-hidden>
        <motion.path
          d="M4 7 C 40 1, 70 11, 110 6 S 170 3, 196 7"
          stroke="#9aa6d6"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: quick ? 0.5 : 1.6,
            delay: delay + (quick ? 0.4 : 2.2),
            ease: "easeInOut",
          }}
        />
      </svg>
      {senderName && (
        <motion.p
          className="mt-5 break-words text-sm uppercase tracking-[0.25em] text-[#6b7699]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: quick ? 0.5 : 1.4, delay: delay + (quick ? 0.6 : 3.4) }}
        >
          {senderName}
        </motion.p>
      )}
    </div>
  );
}
