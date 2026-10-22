"use client";

import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";
import type { TemplateProps } from "@/features/templates/types";
import { trackWishViewed } from "@/lib/analytics";

import { getWish, recordWishView } from "@/lib/api";
import { listOwnedWishes } from "@/lib/wish-tokens";
import { InstagramShareButton } from "./InstagramShareButton";
import { useVoicePlayback } from "../hooks/use-voice-playback";
import { CreateYourOwn } from "./CreateYourOwn";
import { ReactionBar } from "./ReactionBar";
import { ViewerError, ViewerLoading } from "./ViewerStates";
import { VoicePill } from "./VoicePill";
import { VoicePlayer } from "./VoicePlayer";

interface PublicViewerProps {
  slug: string;
}

export function PublicViewer({ slug }: PublicViewerProps) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["wish", slug],
    queryFn: () => getWish(slug),
    // Only transient API errors are retried; NOT_FOUND / EXPIRED are final.
    retry: (n, err) => err.message === "API_ERROR" && n < 2,
    retryDelay: (n) => Math.min(1000 * 2 ** n, 4000),
  });
  const { voice, audioRef, audioProps } = useVoicePlayback(data?.content.voiceDuration);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
  if (error) {
    return (
      <ViewerError
        kind={
          error.message === "EXPIRED"
            ? "expired"
            : error.message === "NOT_FOUND"
              ? "notFound"
              : "error"
        }
        onRetry={() => void refetch()}
      />
    );
  }
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

  const voiceUrl = data.content.voiceUrl;
  const sender = templateProps.senderName;

  return (
    <div className="w-full">
      <div ref={cardRef}>
        <TemplateRenderer templateId={data.templateId} props={templateProps} />
      </div>
      {voiceUrl && <audio ref={audioRef} src={voiceUrl} {...audioProps} />}
      {/* Below the wish, in normal flow: it never sits on top of the card. */}
      <section
        ref={sectionRef}
        aria-label="Reply and share"
        className="safe-bottom flex flex-col items-center gap-5 border-t border-hairline bg-ground px-4 py-8 text-center"
      >
        {voiceUrl && <VoicePlayer voice={voice} sender={sender} />}
        {data.content.reactionsEnabled !== false && <ReactionBar slug={slug} />}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted">Loved it? Share the moment on your story.</p>
          <InstagramShareButton slug={slug} label="Share to your story" variant="pill" />
        </div>
        <CreateYourOwn />
      </section>
      {voiceUrl && (
        <VoicePill voice={voice} sender={sender} watchRef={cardRef} sectionRef={sectionRef} />
      )}
    </div>
  );
}
