import { registerPlugin } from "@capacitor/core";

export interface ShareToStoryOptions {
  /** file:// URI of a PNG or MP4 in the app cache directory. */
  filePath: string;
  /** Defaults to "image/png"; use "video/mp4" for the animated story. */
  mimeType?: string;
  topColor?: string;
  bottomColor?: string;
}

export interface InstagramStoriesPlugin {
  shareToStory(options: ShareToStoryOptions): Promise<{ shared: boolean }>;
}

export const InstagramStories = registerPlugin<InstagramStoriesPlugin>("InstagramStories");
