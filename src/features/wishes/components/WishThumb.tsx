"use client";

import React from "react";
import { Logo } from "@/components/ui";
import { TemplateFrame } from "@/features/templates/components/TemplateFrame";
import { templateRegistry } from "@/features/templates/registry";

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
        <TemplateFrame
          templateId={templateId}
          recipientName={recipientName ?? ""}
          senderName="You"
          message="You make every day brighter."
          occasion={occasion ?? "birthday"}
          width={96}
          title="Wish preview"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <Logo size={36} wordmark={false} />
        </div>
      )}
    </div>
  );
}
