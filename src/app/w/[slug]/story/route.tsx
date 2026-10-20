import { ImageResponse } from "next/og";
import { getWish, type ApiWish } from "@/lib/api";
import { getStoryCard } from "@/features/templates/story";
import { getStoryFonts } from "@/features/templates/story/fonts";
import { loadStoryFonts, storyFontText } from "@/features/templates/story/load-fonts";

export const runtime = "edge";
export const revalidate = 60;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;
  let wish: ApiWish;
  try {
    wish = await getWish(slug, { next: { revalidate: 60 } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
  const raw = new URL(req.url).searchParams.get("reveal");
  const parsed = raw !== null && /^[0-4]$/.test(raw) ? Number(raw) : undefined;
  const Card = getStoryCard(wish.templateId);
  const recipientName = wish.content.recipientName || "Someone special";
  const senderName = wish.content.senderName || "";
  const message = wish.content.message || "";
  const fonts = await loadStoryFonts(
    getStoryFonts(wish.templateId),
    storyFontText(recipientName, senderName, message),
  );
  return new ImageResponse(
    <Card
      recipientName={recipientName}
      senderName={senderName}
      message={message}
      photo={wish.content.photos?.[0]}
      occasion={wish.occasion}
      reveal={parsed}
    />,
    {
      width: 1080,
      height: 1920,
      headers: { "x-wishlet-occasion": encodeURIComponent(wish.occasion) },
      ...(fonts.length > 0 && { fonts }),
    },
  );
}
