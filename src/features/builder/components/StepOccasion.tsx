import React from "react";
import { Check } from "lucide-react";
import { OCCASIONS, templatesFor } from "../lib/occasions";
import type { ApiTemplate } from "../types";

interface StepOccasionProps {
  value: string;
  templates: ApiTemplate[];
  onSelect: (id: string) => void;
}

export function StepOccasion({
  value,
  templates,
  onSelect,
}: StepOccasionProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-[30px] font-extrabold text-ink">
        What&apos;s the occasion?
      </h1>
      <div role="radiogroup" aria-label="Occasion" className="flex flex-col gap-4">
        {OCCASIONS.map((o) => {
          const selected = value === o.id;
          const count = templatesFor(templates, o.id).length;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(o.id)}
              className={`flex min-h-[76px] items-center gap-3.5 rounded-[20px] bg-surface p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                selected ? "border-2 border-brand" : "border border-hairline"
              }`}
            >
              <span
                className="h-11 w-11 flex-none rounded-xl"
                style={{ background: o.tint }}
                aria-hidden="true"
              />
              <span className="flex flex-col">
                <strong className="text-[17px] text-ink">{o.label}</strong>
                <span className="text-sm text-[#4B4766]">
                  {count} {count === 1 ? "design" : "designs"}
                </span>
              </span>
              {selected && (
                <Check
                  className="ml-auto text-brand"
                  size={22}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
