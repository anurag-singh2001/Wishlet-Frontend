import type React from "react";
import { AnniversaryElegantStory } from "./anniversary-elegant";
import { BirthdayMinimalStory } from "./birthday-minimal";
import { CongratulationsCelebrationStory } from "./congratulations-celebration";
import { OccasionStory } from "./OccasionStory";
import { SorrySincereStory } from "./sorry-sincere";
import { ThankYouSimpleStory } from "./thank-you-simple";
import type { StoryCardProps } from "./types";

export type { StoryCardProps };

type StoryCard = (props: StoryCardProps) => React.ReactElement;

export const storyCards: Record<string, StoryCard> = {
  "birthday-minimal": BirthdayMinimalStory,
  "anniversary-elegant": AnniversaryElegantStory,
  "thank-you-simple": ThankYouSimpleStory,
  "congratulations-celebration": CongratulationsCelebrationStory,
  "sorry-sincere": SorrySincereStory,
};

export function getStoryCard(templateId: string): StoryCard {
  return storyCards[templateId] ?? OccasionStory;
}
