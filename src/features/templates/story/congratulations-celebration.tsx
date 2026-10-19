import React from "react";
import { StoryLayout } from "./StoryLayout";
import type { StoryCardProps, StoryPalette } from "./types";

const PALETTE: StoryPalette = {
  bg: "#f0f9ff",
  accent: "#38bdf8",
  title: "#0ea5e9",
  heading: "#082f49",
  body: "#334155",
  muted: "#7dd3fc",
  frame: "#bae6fd",
  serif: false,
};

export function CongratulationsCelebrationStory(props: StoryCardProps): React.ReactElement {
  return <StoryLayout {...props} palette={PALETTE} icon="🎉" title="Congratulations" />;
}
