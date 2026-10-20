import { registerPlugin } from "@capacitor/core";

export interface ShareToStoryOptions {
  /** file:// URI of a PNG in the app cache directory. */
  filePath: string;
  topColor?: string;
  bottomColor?: string;
}

export interface InstagramStoriesPlugin {
  shareToStory(options: ShareToStoryOptions): Promise<{ shared: boolean }>;
}

export const InstagramStories = registerPlugin<InstagramStoriesPlugin>("InstagramStories");
