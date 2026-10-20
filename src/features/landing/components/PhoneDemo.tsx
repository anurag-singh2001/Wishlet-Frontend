"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";
import type { TemplateProps } from "@/features/templates/types";

interface Demo {
  id: string;
  label: string;
  recipientName: string;
  senderName: string;
  message: string;
  occasion: string;
}

const DEMOS: Demo[] = [
  {
    id: "birthday-minimal",
    label: "Birthday � Minimal",
    occasion: "birthday",
    recipientName: "Priya",
    senderName: "Rahul",
    message: "Happy birthday! You make every day brighter. Can't wait to celebrate with you.",
  },
  {
    id: "anniversary-cinematic",
    label: "Anniversary � Cinematic",
    occasion: "anniversary",
    recipientName: "Meera",
    senderName: "Arjun",
    message: "Five years of us, and I'd choose you every single time.",
  },
  {
    id: "congratulations-gold",
    label: "Congratulations � Black & Gold",
    occasion: "congratulations",
    recipientName: "Kabir",
    senderName: "Team",
    message: "You did it! So proud of you, the new job is lucky to have you.",
  },
  {
    id: "thank-you-botanical",
    label: "Thank you � Botanical",
    occasion: "thank-you",
    recipientName: "Mom",
    senderName: "Ananya",
    message: "Thank you for every packed lunch and every late-night talk.",
  },
];
const INTERVAL_MS = 5000;

function propsFor(d: Demo): TemplateProps {
  return {
    recipientName: d.recipientName,
    senderName: d.senderName,
    message: d.message,
    occasion: d.occasion,
    photos: [],
    content: {},
    autoOpen: true,
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
    <div className="relative flex flex-col items-center gap-3">
      <div
        aria-hidden="true"
        className="absolute top-10 hidden h-[440px] w-[440px] rounded-full md:block"
        style={{ background: "radial-gradient(circle, #E9E6FF 0%, rgba(233,230,255,0) 70%)" }}
      />
      <div
        role="img"
        aria-label={`Example wish: ${demo.label}`}
        className="relative h-[470px] w-[240px] rounded-[38px] bg-ink p-[10px] shadow-[0_24px_48px_rgba(79,70,229,0.18)] [--s:0.533] md:h-[620px] md:w-[300px] md:rounded-[44px] md:p-3 md:shadow-[0_30px_60px_rgba(79,70,229,0.18)] md:[--s:0.692]"
      >
        <div className="pointer-events-none relative h-full w-full select-none overflow-hidden rounded-[30px] bg-white md:rounded-[34px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={demo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.8 }}
              className="absolute left-1/2 top-1/2 h-[844px] w-[390px] origin-center overflow-hidden"
              style={{ transform: "translate(-50%, -50%) scale(var(--s))" }}
            >
              <TemplateRenderer templateId={demo.id} props={propsFor(demo)} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="relative text-sm font-semibold text-ink" aria-live="polite">
        {demo.label}
      </p>
      <div className="relative flex items-center">
        {DEMOS.map((d, i) => (
          <button
            key={d.id}
            type="button"
            aria-label={`Show ${d.label} example`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-5 bg-brand" : "w-2 bg-hairline"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
