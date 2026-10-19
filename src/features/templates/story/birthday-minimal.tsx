import React from "react";
import { StoryLayout } from "./StoryLayout";
import type { StoryCardProps, StoryPalette } from "./types";

const PALETTE: StoryPalette = {
  bg: "#fdfbf7",
  accent: "#fb7185",
  title: "#f43f5e",
  heading: "#1e293b",
  body: "#475569",
  muted: "#94a3b8",
  frame: "#ffe4e6",
  serif: true,
};

export function BirthdayMinimalStory(props: StoryCardProps): React.ReactElement {
  return <StoryLayout {...props} palette={PALETTE} icon="🎂" title="Happy Birthday" />;
}
