"use client";

import React from "react";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";
import type { BuilderState } from "../types";

interface LivePreviewProps {
  state: BuilderState;
  /** Fill the parent's height instead of using the fixed phone height. */
  fill?: boolean;
}

export function LivePreview({ state, fill = false }: LivePreviewProps): React.ReactElement {
  const templateProps = {
    recipientName: state.recipientName || "Priya",
    senderName: state.senderName || "You",
    message: state.message || "Your message will appear here.",
    occasion: state.occasion,
    photos: state.photos,
    content: {},
    autoOpen: true,
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[2.25rem] border-[10px] border-ink bg-surface shadow-xl ${
        fill ? "h-full" : "mx-auto h-[min(720px,calc(100dvh-8rem))] max-w-[360px]"
      }`}
    >
      <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
        {state.templateId ? (
          <TemplateRenderer templateId={state.templateId} props={templateProps} />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-muted">
            Pick a design to see your live preview.
          </div>
        )}
      </div>
    </div>
  );
}
