"use client";

import React from "react";
import { Logo } from "@/components/ui";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";
import { templateRegistry } from "@/features/templates/registry";

const W = 360;
const H = 640;
const SCALE = 0.2667;

interface WishThumbProps {
  templateId?: string;
  recipientName?: string;
  occasion?: string;
  tint: string;
}

/** Fixed-size, non-interactive live render of a wish's template (fallback: tinted logo tile). */
export function WishThumb({
  templateId,
  recipientName,
  occasion,
  tint,
}: WishThumbProps): React.ReactElement {
  const canRender = Boolean(templateId && recipientName && templateRegistry[templateId]);
  return (
    <div
      className="relative h-[171px] w-24 flex-none overflow-hidden rounded-control border border-hairline"
      style={{ background: tint }}
      aria-hidden="true"
    >
      {canRender && templateId ? (
        <div
          className="pointer-events-none absolute left-0 top-0 select-none overflow-hidden"
          style={{ width: W, height: H, transform: `scale(${SCALE})`, transformOrigin: "top left" }}
        >
          <TemplateRenderer
            templateId={templateId}
            props={{
              recipientName: recipientName ?? "",
              senderName: "You",
              message: "You make every day brighter.",
              occasion: occasion ?? "birthday",
              photos: [],
              content: {},
              autoOpen: true,
            }}
          />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <Logo size={36} wordmark={false} />
        </div>
      )}
    </div>
  );
}
