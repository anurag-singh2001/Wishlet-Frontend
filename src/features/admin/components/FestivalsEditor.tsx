"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { useSaveCatalog } from "../hooks/use-admin";
import type { CatalogOccasion, CatalogUpdate } from "../types";
import { CoreOccasionList } from "./CoreOccasionList";
import { FestivalCard } from "./FestivalCard";
import { Notice, type NoticeState } from "./Notice";

export function FestivalsEditor({ initial }: { initial: CatalogOccasion[] }): React.ReactElement {
  const [draft, setDraft] = useState<CatalogOccasion[]>(initial);
  const [notice, setNotice] = useState<NoticeState | null>(null);
  const save = useSaveCatalog();

  const patch = (id: string, p: Partial<CatalogOccasion>): void =>
    setDraft((d) => d.map((o) => (o.id === id ? { ...o, ...p } : o)));

  const onSave = (): void => {
    setNotice(null);
    const body: CatalogUpdate = {
      occasions: draft.map((o, order) => {
        const core = o.kind === "core"; // core occasions cannot have dates
        return {
          id: o.id,
          label: o.label,
          tint: o.tint,
          enabled: o.enabled,
          order,
          festiveLook: o.festiveLook,
          startsAt: core ? null : o.startsAt,
          endsAt: core ? null : o.endsAt,
          badge: o.badge,
        };
      }),
    };
    save.mutate(body, {
      onSuccess: (catalog) => {
        setDraft(catalog.occasions);
        setNotice({ tone: "success", text: "Saved. The site follows these settings." });
      },
      onError: (e) => setNotice({ tone: "error", text: e.message }),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <CoreOccasionList occasions={draft.filter((o) => o.kind === "core")} onChange={patch} />
      {draft
        .filter((o) => o.kind === "festival")
        .map((o) => (
          <FestivalCard key={o.id} occasion={o} onChange={(p) => patch(o.id, p)} />
        ))}
      <div className="sticky bottom-0 flex items-center gap-3 bg-ground py-3">
        <Button loading={save.isPending} onClick={onSave}>
          Save
        </Button>
        <Notice notice={notice} />
      </div>
    </div>
  );
}
