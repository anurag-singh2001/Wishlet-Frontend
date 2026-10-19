import React from "react";
import { getOccasionTheme } from "@/features/viewer/lib/occasion-theme";
import { StoryLayout } from "./StoryLayout";
import type { StoryCardProps } from "./types";

/** Fallback card built from the occasion theme. */
export function OccasionStory(props: StoryCardProps): React.ReactElement {
  const t = getOccasionTheme(props.occasion);
  return (
    <StoryLayout
      {...props}
      icon={t.icon}
      title={t.title}
      palette={{
        bg: t.bg,
        accent: t.text,
        title: t.text,
        heading: "#1e293b",
        body: "#475569",
        muted: "#94a3b8",
        frame: "#ffffff",
        serif: false,
      }}
    />
  );
}
