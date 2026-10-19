import React from "react";
import { StoryLayout } from "./StoryLayout";
import type { StoryCardProps, StoryPalette } from "./types";

const PALETTE: StoryPalette = {
  bg: "#ecfdf5",
  accent: "#10b981",
  title: "#059669",
  heading: "#0f172a",
  body: "#475569",
  muted: "#94a3b8",
  frame: "#d1fae5",
  serif: true,
};

export function ThankYouSimpleStory(props: StoryCardProps): React.ReactElement {
  return <StoryLayout {...props} palette={PALETTE} icon="🙏" title="Thank You" />;
}
