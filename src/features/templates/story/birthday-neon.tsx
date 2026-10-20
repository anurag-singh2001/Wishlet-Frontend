import React from "react";
import { StoryLayout } from "./StoryLayout";
import type { StoryCardProps, StoryPalette } from "./types";

const PALETTE: StoryPalette = {
  bg: "#07040f",
  accent: "#a3ff12",
  title: "#22d3ee",
  heading: "#ff7ac2",
  body: "#e2e8f0",
  muted: "#64748b",
  frame: "#22d3ee",
  serif: false,
};

export function BirthdayNeonStory(props: StoryCardProps): React.ReactElement {
  return <StoryLayout {...props} palette={PALETTE} icon="🎈" title="Happy Birthday" />;
}
