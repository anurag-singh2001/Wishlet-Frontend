import React from "react";
import { Card, Field, Input } from "@/components/ui";
import { dateOnly, toIso } from "../lib/catalog";
import type { CatalogOccasion } from "../types";
import { StatusPill } from "./StatusPill";
import { Toggle } from "./Toggle";

interface FestivalCardProps {
  occasion: CatalogOccasion;
  onChange: (patch: Partial<CatalogOccasion>) => void;
}

export function FestivalCard({ occasion: o, onChange }: FestivalCardProps): React.ReactElement {
  const id = `fest-${o.id}`;
  return (
    <Card as="section" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-display text-[18px] font-extrabold text-ink">
          <span className="h-4 w-4 rounded" style={{ background: o.tint }} aria-hidden="true" />
          {o.label}
          <StatusPill status={o.status} />
        </h3>
        <a
          href={`/?festival=${encodeURIComponent(o.id)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-brand underline"
        >
          Preview
        </a>
      </div>
      <Toggle label="Publish" checked={o.enabled} onChange={(enabled) => onChange({ enabled })} />
      <div className="grid grid-cols-2 gap-2">
        <Field id={`${id}-start`} label="Starts">
          <Input
            id={`${id}-start`}
            type="date"
            value={dateOnly(o.startsAt)}
            onChange={(e) => onChange({ startsAt: toIso(e.target.value, false) })}
          />
        </Field>
        <Field id={`${id}-end`} label="Ends (end of day)">
          <Input
            id={`${id}-end`}
            type="date"
            value={dateOnly(o.endsAt)}
            onChange={(e) => onChange({ endsAt: toIso(e.target.value, true) })}
          />
        </Field>
      </div>
      <div>
        <Toggle
          label="Festive look"
          checked={o.festiveLook}
          onChange={(festiveLook) => onChange({ festiveLook })}
        />
        <p className="text-[13px] text-[#4B4766]">
          Only one festive look shows at a time; the festival that starts later wins.
        </p>
      </div>
    </Card>
  );
}
