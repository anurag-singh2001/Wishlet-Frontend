import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import type { TemplateProps } from "../types";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { WishletBranding } from "../components/WishletBranding";

export default function BirthdayMinimalTemplate({
  recipientName,
  senderName,
  message,
  photos,
}: TemplateProps) {
  const hasPhoto = photos && photos.length > 0;
  const photoUrl = hasPhoto ? photos[0] : null;
  
  const [isOpen, setIsOpen] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 15 } },
  };

  const photoVariants = prefersReducedMotion ? itemVariants : {
    hidden: { opacity: 0, scale: 0.9, rotate: -4, y: 20 },
    show: { opacity: 1, scale: 1, rotate: 1, y: 0, transition: { type: "spring" as const, stiffness: 40, damping: 12 } },
  };

  return (
    <div className="min-h-[100dvh] bg-[#fdfbf7] flex flex-col items-center justify-center py-12 px-6 font-sans relative overflow-hidden text-slate-800">
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center max-w-sm z-50 cursor-pointer group"
            onClick={() => setIsOpen(true)}
            role="button"
            aria-label="Open your birthday wish"
          >
            <motion.div 
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full shadow-xl flex items-center justify-center mb-8 border border-rose-100 group-hover:shadow-rose-200/50 group-hover:scale-105 transition-all duration-300"
            >
              <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-rose-400" strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-2xl font-serif text-slate-700 mb-3 tracking-tight">A special wish for you</h2>
            <p className="text-slate-500 font-sans font-semibold tracking-[0.2em] uppercase text-xs animate-pulse">
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
            {/* Background Confetti */}
            {isOpen && (
              <FloatingParticles 
                count={35} 
                colors={["#f43f5e", "#8b5cf6", "#10b981", "#f59e0b", "#3b82f6"]} 
                shape="circle"
                minSize={6}
                maxSize={10}
                opacity={0.8}
              />
            )}

            <motion.div variants={itemVariants} className="font-sans uppercase tracking-[0.25em] text-xs font-bold text-rose-400 mb-8 z-10">
              Happy Birthday
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-slate-800 mb-8 sm:mb-10 leading-tight z-10 px-4 break-words max-w-full w-full"
            >
              To <span className="text-rose-500 italic font-serif break-words">{recipientName}</span>
            </motion.h1>

            {photoUrl && (
              <motion.div
                variants={photoVariants}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02, rotate: 0 }}
                className="w-full max-w-sm mx-auto mb-10 sm:mb-12 bg-white p-3 sm:p-4 pb-10 sm:pb-12 rounded-sm shadow-xl z-10 border border-slate-100"
              >
                <div className="w-full aspect-square overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoUrl} alt="A special memory" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            )}

            <motion.div 
              variants={itemVariants}
              className="relative z-10 w-full px-4 sm:px-8 md:px-12"
            >
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-sans font-normal whitespace-pre-wrap break-words max-w-full">
                {message}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-12 text-slate-800 z-10"
            >
              <p className="text-xs text-slate-400 font-sans uppercase tracking-[0.2em] mb-2 font-medium">With love,</p>
              <p className="text-xl sm:text-2xl font-serif italic text-rose-800 break-words">{senderName}</p>
            </motion.div>


            <motion.div
              variants={itemVariants}
              className="mt-16 sm:mt-20 mb-8 z-10"
            >
              <WishletBranding theme="rose" />
            </motion.div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
