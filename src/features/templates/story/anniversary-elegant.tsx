import React from "react";
import { GREAT_VIBES, PLAYFAIR } from "./fonts";
import { stage } from "./reveal";
import type { StoryCardProps } from "./types";

const GOLD = "#c9a23c";
const GOLD_LIGHT = "#f3d77a";

export function AnniversaryElegantStory({
  recipientName,
  senderName,
  message,
  photo,
  reveal,
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
        background: "linear-gradient(180deg,#fffaf6 0%,#ffe9ec 100%)",
        fontFamily: PLAYFAIR,
        padding: "120px 90px 160px",
      }}
    >
      <div style={{ display: "flex", fontSize: 90, marginBottom: 16, ...stage(reveal, 1) }}>💍</div>
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "#fb7185",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          marginBottom: 30,
          ...stage(reveal, 1),
        }}
      >
        Happy Anniversary
      </div>
      {photo && (
        <div
          style={{
            display: "flex",
            padding: 8,
            background: `linear-gradient(135deg,#8a6a1f,${GOLD_LIGHT},#8a6a1f)`,
            marginBottom: 50,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            width={480}
            height={560}
            alt=""
            style={{
              width: 480,
              height: 560,
              objectFit: "cover",
              border: "14px solid #fffaf5",
            }}
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          fontSize: 130,
          color: GOLD,
          fontFamily: GREAT_VIBES,
          textAlign: "center",
          justifyContent: "center",
          marginBottom: 20,
          ...stage(reveal, 2),
        }}
      >
        {recipientName}
      </div>
      <div style={{ display: "flex", width: 160, height: 3, background: GOLD, marginBottom: 40 }} />
      {text && (
        <div
          style={{
            display: "flex",
            fontSize: 44,
            lineHeight: 1.4,
            color: "#334155",
            textAlign: "center",
            justifyContent: "center",
            fontStyle: "italic",
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
            fontSize: 64,
            color: GOLD,
            fontFamily: GREAT_VIBES,
            marginTop: 50,
            ...stage(reveal, 4),
          }}
        >
          With all my love, {senderName}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          display: "flex",
          fontSize: 32,
          color: "#fda4af",
          fontWeight: 700,
        }}
      >
        Made with Wishlet
      </div>
    </div>
  );
}
