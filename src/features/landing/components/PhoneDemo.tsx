"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";
import type { TemplateProps } from "@/features/templates/types";

const DEMOS: { id: string; occasion: string; message: string }[] = [
  {
    id: "birthday-minimal",
    occasion: "birthday",
    message: "You make every day brighter. Can't wait to celebrate!",
  },
  {
    id: "anniversary-cinematic",
    occasion: "anniversary",
    message: "Every year with you is my favourite one yet.",
  },
  {
    id: "congratulations-gold",
    occasion: "congratulations",
    message: "You earned every bit of this. So proud of you!",
  },
  {
    id: "thank-you-botanical",
    occasion: "thank-you",
    message: "Thank you for always being there when it counted.",
  },
];
const INTERVAL_MS = 4000;

function propsFor(d: (typeof DEMOS)[number]): TemplateProps {
  return {
    recipientName: "Priya",
    senderName: "Rahul",
    message: d.message,
    occasion: d.occasion,
    photos: [],
    content: {},
  };
}

export function PhoneDemo(): React.JSX.Element {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % DEMOS.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [reduce]);

  const demo = DEMOS[index];

  return (
    <div className="relative flex justify-center">
      <div
        aria-hidden="true"
        className="absolute top-10 hidden h-[440px] w-[440px] rounded-full md:block"
        style={{ background: "radial-gradient(circle, #E9E6FF 0%, rgba(233,230,255,0) 70%)" }}
      />
      <div
        role="img"
        aria-label="Live preview of Wishlet designs for Priya"
        className="relative h-[470px] w-[240px] rounded-[38px] bg-ink p-[10px] shadow-[0_24px_48px_rgba(79,70,229,0.18)] [--s:0.564] md:h-[620px] md:w-[300px] md:rounded-[44px] md:p-3 md:shadow-[0_30px_60px_rgba(79,70,229,0.18)] md:[--s:0.708]"
      >
        <div className="pointer-events-none relative h-full w-full select-none overflow-hidden rounded-[30px] bg-white md:rounded-[34px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={demo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.8 }}
              className="absolute left-1/2 top-1/2 w-[390px] origin-center overflow-hidden"
              style={{ height: "100dvh", transform: "translate(-50%, -50%) scale(var(--s))" }}
            >
              <TemplateRenderer templateId={demo.id} props={propsFor(demo)} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-[60px] left-0 flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-3 text-sm font-semibold md:bottom-[70px]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Opened 3 times
      </div>
    </div>
  );
}
