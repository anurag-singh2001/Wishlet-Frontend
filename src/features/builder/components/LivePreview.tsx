"use client";

import React, { useEffect, useRef, useState } from "react";
import { TemplateFrame } from "@/features/templates/components/TemplateFrame";
import type { BuilderState } from "../types";

interface LivePreviewProps {
  state: BuilderState;
  /** Fill the parent's height instead of using the fixed phone height. */
  fill?: boolean;
}

export function LivePreview({ state, fill = false }: LivePreviewProps): React.ReactElement {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = (): void => {
      // Fit the 390x844 viewport inside the available box.
      setWidth(Math.floor(Math.min(el.clientWidth, (el.clientHeight * 390) / 844)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[2.25rem] border-[10px] border-ink bg-surface shadow-xl ${
        fill ? "h-full" : "mx-auto h-[min(720px,calc(100dvh-8rem))] max-w-[360px]"
      }`}
    >
      <div ref={boxRef} className="flex h-full w-full justify-center overflow-hidden">
        {!state.templateId ? (
          <div className="flex h-full items-center justify-center p-8 text-center text-muted">
            Pick a design to see your live preview.
          </div>
        ) : width > 0 ? (
          <TemplateFrame
            templateId={state.templateId}
            recipientName={state.recipientName || "Priya"}
            senderName={state.senderName || "You"}
            message={state.message || "Your message will appear here."}
            occasion={state.occasion}
            photo={state.photos[0]}
            width={width}
            title="Live preview of your wish"
          />
        ) : null}
      </div>
    </div>
  );
}
