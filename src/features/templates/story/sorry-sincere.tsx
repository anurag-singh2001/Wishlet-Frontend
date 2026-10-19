import React from "react";
import { StoryLayout } from "./StoryLayout";
import type { StoryCardProps, StoryPalette } from "./types";

const PALETTE: StoryPalette = {
  bg: "#fafafa",
  accent: "#94a3b8",
  title: "#64748b",
  heading: "#0f172a",
  body: "#475569",
  muted: "#94a3b8",
  frame: "#e2e8f0",
  serif: true,
};

export function SorrySincereStory(props: StoryCardProps): React.ReactElement {
  return <StoryLayout {...props} palette={PALETTE} icon="🤍" title="I'm Sorry" />;
}
