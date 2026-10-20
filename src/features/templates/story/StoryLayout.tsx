import React from "react";
import { stage } from "./reveal";
import type { StoryCardProps, StoryPalette } from "./types";

interface StoryLayoutProps extends StoryCardProps {
  palette: StoryPalette;
  icon: string;
  title: string;
}

/** Static 1080x1920 card. Flexbox + inline styles only (Satori). */
export function StoryLayout({
  palette: p,
  icon,
  title,
  recipientName,
  senderName,
  message,
  photo,
  reveal,
}: StoryLayoutProps): React.ReactElement {
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
        background: p.bg,
        fontFamily: p.font ?? (p.serif ? "serif" : "sans-serif"),
        padding: "120px 90px 160px",
      }}
    >
      <div style={{ display: "flex", fontSize: 90, marginBottom: 20, ...stage(reveal, 1) }}>
        {icon}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 44,
          color: p.title,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 50,
          ...stage(reveal, 1),
        }}
      >
        {title}
      </div>
      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          width={520}
          height={520}
          alt=""
          style={{
            width: 520,
            height: 520,
            objectFit: "cover",
            borderRadius: 260,
            border: `12px solid ${p.frame}`,
            marginBottom: 60,
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          fontSize: 92,
          color: p.heading,
          fontWeight: 700,
          textAlign: "center",
          justifyContent: "center",
          marginBottom: 40,
          ...stage(reveal, 2),
        }}
      >
        {recipientName}
      </div>
      {text && (
        <div
          style={{
            display: "flex",
            fontSize: 44,
            lineHeight: 1.4,
            color: p.body,
            textAlign: "center",
            justifyContent: "center",
            fontStyle: p.serif ? "italic" : "normal",
            ...stage(reveal, 3),
          }}
        >
          {text}
        </div>
      )}
      {senderName && (
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: p.accent,
            marginTop: 50,
            ...stage(reveal, 4),
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
          color: p.muted,
          fontWeight: 700,
        }}
      >
        Made with Wishlet
      </div>
    </div>
  );
}
