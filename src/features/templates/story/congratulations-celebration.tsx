import React from "react";
import { StoryLayout } from "./StoryLayout";
import { BRICOLAGE } from "./fonts";
import type { StoryCardProps, StoryPalette } from "./types";

const PALETTE: StoryPalette = {
  bg: "#fdf2f8",
  accent: "#8b5cf6",
  title: "#ec4899",
  heading: "#2e1065",
  body: "#334155",
  muted: "#f472b6",
  frame: "#fbbf24",
  serif: false,
  font: BRICOLAGE,
};

export function CongratulationsCelebrationStory(props: StoryCardProps): React.ReactElement {
  return <StoryLayout {...props} palette={PALETTE} icon="🏆" title="Congratulations" />;
}
