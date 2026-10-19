import { ImageResponse } from "next/og";
import { getWish, type ApiWish } from "@/lib/api";
import { getStoryCard } from "@/features/templates/story";

export const runtime = "edge";
export const revalidate = 60;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;
  let wish: ApiWish;
  try {
    wish = await getWish(slug, { next: { revalidate: 60 } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
  const Card = getStoryCard(wish.templateId);
  return new ImageResponse(
    <Card
      recipientName={wish.content.recipientName || "Someone special"}
      senderName={wish.content.senderName || ""}
      message={wish.content.message || ""}
      photo={wish.content.photos?.[0]}
      occasion={wish.occasion}
    />,
    { width: 1080, height: 1920 },
  );
}
