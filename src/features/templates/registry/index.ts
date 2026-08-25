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
};
