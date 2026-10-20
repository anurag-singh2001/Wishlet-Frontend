import { Capacitor } from "@capacitor/core";

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
  const [{ Filesystem, Directory }, { InstagramStories }] = await Promise.all([
    import("@capacitor/filesystem"),
    import("@/lib/native/instagram-stories"),
  ]);
  const file = await prepareStoryFile(slug);
  const { uri } = await Filesystem.writeFile({
    path: "wishlet-story.png",
    data: await blobToBase64(file),
    directory: Directory.Cache,
  });
  try {
    await InstagramStories.shareToStory({ filePath: uri });
  } catch {
    const { Share } = await import("@capacitor/share");
    await Share.share({ files: [uri] });
  }
}

async function shareFile(slug: string): Promise<void> {
  const file = await prepareStoryFile(slug);
  await navigator.share({ files: [file] });
}

/** Shares the story image only (never the wish link). Cancel is silent. */
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
