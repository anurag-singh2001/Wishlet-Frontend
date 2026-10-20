import { lazy } from "react";
import type { TemplateConfig } from "../types";

export const templateRegistry: Record<string, TemplateConfig> = {
  "birthday-minimal": {
    id: "birthday-minimal",
    name: "Birthday Minimal",
    occasion: "birthday",
    description: "A clean, elegant birthday template with subtle animations.",
    component: lazy(() => import("../templates/birthday-minimal")),
  },
  "anniversary-elegant": {
    id: "anniversary-elegant",
    name: "Elegant Anniversary",
    occasion: "anniversary",
    description: "An elegant template for celebrating anniversaries.",
    component: lazy(() => import("../templates/anniversary-elegant")),
  },
  "thank-you-simple": {
    id: "thank-you-simple",
    name: "Simple Thank You",
    occasion: "thank-you",
    description: "A simple and heartfelt thank you template.",
    component: lazy(() => import("../templates/thank-you-simple")),
  },
  "congratulations-celebration": {
    id: "congratulations-celebration",
    name: "Celebration",
    occasion: "congratulations",
    description: "A celebratory template for achievements and milestones.",
    component: lazy(() => import("../templates/congratulations-celebration")),
  },
  "sorry-sincere": {
    id: "sorry-sincere",
    name: "Sincere Apology",
    occasion: "sorry",
    description: "A thoughtful and sincere apology template.",
    component: lazy(() => import("../templates/sorry-sincere")),
  },
  "birthday-neon": {
    id: "birthday-neon",
    name: "Neon Party",
    occasion: "birthday",
    description: "Dark glow-in-the-night birthday card with neon type and pop-able balloons.",
    component: lazy(() => import("../templates/birthday-neon")),
  },
  "anniversary-cinematic": {
    id: "anniversary-cinematic",
    name: "Cinematic",
    occasion: "anniversary",
    description:
      "A film-style anniversary with a slow Ken Burns photo, grain and a letterbox reveal.",
    component: lazy(() => import("../templates/anniversary-cinematic")),
  },
  "thank-you-botanical": {
    id: "thank-you-botanical",
    name: "Botanical Thank You",
    occasion: "thank-you",
    description: "Hand-drawn vines and flowers bloom around a handwritten thank-you.",
    component: lazy(() => import("../templates/thank-you-botanical")),
  },
  "congratulations-gold": {
    id: "congratulations-gold",
    name: "Black & Gold",
    occasion: "congratulations",
    description: "Luxe gold type, light rays and a golden confetti burst.",
    component: lazy(() => import("../templates/congratulations-gold")),
  },
  "sorry-rain-to-sun": {
    id: "sorry-rain-to-sun",
    name: "Rain to Sunshine",
    occasion: "sorry",
    description: "Soft rain clears into a warm sunrise as your apology appears.",
    component: lazy(() => import("../templates/sorry-rain-to-sun")),
  },
};
