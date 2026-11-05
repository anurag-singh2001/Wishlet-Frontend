import React from "react";
import { Button, Input } from "@/components/ui";
import { templateRegistry } from "@/features/templates/registry";
import { blankToNull } from "../lib/catalog";
import type { CatalogTemplate } from "../types";
import { Toggle } from "./Toggle";

interface TemplateRowProps {
  template: CatalogTemplate;
  canUp: boolean;
  canDown: boolean;
  onChange: (patch: Partial<CatalogTemplate>) => void;
  onMove: (dir: -1 | 1) => void;
}

export function TemplateRow({
  template: t,
  canUp,
  canDown,
  onChange,
  onMove,
}: TemplateRowProps): React.ReactElement {
  return (
    <li className="flex flex-col gap-2 rounded-control border border-hairline p-3">
      <div className="flex items-center justify-between gap-2">
        <strong className="text-[15px] text-ink">{templateRegistry[t.id]?.name ?? t.id}</strong>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            aria-label="Move template up"
            disabled={!canUp}
            onClick={() => onMove(-1)}
          >
            ↑
          </Button>
          <Button
            size="sm"
            variant="secondary"
            aria-label="Move template down"
            disabled={!canDown}
            onClick={() => onMove(1)}
          >
            ↓
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4">
        <Toggle label="Enabled" checked={t.enabled} onChange={(enabled) => onChange({ enabled })} />
        <Toggle
          label="Featured"
          checked={t.featured}
          onChange={(featured) => onChange({ featured })}
        />
        <Input
          id={`tb-${t.id}`}
          aria-label="Badge text"
          placeholder="Badge (optional)"
          maxLength={20}
          value={t.badge ?? ""}
          onChange={(e) => onChange({ badge: blankToNull(e.target.value) })}
          className="h-11 w-44"
        />
      </div>
    </li>
  );
}
