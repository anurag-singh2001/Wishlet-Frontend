export interface StoryCardProps {
  recipientName: string;
  senderName: string;
  message: string;
  photo?: string;
  occasion: string;
  /** Reveal stage 0-4 for the animated story; undefined shows everything. */
  reveal?: number;
}

export interface StoryPalette {
  bg: string;
  accent: string;
  title: string;
  heading: string;
  body: string;
  muted: string;
  frame: string;
  serif: boolean;
  /** Base font family; must be loaded for the template in `fonts.ts`. */
  font?: string;
}
