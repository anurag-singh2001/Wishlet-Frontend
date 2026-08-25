import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import type { TemplateProps } from "../types";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { WishletBranding } from "../components/WishletBranding";

export default function CongratulationsCelebration({ recipientName, senderName, message, photos }: TemplateProps) {
  const hasPhoto = photos && photos.length > 0;
  const photoUrl = hasPhoto ? photos[0] : null;
  const [isOpen, setIsOpen] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9, y: prefersReducedMotion ? 0 : 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 15 } },
  };

  return (
    <div className="min-h-[100dvh] bg-[#f0f9ff] flex flex-col items-center justify-center py-12 px-6 font-sans relative overflow-hidden text-slate-800">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center max-w-sm z-50 cursor-pointer group"
            onClick={() => setIsOpen(true)}
            role="button"
            aria-label="Open your congratulations message"
          >
            <motion.div 
              animate={prefersReducedMotion ? {} : { rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl shadow-xl shadow-sky-200/50 flex items-center justify-center mb-6 border-2 border-sky-100 group-hover:scale-105 group-hover:border-sky-300 transition-all duration-300 rotate-3"
            >
              <Star className="w-12 h-12 text-sky-400 fill-sky-200" strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-xl font-bold font-sans text-sky-900 mb-2">Great news inside</h2>
            <p className="text-sky-500 font-sans font-black tracking-[0.2em] uppercase text-xs animate-pulse">
              Tap to open
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-2xl w-full flex flex-col items-center text-center z-10"
          >
            {isOpen && (
              <>
                <AmbientGlow color1="#bae6fd" color2="#e0f2fe" opacity={0.5} />
                <FloatingParticles 
                  count={25} 
                  shape="star" 
                  colors={["#38bdf8", "#7dd3fc", "#e0f2fe"]} 
                  minSize={6} 
                  maxSize={18} 
                  speed="normal" 
                  opacity={0.7} 
                />
              </>
            )}
            
            {!prefersReducedMotion && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1, rotate: 180 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <div className="w-[150vw] h-[150vw] max-w-[800px] max-h-[800px] bg-[conic-gradient(var(--tw-gradient-stops))] from-transparent via-sky-300 to-transparent rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
              </motion.div>
            )}

            <motion.div 
              variants={itemVariants}
              className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center text-4xl mb-8 shadow-inner shadow-sky-200 z-10"
            >
              🏆
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-6xl font-black font-sans text-sky-950 mb-6 tracking-tight uppercase z-10 px-4 w-full break-words max-w-full"
            >
              Way to go,<br />
              <span className="text-sky-500 break-words">{recipientName}!</span>
            </motion.h1>

            {photoUrl && (
              <motion.div
                variants={itemVariants}
                className="w-full max-w-sm mx-auto mb-8 sm:mb-10 bg-white p-3 rounded-2xl shadow-xl shadow-sky-900/10 z-10 border-2 border-sky-50"
              >
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-sky-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoUrl} alt="Celebration memory" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            )}

            <motion.div 
              variants={itemVariants}
              className="relative z-10 w-full px-4 sm:px-8 md:px-16 mb-8 sm:mb-12 bg-white/50 backdrop-blur-sm py-6 sm:py-8 rounded-3xl"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-slate-800 leading-relaxed font-sans font-semibold whitespace-pre-wrap break-words max-w-full">
                {message}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-4 text-slate-800 z-10 bg-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-md shadow-sky-900/5 inline-block max-w-full"
            >
              <p className="text-xs text-sky-400 font-sans font-bold uppercase tracking-widest mb-1">Cheering for you,</p>
              <p className="text-lg sm:text-xl font-sans font-extrabold text-sky-900 break-words">{senderName}</p>
            </motion.div>


            <motion.div
              variants={itemVariants}
              className="mt-12 sm:mt-16 mb-4 z-10"
            >
              <WishletBranding theme="sky" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

