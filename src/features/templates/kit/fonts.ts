/**
 * Template font kit (server-importable; no "use client").
 *
 * Usage in a template:
 *   import { playfair } from "../kit/fonts";
 *   <div className={playfair.variable}>
 *     <h1 style={{ fontFamily: "var(--font-playfair)" }}>Hello</h1>
 *   </div>
 *
 * Each face is exported separately so a template only pulls in what it uses.
 * Variables: --font-playfair, --font-caveat, --font-bricolage,
 * --font-space-grotesk, --font-great-vibes. All use display: "swap", latin subset.
 * Use `.className` instead of `.variable` to apply the face directly.
 */
import {
  Bricolage_Grotesque,
  Caveat,
  Great_Vibes,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});
