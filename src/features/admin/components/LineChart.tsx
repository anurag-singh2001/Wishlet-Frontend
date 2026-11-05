import React from "react";

interface LineChartProps {
  points: { date: string; wishes: number }[];
}

const W = 600;
const H = 160;
const PAD = 8;

/** Small area chart in plain SVG (no chart library). */
export function LineChart({ points }: LineChartProps): React.ReactElement {
  const max = Math.max(1, ...points.map((p) => p.wishes));
  const step = points.length > 1 ? (W - PAD * 2) / (points.length - 1) : 0;
  const coords = points.map((p, i) => {
    const x = PAD + i * step;
    const y = H - PAD - (p.wishes / max) * (H - PAD * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = coords.join(" ");
  const area = coords.length
    ? `${PAD},${H - PAD} ${line} ${PAD + (coords.length - 1) * step},${H - PAD}`
    : "";
  const first = points[0]?.date;
  const last = points[points.length - 1]?.date;
  return (
    <figure className="flex flex-col gap-1">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Wishes per day, peak ${max}`}
        className="h-40 w-full"
        preserveAspectRatio="none"
      >
        <polygon points={area} fill="var(--color-brand)" opacity="0.12" />
        <polyline
          points={line}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <figcaption className="flex justify-between text-[12px] text-muted">
        <span>{first}</span>
        <span>Peak {max}/day</span>
        <span>{last}</span>
      </figcaption>
    </figure>
  );
}
