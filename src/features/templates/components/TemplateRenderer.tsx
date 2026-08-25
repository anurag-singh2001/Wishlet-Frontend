import React, { Suspense } from "react";
import { templateRegistry } from "../registry";
import type { TemplateProps } from "../types";

interface TemplateRendererProps {
  templateId: string;
  props: TemplateProps;
}

export function TemplateRenderer({ templateId, props }: TemplateRendererProps) {
  const templateConfig = templateRegistry[templateId];

  if (!templateConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-sans p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Template Not Found</h2>
          <p>The template &quot;{templateId}&quot; could not be loaded.</p>
        </div>
      </div>
    );
  }

  const TemplateComponent = templateConfig.component;

  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-sans">
          <div className="animate-pulse">Loading template...</div>
        </div>
      }
    >
      <TemplateComponent {...props} />
    </Suspense>
  );
}
