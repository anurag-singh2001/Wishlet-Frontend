import React from "react";
import type { StoryCardProps } from "./types";

const DOTS = [
  { top: 140, left: 120, c: "#fda4af" },
  { top: 260, left: 880, c: "#fcd34d" },
  { top: 1560, left: 160, c: "#c4b5fd" },
  { top: 1480, left: 900, c: "#fda4af" },
  { top: 420, left: 60, c: "#6ee7b7" },
  { top: 1700, left: 620, c: "#fcd34d" },
];

/** Static 1080x1920 card. Flexbox + inline styles only (Satori). */
export function BirthdayMinimalStory({
  recipientName,
  senderName,
  message,
  photo,
}: StoryCardProps): React.ReactElement {
  const text = message.length > 220 ? `${message.slice(0, 217)}...` : message;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fdf8f0",
        fontFamily: "serif",
        padding: "120px 90px 160px",
        position: "relative",
      }}
    >
      {DOTS.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            width: 28,
            height: 28,
            borderRadius: 14,
            background: d.c,
            opacity: 0.8,
          }}
        />
      ))}
      <div
        style={{
          display: "flex",
          width: 150,
          height: 150,
          borderRadius: 75,
          background: "#be123c",
          border: "10px solid #fb7185",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 70,
          color: "#fecdd3",
          marginBottom: 40,
        }}
      >
        ♥
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "#fb7185",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 30,
        }}
      >
        Happy Birthday
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 120,
          color: "#f43f5e",
          fontStyle: "italic",
          textAlign: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        {recipientName}
      </div>
      <div
        style={{ display: "flex", width: 260, height: 6, background: "#fda4af", marginBottom: 60 }}
      />
      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          width={480}
          height={480}
          alt=""
          style={{
            width: 480,
            height: 480,
            objectFit: "cover",
            border: "20px solid #ffffff",
            borderBottom: "70px solid #ffffff",
            boxShadow: "0 20px 40px rgba(120,53,15,0.2)",
            marginBottom: 60,
          }}
        />
      )}
      {text && (
        <div
          style={{
            display: "flex",
            fontSize: 44,
            lineHeight: 1.4,
            color: "#475569",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {text}
        </div>
      )}
      {senderName && (
        <div
          style={{
            display: "flex",
            fontSize: 54,
            color: "#be123c",
            fontStyle: "italic",
            marginTop: 50,
          }}
        >
          With love, {senderName}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          display: "flex",
          fontSize: 32,
          color: "#94a3b8",
          fontWeight: 700,
        }}
      >
        Made with Wishlet
      </div>
    </div>
  );
}
