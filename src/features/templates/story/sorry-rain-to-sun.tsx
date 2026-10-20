import React from "react";
import { StoryLayout } from "./StoryLayout";
import { PLAYFAIR } from "./fonts";
import type { StoryCardProps, StoryPalette } from "./types";

const PALETTE: StoryPalette = {
  bg: "linear-gradient(180deg, #fde4c8 0%, #fcd5b0 55%, #fbbf8e 100%)",
  accent: "#92400e",
  title: "#b45309",
  heading: "#451a03",
  body: "#78350f",
  muted: "#92400e",
  frame: "#fff7ed",
  serif: true,
  font: PLAYFAIR,
};

export function SorryRainToSunStory(props: StoryCardProps): React.ReactElement {
  return <StoryLayout {...props} palette={PALETTE} icon="" title="I'm Sorry" />;
}
