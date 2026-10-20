import type { BuilderState } from "../types";

export const MESSAGE_MAX = 500;

export interface DetailErrors {
  recipientName?: string;
  message?: string;
  senderName?: string;
}

export function validateDetails(state: BuilderState): DetailErrors {
  const errors: DetailErrors = {};
  if (!state.recipientName.trim()) errors.recipientName = "Add who this wish is for";
  if (!state.message.trim()) errors.message = "Write a short message for them";
  else if (state.message.length > MESSAGE_MAX) {
    errors.message = `Keep your message under ${MESSAGE_MAX} characters`;
  }
  if (!state.senderName.trim()) errors.senderName = "Add your name so they know who it's from";
  return errors;
}
