"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TemplateProps } from "../types";
import { greatVibes, playfair } from "../kit/fonts";
import { WishPhoto } from "../components/WishPhoto";
import { WishletBranding } from "../components/WishletBranding";
import { Diya, Fireworks, Rangoli, Stars } from "./diwali-diyas-parts";

const SCRIPT = { fontFamily: "var(--font-great-vibes), cursive" };
const SERIF = { fontFamily: "var(--font-playfair), serif" };
const DIYA_ROW = [0, 0.3, 0.6, 0.9, 1.2];

export default function DiwaliDiyas({
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
      className={`${greatVibes.variable} ${playfair.variable} relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#0d0726_0%,#24103f_55%,#3a1530_100%)] px-6 pb-28 pt-16 text-[#fff4dc]`}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Stars reduced={reduced} />
        <Fireworks reduced={reduced} />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_at_bottom,rgba(255,159,28,0.28),transparent_70%)]" />
      </div>

      <main className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <div className="relative mb-6 flex h-[220px] w-[220px] items-center justify-center">
          <div className="absolute inset-0 opacity-90">
            <Rangoli size={220} reduced={reduced} />
          </div>
          {photoUrl ? (
            <motion.div
              {...rise(0.8)}
              className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-[#f5c04a] shadow-[0_0_40px_rgba(245,192,74,0.45)]"
            >
              <WishPhoto src={photoUrl} alt="A festive memory" className="h-full w-full" />
            </motion.div>
          ) : (
            <motion.div {...rise(0.8)} className="relative">
              <Diya size={96} reduced={reduced} />
            </motion.div>
          )}
        </div>

        <motion.p
          {...rise(1)}
          style={SERIF}
          className="text-sm uppercase tracking-[0.35em] text-[#f5c04a]"
        >
          Wishing you a
        </motion.p>
        <motion.h1
          {...rise(1.2)}
          style={SCRIPT}
          className="mt-1 text-5xl leading-tight text-[#ffd27a] drop-shadow-[0_0_18px_rgba(255,159,28,0.55)] sm:text-7xl"
        >
          Happy Diwali
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
          className="mt-6 max-w-full whitespace-pre-wrap break-words text-lg italic leading-relaxed text-[#fde9c4]"
        >
          {message}
        </motion.p>

        <motion.div {...rise(2)} className="mt-8" style={SERIF}>
          <p className="text-sm text-[#f5c04a]">With light and love,</p>
          <p className="break-words text-2xl font-semibold">{senderName}</p>
        </motion.div>

        <motion.div {...rise(2.2)} className="mt-8 flex items-end gap-3" aria-hidden="true">
          {DIYA_ROW.map((d) => (
            <Diya key={d} size={44} delay={d} reduced={reduced} />
          ))}
        </motion.div>

        <motion.div {...rise(2.5)} className="mt-10">
          <WishletBranding theme="gold" />
        </motion.div>
      </main>
    </div>
  );
}
