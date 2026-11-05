import React from "react";

interface BarListProps {
  title: string;
  rows: { label: string; value: number }[];
}

export function BarList({ title, rows }: BarListProps): React.ReactElement {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      {rows.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
      <ul className="flex flex-col gap-2">
        {rows.map((r) => (
          <li key={r.label} className="flex flex-col gap-1">
            <div className="flex justify-between text-[13px] text-ink">
              <span className="truncate">{r.label}</span>
              <strong>{r.value}</strong>
            </div>
            <div className="h-2 rounded-full bg-brand-soft">
              <div
                className="h-2 rounded-full bg-brand"
                style={{ width: `${(r.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
