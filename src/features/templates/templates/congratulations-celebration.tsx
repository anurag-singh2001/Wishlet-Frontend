import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { TemplateProps } from "../types";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { ConfettiBurst } from "../components/animations/ConfettiBurst";
import { WishletBranding } from "../components/WishletBranding";
import { LightRays, Star, Trophy } from "../kit/decor";
import { bricolage } from "../kit/fonts";
import { useReveal } from "../components/use-reveal";
import { WishPhoto } from "../components/WishPhoto";
import { Cover } from "../congratulations-celebration-parts/Cover";

const COLORS = ["#f472b6", "#fbbf24", "#22d3ee", "#a78bfa", "#34d399", "#fb7185"];

export default function CongratulationsCelebration({
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
    ring: "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
  });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 14 } },
  };

  return (
    <div
      className={`${bricolage.variable} relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-violet-50 via-pink-50 to-amber-50 px-5 pt-12 pb-28 text-slate-800`}
      style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}
    >
      {isOpen && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <AmbientGlow color1="#f9a8d4" color2="#a5f3fc" opacity={0.45} />
          <FloatingParticles
            count={reduced ? 0 : 14}
            shape="star"
            colors={COLORS}
            minSize={8}
            maxSize={20}
            opacity={0.7}
          />
          <div className="pointer-events-none absolute inset-0 z-0">
            <ConfettiBurst count={60} colors={COLORS} origin={{ x: 50, y: 30 }} spread={320} />
            <ConfettiBurst count={30} colors={COLORS} origin={{ x: 15, y: 60 }} trigger="l" />
            <ConfettiBurst count={30} colors={COLORS} origin={{ x: 85, y: 60 }} trigger="r" />
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Cover key="cover" reduced={!!reduced} transition={transition} {...coverProps} />
        ) : (
          <motion.div
            key="card"
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center"
          >
            <motion.div variants={item} className="relative mb-4 flex items-center justify-center">
              <motion.div
                animate={reduced ? {} : { rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute"
              >
                <LightRays size={300} color="#f9a8d4" rays={14} />
              </motion.div>
              <motion.div
                initial={reduced ? false : { scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 11, delay: 0.3 }}
                className="relative"
              >
                <Trophy size={130} colors={["#fbbf24", "#8b5cf6"]} />
                <Star size={34} color="#f472b6" className="absolute -left-6 top-2" />
                <Star size={24} color="#22d3ee" className="absolute -right-5 top-10" />
              </motion.div>
            </motion.div>

            <motion.h1
              ref={headingRef}
              tabIndex={-1}
              initial={reduced ? false : { scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 10, delay: 0.5 }}
              className="mb-6 w-full max-w-full break-words px-2 focus:outline-none text-4xl font-extrabold leading-tight tracking-tight text-violet-950 sm:text-5xl md:text-6xl"
            >
              Congratulations,
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-amber-400 to-cyan-500 bg-clip-text text-transparent">
                {recipientName}!
              </span>
            </motion.h1>

            {photoUrl && (
              <motion.div
                variants={item}
                className="mx-auto mb-8 w-full max-w-sm -rotate-2 rounded-2xl border-4 border-white bg-white p-2 shadow-xl shadow-violet-300/40"
              >
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-violet-50">
                  <WishPhoto src={photoUrl} alt="Celebration memory" className="h-full w-full" />
                </div>
              </motion.div>
            )}

            <motion.div
              variants={item}
              className="mb-8 w-full rounded-3xl border-2 border-pink-100 bg-white/70 px-5 py-6 backdrop-blur-sm sm:px-10"
            >
              <p className="whitespace-pre-wrap break-words text-lg font-semibold leading-relaxed sm:text-xl">
                {message}
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="inline-block max-w-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-7 py-3 text-white shadow-lg shadow-pink-300/40"
            >
              <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-pink-100">
                Cheering for you,
              </p>
              <p className="break-words text-lg font-extrabold">{senderName}</p>
            </motion.div>

            <motion.div variants={item} className="mb-4 mt-12">
              <WishletBranding theme="sky" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {announce}
    </div>
  );
}
