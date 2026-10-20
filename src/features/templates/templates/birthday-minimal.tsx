"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { TemplateProps } from "../types";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { ConfettiBurst } from "../components/animations/ConfettiBurst";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { KenBurnsPhoto } from "../components/animations/KenBurnsPhoto";
import { WishletBranding } from "../components/WishletBranding";
import { Heart, HandDrawnUnderline } from "../kit/decor";
import { caveat, playfair } from "../kit/fonts";
import { Envelope } from "./birthday-minimal-parts/Envelope";

const CONFETTI = ["#f43f5e", "#fb923c", "#facc15", "#34d399", "#60a5fa", "#a78bfa"];
const PARTICLES = ["#fda4af", "#fcd34d", "#c4b5fd"];
const DISPLAY = { fontFamily: "var(--font-playfair), serif" };

export default function BirthdayMinimalTemplate({
  recipientName,
  senderName,
  message,
  photos,
}: TemplateProps): React.JSX.Element {
  const photoUrl = photos && photos.length > 0 ? photos[0] : null;
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!opening) return;
    const t = setTimeout(() => setIsOpen(true), reduce ? 0 : 1000);
    return () => clearTimeout(t);
  }, [opening, reduce]);

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 15 } },
  };

  return (
    <div
      className={`${playfair.variable} ${caveat.variable} relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#fdf8f0] px-6 py-12 font-sans text-slate-800`}
    >
      <AmbientGlow color1="#fecdd3" color2="#fde68a" opacity={0.5} />
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            className="z-10 flex w-full max-w-sm flex-col items-center text-center"
          >
            <Envelope opening={opening} onOpen={() => setOpening(true)} />
            <h2 className="mt-8 text-2xl text-slate-700" style={DISPLAY}>
              A special wish for you
            </h2>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
              Tap the seal to open
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
            className="relative z-10 flex w-full max-w-xl flex-col items-center text-center"
          >
            <FloatingParticles
              count={14}
              colors={PARTICLES}
              shape="circle"
              minSize={5}
              maxSize={9}
              opacity={0.6}
            />
            <div className="pointer-events-none fixed inset-0 z-20">
              <ConfettiBurst count={60} colors={CONFETTI} origin={{ x: 50, y: 30 }} spread={320} />
            </div>

            <motion.p
              variants={item}
              className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-rose-400"
            >
              Happy Birthday
            </motion.p>
            <motion.h1
              variants={item}
              className="w-full max-w-full break-words px-2 text-5xl italic leading-tight text-rose-500 sm:text-6xl"
              style={DISPLAY}
            >
              {recipientName}
            </motion.h1>
            <motion.div variants={item} className="mb-8 mt-1">
              <HandDrawnUnderline size={180} color="#fda4af" strokeWidth={3} />
            </motion.div>

            {photoUrl && (
              <motion.div
                variants={item}
                className="mb-10 w-full max-w-xs -rotate-2 rounded-sm border border-amber-100 bg-white p-3 pb-10 shadow-xl"
              >
                <KenBurnsPhoto
                  src={photoUrl}
                  alt="A special memory"
                  className="aspect-square w-full bg-slate-100"
                />
              </motion.div>
            )}

            {!photoUrl && (
              <motion.div variants={item} className="mb-6">
                <Heart size={36} />
              </motion.div>
            )}

            <motion.p
              variants={item}
              className="w-full max-w-full whitespace-pre-wrap break-words px-4 text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {message}
            </motion.p>

            <motion.div variants={item} className="mt-10">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                With love,
              </p>
              <p
                className="break-words text-4xl text-rose-700"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                {senderName}
              </p>
            </motion.div>

            <motion.div variants={item} className="mb-4 mt-16">
              <WishletBranding theme="rose" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
