import React from "react";
import { GREAT_VIBES, PLAYFAIR } from "./fonts";
import { stage } from "./reveal";
import { StoryGlobe, StorySnow } from "./christmas-snowglobe-parts";
import type { StoryCardProps } from "./types";

const GOLD = "#E9B949";
const RED = "#ff6b7d";
const SNOW = "#fbf7f0";
const MIST = "#e7efe9";

/** Static 1080x1920 Christmas card. Flexbox + inline styles only (Satori). */
export function ChristmasSnowglobeStory({
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
        background: "linear-gradient(180deg, #0b1f2e 0%, #0e2a22 55%, #16452f 100%)",
        fontFamily: PLAYFAIR,
        padding: "120px 90px 180px",
        position: "relative",
      }}
    >
      <StorySnow />
      <StoryGlobe photo={photo} />
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
          fontSize: 130,
          whiteSpace: "nowrap",
          justifyContent: "center",
          color: RED,
          marginBottom: 20,
          ...stage(reveal, 1),
        }}
      >
        Merry Christmas
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 700,
          color: SNOW,
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
            color: MIST,
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
          With love and cheer, {senderName}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          display: "flex",
          fontSize: 32,
          color: "#8fb3a0",
          fontWeight: 700,
        }}
      >
        Made with Wishlet
      </div>
    </div>
  );
}
