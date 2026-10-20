import React from "react";
import type { StoryCardProps } from "./types";

export function SorrySincereStory({
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
        background: "linear-gradient(180deg, #eef1fa 0%, #e2e2f4 100%)",
        fontFamily: "serif",
        padding: "120px 90px 160px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: 36,
          height: 36,
          borderRadius: 18,
          background: "#9aa6d6",
          marginBottom: 40,
        }}
      />
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
            border: "12px solid #ffffff",
            marginBottom: 56,
          }}
        />
      )}
      <div style={{ display: "flex", fontSize: 80, color: "#3b4560", fontWeight: 700 }}>
        {recipientName}
      </div>
      {text && (
        <div
          style={{
            display: "flex",
            fontSize: 44,
            lineHeight: 1.4,
            color: "#46517a",
            textAlign: "center",
            justifyContent: "center",
            fontStyle: "italic",
            marginTop: 40,
          }}
        >
          {text}
        </div>
      )}
      <div
        style={{
          display: "flex",
          fontSize: 96,
          color: "#5b6aa8",
          fontStyle: "italic",
          marginTop: 60,
        }}
      >
        I&apos;m sorry
      </div>
      {senderName && (
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#6b7699",
            marginTop: 30,
            letterSpacing: "0.2em",
          }}
        >
          {senderName}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          display: "flex",
          fontSize: 32,
          color: "#7a86ad",
          fontWeight: 700,
        }}
      >
        Made with Wishlet
      </div>
    </div>
  );
}
