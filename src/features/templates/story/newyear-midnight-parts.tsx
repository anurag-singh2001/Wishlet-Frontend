import React from "react";

const RAYS = Array.from({ length: 16 }, (_, i) => (i * Math.PI * 2) / 16);

// Bursts on the 1080x1920 card (px), kept to the edges so the centred text stays clean.
const BURSTS = [
  { x: 170, y: 230, r: 120, color: "#E8B931" },
  { x: 900, y: 360, r: 150, color: "#FF4F8B" },
  { x: 920, y: 1650, r: 90, color: "#7DD3FC" },
  { x: 160, y: 1620, r: 100, color: "#E8B931" },
];

// Fixed bubbles (side bands only).
const BUBBLES = Array.from({ length: 24 }, (_, i) => ({
  x: (i % 2 ? 3 + ((i * 37) % 15) : 82 + ((i * 37) % 15)) * 10.8,
  y: ((i * 53) % 100) * 19.2,
  size: 10 + (i % 4) * 6,
}));

/** Firework bursts and golden bubbles as an absolute background layer (Satori-safe SVG). */
export function StorySky(): React.ReactElement {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        display: "flex",
      }}
    >
      {BURSTS.map((b) => (
        <svg
          key={b.x}
          width={b.r * 2}
          height={b.r * 2}
          viewBox={`${-b.r} ${-b.r} ${b.r * 2} ${b.r * 2}`}
          style={{ position: "absolute", left: b.x - b.r, top: b.y - b.r, opacity: 0.85 }}
        >
          {RAYS.map((a) => (
            <line
              key={a}
              x1={Math.cos(a) * b.r * 0.3}
              y1={Math.sin(a) * b.r * 0.3}
              x2={Math.cos(a) * b.r * 0.95}
              y2={Math.sin(a) * b.r * 0.95}
              stroke={b.color}
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
        </svg>
      ))}
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            borderRadius: b.size,
            border: "2px solid rgba(245,215,122,0.6)",
            background: "rgba(245,215,122,0.1)",
          }}
        />
      ))}
    </div>
  );
}

// Flute placements: x offset and tilt (degrees).
const FLUTES = [
  { x: 42, tilt: -14 },
  { x: 78, tilt: 14 },
];

/** Two clinking champagne flutes. Plain SVG children only: Satori fails on fragments in SVG. */
export function StoryFlutes(): React.ReactElement {
  return (
    <svg width={360} height={300} viewBox="0 0 120 100">
      {FLUTES.map((f) => (
        <g key={f.x} transform={`translate(${f.x} 26) rotate(${f.tilt})`}>
          <path d="M-11 0 h22 l-3 30 a8 8 0 0 1 -16 0 z" fill="#f5d77a" fillOpacity="0.9" />
          <path d="M-11 0 h22 l-1 10 h-20 z" fill="#fff" fillOpacity="0.85" />
          <path
            d="M0 38 v26 M-10 64 h20"
            stroke="#f5d77a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      ))}
      <path
        d="M60 4v8M54 8l3 3M66 8l-3 3"
        stroke="#FF4F8B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
