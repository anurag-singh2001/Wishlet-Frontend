import React from "react";
import { PublicViewer } from "@/features/viewer/components/PublicViewer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  let title = "A special wish for you";
  const description = "Someone made something special for you.";
  
  try {
    const res = await fetch(`${API_URL}/api/v1/wishes/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      const occasion = data.occasion || "special";
      const recipientName = data.content?.recipientName || "you";
      
      const occasionMap: Record<string, string> = {
        birthday: "🎂 A birthday wish for",
        anniversary: "💍 An anniversary wish for",
        "thank-you": "🙏 A thank you for",
        congratulations: "🎉 Congratulations to",
        sorry: "🤍 An apology for",
      };
      
      const prefix = occasionMap[occasion] || "A special wish for";
      title = `${prefix} ${recipientName}`;
    }
  } catch (error) {
    console.error("Failed to fetch wish for metadata:", error);
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/w/${slug}`,
      siteName: "Wishlet",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  };
}

export default async function ViewerPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main>
      <PublicViewer slug={slug} />
    </main>
  );
}
