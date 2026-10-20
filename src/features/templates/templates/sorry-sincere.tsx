import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "../types";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { WishletBranding } from "../components/WishletBranding";
import { greatVibes, playfair } from "../kit/fonts";
import { Breathing } from "./sorry-sincere-parts/Breathing";
import { Signature } from "./sorry-sincere-parts/Signature";

const STEP = 1.1;
const QUICK_STEP = 0.15;

/** Split into lines: keep user line breaks, else break after sentences. */
function toLines(message: string): string[] {
  const byBreak = message
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (byBreak.length > 1) return byBreak;
  return (message.match(/[^.!?]+[.!?]*\s*/g) ?? [message]).map((l) => l.trim()).filter(Boolean);
}

export default function SorrySincere({
  recipientName,
  senderName,
  message,
  photos,
  autoOpen,
}: TemplateProps): React.JSX.Element {
  const photoUrl = photos && photos.length > 0 ? photos[0] : null;
  const [isOpen, setIsOpen] = useState(Boolean(autoOpen));
  const reduced = useReducedMotion();
  const lines = toLines(message ?? "");
  const step = autoOpen ? QUICK_STEP : STEP;
  const base = autoOpen ? 0.3 : 1.4;
  const fade = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: autoOpen ? 0.6 : 1.4, delay, ease: "easeOut" as const },
  });

  return (
    <div
      className={`${playfair.variable} ${greatVibes.variable} relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pt-12 pb-28 text-[#3b4560]`}
      style={{
        fontFamily: "var(--font-playfair), serif",
        background: "linear-gradient(180deg, #eef1fa 0%, #e6e6f5 55%, #dfe3f3 100%)",
      }}
    >
      <Breathing />
      <AmbientGlow color1="#c7d2f0" color2="#d9d0f0" opacity={0.6} />
      <FloatingParticles
        count={10}
        colors={["#ffffff", "#c9d1f2"]}
        minSize={3}
        maxSize={8}
        speed="slow"
        opacity={0.3}
      />
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="gate"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open your message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <span className="mb-6 h-3 w-3 rounded-full bg-[#9aa6d6]/70" />
            <span className="mb-2 text-lg italic tracking-wide text-[#5b6aa8]">A quiet note</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7a86ad]">
              Tap to read
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="note"
            className="relative z-10 flex w-full max-w-xl flex-col items-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              {...fade(autoOpen ? 0.1 : 0.3)}
              className="mb-8 w-full break-words text-2xl sm:text-3xl"
            >
              Dear <span className="font-semibold">{recipientName}</span>,
            </motion.h1>
            {photoUrl && (
              <motion.div
                {...fade(autoOpen ? 0.2 : 0.8)}
                className="mb-8 w-48 overflow-hidden rounded-full border-4 border-white/70 shadow-lg shadow-indigo-200/50 sm:w-56"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt="A shared memory"
                  className="aspect-square w-full object-cover"
                />
              </motion.div>
            )}
            <div className="mb-10 w-full space-y-3 px-2 text-base leading-relaxed text-[#46517a] sm:text-lg">
              {lines.map((line, i) => (
                <motion.p key={i} {...fade(base + i * step)} className="break-words italic">
                  {line}
                </motion.p>
              ))}
            </div>
            <Signature
              quick={autoOpen}
              senderName={senderName}
              delay={base + 0.4 + lines.length * step}
            />
            <motion.div
              {...fade((autoOpen ? 0.6 : 5.5) + lines.length * step)}
              className="mb-2 mt-14"
            >
              <WishletBranding theme="slate" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
