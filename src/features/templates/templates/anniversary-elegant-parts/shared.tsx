import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Rings } from "../../kit/decor";
import { KenBurnsPhoto } from "../../components/animations/KenBurnsPhoto";

export const GOLD_TEXT: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(110deg,#8a6a1f 0%,#e9c85f 30%,#fff1b8 50%,#c9a23c 70%,#8a6a1f 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
};

export function Envelope({ onOpen }: { onOpen: () => void }): React.JSX.Element {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      key="envelope"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onClick={onOpen}
      aria-label="Open your anniversary wish"
      className="z-50 flex max-w-sm cursor-pointer flex-col items-center text-center"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-[#e9c85f]/60 bg-white shadow-2xl shadow-rose-200/60"
      >
        <Rings size={72} />
      </motion.div>
      <h2 className="mb-3 text-3xl" style={{ fontFamily: "var(--font-great-vibes)", ...GOLD_TEXT }}>
        A special wish for you
      </h2>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">Tap to open</p>
    </motion.button>
  );
}

export function PhotoFrame({ src }: { src: string }): React.JSX.Element {
  return (
    <div className="relative mx-auto mb-10 w-full max-w-sm rounded-sm bg-gradient-to-br from-[#8a6a1f] via-[#f3d77a] to-[#8a6a1f] p-[3px] shadow-2xl shadow-rose-900/10">
      <div className="relative bg-[#fffaf5] p-2.5">
        <KenBurnsPhoto src={src} alt="Anniversary memory" className="aspect-[4/5] w-full" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2.5"
          style={{ boxShadow: "inset 0 0 60px 12px rgba(76,5,25,0.28)" }}
        />
      </div>
    </div>
  );
}
