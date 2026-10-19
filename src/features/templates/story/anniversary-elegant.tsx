import React from "react";
import { StoryLayout } from "./StoryLayout";
import type { StoryCardProps, StoryPalette } from "./types";

const PALETTE: StoryPalette = {
  bg: "#fffbfb",
  accent: "#fb7185",
  title: "#be123c",
  heading: "#4c0519",
  body: "#334155",
  muted: "#fda4af",
  frame: "#fecdd3",
  serif: true,
};

export function AnniversaryElegantStory(props: StoryCardProps): React.ReactElement {
  return <StoryLayout {...props} palette={PALETTE} icon="💍" title="Happy Anniversary" />;
}
