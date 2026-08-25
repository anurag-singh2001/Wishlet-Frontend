import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";
export const alt = "Wishlet Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let occasion = "special";
  let recipientName = "you";

  try {
    const res = await fetch(`${API_URL}/api/v1/wishes/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      occasion = data.occasion || "special";
      recipientName = data.content?.recipientName || "you";
    }
  } catch (error) {
    console.error("Failed to fetch wish for OG image:", error);
  }

  const themeMap: Record<string, { bg: string; text: string; icon: string; title: string }> = {
    birthday: { bg: "#fff1f2", text: "#f43f5e", icon: "🎂", title: "Happy Birthday" },
    anniversary: { bg: "#fdf2f8", text: "#db2777", icon: "💍", title: "Happy Anniversary" },
    "thank-you": { bg: "#ecfdf5", text: "#10b981", icon: "🙏", title: "Thank You" },
    congratulations: { bg: "#f0f9ff", text: "#0ea5e9", icon: "🎉", title: "Congratulations" },
    sorry: { bg: "#f8fafc", text: "#64748b", icon: "🤍", title: "I'm Sorry" },
  };

  const theme = themeMap[occasion] || { bg: "#f8fafc", text: "#475569", icon: "✨", title: "A Special Wish" };

  return new ImageResponse(
    (
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
      </div>
    ),
    {
      ...size,
    }
  );
}
