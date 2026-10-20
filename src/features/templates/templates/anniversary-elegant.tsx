import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence, type Variants } from "framer-motion";
import type { TemplateProps } from "../types";
import { playfair, greatVibes } from "../kit/fonts";
import { Petal, Rings } from "../kit/decor";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { ConfettiBurst } from "../components/animations/ConfettiBurst";
import { WishletBranding } from "../components/WishletBranding";
import { Envelope, PhotoFrame, GOLD_TEXT } from "./anniversary-elegant-parts/shared";

const EDGE_MASK: React.CSSProperties = {
  maskImage: "linear-gradient(90deg,#000 0,#000 18%,transparent 18%,transparent 82%,#000 82%)",
  WebkitMaskImage:
    "linear-gradient(90deg,#000 0,#000 18%,transparent 18%,transparent 82%,#000 82%)",
};

export default function AnniversaryElegant({
  recipientName,
  senderName,
  message,
  photos,
  autoOpen,
}: TemplateProps): React.JSX.Element {
  const photoUrl = photos && photos.length > 0 ? photos[0] : null;
  const [isOpen, setIsOpen] = useState(!!autoOpen);
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.25, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.9, ease: "easeOut" } },
  };

  return (
    <div
      className={`${playfair.variable} ${greatVibes.variable} relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#fffaf6] px-6 pb-28 pt-12 text-rose-950`}
      style={{ fontFamily: "var(--font-playfair), serif" }}
    >
      {isOpen && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <AmbientGlow color1="#ffe4e6" color2="#fdf2d0" opacity={0.6} />
          <div className="absolute inset-0" style={EDGE_MASK}>
            <FloatingParticles
              count={8}
              shape="heart"
              colors={["#fda4af"]}
              speed="slow"
              opacity={0.25}
            />
            <ConfettiBurst count={30} colors={["#e9c85f", "#fda4af", "#fff1b8"]} trigger={isOpen} />
          </div>
          {!reduce && (
            <>
              <Petal
                size={22}
                animate
                className="absolute left-3 top-6 rotate-[-20deg] opacity-70"
              />
              <Petal
                size={16}
                animate
                color="#fecdd3"
                className="absolute right-4 top-24 rotate-[25deg] opacity-70"
              />
              <Petal
                size={18}
                animate
                color="#fbcfe8"
                className="absolute bottom-44 left-6 rotate-[40deg] opacity-60"
              />
            </>
          )}
        </div>
      )}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Envelope key="envelope" onOpen={() => setIsOpen(true)} />
        ) : (
          <motion.div
            key="card"
            variants={container}
            initial="hidden"
            animate="show"
            className="z-10 flex w-full max-w-xl flex-col items-center text-center"
          >
            <motion.div variants={item} className="mb-4">
              <Rings size={64} />
            </motion.div>
            <motion.p
              variants={item}
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-rose-700"
            >
              Happy Anniversary
            </motion.p>
            <motion.h1
              variants={item}
              className="mb-8 w-full break-words px-2 text-5xl leading-tight sm:text-6xl"
              style={{ fontFamily: "var(--font-great-vibes), cursive", ...GOLD_TEXT }}
            >
              {recipientName}
            </motion.h1>

            {photoUrl && (
              <motion.div variants={item} className="w-full">
                <PhotoFrame src={photoUrl} />
              </motion.div>
            )}

            <motion.div variants={item} className="mb-10 w-full px-2 sm:px-8">
              <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-[#c9a23c] to-transparent" />
              <p className="whitespace-pre-wrap break-words text-base italic leading-relaxed text-slate-700 sm:text-lg sm:leading-loose">
                {message}
              </p>
            </motion.div>

            <motion.div variants={item}>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-rose-700">
                With all my love
              </p>
              <p
                className="break-words text-4xl"
                style={{ fontFamily: "var(--font-great-vibes), cursive", ...GOLD_TEXT }}
              >
                {senderName}
              </p>
            </motion.div>

            <motion.div variants={item} className="mb-6 mt-16">
              <WishletBranding theme="rose" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
