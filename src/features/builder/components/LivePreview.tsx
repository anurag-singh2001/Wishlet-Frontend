"use client";

import React from "react";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";
import type { BuilderState } from "../types";

export function LivePreview({ state }: { state: BuilderState }) {
  // Convert builder state to TemplateProps format
  const templateProps = {
    recipientName: state.recipientName || "Recipient Name",
    senderName: state.senderName || "Sender Name",
    message: state.message || "Write a beautiful message here...",
    occasion: state.occasion,
    photos: state.photos,
    content: {},
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-100 rounded-3xl overflow-hidden relative">
      {/* Mobile Device Mockup */}
      <div className="relative w-full max-w-[375px] h-[750px] max-h-[85vh] bg-white rounded-[2.5rem] shadow-2xl border-[12px] border-slate-900 overflow-hidden flex flex-col shrink-0 scale-90 sm:scale-100 origin-center transition-transform">
        
        {/* Device Notch/Dynamic Island */}
        <div className="absolute top-0 inset-x-0 h-7 bg-slate-900 rounded-b-3xl w-1/2 mx-auto z-50"></div>

        <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden bg-white scrollbar-hide">
          {state.templateId ? (
            <TemplateRenderer templateId={state.templateId} props={templateProps} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50">
              <span className="text-4xl mb-4">✨</span>
              <p>Select a template to see your live preview.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
