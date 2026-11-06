"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TemplateProps } from "../types";
import { bricolage, playfair } from "../kit/fonts";
import { newYearFor } from "../kit/new-year";
import { WishPhoto } from "../components/WishPhoto";
import { WishletBranding } from "../components/WishletBranding";
import { Bubbles, Firework, Flutes } from "./newyear-midnight-parts";

const DISPLAY = { fontFamily: "var(--font-bricolage), sans-serif" };
const SERIF = { fontFamily: "var(--font-playfair), serif" };
const GOLD_TEXT =
  "bg-[linear-gradient(180deg,#fff3c4_0%,#f5d77a_45%,#c99a2e_100%)] bg-clip-text text-transparent";

export default function NewYearMidnight({
  recipientName,
  senderName,
  message,
  photos,
}: TemplateProps): React.JSX.Element {
  const reduced = useReducedMotion() ?? false;
  const photoUrl = photos && photos.length > 0 ? photos[0] : null;
  const year = newYearFor();

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
      className={`${bricolage.variable} ${playfair.variable} relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#0b1026_0%,#1a1640_60%,#2a1f4d_100%)] px-6 pb-28 pt-16 text-[#f7f6fb]`}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Firework x="18%" y="14%" r={40} color="#E8B931" delay={0.2} reduced={reduced} />
        <Firework x="82%" y="22%" r={52} color="#FF4F8B" delay={1.4} reduced={reduced} />
        <Firework x="74%" y="62%" r={30} color="#7DD3FC" delay={2.6} reduced={reduced} />
        <Firework x="14%" y="70%" r={34} color="#E8B931" delay={3.4} reduced={reduced} />
        <Bubbles reduced={reduced} />
      </div>

      <main className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <motion.div {...rise(0.4)} className="mb-5">
          {photoUrl ? (
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-[#f5d77a] shadow-[0_0_40px_rgba(245,215,122,0.45)]">
              <WishPhoto src={photoUrl} alt="A happy memory" className="h-full w-full" />
            </div>
          ) : (
            <Flutes size={120} />
          )}
        </motion.div>

        <motion.p
          {...rise(0.9)}
          style={SERIF}
          className="text-sm uppercase tracking-[0.35em] text-[#f5d77a]"
        >
          Happy New Year
        </motion.p>
        <motion.h1
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, scale: 0.6 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.8, delay: 1.1, type: "spring", bounce: 0.35 },
              })}
          style={DISPLAY}
          suppressHydrationWarning
          className={`${GOLD_TEXT} text-[6.5rem] font-bold leading-none tracking-tight drop-shadow-[0_0_24px_rgba(245,215,122,0.35)]`}
        >
          {year}
        </motion.h1>
        <motion.p
          {...rise(1.5)}
          style={SERIF}
          className="mt-3 max-w-full break-words text-2xl font-semibold"
        >
          {recipientName}
        </motion.p>

        <motion.p
          {...rise(1.8)}
          style={SERIF}
          className="mt-6 max-w-full whitespace-pre-wrap break-words text-lg italic leading-relaxed text-[#e4e2f5]"
        >
          {message}
        </motion.p>

        <motion.div {...rise(2.1)} className="mt-8" style={SERIF}>
          <p className="text-sm text-[#f5d77a]">Here&apos;s to your best year yet,</p>
          <p className="break-words text-2xl font-semibold">{senderName}</p>
        </motion.div>

        <motion.div {...rise(2.5)} className="mt-10">
          <WishletBranding theme="gold" />
        </motion.div>
      </main>
    </div>
  );
}
