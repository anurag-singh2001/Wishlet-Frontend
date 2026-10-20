"use client";
import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "../types";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { WishletBranding } from "../components/WishletBranding";
import { LightRays } from "../kit/decor";
import { playfair } from "../kit/fonts";
import { Rain, SkyBackdrop } from "./sorry-rain-to-sun-parts";

export default function SorryRainToSun({
  recipientName,
  senderName,
  message,
  photos,
  autoOpen,
}: TemplateProps): React.JSX.Element {
  const photoUrl = photos && photos.length > 0 ? photos[0] : null;
  const reduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(Boolean(autoOpen));
  const sunny = isOpen || !!reduced;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: autoOpen ? 0.12 : 0.35, delayChildren: autoOpen ? 0.1 : 0.8 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div
      className={`${playfair.className} min-h-[100dvh] relative overflow-hidden flex flex-col items-center justify-center pt-12 pb-28 px-6`}
    >
      <SkyBackdrop sunny={sunny} />
      <Rain visible={!sunny} />
      {sunny && <AmbientGlow color1="#fef3c7" color2="#fdba74" opacity={0.5} />}
      {sunny && (
        <motion.div
          className="absolute -top-24 left-1/2 z-0 -translate-x-1/2 pointer-events-none opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1 }}
        >
          <motion.div
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <LightRays size={520} color="#fff7d6" rays={14} className="max-w-[140vw]" />
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {!sunny ? (
          <motion.button
            key="closed"
            type="button"
            onClick={() => setIsOpen(true)}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-sm cursor-pointer"
            aria-label="Open your message"
          >
            <h2 className="text-2xl italic text-slate-50 mb-3">It has been a rainy while</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-200 animate-pulse">
              Tap to read
            </p>
          </motion.button>
        ) : (
          <motion.div
            key="card"
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 w-full max-w-xl flex flex-col items-center text-center"
          >
            <motion.h1
              variants={item}
              className="text-3xl sm:text-4xl text-amber-950 mb-8 break-words max-w-full px-2"
            >
              Dear <span className="font-semibold">{recipientName}</span>,
            </motion.h1>
            {photoUrl && (
              <motion.div
                variants={item}
                className="w-full max-w-[16rem] aspect-square mb-8 rounded-full overflow-hidden border-4 border-white/70 shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoUrl} alt="A shared memory" className="w-full h-full object-cover" />
              </motion.div>
            )}
            <motion.p
              variants={item}
              className="text-base sm:text-lg leading-relaxed italic text-amber-950/90 whitespace-pre-wrap break-words max-w-full px-2 mb-10 rounded-2xl bg-white/30 backdrop-blur-[2px] py-5"
            >
              &ldquo;{message}&rdquo;
            </motion.p>
            <motion.div variants={item}>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-900/70 mb-1">
                With a brighter day ahead,
              </p>
              <p className="text-xl text-amber-950 break-words">{senderName}</p>
            </motion.div>
            <motion.div variants={item} className="mt-14">
              <WishletBranding theme="slate" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
