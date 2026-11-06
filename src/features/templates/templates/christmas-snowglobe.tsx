"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TemplateProps } from "../types";
import { greatVibes, playfair } from "../kit/fonts";
import { WishletBranding } from "../components/WishletBranding";
import { PineTree, SnowGlobe, Snowfall } from "./christmas-snowglobe-parts";

const SCRIPT = { fontFamily: "var(--font-great-vibes), cursive" };
const SERIF = { fontFamily: "var(--font-playfair), serif" };

export default function ChristmasSnowglobe({
  recipientName,
  senderName,
  message,
  photos,
}: TemplateProps): React.JSX.Element {
  const reduced = useReducedMotion() ?? false;
  const photoUrl = photos && photos.length > 0 ? photos[0] : null;

  const rise = (delay: number): object =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: "easeOut" },
        };

  return (
    <div
      className={`${greatVibes.variable} ${playfair.variable} relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#0b1f2e_0%,#0e2a22_55%,#16452f_100%)] px-6 pb-28 pt-16 text-[#fbf7f0]`}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Snowfall reduced={reduced} />
        <div className="absolute inset-x-0 bottom-0 h-24 rounded-[50%_50%_0_0/40%_40%_0_0] bg-white/10" />
      </div>

      <main className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <motion.div {...rise(0.3)} className="mb-6">
          <SnowGlobe photoUrl={photoUrl} reduced={reduced} />
        </motion.div>

        <motion.p
          {...rise(1)}
          style={SERIF}
          className="text-sm uppercase tracking-[0.35em] text-[#E9B949]"
        >
          Wishing you a
        </motion.p>
        <motion.h1
          {...rise(1.2)}
          style={SCRIPT}
          className="mt-1 text-5xl leading-tight text-[#ff6b7d] drop-shadow-[0_0_16px_rgba(227,58,79,0.5)] sm:text-7xl"
        >
          Merry Christmas
        </motion.h1>
        <motion.p
          {...rise(1.4)}
          style={SERIF}
          className="mt-2 max-w-full break-words text-2xl font-semibold"
        >
          {recipientName}
        </motion.p>

        <motion.p
          {...rise(1.7)}
          style={SERIF}
          className="mt-6 max-w-full whitespace-pre-wrap break-words text-lg italic leading-relaxed text-[#e7efe9]"
        >
          {message}
        </motion.p>

        <motion.div {...rise(2)} className="mt-8" style={SERIF}>
          <p className="text-sm text-[#E9B949]">With love and cheer,</p>
          <p className="break-words text-2xl font-semibold">{senderName}</p>
        </motion.div>

        <motion.div {...rise(2.2)} className="mt-8 flex items-end gap-2" aria-hidden="true">
          <PineTree size={36} />
          <PineTree size={52} />
          <PineTree size={36} />
        </motion.div>

        <motion.div {...rise(2.5)} className="mt-10">
          <WishletBranding theme="night" />
        </motion.div>
      </main>
    </div>
  );
}
