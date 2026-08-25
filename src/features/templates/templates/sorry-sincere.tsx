import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { HeartCrack } from "lucide-react";
import type { TemplateProps } from "../types";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { WishletBranding } from "../components/WishletBranding";

export default function SorrySincere({ recipientName, senderName, message, photos }: TemplateProps) {
  const hasPhoto = photos && photos.length > 0;
  const photoUrl = hasPhoto ? photos[0] : null;
  const [isOpen, setIsOpen] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] flex flex-col items-center justify-center py-12 px-6 font-sans relative overflow-hidden text-slate-800">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center text-center max-w-sm z-50 cursor-pointer group"
            onClick={() => setIsOpen(true)}
            role="button"
            aria-label="Open your message"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-8 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
              <HeartCrack className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" strokeWidth={1} />
            </div>
            <h2 className="text-lg font-serif text-slate-500 mb-2 italic tracking-wide">A sincere note</h2>
            <p className="text-slate-400 font-sans text-[10px] uppercase tracking-[0.2em] animate-pulse">
              Tap to read
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-xl w-full flex flex-col items-center text-center z-10"
          >
            {isOpen && <AmbientGlow color1="#f1f5f9" color2="#e2e8f0" opacity={0.5} />}

            <motion.div variants={itemVariants} className="mb-12 opacity-30 z-10">
              <HeartCrack className="w-8 h-8 text-slate-400" strokeWidth={1} />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-light sm:font-normal text-slate-700 mb-8 sm:mb-12 leading-relaxed z-10 px-4 w-full break-words max-w-full"
            >
              Dear <span className="font-serif font-semibold text-slate-900">{recipientName}</span>,
            </motion.h1>

            {photoUrl && (
              <motion.div
                variants={itemVariants}
                className="w-full max-w-sm mx-auto mb-10 sm:mb-12 bg-white p-2 pb-8 shadow-sm z-10 border border-slate-200 grayscale opacity-80"
              >
                <div className="w-full aspect-square overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoUrl} alt="A sincere memory" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            )}

            <motion.div 
              variants={itemVariants}
              className="relative z-10 w-full px-4 sm:px-8 md:px-12 mb-12 sm:mb-16"
            >
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed sm:leading-loose font-serif font-normal whitespace-pre-wrap break-words max-w-full italic">
                &ldquo;{message}&rdquo;
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-slate-800 z-10"
            >
              <p className="text-xs sm:text-sm text-slate-400 font-sans uppercase tracking-[0.2em] mb-2 font-normal">Sincerely,</p>
              <p className="text-xl sm:text-2xl font-serif font-normal text-slate-800 break-words">{senderName}</p>
            </motion.div>


            <motion.div
              variants={itemVariants}
              className="mt-16 sm:mt-24 mb-4 z-10"
            >
              <WishletBranding theme="slate" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

