import { Capacitor } from "@capacitor/core";
import { canRenderStoryVideo, renderStoryVideo } from "./story-video";

export type ShareTarget = "native" | "phone" | "desktop";

export function getShareTarget(): ShareTarget {
  if (typeof window === "undefined") return "desktop";
  if (Capacitor.isNativePlatform()) return "native";
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const probe = new File([""], "probe.png", { type: "image/png" });
  const canShareFiles =
    typeof navigator.canShare === "function" && navigator.canShare({ files: [probe] });
  return coarse && canShareFiles ? "phone" : "desktop";
}

const storyFiles = new Map<string, Promise<File>>();

/**
 * Starts generating the story image ahead of the tap. Phone browsers only allow
 * `navigator.share` shortly after a tap, so a slow fetch inside the click handler
 * can make the share fail with NotAllowedError. Failed fetches aren't cached.
 */
export function prepareStoryFile(slug: string): Promise<File> {
  let file = storyFiles.get(slug);
  if (!file) {
    file = fetch(`/w/${slug}/story`).then(async (res) => {
      if (!res.ok) throw new Error("Could not create story image");
      return new File([await res.blob()], "wishlet-story.png", { type: "image/png" });
    });
    file.catch(() => storyFiles.delete(slug));
    storyFiles.set(slug, file);
  }
  return file;
}

interface VideoJob {
  promise: Promise<File | null>;
  listeners: Set<(fraction: number) => void>;
  last: number;
}

const storyVideos = new Map<string, VideoJob>();

/** True when this browser can encode the animated story video. */
export { canRenderStoryVideo };

/**
 * Renders the animated story MP4 once per slug and reuses it. Resolves to null when the
 * browser can't encode it or encoding fails, so callers fall back to the PNG.
 */
export function prepareStoryVideo(
  slug: string,
  onProgress: (fraction: number) => void = () => {},
): Promise<File | null> {
  let job = storyVideos.get(slug);
  if (!job) {
    const created: VideoJob = { promise: Promise.resolve(null), listeners: new Set(), last: 0 };
    created.promise = (async () => {
      try {
        if (!(await canRenderStoryVideo())) return null;
        const blob = await renderStoryVideo(slug, (f) => {
          created.last = f;
          created.listeners.forEach((l) => l(f));
        });
        return new File([blob], "wishlet-story.mp4", { type: "video/mp4" });
      } catch {
        return null;
      }
    })();
    storyVideos.set(slug, created);
    job = created;
  }
  job.listeners.add(onProgress);
  onProgress(job.last);
  return job.promise;
}

/** The image wasn't ready in time, so the browser blocked the share; a second tap works. */
export class ShareNeedsRetryError extends Error {}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Android app: direct Instagram story, falling back to the system share sheet. */
async function shareNative(slug: string): Promise<void> {
  const [{ InstagramStories }, { writeCacheFile, shareFileNative }] = await Promise.all([
    import("@/lib/native/instagram-stories"),
    import("@/lib/native/share-native"),
  ]);
  const video = await prepareStoryVideo(slug);
  const file = video ?? (await prepareStoryFile(slug));
  const base64 = await blobToBase64(file);
  const uri = await writeCacheFile(base64, file.name);
  try {
    await InstagramStories.shareToStory({ filePath: uri, mimeType: file.type });
  } catch {
    await shareFileNative(base64, file.name);
  }
}

async function shareFile(slug: string): Promise<void> {
  const video = await prepareStoryVideo(slug);
  if (video && navigator.canShare?.({ files: [video] })) {
    await navigator.share({ files: [video] });
    return;
  }
  const file = await prepareStoryFile(slug);
  await navigator.share({ files: [file] });
}

/** Shares the animated story (or the PNG fallback), never the wish link. Cancel is silent. */
export async function shareToInstagramStory(slug: string): Promise<void> {
  try {
    if (getShareTarget() === "native") {
      await shareNative(slug);
      return;
    }
    await shareFile(slug);
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return;
    if (err instanceof DOMException && err.name === "NotAllowedError") {
      throw new ShareNeedsRetryError("Share blocked: tap expired");
    }
    throw err;
  }
}
