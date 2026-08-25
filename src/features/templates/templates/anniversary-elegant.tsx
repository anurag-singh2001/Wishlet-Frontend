import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import type { TemplateProps } from "../types";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { WishletBranding } from "../components/WishletBranding";

export default function AnniversaryElegant({ recipientName, senderName, message, photos }: TemplateProps) {
  const hasPhoto = photos && photos.length > 0;
  const photoUrl = hasPhoto ? photos[0] : null;
  const [isOpen, setIsOpen] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 45, damping: 15 } },
  };

  const photoVariants = prefersReducedMotion ? itemVariants : {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div className="min-h-[100dvh] bg-[#fffbfb] flex flex-col items-center justify-center py-12 px-6 font-sans relative overflow-hidden text-slate-800">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center max-w-sm z-50 cursor-pointer group"
            onClick={() => setIsOpen(true)}
            role="button"
            aria-label="Open your anniversary wish"
          >
            <motion.div 
              animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full shadow-2xl shadow-rose-100 flex items-center justify-center mb-8 border border-rose-50 group-hover:scale-105 group-hover:shadow-rose-200 transition-all duration-500"
            >
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 fill-rose-100" strokeWidth={1} />
            </motion.div>
            <h2 className="text-2xl font-serif text-slate-700 mb-3 italic">A special wish for you</h2>
            <p className="text-rose-400 font-sans font-semibold tracking-[0.25em] uppercase text-xs animate-pulse">
              Tap to open
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
            {isOpen && (
              <>
                <AmbientGlow color1="#ffe4e6" color2="#fff1f2" opacity={0.6} />
                <FloatingParticles 
                  count={12} 
                  shape="heart" 
                  colors={["#fda4af", "#fecdd3"]} 
                  minSize={16} 
                  maxSize={32} 
                  speed="slow" 
                  opacity={0.4} 
                />
              </>
            )}

            <motion.div variants={itemVariants} className="font-sans uppercase tracking-[0.3em] text-[10px] font-bold text-rose-400 mb-6 z-10">
              Anniversary
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-rose-950 mb-8 sm:mb-10 leading-tight z-10 px-4 w-full italic break-words max-w-full"
            >
              Happy Anniversary,<br/>
              <span className="font-serif not-italic font-semibold text-rose-700 break-words">{recipientName}</span>
            </motion.h1>

            {photoUrl && (
              <motion.div
                variants={photoVariants}
                whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
                className="w-full max-w-md mx-auto mb-10 sm:mb-14 bg-white p-3 pb-10 rounded-sm shadow-2xl shadow-rose-900/5 z-10 -rotate-1 border border-rose-50"
              >
                <div className="w-full aspect-[4/3] overflow-hidden bg-rose-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoUrl} alt="Anniversary memory" className="w-full h-full object-cover sepia-[0.1]" />
                </div>
              </motion.div>
            )}

            <motion.div 
              variants={itemVariants}
              className="relative z-10 w-full px-4 sm:px-8 md:px-12 mb-10 sm:mb-12"
            >
              <div className="w-12 h-px bg-rose-200 mx-auto mb-8" />
              <p className="text-base sm:text-lg md:text-xl text-slate-700 font-serif leading-relaxed sm:leading-loose font-normal whitespace-pre-wrap break-words max-w-full">
                {message}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 text-slate-800 z-10"
            >
              <p className="text-xs text-rose-400 font-sans uppercase tracking-[0.25em] mb-2 font-semibold">With all my love,</p>
              <p className="text-2xl sm:text-3xl font-serif italic text-rose-900 break-words">{senderName}</p>
            </motion.div>


            <motion.div
              variants={itemVariants}
              className="mt-16 sm:mt-24 mb-8 z-10"
            >
              <WishletBranding theme="rose" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

