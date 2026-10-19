"use client";

import React, { useState } from "react";
import { Camera } from "lucide-react";
import { trackWishShared } from "@/lib/analytics";
import { getShareTarget, shareToInstagramStory } from "../lib/share-story";
import { InstagramDesktopPanel } from "./InstagramDesktopPanel";

interface InstagramShareButtonProps {
  slug: string;
  label: string;
  className?: string;
}

/** Shares the story image only; never the wish link. */
export function InstagramShareButton({
  slug,
  label,
  className = "",
}: InstagramShareButtonProps): React.ReactElement {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [panelUrl, setPanelUrl] = useState("");

  const handleClick = async (): Promise<void> => {
    setError("");
    if (getShareTarget() === "desktop") {
      setPanelUrl(`${window.location.origin}/w/${slug}`);
      return;
    }
    setBusy(true);
    try {
      await shareToInstagramStory(slug);
      trackWishShared("instagram_story");
    } catch {
      setError("Could not prepare the story image. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className={`flex items-center justify-center space-x-2 disabled:opacity-60 ${className}`}
      >
        <Camera size={18} />
        <span>{busy ? "Preparing..." : label}</span>
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {panelUrl && <InstagramDesktopPanel wishUrl={panelUrl} onClose={() => setPanelUrl("")} />}
    </div>
  );
}
