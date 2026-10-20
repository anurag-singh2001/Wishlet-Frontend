"use client";

import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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
  /** "custom" (default): only `className` styles it. "pill": dark pill. "tile": secondary tile. */
  variant?: "custom" | "pill" | "tile";
}

const VARIANTS = {
  custom: "",
  pill: "min-h-11 rounded-full bg-ink px-5 text-sm font-semibold text-white shadow-lg",
  tile: "min-h-11 w-full rounded-control border border-hairline bg-surface px-4 text-sm font-semibold text-ink",
} as const;

function StoryIcon(): React.ReactElement {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Shares the animated story (PNG fallback); never the wish link. */
export function InstagramShareButton({
  slug,
  label,
  className = "",
  pregenerate = false,
  variant = "custom",
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
        className={cn(
          "flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-60",
          VARIANTS[variant],
          className,
        )}
      >
        <StoryIcon />
        <span role={rendering ? "status" : undefined}>{text}</span>
      </button>
      {error && (
        <p role="status" className="text-xs text-danger">
          {error}
        </p>
      )}
      {panelUrl && <InstagramDesktopPanel wishUrl={panelUrl} onClose={() => setPanelUrl("")} />}
    </div>
  );
}
