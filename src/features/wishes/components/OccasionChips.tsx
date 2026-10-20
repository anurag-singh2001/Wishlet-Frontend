import React from "react";
import { occasionLabel } from "@/features/builder/lib/occasions";

interface OccasionChipsProps {
  occasions: string[];
  value: string;
  onChange: (value: string) => void;
}

export function OccasionChips({
  occasions,
  value,
  onChange,
}: OccasionChipsProps): React.ReactElement {
  const items = ["all", ...occasions];
  return (
    <div
      className="scrollbar-hide flex gap-2 overflow-x-auto"
      role="group"
      aria-label="Filter by occasion"
    >
      {items.map((id) => (
        <button
          key={id}
          type="button"
          aria-pressed={value === id}
          onClick={() => onChange(id)}
          className={`min-h-11 flex-none rounded-full border px-4 text-sm font-bold focus-visible:outline-2 focus-visible:outline-brand ${
            value === id
              ? "border-brand bg-brand text-white"
              : "border-hairline bg-surface text-ink"
          }`}
        >
          {id === "all" ? "All" : occasionLabel(id)}
        </button>
      ))}
    </div>
  );
}
