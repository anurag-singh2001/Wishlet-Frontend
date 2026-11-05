import React from "react";
import { PublicViewer } from "@/features/viewer/components/PublicViewer";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string | string[] }>;
}

import { getWish } from "@/lib/api";
import { personalName } from "@/features/viewer/lib/personal-name";

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const toName = personalName((await searchParams).to);

  let title = "A special wish for you";
  const description = "Someone made something special for you.";

  try {
    {
      const data = await getWish(slug, { next: { revalidate: 60 } });
      const occasion = data.occasion || "special";
      const recipientName = toName || data.content?.recipientName || "you";

      const occasionMap: Record<string, string> = {
        birthday: "🎂 A birthday wish for",
        anniversary: "💍 An anniversary wish for",
        "thank-you": "🙏 A thank you for",
        congratulations: "🎉 Congratulations to",
        sorry: "🤍 An apology for",
        diwali: "🪔 A Diwali wish for",
      };

      const prefix = occasionMap[occasion] || "A special wish for";
      title = `${prefix} ${recipientName}`;
    }
  } catch (error) {
    // Missing or expired wishes keep the generic title.
    if (!(error instanceof Error && (error.message === "NOT_FOUND" || error.message === "EXPIRED")))
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
    },
  };
}

export default async function ViewerPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const toName = personalName((await searchParams).to);

  return (
    <main>
      <PublicViewer slug={slug} toName={toName} />
    </main>
  );
}
