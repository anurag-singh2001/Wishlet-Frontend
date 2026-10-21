"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";
import type { TemplateProps } from "@/features/templates/types";
import { trackWishViewed } from "@/lib/analytics";

import { getWish, recordWishView } from "@/lib/api";
import { listOwnedWishes } from "@/lib/wish-tokens";
import { InstagramShareButton } from "./InstagramShareButton";
import { ViewerError, ViewerLoading } from "./ViewerStates";

interface PublicViewerProps {
  slug: string;
}

export function PublicViewer({ slug }: PublicViewerProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wish", slug],
    queryFn: () => getWish(slug),
    retry: false, // Don't retry on 404
  });

  useEffect(() => {
    if (data) {
      trackWishViewed({
        occasion: data.occasion,
        template: data.templateId,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!data) return;
    try {
      if (listOwnedWishes().some((w) => w.slug === slug)) return;
      const key = `wishlet:viewed:${slug}`;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
      recordWishView(slug).catch(() => undefined);
    } catch {
      // storage unavailable: skip silently
    }
  }, [data, slug]);

  if (isLoading) return <ViewerLoading />;
  if (error) return <ViewerError notFound={error.message === "NOT_FOUND"} />;
  if (!data) return null;

  // Map API response to TemplateProps
  const templateProps: TemplateProps = {
    recipientName: data.content.recipientName || "Someone special",
    senderName: data.content.senderName || "A friend",
    message: data.content.message || "",
    occasion: data.occasion,
    photos: data.content.photos || [],
    content: data.content,
  };

  return (
    <div className="w-full">
      <TemplateRenderer templateId={data.templateId} props={templateProps} />
      {/* Below the wish, in normal flow: it never sits on top of the card. */}
      <section
        aria-label="Share this wish"
        className="safe-bottom flex flex-col items-center gap-3 border-t border-hairline bg-ground px-4 py-8 text-center"
      >
        <p className="text-sm text-muted">Loved it? Share the moment on your story.</p>
        <InstagramShareButton slug={slug} label="Share to your story" variant="pill" />
      </section>
    </div>
  );
}
