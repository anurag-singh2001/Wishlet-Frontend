"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui";
import { REACTIONS, reactToWish, type ReactionId } from "@/lib/api";

const VOTER_KEY = "wishlet:voter";

function voterId(): string {
  try {
    const existing = localStorage.getItem(VOTER_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(VOTER_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function readPick(slug: string): ReactionId | null {
  try {
    const v = localStorage.getItem(`wishlet:reaction:${slug}`);
    return REACTIONS.find((r) => r.id === v)?.id ?? null;
  } catch {
    return null;
  }
}

function writePick(slug: string, pick: ReactionId | null): void {
  try {
    if (pick) localStorage.setItem(`wishlet:reaction:${slug}`, pick);
    else localStorage.removeItem(`wishlet:reaction:${slug}`);
  } catch {
    // storage unavailable
  }
}

export function ReactionBar({ slug }: { slug: string }): React.ReactElement | null {
  const toast = useToast();
  const [pick, setPick] = useState<ReactionId | null>(() => readPick(slug));
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  const choose = async (id: ReactionId): Promise<void> => {
    const prev = pick;
    const next = prev === id ? null : id;
    setPick(next);
    writePick(slug, next);
    try {
      await reactToWish(slug, next, voterId());
    } catch (e) {
      const code = e instanceof Error ? e.message : "";
      if (code === "REACTIONS_DISABLED") {
        setHidden(true);
        return;
      }
      setPick(prev);
      writePick(slug, prev);
      toast(code === "RATE_LIMITED" ? "Slow down a little" : "Couldn't save your reaction");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        role="group"
        aria-label="React to this wish"
        className="flex flex-wrap justify-center gap-2"
      >
        {REACTIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={pick === r.id}
            aria-label={`React with ${r.label}`}
            onClick={() => void choose(r.id)}
            className={`flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              pick === r.id
                ? "border-brand bg-brand-soft text-brand-deep"
                : "border-hairline bg-surface text-ink"
            }`}
          >
            <span aria-hidden="true" className="text-lg">
              {r.emoji}
            </span>
            {r.label}
          </button>
        ))}
      </div>
      <p role="status" className="h-5 text-sm text-muted">
        {pick ? "Thanks!" : ""}
      </p>
    </div>
  );
}
