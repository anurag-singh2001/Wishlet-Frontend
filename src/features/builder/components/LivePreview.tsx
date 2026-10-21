"use client";

import React from "react";
import { TemplateFrame } from "@/features/templates/components/TemplateFrame";
import type { BuilderState } from "../types";

interface LivePreviewProps {
  state: BuilderState;
  /** Fill the parent's height instead of using the fixed phone height. */
  fill?: boolean;
}

export function LivePreview({ state, fill = false }: LivePreviewProps): React.ReactElement {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.25rem] border-[10px] border-ink bg-surface shadow-xl ${
        fill
          ? "mx-auto aspect-[390/844] h-full max-w-full"
          : "mx-auto aspect-[390/844] h-[min(720px,calc(100dvh-8rem))] max-w-[360px]"
      }`}
    >
      {!state.templateId ? (
        <div className="flex h-full items-center justify-center p-8 text-center text-muted">
          Pick a design to see your live preview.
        </div>
      ) : (
        <TemplateFrame
          templateId={state.templateId}
          recipientName={state.recipientName || "Priya"}
          senderName={state.senderName || "You"}
          message={state.message || "Your message will appear here."}
          occasion={state.occasion}
          photo={state.photos[0]}
          cover
          title="Live preview of your wish"
        />
      )}
    </div>
  );
}
