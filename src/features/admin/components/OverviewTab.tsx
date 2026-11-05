"use client";

import React, { useState } from "react";
import { Card, Skeleton } from "@/components/ui";
import { occasionLabel, templateName } from "@/features/builder/lib/occasions";
import { useAdminStats } from "../hooks/use-admin";
import { BarList } from "./BarList";
import { LineChart } from "./LineChart";

const RANGES = [7, 30, 90];

export function OverviewTab(): React.ReactElement {
  const [days, setDays] = useState(30);
  const { data, isPending, error } = useAdminStats(days);

  const tiles = data
    ? [
        ["Wishes", data.totals.wishes],
        ["Views", data.totals.views],
        ["Reactions", data.totals.reactions],
        ["Users", data.totals.users],
      ]
    : [];

  return (
    <div className="flex flex-col gap-4">
      <div role="group" aria-label="Range" className="flex gap-2">
        {RANGES.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={d === days}
            onClick={() => setDays(d)}
            className={`min-h-11 rounded-full border px-4 text-sm font-bold ${
              d === days
                ? "border-brand bg-brand text-white"
                : "border-hairline bg-surface text-ink"
            }`}
          >
            {d} days
          </button>
        ))}
      </div>
      {isPending && <Skeleton className="h-64" />}
      {error && (
        <p role="alert" className="text-danger">
          Couldn&apos;t load stats.
        </p>
      )}
      {data && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {tiles.map(([label, value]) => (
              <Card key={label} className="p-4">
                <p className="text-[13px] font-semibold text-muted">{label}</p>
                <p className="font-display text-[28px] font-extrabold text-ink">{value}</p>
              </Card>
            ))}
          </div>
          <Card>
            <h3 className="mb-2 text-sm font-bold text-ink">Wishes per day</h3>
            <LineChart points={data.perDay} />
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <BarList
                title="By occasion"
                rows={data.perOccasion.map((r) => ({
                  label: occasionLabel(r.occasion) || r.occasion,
                  value: r.wishes,
                }))}
              />
            </Card>
            <Card>
              <BarList
                title="By template"
                rows={data.perTemplate.map((r) => ({
                  label: templateName(r.templateId) || r.templateId,
                  value: r.wishes,
                }))}
              />
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
