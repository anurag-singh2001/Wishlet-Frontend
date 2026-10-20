"use client";
import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { TemplateProps } from "../types";
import { caveat, playfair } from "../kit/fonts";
import { Flower, Heart } from "../kit/decor";
import { WishletBranding } from "../components/WishletBranding";
import { Paper } from "../thank-you-simple-parts/paper";
import { DrawHeart, DrawUnderline } from "../thank-you-simple-parts/draw";

const HAND = { fontFamily: "var(--font-caveat), cursive" };
const SERIF = { fontFamily: "var(--font-playfair), serif" };

export default function ThankYouSimple({
  recipientName,
  senderName,
  message,
  photos,
}: TemplateProps): React.JSX.Element {
  const photoUrl = photos && photos.length > 0 ? photos[0] : null;
  const [isOpen, setIsOpen] = useState(false);
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.25, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <div
      className={`${caveat.variable} ${playfair.variable} relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-12 text-stone-800`}
    >
      <Paper />
      <Flower
        size={70}
        className="absolute -left-4 top-6 opacity-70"
        colors={["#fdba74", "#fde68a"]}
      />
      <Flower
        size={56}
        className="absolute -right-3 bottom-10 opacity-70"
        colors={["#fda4af", "#fde68a"]}
      />
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="cover"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open your thank you note"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex cursor-pointer flex-col items-center text-center"
          >
            <DrawHeart className="mb-4 h-20 w-24" />
            <span className="text-4xl text-rose-700" style={HAND}>
              A little note for you
            </span>
            <span className="mt-3 text-xl text-stone-500" style={HAND}>
              tap to open
            </span>
          </motion.button>
        ) : (
          <motion.main
            key="note"
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 flex w-full max-w-md flex-col items-center rounded-sm bg-[#fffdf7]/80 px-6 py-10 text-center shadow-[0_10px_40px_-12px_rgba(120,70,20,0.35)] sm:px-10"
          >
            {photoUrl && (
              <motion.div
                variants={item}
                className="mb-8 -rotate-2 bg-white p-2 pb-6 shadow-md ring-1 ring-stone-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt="Thank you memory"
                  className="h-56 w-56 object-cover sm:h-64 sm:w-64"
                />
              </motion.div>
            )}
            <motion.p variants={item} className="text-2xl text-stone-500" style={HAND}>
              thank you,
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-1 max-w-full break-words text-4xl font-semibold text-rose-800 sm:text-5xl"
              style={SERIF}
            >
              {recipientName}
            </motion.h1>
            <DrawUnderline className="mt-1 h-5 w-44" />
            <motion.p
              variants={item}
              className="mt-8 max-w-full whitespace-pre-wrap break-words text-2xl leading-relaxed text-stone-700 sm:text-3xl"
              style={HAND}
            >
              {message}
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-col items-center">
              <span className="text-xl text-stone-500" style={HAND}>
                with love,
              </span>
              <span className="break-words text-3xl text-rose-700" style={HAND}>
                {senderName}
              </span>
              <Heart size={26} className="mt-2" color="#e11d48" />
            </motion.div>
            <motion.div variants={item} className="mt-8">
              <WishletBranding theme="neutral" />
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
