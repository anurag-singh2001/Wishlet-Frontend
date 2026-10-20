"use client";

import React, { useEffect, useState } from "react";
import { Copy, MessageCircle, Share } from "lucide-react";
import { Button, useToast } from "@/components/ui";
import { isNative } from "@/lib/native/share-native";
import { trackWishShared } from "@/lib/analytics";
import { InstagramShareButton } from "@/features/viewer/components/InstagramShareButton";
import { DownloadQrButton } from "./DownloadQrButton";

interface ShareActionsProps {
  url: string;
  slug: string;
  senderName: string;
  recipientName: string;
}

const TILE =
  "flex h-[76px] w-full flex-col items-center justify-center gap-1.5 rounded-2xl px-1 text-center [&>*]:ml-0 border border-hairline bg-surface text-[13px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function ShareActions({
  url,
  slug,
  senderName,
  recipientName,
}: ShareActionsProps): React.ReactElement {
  const toast = useToast();
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (isNative() || "share" in navigator) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanShare(true);
    }
  }, []);

  const shareText = senderName
    ? `${senderName} made something special for you ❤️`
    : "Someone made something special for you ❤️";
  const absoluteUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${absoluteUrl}`)}`;
  const who = recipientName.trim() || "them";

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      trackWishShared("copy_link");
      toast("Link copied");
    } catch {
      toast("Couldn't copy. Copy it from the address bar instead.");
    }
  };

  const handleShare = async (): Promise<void> => {
    try {
      trackWishShared("native_share");
      if (isNative()) {
        const { shareTextNative } = await import("@/lib/native/share-native");
        await shareTextNative({ text: shareText, url: absoluteUrl });
        return;
      }
      await navigator.share({ text: shareText, url: absoluteUrl });
    } catch {
      // user closed the share sheet
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {canShare ? (
        <Button size="lg" fullWidth onClick={handleShare}>
          <Share size={20} aria-hidden="true" />
          Send to {who}
        </Button>
      ) : (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWishShared("whatsapp")}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-control bg-brand px-8 text-base font-bold text-white hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <MessageCircle size={20} aria-hidden="true" />
          Send to {who}
        </a>
      )}
      <div className="grid grid-cols-3 gap-2.5">
        <InstagramShareButton
          slug={slug}
          pregenerate
          variant="tile"
          label="Post to story"
          className={TILE}
        />
        <button type="button" onClick={handleCopy} className={TILE}>
          <Copy size={22} aria-hidden="true" />
          Copy link
        </button>
        <DownloadQrButton url={absoluteUrl} slug={slug} className={TILE} />
      </div>
    </div>
  );
}
