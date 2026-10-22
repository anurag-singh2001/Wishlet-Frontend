"use client";

import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Trash2 } from "lucide-react";
import { Button, Card, useToast } from "@/components/ui";
import { getWishStats } from "@/lib/api";
import { removeWishToken } from "@/lib/wish-tokens";
import type { ListedWish } from "../types";
import { occasionLabel, OCCASIONS } from "@/features/builder/lib/occasions";
import { timeLeft } from "@/lib/expiry";
import { ExpiryChip } from "./ExpiryChip";
import { ReactionsSummary } from "./ReactionsSummary";
import { ReactionsSwitch } from "./ReactionsSwitch";
import { WishThumb } from "./WishThumb";

interface WishCardProps {
  wish: ListedWish;
  compact?: boolean;
  onGone: (slug: string) => void;
  onMore: (wish: ListedWish) => void;
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
  const queryClient = useQueryClient();
  const { slug, token } = wish;
  const stats = useQuery({
    queryKey: ["wish-stats", slug],
    queryFn: () => getWishStats(slug, token),
    enabled: !wish.summary,
    retry: false,
  });
  const { isError, error } = stats;
  const data = wish.summary ?? stats.data;

  useEffect(() => {
    if (isError && ["FORBIDDEN", "NOT_FOUND", "EXPIRED"].includes(error.message)) {
      removeWishToken(slug);
      onGone(slug);
    }
  }, [isError, error, slug, onGone]);

  const expiresAt = wish.expiresAt ?? data?.expiresAt;
  const passed = timeLeft(expiresAt).expired;
  useEffect(() => {
    if (passed) {
      removeWishToken(slug);
      onGone(slug);
    }
  }, [passed, slug, onGone]);

  const name = wish.recipientName || "";
  const tint = OCCASIONS.find((o) => o.id === wish.occasion)?.tint ?? "#EEF0FF";
  const meta = [occasionLabel(wish.occasion), formatDate(wish.createdAt || data?.createdAt)]
    .filter(Boolean)
    .join(" · ");
  const opens = data?.viewCount;

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
    <Card as="li" className="flex gap-4 p-3.5 sm:flex-col sm:items-center sm:p-4">
      <WishThumb
        templateId={wish.templateId}
        recipientName={name}
        occasion={wish.occasion}
        tint={tint}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1 self-stretch sm:w-full sm:flex-none">
        <strong className="truncate font-display text-[18px] text-ink">
          {name ? `For ${name}` : "Your wish"}
        </strong>
        {meta && <span className="truncate text-[13px] text-[#4B4766]">{meta}</span>}
        <ExpiryChip expiresAt={expiresAt} />
        {opens !== undefined && (
          <span
            className={`flex items-center gap-1.5 text-[13px] font-bold ${
              opens > 0 ? "text-brand-deep" : "text-[#4B4766]"
            }`}
          >
            <Eye size={15} aria-hidden="true" />
            {opens > 0 ? `Opened ${opens} ${opens === 1 ? "time" : "times"}` : "Not opened yet"}
          </span>
        )}
        {data && <ReactionsSummary reactions={data.reactions} />}
        {data && (
          <ReactionsSwitch
            key={String(data.reactionsEnabled)}
            slug={slug}
            token={token}
            initial={data.reactionsEnabled !== false}
            onSaved={() => void queryClient.invalidateQueries({ queryKey: ["wish-stats", slug] })}
          />
        )}
        <div className="mt-auto flex gap-2 pt-2">
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
              aria-label={`Delete ${name ? `${name}'s` : "this"} wish`}
              className="w-11 !px-0"
              onClick={() => onMore(wish)}
            >
              <Trash2 size={18} aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
