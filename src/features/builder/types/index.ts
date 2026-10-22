export interface BuilderState {
  occasion: string;
  templateId: string;
  recipientName: string;
  senderName: string;
  message: string;
  photos: string[]; // preview / Cloudinary URLs
  photoPublicId?: string;
  /** Optional voice message, already uploaded to Cloudinary. */
  voice?: VoiceClip;
  /** Recipients may react to the wish (default true). */
  reactionsEnabled?: boolean;
}

export interface VoiceClip {
  url: string;
  publicId: string;
  /** Seconds, at most 60. */
  duration: number;
}

export interface ApiTemplate {
  id: string;
  name: string;
  occasion: string;
  description: string;
}

export type BuilderStep = 1 | 2 | 3;
