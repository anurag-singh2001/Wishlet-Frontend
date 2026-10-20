"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { Badge, Button, Card, useToast } from "@/components/ui";
import { getWishStats } from "@/lib/api";
import { removeWishToken, type OwnedWish } from "@/lib/wish-tokens";
import { occasionLabel, OCCASIONS, templateName } from "@/features/builder/lib/occasions";

interface WishCardProps {
  wish: OwnedWish;
  compact?: boolean;
  onGone: (slug: string) => void;
  onMore: (wish: OwnedWish) => void;
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export function WishCard({
  wish,
  compact = false,
  onGone,
  onMore,
}: WishCardProps): React.ReactElement {
  const toast = useToast();
  const { slug, token } = wish;
  const { data, isError, error } = useQuery({
    queryKey: ["wish-stats", slug],
    queryFn: () => getWishStats(slug, token),
    retry: false,
  });

  useEffect(() => {
    if (isError && (error.message === "FORBIDDEN" || error.message === "NOT_FOUND")) {
      removeWishToken(slug);
      onGone(slug);
    }
  }, [isError, error, slug, onGone]);

  const name = wish.recipientName || "";
  const tint = OCCASIONS.find((o) => o.id === wish.occasion)?.tint ?? "#EEF0FF";
  const meta = [
    occasionLabel(wish.occasion),
    templateName(wish.templateId),
    formatDate(wish.createdAt || data?.createdAt),
  ]
    .filter(Boolean)
    .join(" · ");

  const handleShare = async (): Promise<void> => {
    const url = `${window.location.origin}/w/${slug}`;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ url });
      } else {
        await navigator.clipboard.writeText(url);
        toast("Link copied");
      }
    } catch {
      // share sheet dismissed
    }
  };

  return (
    <Card as="li" className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <span
          className="h-11 w-11 flex-none rounded-xl"
          style={{ background: tint }}
          aria-hidden="true"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <strong className="truncate text-[17px] text-ink">
            {name ? `For ${name}` : "Your wish"}
          </strong>
          {meta && <span className="truncate text-[13px] text-[#4B4766]">{meta}</span>}
        </div>
        {data && (
          <Badge tone={data.viewCount > 0 ? "brand" : "neutral"}>
            {data.viewCount > 0
              ? `${data.viewCount} ${data.viewCount === 1 ? "view" : "views"}`
              : "Not opened"}
          </Badge>
        )}
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="flex-1" onClick={() => void handleShare()}>
          Share
        </Button>
        <Button size="sm" variant="secondary" className="flex-1" href={`/w/${slug}`}>
          Open
        </Button>
        {!compact && (
          <Button
            size="sm"
            variant="secondary"
            aria-label={`More actions for ${name ? `${name}'s` : "this"} wish`}
            className="w-11 !px-0"
            onClick={() => onMore(wish)}
          >
            <MoreHorizontal size={18} aria-hidden="true" />
          </Button>
        )}
      </div>
    </Card>
  );
}
