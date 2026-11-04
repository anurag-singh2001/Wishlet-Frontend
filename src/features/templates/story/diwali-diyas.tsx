import React from "react";
import { GREAT_VIBES, PLAYFAIR } from "./fonts";
import { stage } from "./reveal";
import type { StoryCardProps } from "./types";

const GOLD = "#f5c04a";
const GLOW = "#ffd27a";
const CREAM = "#fde9c4";
const MARIGOLD = "#ff9f1c";

/** Small diya drawn with flexbox shapes (Satori has no SVG filters). */
function StoryDiya(): React.ReactElement {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 22px" }}
    >
      <div
        style={{
          display: "flex",
          width: 34,
          height: 54,
          borderRadius: 17,
          background: `linear-gradient(180deg, #fff4b8 0%, ${MARIGOLD} 100%)`,
          boxShadow: `0 0 50px 18px rgba(255,159,28,0.45)`,
          marginBottom: 6,
        }}
      />
      <div
        style={{
          display: "flex",
          width: 110,
          height: 42,
          borderRadius: "0 0 60px 60px",
          background: "linear-gradient(180deg, #d9773f 0%, #b5532a 100%)",
        }}
      />
    </div>
  );
}

/** Static 1080x1920 Diwali card. Flexbox + inline styles only (Satori). */
export function DiwaliDiyasStory({
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
        background: "linear-gradient(180deg, #0d0726 0%, #24103f 55%, #3a1530 100%)",
        fontFamily: PLAYFAIR,
        padding: "120px 90px 180px",
      }}
    >
      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          width={460}
          height={460}
          alt=""
          style={{
            width: 460,
            height: 460,
            objectFit: "cover",
            borderRadius: 230,
            border: `8px solid ${GOLD}`,
            marginBottom: 60,
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          fontSize: 38,
          color: GOLD,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          ...stage(reveal, 1),
        }}
      >
        Wishing you a
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: GREAT_VIBES,
          fontSize: 170,
          color: GLOW,
          marginBottom: 20,
          ...stage(reveal, 1),
        }}
      >
        Happy Diwali
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 700,
          color: "#fff4dc",
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
            fontStyle: "italic",
            textAlign: "center",
            justifyContent: "center",
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
          With light and love, {senderName}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-end", marginTop: 70 }}>
        <StoryDiya />
        <StoryDiya />
        <StoryDiya />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 90,
          display: "flex",
          fontSize: 32,
          color: "#9a7a4a",
          fontWeight: 700,
        }}
      >
        Made with Wishlet
      </div>
    </div>
  );
}
