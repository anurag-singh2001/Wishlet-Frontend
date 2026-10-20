import React from "react";
import { CAVEAT, PLAYFAIR } from "./fonts";
import type { StoryCardProps } from "./types";

const INK = "#b4532a";
const ROSE = "#be123c";

/** Static 1080x1920 card. Flexbox + inline styles only (Satori). */
export function ThankYouSimpleStory({
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
        background: "radial-gradient(circle at 50% 35%, #fffaf0 0%, #fbf0dc 60%, #f1e0c0 100%)",
        fontFamily: PLAYFAIR,
        padding: "120px 90px 160px",
      }}
    >
      <div style={{ display: "flex", fontSize: 90, color: "#e11d48", marginBottom: 20 }}>♥</div>
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
            border: "16px solid #ffffff",
            borderBottom: "60px solid #ffffff",
            transform: "rotate(-2deg)",
            marginBottom: 60,
          }}
        />
      )}
      <div style={{ display: "flex", fontSize: 64, color: "#78716c", fontFamily: CAVEAT }}>
        thank you,
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 100,
          color: "#9f1239",
          fontWeight: 700,
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {recipientName}
      </div>
      <div
        style={{
          display: "flex",
          width: 420,
          height: 10,
          borderRadius: 5,
          background: INK,
          marginTop: 16,
          marginBottom: 50,
        }}
      />
      {text && (
        <div
          style={{
            display: "flex",
            lineHeight: 1.4,
            color: "#44403c",
            textAlign: "center",
            justifyContent: "center",
            fontFamily: CAVEAT,
            fontSize: 56,
          }}
        >
          {text}
        </div>
      )}
      {senderName && (
        <div
          style={{ display: "flex", fontSize: 56, color: ROSE, marginTop: 50, fontFamily: CAVEAT }}
        >
          with love, {senderName}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          display: "flex",
          fontSize: 32,
          color: "#a8a29e",
          fontWeight: 700,
        }}
      >
        Made with Wishlet
      </div>
    </div>
  );
}
