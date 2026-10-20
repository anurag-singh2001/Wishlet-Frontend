import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TemplateProps } from "../types";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { WishletBranding } from "../components/WishletBranding";
import { Star } from "../kit/decor";
import { spaceGrotesk } from "../kit/fonts";
import { NeonBalloons, NEON_COLORS } from "./birthday-neon-balloons";

const PINK_GLOW = "0 0 6px #fff, 0 0 18px #ff2e97, 0 0 40px #ff2e97, 0 0 80px #ff2e97";
const CYAN_GLOW = "0 0 6px #fff, 0 0 16px #22d3ee, 0 0 36px #22d3ee";

export default function BirthdayNeonTemplate({
  recipientName,
  senderName,
  message,
  photos,
}: TemplateProps) {
  const photoUrl = photos && photos.length > 0 ? photos[0] : null;
  const reduced = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div
      className={`${spaceGrotesk.variable} relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#07040f] px-6 pb-28 pt-14 text-white`}
      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
    >
      <AmbientGlow color1="#ff2e97" color2="#22d3ee" opacity={0.35} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          maskImage:
            "linear-gradient(90deg,#000 0,#000 18%,transparent 18%,transparent 82%,#000 82%)",
          WebkitMaskImage:
            "linear-gradient(90deg,#000 0,#000 18%,transparent 18%,transparent 82%,#000 82%)",
        }}
      >
        <FloatingParticles
          count={18}
          colors={NEON_COLORS}
          shape="star"
          minSize={5}
          maxSize={10}
          opacity={0.7}
        />
      </div>
      <NeonBalloons />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.18, delayChildren: 0.2 }}
        className="relative z-10 flex w-full max-w-md flex-col items-center text-center"
      >
        <motion.p
          variants={item}
          className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em]"
          style={{ color: "#22d3ee", textShadow: CYAN_GLOW }}
        >
          <Star size={14} /> Happy Birthday <Star size={14} />
        </motion.p>

        <motion.h1
          variants={item}
          className="mb-8 w-full break-words text-5xl font-bold leading-tight sm:text-6xl"
          style={{ color: "#ffd1ea", textShadow: PINK_GLOW }}
        >
          {recipientName}
        </motion.h1>

        {photoUrl && (
          <motion.div
            variants={item}
            className="mb-8 aspect-square w-56 overflow-hidden rounded-full border-2 border-[#22d3ee] sm:w-64"
            style={{ boxShadow: "0 0 14px #22d3ee, 0 0 40px #22d3ee66, inset 0 0 14px #22d3ee55" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoUrl} alt="A special memory" className="h-full w-full object-cover" />
          </motion.div>
        )}

        <motion.div
          variants={item}
          className="w-full rounded-2xl border border-[#b967ff66] bg-white/5 px-5 py-6 backdrop-blur-sm"
          style={{ boxShadow: "0 0 24px #b967ff33" }}
        >
          <p className="whitespace-pre-wrap break-words text-base leading-relaxed text-slate-100 sm:text-lg">
            {message}
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <p className="mb-1 text-xs uppercase tracking-[0.25em] text-slate-300">With love</p>
          <p
            className="break-words text-2xl font-bold"
            style={{ color: "#a3ff12", textShadow: "0 0 12px #a3ff12aa" }}
          >
            {senderName}
          </p>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 text-[11px] uppercase tracking-widest text-slate-300"
        >
          Tap a balloon to pop it
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <WishletBranding theme="night" />
        </motion.div>
      </motion.div>
    </div>
  );
}
