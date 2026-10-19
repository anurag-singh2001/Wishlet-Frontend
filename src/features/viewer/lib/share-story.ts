export type ShareTarget = "native" | "phone" | "desktop";

interface CapacitorGlobal {
  isNativePlatform?: () => boolean;
}

function getCapacitor(): CapacitorGlobal | undefined {
  const cap = (window as unknown as { Capacitor?: unknown }).Capacitor;
  return typeof cap === "object" && cap !== null ? (cap as CapacitorGlobal) : undefined;
}

export function getShareTarget(): ShareTarget {
  if (typeof window === "undefined") return "desktop";
  if (getCapacitor()?.isNativePlatform?.()) return "native";
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

async function shareFile(slug: string): Promise<void> {
  const file = await fetchStoryFile(slug);
  await navigator.share({ files: [file] });
}

/** Shares the story image only (never the wish link). Cancel is silent. */
export async function shareToInstagramStory(slug: string): Promise<void> {
  try {
    if (getShareTarget() === "native") {
      // TODO(Phase 6): call the Capacitor Instagram Stories plugin here.
      // Until then the native app uses the phone path below.
    }
    await shareFile(slug);
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return;
    throw err;
  }
}
