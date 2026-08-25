import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";
import type { TemplateProps } from "../types";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { WishletBranding } from "../components/WishletBranding";

export default function ThankYouSimple({ recipientName, senderName, message, photos }: TemplateProps) {
  const hasPhoto = photos && photos.length > 0;
  const photoUrl = hasPhoto ? photos[0] : null;
  const [isOpen, setIsOpen] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 15 } },
  };

  return (
    <div className="min-h-[100dvh] bg-[#f2fdf7] flex flex-col items-center justify-center py-12 px-6 font-sans relative overflow-hidden text-slate-800">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center max-w-sm z-50 cursor-pointer group"
            onClick={() => setIsOpen(true)}
            role="button"
            aria-label="Open your thank you note"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
              <MailOpen className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-medium text-emerald-900 mb-2">A note of appreciation</h2>
            <p className="text-emerald-500 font-semibold tracking-wider uppercase text-xs animate-pulse">
              Tap to open
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-3xl w-full flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl shadow-emerald-900/5 overflow-hidden border border-emerald-50 z-10"
          >
            {isOpen && (
              <>
                <AmbientGlow color1="#d1fae5" color2="#a7f3d0" opacity={0.4} />
                <FloatingParticles 
                  count={15} 
                  shape="circle" 
                  colors={["#6ee7b7", "#34d399"]} 
                  minSize={3} 
                  maxSize={8} 
                  speed="slow" 
                  opacity={0.4} 
                />
              </>
            )}

            {photoUrl && (
              <motion.div 
                variants={itemVariants}
                className="md:w-2/5 h-64 md:h-auto relative overflow-hidden bg-emerald-50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoUrl} alt="Thank you memory" className="w-full h-full object-cover" />
              </motion.div>
            )}

            <div className={`p-6 sm:p-10 md:p-14 flex-1 flex flex-col justify-center ${!hasPhoto ? "py-12 sm:py-16 items-center text-center max-w-xl mx-auto" : ""}`}>
              <motion.div variants={itemVariants} className={`w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mb-6 ${!hasPhoto ? "mx-auto" : ""}`}>
                🙏
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight break-words max-w-full"
              >
                Thank You, <span className="font-serif italic font-medium text-emerald-700">{recipientName}</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-8 font-sans font-normal whitespace-pre-wrap break-words max-w-full"
              >
                {message}
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className={`mt-auto pt-6 border-t border-slate-100 ${!hasPhoto ? "w-full max-w-xs text-center" : ""}`}
              >
                <p className="text-xs text-slate-400 font-sans font-semibold uppercase tracking-[0.2em] mb-1">Warmly,</p>
                <p className="text-xl font-serif font-semibold text-slate-800 break-words">{senderName}</p>
              </motion.div>


              <motion.div
                variants={itemVariants}
                className={`mt-10 pt-4 ${!hasPhoto ? "flex justify-center" : ""}`}
              >
                <WishletBranding theme="emerald" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

