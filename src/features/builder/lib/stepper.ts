import type { BuilderState, BuilderStep } from "../types";

export function isBuilderValid(state: BuilderState): boolean {
  return (
    state.occasion !== "" &&
    state.templateId !== "" &&
    state.recipientName.trim() !== "" &&
    state.senderName.trim() !== "" &&
    state.message.trim() !== ""
  );
}

/** 1 Occasion, 2 Template, 3 Customize, 4 Ready to generate, 5 Done */
export function getStepperStep(state: BuilderState, step: BuilderStep): number {
  if (step === "success") return 5;
  if (isBuilderValid(state)) return 4;
  if (state.templateId) return 3;
  if (state.occasion) return 2;
  return 1;
}
