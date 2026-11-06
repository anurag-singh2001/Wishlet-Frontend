import React from "react";
import { Field, Input } from "@/components/ui";
import type { BuilderState } from "../types";

const GROUP_LABELS = ["Everyone", "Friends & Family", "Team"];
export const DEFAULT_GROUP_LABEL = GROUP_LABELS[1];

interface AudienceFieldProps {
  state: BuilderState;
  error?: string;
  update: (updates: Partial<BuilderState>) => void;
}

const SEG =
  "flex-1 min-h-11 rounded-control text-[15px] font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** "One person" (a name) or "Many people" (a group label, one link for everyone). */
export function AudienceField({ state, error, update }: AudienceFieldProps): React.ReactElement {
  const group = state.audience === "group";

  const choose = (audience: "one" | "group"): void => {
    if (audience === (state.audience ?? "one")) return;
    update({ audience, recipientName: audience === "group" ? DEFAULT_GROUP_LABEL : "" });
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        role="radiogroup"
        aria-label="Who is it for"
        className="flex gap-2 rounded-control bg-surface p-1 border border-hairline"
      >
        {(["one", "group"] as const).map((a) => {
          const selected = (state.audience ?? "one") === a;
          return (
            <button
              key={a}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => choose(a)}
              className={`${SEG} ${selected ? "bg-brand text-white" : "text-ink"}`}
            >
              {a === "one" ? "One person" : "Many people"}
            </button>
          );
        })}
      </div>

      <Field id="b-to" label={group ? "Shown on the card as" : "Who is it for?"} error={error}>
        <Input
          id="b-to"
          value={state.recipientName}
          error={error}
          maxLength={60}
          autoComplete="off"
          placeholder={group ? "e.g. Friends & Family" : "e.g. Priya"}
          onChange={(e) => update({ recipientName: e.target.value })}
        />
      </Field>

      {group && (
        <>
          <div className="flex flex-wrap gap-2">
            {GROUP_LABELS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => update({ recipientName: label })}
                className={`min-h-9 rounded-full border px-3 text-[13px] font-bold ${
                  state.recipientName === label
                    ? "border-brand bg-brand text-white"
                    : "border-hairline bg-surface text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-[13px] text-[#4B4766]">
            You&apos;ll get one link for everyone, plus personal links with each person&apos;s name.
          </p>
        </>
      )}
    </div>
  );
}
