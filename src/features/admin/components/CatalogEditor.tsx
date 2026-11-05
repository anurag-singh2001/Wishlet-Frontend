"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { templateRegistry } from "@/features/templates/registry";
import { useSaveCatalog } from "../hooks/use-admin";
import { moveWithin } from "../lib/catalog";
import type { Catalog, CatalogOccasion, CatalogTemplate } from "../types";
import { Notice, type NoticeState } from "./Notice";
import { OccasionCard } from "./OccasionCard";
import { TemplateRow } from "./TemplateRow";

function indexesWhere<T>(list: T[], test: (item: T) => boolean): number[] {
  return list.flatMap((item, i) => (test(item) ? [i] : []));
}

export function CatalogEditor({ initial }: { initial: Catalog }): React.ReactElement {
  const [draft, setDraft] = useState<Catalog>(initial);
  const [notice, setNotice] = useState<NoticeState | null>(null);
  const save = useSaveCatalog();

  const patchOccasion = (i: number, patch: Partial<CatalogOccasion>): void =>
    setDraft((d) => ({
      ...d,
      occasions: d.occasions.map((o, k) => (k === i ? { ...o, ...patch } : o)),
    }));
  const patchTemplate = (i: number, patch: Partial<CatalogTemplate>): void =>
    setDraft((d) => ({
      ...d,
      templates: d.templates.map((t, k) => (k === i ? { ...t, ...patch } : t)),
    }));
  const moveOccasion = (i: number, dir: -1 | 1): void =>
    setDraft((d) => ({
      ...d,
      occasions: moveWithin(
        d.occasions,
        d.occasions.map((_, k) => k),
        i,
        dir,
      ),
    }));
  const moveTemplate = (i: number, group: number[], dir: -1 | 1): void =>
    setDraft((d) => ({ ...d, templates: moveWithin(d.templates, group, i, dir) }));

  const onSave = (): void => {
    setNotice(null);
    const body: Catalog = {
      occasions: draft.occasions.map((o, order) => ({ ...o, order })),
      templates: draft.templates.map((t, order) => ({ ...t, order })),
    };
    save.mutate(body, {
      onSuccess: () =>
        setNotice({ tone: "success", text: "Saved. The site follows these settings." }),
      onError: (e) => setNotice({ tone: "error", text: e.message }),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {draft.occasions.map((o, i) => {
        const group = indexesWhere(
          draft.templates,
          (t) => templateRegistry[t.id]?.occasion === o.id,
        );
        return (
          <OccasionCard
            key={o.id}
            occasion={o}
            canUp={i > 0}
            canDown={i < draft.occasions.length - 1}
            onChange={(p) => patchOccasion(i, p)}
            onMove={(dir) => moveOccasion(i, dir)}
          >
            {group.map((ti, pos) => (
              <TemplateRow
                key={draft.templates[ti].id}
                template={draft.templates[ti]}
                canUp={pos > 0}
                canDown={pos < group.length - 1}
                onChange={(p) => patchTemplate(ti, p)}
                onMove={(dir) => moveTemplate(ti, group, dir)}
              />
            ))}
          </OccasionCard>
        );
      })}
      <div className="sticky bottom-0 flex items-center gap-3 bg-ground py-3">
        <Button loading={save.isPending} onClick={onSave}>
          Save
        </Button>
        <Notice notice={notice} />
      </div>
    </div>
  );
}
