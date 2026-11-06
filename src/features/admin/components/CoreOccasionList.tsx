import React from "react";
import { Card } from "@/components/ui";
import type { CatalogOccasion } from "../types";
import { Toggle } from "./Toggle";

interface CoreOccasionListProps {
  occasions: CatalogOccasion[];
  onChange: (id: string, patch: Partial<CatalogOccasion>) => void;
}

/** Core occasions are always on; admins can only hide one. `enabled` means visible. */
export function CoreOccasionList({
  occasions,
  onChange,
}: CoreOccasionListProps): React.ReactElement {
  return (
    <Card as="section" className="flex flex-col gap-1">
      <h3 className="font-display text-[18px] font-extrabold text-ink">Core occasions</h3>
      <p className="text-[13px] text-[#4B4766]">Always on. Hide one to remove it from the site.</p>
      <ul className="flex flex-col">
        {occasions.map((o) => (
          <li key={o.id} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="h-4 w-4 rounded" style={{ background: o.tint }} aria-hidden="true" />
              {o.label}
            </span>
            <Toggle
              label="Hide"
              checked={!o.enabled}
              onChange={(h) => onChange(o.id, { enabled: !h })}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}
