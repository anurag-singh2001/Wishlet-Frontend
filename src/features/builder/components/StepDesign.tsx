import React from "react";
import { Check } from "lucide-react";
import { occasionLabel, templatesFor } from "../lib/occasions";
import { TemplateThumb } from "./TemplateThumb";
import type { ApiTemplate } from "../types";

interface StepDesignProps {
  occasion: string;
  templateId: string;
  recipientName: string;
  templates: ApiTemplate[];
  onSelect: (id: string) => void;
}

export function StepDesign({
  occasion,
  templateId,
  recipientName,
  templates,
  onSelect,
}: StepDesignProps): React.ReactElement {
  const options = templatesFor(templates, occasion);
  const label = occasionLabel(occasion).toLowerCase();
  const article = /^[aeiou]/.test(label) ? "an" : "a";
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-[30px] font-extrabold text-ink">
        Pick {article} {label} design
      </h1>
      <div role="radiogroup" aria-label="Design" className="grid grid-cols-2 gap-3.5">
        {options.map((t) => {
          const selected = t.id === templateId;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(t.id)}
              className={`overflow-hidden rounded-[20px] bg-surface p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                selected ? "border-2 border-brand" : "border border-hairline"
              }`}
            >
              <TemplateThumb templateId={t.id} occasion={occasion} recipientName={recipientName} />
              <span className="flex min-h-11 items-center justify-between gap-2 p-3">
                <strong className="text-[15px] text-ink">{t.name}</strong>
                {selected && (
                  <Check className="text-brand" size={20} strokeWidth={2.5} aria-hidden="true" />
                )}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-sm text-[#4B4766]">
        Thumbnails show your recipient&apos;s name once you type it.
      </p>
    </div>
  );
}
