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

async function fetchStoryFile(slug: string): Promise<File> {
  const res = await fetch(`/w/${slug}/story`);
  if (!res.ok) throw new Error("Could not create story image");
  const blob = await res.blob();
  return new File([blob], "wishlet-story.png", { type: "image/png" });
}

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
  const file = await fetchStoryFile(slug);
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
  const file = await fetchStoryFile(slug);
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
    throw err;
  }
}
