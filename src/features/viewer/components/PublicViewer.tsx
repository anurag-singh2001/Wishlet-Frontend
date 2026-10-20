"use client";

import React, { useEffect, useState } from "react";
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

const AFTER_INTERACTION_MS = 2500;
const FALLBACK_MS = 8000;

/** Visible once the recipient interacted with the template (+2.5s), or after 8s regardless. */
function useShareReveal(enabled: boolean): { visible: boolean; onInteract: () => void } {
  const [visible, setVisible] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const t = setTimeout(() => setVisible(true), FALLBACK_MS);
    return () => clearTimeout(t);
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !interacted) return;
    const t = setTimeout(() => setVisible(true), AFTER_INTERACTION_MS);
    return () => clearTimeout(t);
  }, [enabled, interacted]);

  return { visible, onInteract: () => setInteracted(true) };
}

export function PublicViewer({ slug }: PublicViewerProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wish", slug],
    queryFn: () => getWish(slug),
    retry: false, // Don't retry on 404
  });
  const share = useShareReveal(Boolean(data));

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
    <div
      className="min-h-[100dvh] w-full"
      onPointerDownCapture={share.onInteract}
      onKeyDownCapture={share.onInteract}
    >
      <TemplateRenderer templateId={data.templateId} props={templateProps} />
      {share.visible && (
        <div className="safe-bottom pointer-events-none fixed inset-x-0 bottom-4 z-50 flex animate-fade-in justify-center px-4">
          <div className="pointer-events-auto">
            <InstagramShareButton slug={slug} label="Share to your story" variant="pill" />
          </div>
        </div>
      )}
    </div>
  );
}
