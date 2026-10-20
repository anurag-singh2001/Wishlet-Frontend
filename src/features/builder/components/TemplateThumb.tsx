"use client";

import React from "react";
import { TemplateFrame } from "@/features/templates/components/TemplateFrame";

const WIDTH = 150;

interface TemplateThumbProps {
  templateId: string;
  occasion: string;
  recipientName: string;
}

/** A non-interactive live render of a template (real phone viewport, scaled down). */
export function TemplateThumb({
  templateId,
  occasion,
  recipientName,
}: TemplateThumbProps): React.ReactElement {
  return (
    <div className="relative flex h-[262px] justify-center overflow-hidden bg-ground">
      <TemplateFrame
        templateId={templateId}
        occasion={occasion}
        recipientName={recipientName.trim() || "Priya"}
        senderName="You"
        message="You make every day brighter. Can't wait to celebrate!"
        width={WIDTH}
        title={`${templateId} preview`}
      />
    </div>
  );
}
