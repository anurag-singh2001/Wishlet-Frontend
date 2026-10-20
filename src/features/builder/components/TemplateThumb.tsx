"use client";

import React from "react";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";

const W = 360;
const H = 640;
const SCALE = 0.41;

interface TemplateThumbProps {
  templateId: string;
  occasion: string;
  recipientName: string;
}

/** A non-interactive scaled live render of a template. */
export function TemplateThumb({
  templateId,
  occasion,
  recipientName,
}: TemplateThumbProps): React.ReactElement {
  return (
    <div className="relative h-[262px] overflow-hidden bg-ground" aria-hidden="true">
      <div
        className="pointer-events-none absolute left-1/2 top-0 select-none overflow-hidden"
        style={{
          width: W,
          height: H,
          transform: `translateX(-50%) scale(${SCALE})`,
          transformOrigin: "top center",
        }}
      >
        <TemplateRenderer
          templateId={templateId}
          props={{
            recipientName: recipientName.trim() || "Priya",
            senderName: "You",
            message: "You make every day brighter.",
            occasion,
            photos: [],
            content: {},
          }}
        />
      </div>
    </div>
  );
}
