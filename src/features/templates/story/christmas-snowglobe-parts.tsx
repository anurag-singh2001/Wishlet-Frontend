import React from "react";

const GOLD = "#E9B949";

// Fixed snow dots (x px, y px, size px) on the 1080x1920 card, so it is deterministic.
const DOTS = Array.from({ length: 36 }, (_, i) => ({
  // Side bands only, so the centred text stays clean.
  x: (i % 2 ? 4 + ((i * 37) % 16) : 80 + ((i * 37) % 16)) * 10.8,
  y: ((i * 53) % 100) * 19.2,
  size: 6 + (i % 4) * 3,
}));

/** Pine as plain SVG paths (Satori renders SVG but not CSS border triangles). */
export function StoryTree({ size }: { size: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M50 12 L74 46 H26 Z" fill="#2F7A4E" />
      <path d="M50 28 L80 66 H20 Z" fill="#256A42" />
      <path d="M50 46 L86 86 H14 Z" fill="#1D5A37" />
      <rect x="45" y="86" width="10" height="9" rx="1.5" fill="#7A4A2A" />
      <path
        d="M50 3 l2.6 5.4 5.9.8-4.3 4.1 1 5.8L50 16.4l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"
        fill={GOLD}
      />
      <circle cx="40" cy="42" r="3" fill="#E33A4F" />
      <circle cx="60" cy="58" r="3" fill={GOLD} />
      <circle cx="36" cy="74" r="3" fill="#5AA9E6" />
      <circle cx="64" cy="78" r="3" fill="#E33A4F" />
    </svg>
  );
}

/** Scattered static snow over the whole card. */
export function StorySnow(): React.ReactElement {
  return (
    <div
      style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 1920, display: "flex" }}
    >
      {DOTS.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
            borderRadius: d.size,
            background: "rgba(255,255,255,0.55)",
          }}
        />
      ))}
    </div>
  );
}

/** Snow globe with the photo (or a pine) inside, on a gold base. */
export function StoryGlobe({ photo }: { photo: string | null | undefined }): React.ReactElement {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 60 }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: 520,
          height: 520,
          borderRadius: 260,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          border: "6px solid rgba(255,255,255,0.45)",
          background: "radial-gradient(circle at 50% 35%, #2b5d78 0%, #123247 70%)",
        }}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            width={320}
            height={320}
            alt=""
            style={{
              width: 320,
              height: 320,
              objectFit: "cover",
              borderRadius: 160,
              border: `10px solid ${GOLD}`,
              marginBottom: 60,
            }}
          />
        ) : (
          <div style={{ display: "flex", marginBottom: 60 }}>
            <StoryTree size={300} />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 110,
            display: "flex",
            background: "rgba(255,255,255,0.92)",
            borderRadius: "50% 50% 0 0",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          width: 440,
          height: 90,
          marginTop: -20,
          borderRadius: "14px 14px 40px 40px",
          background: "linear-gradient(180deg, #f2cf6b 0%, #b9862b 100%)",
        }}
      />
    </div>
  );
}
