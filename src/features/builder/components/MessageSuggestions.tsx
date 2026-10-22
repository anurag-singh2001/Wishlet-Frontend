import React, { useState } from "react";
import { suggestionsFor } from "../lib/message-suggestions";

interface MessageSuggestionsProps {
  occasion: string;
  message: string;
  onPick: (text: string) => void;
}

export function MessageSuggestions({
  occasion,
  message,
  onPick,
}: MessageSuggestionsProps): React.ReactElement | null {
  const [showAll, setShowAll] = useState(false);
  const all = suggestionsFor(occasion);
  if (all.length === 0) return null;
  const visible = showAll ? all : all.slice(0, 3);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-ink">Need ideas?</span>
        {all.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="h-11 rounded-control px-3 text-sm font-bold text-brand focus-visible:outline-2 focus-visible:outline-brand"
          >
            {showAll ? "Show fewer" : "See all"}
          </button>
        )}
      </div>
      <ul className="flex flex-col gap-2">
        {visible.map((s) => {
          const selected = message === s.text;
          return (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onPick(s.text)}
                className={`flex min-h-11 w-full flex-col items-start gap-1 rounded-2xl border p-3 text-left focus-visible:outline-2 focus-visible:outline-brand ${
                  selected ? "border-brand bg-brand-soft" : "border-hairline bg-surface"
                }`}
              >
                <span className="rounded-full bg-ground px-2 py-0.5 text-[11px] font-bold text-[#4B4766]">
                  {s.style}
                </span>
                <span className="line-clamp-2 text-[13px] text-ink">{s.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
