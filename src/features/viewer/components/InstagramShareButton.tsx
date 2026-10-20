"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { trackWishShared } from "@/lib/analytics";
import {
  canRenderStoryVideo,
  getShareTarget,
  prepareStoryFile,
  prepareStoryVideo,
  shareToInstagramStory,
  ShareNeedsRetryError,
} from "../lib/share-story";
import { InstagramDesktopPanel } from "./InstagramDesktopPanel";

interface InstagramShareButtonProps {
  slug: string;
  label: string;
  className?: string;
  /** Render the animated story on mount (success screen). Otherwise the first tap starts it. */
  pregenerate?: boolean;
}

/** Shares the animated story (PNG fallback); never the wish link. */
export function InstagramShareButton({
  slug,
  label,
  className = "",
  pregenerate = false,
}: InstagramShareButtonProps): React.ReactElement {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [panelUrl, setPanelUrl] = useState("");
  const [videoOk, setVideoOk] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  const startRender = useCallback(async (): Promise<void> => {
    setProgress(0);
    await prepareStoryVideo(slug, setProgress);
    setProgress(null);
    setVideoReady(true);
  }, [slug]);

  useEffect(() => {
    if (getShareTarget() === "desktop") return;
    prepareStoryFile(slug).catch(() => {});
    let cancelled = false;
    canRenderStoryVideo().then((ok) => {
      if (cancelled || !ok) return;
      setVideoOk(true);
      if (pregenerate) void startRender();
    });
    return () => {
      cancelled = true;
    };
  }, [slug, pregenerate, startRender]);

  const rendering = progress !== null;

  const handleClick = async (): Promise<void> => {
    setError("");
    if (getShareTarget() === "desktop") {
      setPanelUrl(`${window.location.origin}/w/${slug}`);
      return;
    }
    if (videoOk && !videoReady) {
      // Viewer: the first tap renders; the next tap shares (the browser's tap permission expires).
      await startRender();
      return;
    }
    setBusy(true);
    try {
      await shareToInstagramStory(slug);
      trackWishShared("instagram_story");
    } catch (err) {
      setError(
        err instanceof ShareNeedsRetryError
          ? "Your story is ready. Tap the button again to share."
          : "Could not prepare the story. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  let text = label;
  if (rendering) text = `Preparing animated story… ${Math.round((progress ?? 0) * 100)}%`;
  else if (busy) text = "Preparing...";
  else if (videoReady && !pregenerate) text = "Share to story";

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        type="button"
        onClick={handleClick}
        disabled={busy || rendering}
        className={`flex items-center justify-center space-x-2 disabled:opacity-60 ${className}`}
      >
        <Camera size={18} />
        <span>{text}</span>
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {panelUrl && <InstagramDesktopPanel wishUrl={panelUrl} onClose={() => setPanelUrl("")} />}
    </div>
  );
}
