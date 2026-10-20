import type React from "react";
import { AnniversaryCinematicStory } from "./anniversary-cinematic";
import { AnniversaryElegantStory } from "./anniversary-elegant";
import { BirthdayMinimalStory } from "./birthday-minimal";
import { BirthdayNeonStory } from "./birthday-neon";
import { CongratulationsCelebrationStory } from "./congratulations-celebration";
import { CongratulationsGoldStory } from "./congratulations-gold";
import { OccasionStory } from "./OccasionStory";
import { SorryRainToSunStory } from "./sorry-rain-to-sun";
import { SorrySincereStory } from "./sorry-sincere";
import { ThankYouBotanicalStory } from "./thank-you-botanical";
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
  "birthday-neon": BirthdayNeonStory,
  "anniversary-cinematic": AnniversaryCinematicStory,
  "thank-you-botanical": ThankYouBotanicalStory,
  "congratulations-gold": CongratulationsGoldStory,
  "sorry-rain-to-sun": SorryRainToSunStory,
};

export function getStoryCard(templateId: string): StoryCard {
  return storyCards[templateId] ?? OccasionStory;
}
