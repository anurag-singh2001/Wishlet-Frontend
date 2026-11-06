import React from "react";
import { newYearFor } from "../kit/new-year";
import { BRICOLAGE, PLAYFAIR } from "./fonts";
import { StoryFlutes, StorySky } from "./newyear-midnight-parts";
import { stage } from "./reveal";
import type { StoryCardProps } from "./types";

const GOLD = "#f5d77a";
const INK = "#f7f6fb";
const MIST = "#e4e2f5";

/** Static 1080x1920 New Year card. Flexbox + inline styles only (Satori). */
export function NewYearMidnightStory({
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
        background: "linear-gradient(180deg, #0b1026 0%, #1a1640 60%, #2a1f4d 100%)",
        fontFamily: PLAYFAIR,
        padding: "120px 90px 180px",
        position: "relative",
      }}
    >
      <StorySky />
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          width={420}
          height={420}
          alt=""
          style={{
            width: 420,
            height: 420,
            objectFit: "cover",
            borderRadius: 210,
            border: `8px solid ${GOLD}`,
            marginBottom: 50,
          }}
        />
      ) : (
        <div style={{ display: "flex", marginBottom: 30 }}>
          <StoryFlutes />
        </div>
      )}
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: GOLD,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          ...stage(reveal, 1),
        }}
      >
        Happy New Year
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: BRICOLAGE,
          fontWeight: 700,
          fontSize: 300,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: GOLD,
          ...stage(reveal, 1),
        }}
      >
        {String(newYearFor())}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 700,
          color: INK,
          textAlign: "center",
          justifyContent: "center",
          margin: "20px 0 40px",
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
          Here&apos;s to your best year yet, {senderName}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          display: "flex",
          fontSize: 32,
          color: "#9a93c7",
          fontWeight: 700,
        }}
      >
        Made with Wishlet
      </div>
    </div>
  );
}
