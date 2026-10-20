export const FPS = 30;
export const DURATION_S = 15;
export const TOTAL_FRAMES = FPS * DURATION_S;
export const KEYFRAME_EVERY = FPS * 2;
export const ZOOM_END = 1.08;
export const FADE_IN_S = 1.5;
export const CROSSFADE_S = 0.8;
export const END_CARD_START_S = 12;
/** Times at which reveal stages 1..4 start crossfading in. */
export const STAGE_STARTS_S = [1.5, 3, 5, 8];
export const STAGE_COUNT = 5;

export const FONT_FAMILY = "WishletPlayfair";
export const FONT_FALLBACK = "Georgia, 'Times New Roman', serif";

export function easeInOut(x: number): number {
  const t = Math.min(1, Math.max(0, x));
  return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);
}

/** 0..1 progress of a ramp starting at `start` and lasting `len` seconds. */
export function ramp(t: number, start: number, len: number): number {
  return easeInOut((t - start) / len);
}
