import React from "react";
import { PLAYFAIR } from "./fonts";
import { stage } from "./reveal";
import type { StoryCardProps } from "./types";

const GOLD = "#d4af37";
const GOLD_LIGHT = "#f5d77a";
const CREAM = "#f3ead0";

/** Static 1080x1920 luxe black-and-gold card. Flexbox + inline styles only (Satori). */
export function CongratulationsGoldStory({
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
        background: "linear-gradient(180deg, #0a0907 0%, #1a1405 100%)",
        fontFamily: PLAYFAIR,
        padding: "120px 90px 160px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: GOLD,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          marginBottom: 40,
          ...stage(reveal, 1),
        }}
      >
        Congratulations
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 50, ...stage(reveal, 1) }}>
        <div style={{ display: "flex", width: 160, height: 2, background: GOLD }} />
        <div
          style={{
            display: "flex",
            width: 16,
            height: 16,
            margin: "0 24px",
            background: GOLD_LIGHT,
            transform: "rotate(45deg)",
          }}
        />
        <div style={{ display: "flex", width: 160, height: 2, background: GOLD }} />
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
            border: `8px solid ${GOLD}`,
            marginBottom: 60,
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          fontSize: 100,
          color: GOLD_LIGHT,
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
            color: CREAM,
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
          style={{ display: "flex", fontSize: 38, color: GOLD, marginTop: 50, ...stage(reveal, 4) }}
        >
          With admiration, {senderName}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          display: "flex",
          fontSize: 32,
          color: "#8a7a4a",
          fontWeight: 700,
        }}
      >
        Made with Wishlet
      </div>
    </div>
  );
}
