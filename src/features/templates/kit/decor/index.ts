/**
 * Decor kit: tiny inline-SVG ornaments (aria-hidden, no external assets).
 *
 * Usage:
 *   import { Balloon, Heart } from "../kit/decor";
 *   <Balloon size={60} color="#f43f5e" className="absolute left-4 top-8" animate />
 *   <Flower colors={["#f9a8d4", "#facc15"]} />   // Flower, Trophy take `colors`
 *
 * Common props: className, size (px width), animate (fade/float in).
 * `animate` is skipped when the user prefers reduced motion.
 * Components: Balloon, Rings, Flower, LightRays, Star, Heart,
 * HandDrawnUnderline, Trophy, Petal. All are client components.
 */
export { Balloon } from "./Balloon";
export { Rings } from "./Rings";
export { Flower } from "./Flower";
export { LightRays } from "./LightRays";
export { Star } from "./Star";
export { Heart } from "./Heart";
export { HandDrawnUnderline } from "./HandDrawnUnderline";
export { Trophy } from "./Trophy";
export { Petal } from "./Petal";
