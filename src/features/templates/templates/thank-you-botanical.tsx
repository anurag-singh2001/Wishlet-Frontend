"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TemplateProps } from "../types";
import { caveat } from "../kit/fonts";
import { Flower, HandDrawnUnderline, Petal } from "../kit/decor";
import { WishPhoto } from "../components/WishPhoto";
import { WishletBranding } from "../components/WishletBranding";
import { Vine } from "./thank-you-botanical-vines";

const HAND = { fontFamily: "var(--font-caveat), cursive" };

export default function ThankYouBotanical({
  recipientName,
  senderName,
  message,
  photos,
}: TemplateProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const photoUrl = photos && photos.length > 0 ? photos[0] : null;

  const rise = (delay: number): object =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: "easeOut" },
        };

  return (
    <div
      className={`${caveat.variable} ${caveat.className} relative min-h-[100dvh] overflow-hidden bg-[#f6f3e8] text-[#3f5545] flex flex-col items-center justify-center px-8 pt-16 pb-28`}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Vine delay={0.2} />
        <Vine flip delay={0.7} />
        <Petal size={18} animate color="#f6d5c8" className="absolute top-24 right-4 rotate-12" />
        <Petal size={14} animate color="#d9e4d2" className="absolute top-1/2 left-3 -rotate-45" />
      </div>

      <main className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {photoUrl ? (
          <motion.div
            {...rise(0.4)}
            className="mb-6 h-56 w-44 overflow-hidden rounded-t-full border-4 border-[#d9e4d2] bg-[#e7eedf] shadow-lg shadow-[#7c9a82]/20"
          >
            <WishPhoto src={photoUrl} alt="A memory" className="h-full w-full" />
          </motion.div>
        ) : (
          <Flower size={96} animate colors={["#f6d5c8", "#e9b96e"]} className="mb-4" />
        )}

        <motion.p {...rise(0.6)} className="text-2xl text-[#7c9a82]">
          with gratitude
        </motion.p>
        <motion.h1
          {...rise(0.8)}
          style={HAND}
          className="mt-1 max-w-full break-words text-5xl font-bold leading-tight sm:text-6xl"
        >
          Thank you, {recipientName}
        </motion.h1>
        <motion.div {...rise(1)} className="mb-6 mt-1">
          <HandDrawnUnderline size={200} animate color="#a8c3a9" strokeWidth={3} />
        </motion.div>

        <motion.p
          {...rise(1.2)}
          className="max-w-full whitespace-pre-wrap break-words text-2xl leading-relaxed sm:text-3xl"
        >
          {message}
        </motion.p>

        <motion.div {...rise(1.5)} className="mt-8">
          <p className="text-xl text-[#7c9a82]">Gratefully,</p>
          <p className="break-words text-4xl font-bold">{senderName}</p>
        </motion.div>

        <motion.div {...rise(1.8)} className="mt-10">
          <WishletBranding theme="emerald" />
        </motion.div>
      </main>
    </div>
  );
}
