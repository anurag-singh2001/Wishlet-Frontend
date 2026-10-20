import React from "react";
import { StoryLayout } from "./StoryLayout";
import type { StoryCardProps, StoryPalette } from "./types";

const PALETTE: StoryPalette = {
  bg: "#f6f3e8",
  accent: "#7c9a82",
  title: "#7c9a82",
  heading: "#3f5545",
  body: "#4f6654",
  muted: "#8fa894",
  frame: "#d9e4d2",
  serif: true,
};

export function ThankYouBotanicalStory(props: StoryCardProps): React.ReactElement {
  return <StoryLayout {...props} palette={PALETTE} icon="🌿" title="Thank You" />;
}
