"use client";

import React from "react";
import { useReactionsSetting } from "../hooks/use-reactions-setting";

interface ReactionsSwitchProps {
  slug: string;
  token: string | null;
  initial: boolean;
  onSaved: () => void;
}

export function ReactionsSwitch({
  slug,
  token,
  initial,
  onSaved,
}: ReactionsSwitchProps): React.ReactElement {
  const { enabled, busy, toggle } = useReactionsSetting(slug, token, initial, onSaved);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={busy}
      onClick={() => void toggle()}
      className="flex min-h-11 items-center gap-2 self-start text-[13px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-brand disabled:opacity-60"
    >
      <span
        aria-hidden="true"
        className={`flex h-5 w-9 items-center rounded-full px-0.5 transition-colors ${
          enabled ? "bg-brand" : "bg-[#8A86A0]"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white transition-transform ${
            enabled ? "translate-x-4" : ""
          }`}
        />
      </span>
      Reactions {enabled ? "on" : "off"}
    </button>
  );
}
