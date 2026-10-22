"use client";
import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { TemplateProps } from "../types";
import { playfair } from "../kit/fonts";
import { LightRays } from "../kit/decor/LightRays";
import { Star } from "../kit/decor/Star";
import { ConfettiBurst } from "../components/animations/ConfettiBurst";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { useReveal } from "../components/use-reveal";
import { WishPhoto } from "../components/WishPhoto";
import { WishletBranding } from "../components/WishletBranding";

const GOLDS = ["#f5d77a", "#d4af37", "#b8860b", "#fff1b8", "#c9a227"];
const GOLD_TEXT = {
  backgroundImage: "linear-gradient(135deg, #fff1b8 0%, #d4af37 45%, #8a6a12 75%, #f5d77a 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;
const SERIF = { fontFamily: "var(--font-playfair), serif" } as const;

export default function CongratulationsGold({
  recipientName,
  senderName,
  message,
  photos,
  autoOpen,
}: TemplateProps): React.JSX.Element {
  const photoUrl = photos && photos.length > 0 ? photos[0] : null;
  const reduced = useReducedMotion();
  const { isOpen, headingRef, announce, coverProps, transition } = useReveal({
    autoOpen,
    reduced,
    ring: "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0907]",
  });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
  };

  return (
    <div
      className={`${playfair.variable} ${playfair.className} relative min-h-[100dvh] overflow-hidden bg-[#0a0907] text-[#f3ead0] flex flex-col items-center justify-center px-6 pt-14 pb-28`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <motion.div
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="opacity-20"
        >
          <LightRays color="#d4af37" rays={14} size={900} className="max-w-none" />
        </motion.div>
      </div>
      <AmbientGlow color1="#3a2a08" color2="#1a1405" opacity={0.6} />

      {isOpen && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <ConfettiBurst count={60} colors={GOLDS} origin={{ x: 50, y: 25 }} trigger={isOpen} />
          {!reduced && (
            <FloatingParticles
              count={12}
              shape="circle"
              colors={GOLDS}
              minSize={3}
              maxSize={8}
              speed="slow"
              opacity={0.35}
            />
          )}
        </div>
      )}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="cover"
            type="button"
            onClick={coverProps.onClick}
            aria-expanded={coverProps["aria-expanded"]}
            aria-label="Open your congratulations"
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.08, filter: "blur(6px)" }}
            transition={transition}
            className={`relative z-10 flex cursor-pointer flex-col items-center rounded-lg text-center ${coverProps.className}`}
          >
            <motion.div
              animate={reduced ? {} : { scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-[#d4af37]/60 shadow-[0_0_40px_rgba(212,175,55,0.35)]"
            >
              <Star size={48} color="#d4af37" />
            </motion.div>
            <h2 className="text-3xl mb-3" style={{ ...SERIF, ...GOLD_TEXT }}>
              A celebration awaits
            </h2>
            <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37]/80">Tap to open</p>
          </motion.button>
        ) : (
          <motion.div
            key="card"
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 flex w-full max-w-xl flex-col items-center text-center"
          >
            <motion.p
              variants={item}
              className="mb-4 text-xs uppercase tracking-[0.4em] text-[#d4af37]"
            >
              Congratulations
            </motion.p>
            <motion.h1
              variants={item}
              ref={headingRef}
              tabIndex={-1}
              className="focus:outline-none mb-6 w-full break-words text-4xl sm:text-6xl font-bold leading-tight"
              style={{ ...SERIF, ...GOLD_TEXT }}
            >
              {recipientName}
            </motion.h1>
            <motion.div variants={item} className="mb-8 flex items-center gap-3" aria-hidden="true">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <Star size={14} color="#d4af37" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </motion.div>

            {photoUrl && (
              <motion.div
                variants={item}
                className="mb-8 w-full max-w-xs rounded-t-full border border-[#d4af37]/70 p-2 shadow-[0_0_40px_rgba(212,175,55,0.25)]"
              >
                <WishPhoto
                  src={photoUrl}
                  alt="Celebration memory"
                  className="aspect-[4/5] w-full rounded-t-full"
                />
              </motion.div>
            )}

            <motion.p
              variants={item}
              className="mb-10 whitespace-pre-wrap break-words px-2 text-lg sm:text-xl italic leading-relaxed text-[#f3ead0]/90"
              style={SERIF}
            >
              {message}
            </motion.p>

            <motion.div variants={item}>
              <p className="mb-1 text-xs uppercase tracking-[0.3em] text-[#d4af37]/70">
                With admiration,
              </p>
              <p className="break-words text-2xl" style={{ ...SERIF, ...GOLD_TEXT }}>
                {senderName}
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-14">
              <WishletBranding theme="gold" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {announce}
    </div>
  );
}
