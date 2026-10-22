import React from "react";

interface ReactionsToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function ReactionsToggle({ enabled, onChange }: ReactionsToggleProps): React.ReactElement {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface p-3">
      <div className="flex flex-1 flex-col gap-0.5">
        <strong id="b-react-label" className="text-sm text-ink">
          Let recipients react
        </strong>
        <span id="b-react-hint" className="text-[13px] text-[#4B4766]">
          They can tap ❤️ 🥹 🎉 😂 — only you see the counts.
        </span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-labelledby="b-react-label"
        aria-describedby="b-react-hint"
        onClick={() => onChange(!enabled)}
        className="flex h-11 w-14 flex-none items-center justify-center focus-visible:outline-2 focus-visible:outline-brand"
      >
        <span
          className={`flex h-7 w-12 items-center rounded-full p-0.5 transition-colors ${
            enabled ? "bg-brand" : "bg-[#C9C2EC]"
          }`}
        >
          <span
            className={`h-6 w-6 rounded-full bg-white shadow transition-transform ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </span>
      </button>
    </div>
  );
}
