import React from "react";
import { StoryLayout } from "./StoryLayout";
import { PLAYFAIR } from "./fonts";
import type { StoryCardProps, StoryPalette } from "./types";

const PALETTE: StoryPalette = {
  bg: "#0b080c",
  accent: "#fcd9a0",
  title: "#f5e6c8",
  heading: "#fef3c7",
  body: "#e7e5e4",
  muted: "#a8896a",
  frame: "#3b2a30",
  serif: true,
  font: PLAYFAIR,
};

export function AnniversaryCinematicStory(props: StoryCardProps): React.ReactElement {
  return <StoryLayout {...props} palette={PALETTE} icon="🎞️" title="Happy Anniversary" />;
}
