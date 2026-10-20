import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TemplateProps } from "../types";
import { playfair } from "../kit/fonts";
import { KenBurnsPhoto } from "../components/animations/KenBurnsPhoto";
import { AmbientGlow } from "../components/animations/AmbientGlow";
import { FloatingParticles } from "../components/animations/FloatingParticles";
import { WishletBranding } from "../components/WishletBranding";

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.2 -0.1'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
  );

function FilmBackdrop({
  photo,
  still,
}: {
  photo: string | null;
  still: boolean;
}): React.JSX.Element {
  return (
    <div className="absolute inset-0 bg-[#07060a]">
      {photo ? (
        <KenBurnsPhoto
          src={photo}
          alt="Our anniversary"
          className="h-full w-full brightness-[0.55] saturate-[0.85]"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 70% 20%, #7c2d3f 0%, transparent 55%), radial-gradient(100% 70% at 15% 90%, #1e3a5f 0%, transparent 60%), linear-gradient(160deg, #1a0b14, #07060a)",
          }}
        />
      )}
      {!photo && <AmbientGlow color1="#be4d63" color2="#d9a441" opacity={0.18} />}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 160px 40px rgba(0,0,0,0.85)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_SVG}")`, backgroundSize: "220px 220px" }}
        animate={still ? undefined : { x: [0, -14, 9, -6, 0], y: [0, 8, -12, 5, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function AnniversaryCinematic({
  recipientName,
  senderName,
  message,
  photos,
  autoOpen,
}: TemplateProps): React.JSX.Element {
  const reduced = !!useReducedMotion();
  const photo = photos && photos.length > 0 ? photos[0] : null;
  const fade = (delay: number): React.ComponentProps<typeof motion.div> => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : autoOpen ? 0.6 : 1.4,
      delay: reduced ? 0 : autoOpen ? delay * 0.15 : delay,
      ease: "easeOut",
    },
  });
  const bar = {
    // Percent of the template root, not the viewport, so it stays inside preview frames.
    initial: { height: reduced || autoOpen ? "9%" : "50%" },
    animate: { height: "9%" },
    transition: { duration: 2, delay: 0.3, ease: [0.76, 0, 0.24, 1] as const },
  };

  return (
    <div
      className={`${playfair.variable} ${playfair.className} relative min-h-[100dvh] overflow-hidden text-stone-100`}
    >
      <FilmBackdrop photo={photo} still={reduced} />
      {!reduced && (
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
            count={14}
            shape="circle"
            colors={["#f5e6c8"]}
            minSize={2}
            maxSize={5}
            speed="slow"
            opacity={0.3}
          />
        </div>
      )}

      <main className="relative z-10 mx-auto flex min-h-[100dvh] max-w-xl flex-col items-center justify-center px-6 pb-28 pt-[14dvh] text-center">
        <motion.p
          {...fade(1.8)}
          className="mb-6 text-[10px] uppercase tracking-[0.5em] text-amber-200/80"
        >
          A story of us
        </motion.p>
        <motion.h1
          {...fade(2.2)}
          className="mb-8 max-w-full break-words text-4xl font-medium leading-tight tracking-wide drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl"
        >
          Happy Anniversary
          <span className="mt-3 block text-2xl font-normal italic text-amber-100 sm:text-3xl">
            {recipientName}
          </span>
        </motion.h1>
        <motion.div {...fade(2.8)} className="mb-8 h-px w-16 bg-amber-200/60" />
        <motion.p
          {...fade(3.2)}
          className="mb-10 max-w-full whitespace-pre-wrap break-words text-base leading-relaxed text-stone-200 sm:text-lg"
        >
          {message}
        </motion.p>
        <motion.div {...fade(3.8)}>
          <p className="mb-1 text-[10px] uppercase tracking-[0.4em] text-amber-200/70">
            Always yours
          </p>
          <p className="break-words text-2xl italic text-amber-100">{senderName}</p>
        </motion.div>
        <motion.div {...fade(4.2)} className="mt-14">
          <WishletBranding theme="night" />
        </motion.div>
      </main>

      <motion.div
        aria-hidden
        {...bar}
        className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-black"
      />
      <motion.div
        aria-hidden
        {...bar}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-black"
      />
    </div>
  );
}
