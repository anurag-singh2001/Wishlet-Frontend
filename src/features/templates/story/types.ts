export interface StoryCardProps {
  recipientName: string;
  senderName: string;
  message: string;
  photo?: string;
  occasion: string;
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
}
