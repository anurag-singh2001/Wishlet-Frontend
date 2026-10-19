import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";
export const alt = "Wishlet Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

import { getWish } from "@/lib/api";
import { getOccasionTheme } from "@/features/viewer/lib/occasion-theme";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let occasion = "special";
  let recipientName = "you";

  try {
    {
      const data = await getWish(slug, { next: { revalidate: 60 } });
      occasion = data.occasion || "special";
      recipientName = data.content?.recipientName || "you";
    }
  } catch (error) {
    console.error("Failed to fetch wish for OG image:", error);
  }

  const theme = getOccasionTheme(occasion);

  return new ImageResponse(
    <div
      style={{
        background: theme.bg,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 100,
          marginBottom: 20,
        }}
      >
        {theme.icon}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 50,
          color: theme.text,
          fontWeight: "bold",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        {theme.title}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 80,
          color: "#1e293b",
          fontWeight: 800,
          textAlign: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        For {recipientName}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          color: "#94a3b8",
          fontWeight: "bold",
        }}
      >
        Made with Wishlet
      </div>
    </div>,
    {
      ...size,
    },
  );
}
