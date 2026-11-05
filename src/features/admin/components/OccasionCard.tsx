import React from "react";
import { Button, Card, Field, Input } from "@/components/ui";
import { blankToNull, dateOnly, toIso } from "../lib/catalog";
import type { CatalogOccasion } from "../types";
import { Toggle } from "./Toggle";

interface OccasionCardProps {
  occasion: CatalogOccasion;
  canUp: boolean;
  canDown: boolean;
  onChange: (patch: Partial<CatalogOccasion>) => void;
  onMove: (dir: -1 | 1) => void;
  children: React.ReactNode;
}

export function OccasionCard({
  occasion: o,
  canUp,
  canDown,
  onChange,
  onMove,
  children,
}: OccasionCardProps): React.ReactElement {
  const id = `oc-${o.id}`;
  return (
    <Card as="section" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-[18px] font-extrabold text-ink">{o.id}</h3>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            aria-label="Move occasion up"
            disabled={!canUp}
            onClick={() => onMove(-1)}
          >
            ↑
          </Button>
          <Button
            size="sm"
            variant="secondary"
            aria-label="Move occasion down"
            disabled={!canDown}
            onClick={() => onMove(1)}
          >
            ↓
          </Button>
        </div>
      </div>
      <Toggle label="Enabled" checked={o.enabled} onChange={(enabled) => onChange({ enabled })} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field id={`${id}-label`} label="Label">
          <Input
            id={`${id}-label`}
            value={o.label}
            maxLength={40}
            onChange={(e) => onChange({ label: e.target.value })}
          />
        </Field>
        <Field id={`${id}-badge`} label="Badge">
          <Input
            id={`${id}-badge`}
            value={o.badge ?? ""}
            maxLength={20}
            onChange={(e) => onChange({ badge: blankToNull(e.target.value) })}
          />
        </Field>
        <Field id={`${id}-tint`} label="Tint color">
          <Input
            id={`${id}-tint`}
            type="color"
            value={o.tint}
            onChange={(e) => onChange({ tint: e.target.value })}
            className="p-1"
          />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field id={`${id}-start`} label="Season start">
            <Input
              id={`${id}-start`}
              type="date"
              value={dateOnly(o.startsAt)}
              onChange={(e) => onChange({ startsAt: toIso(e.target.value, false) })}
            />
          </Field>
          <Field id={`${id}-end`} label="Season end">
            <Input
              id={`${id}-end`}
              type="date"
              value={dateOnly(o.endsAt)}
              onChange={(e) => onChange({ endsAt: toIso(e.target.value, true) })}
            />
          </Field>
        </div>
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </Card>
  );
}
