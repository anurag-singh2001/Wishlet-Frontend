/**
 * Google Fonts each story card renders with. The `next/og` renderer can't use the
 * `next/font` faces from `kit/fonts.ts`, so the story route loads these by name
 * (see `load-fonts.ts`). Cards reference them through the family constants below.
 */
export type StoryFontWeight = 400 | 600 | 700;

export interface StoryFontFamily {
  family: string;
  faces: { weight: StoryFontWeight; italic?: boolean }[];
}

export const PLAYFAIR = "Playfair Display";
export const CAVEAT = "Caveat";
export const GREAT_VIBES = "Great Vibes";
export const BRICOLAGE = "Bricolage Grotesque";
export const SPACE_GROTESK = "Space Grotesk";

const playfair: StoryFontFamily = {
  family: PLAYFAIR,
  faces: [{ weight: 400 }, { weight: 700 }, { weight: 400, italic: true }],
};
const caveat: StoryFontFamily = { family: CAVEAT, faces: [{ weight: 400 }, { weight: 700 }] };
const greatVibes: StoryFontFamily = { family: GREAT_VIBES, faces: [{ weight: 400 }] };
const bricolage: StoryFontFamily = { family: BRICOLAGE, faces: [{ weight: 400 }, { weight: 700 }] };
const spaceGrotesk: StoryFontFamily = {
  family: SPACE_GROTESK,
  faces: [{ weight: 400 }, { weight: 700 }],
};

// The first family is the card's base font.
const STORY_FONTS: Record<string, StoryFontFamily[]> = {
  "birthday-minimal": [playfair, caveat],
  "birthday-neon": [spaceGrotesk],
  "anniversary-elegant": [playfair, greatVibes],
  "anniversary-cinematic": [playfair],
  "thank-you-simple": [playfair, caveat],
  "thank-you-botanical": [caveat],
  "congratulations-celebration": [bricolage],
  "congratulations-gold": [playfair],
  "sorry-sincere": [playfair, greatVibes],
  "sorry-rain-to-sun": [playfair],
};

/** Unknown templates get no custom fonts, so `next/og` uses its built-in default. */
export function getStoryFonts(templateId: string): StoryFontFamily[] {
  return STORY_FONTS[templateId] ?? [];
}
