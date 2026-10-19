"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Share2, MessageCircle } from "lucide-react";
import { trackWishShared } from "@/lib/analytics";
import { InstagramShareButton } from "@/features/viewer/components/InstagramShareButton";

interface ShareOptionsProps {
  url: string;
  slug: string;
  senderName: string;
}

export function ShareOptions({ url, slug, senderName }: ShareOptionsProps): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanShare(true);
    }
  }, []);

  const shareText = senderName
    ? `${senderName} made something special for you ❤️`
    : "Someone made something special for you ❤️";

  // navigator.share requires an absolute URL
  const absoluteUrl = url.startsWith("http")
    ? url
    : typeof window !== "undefined"
      ? `${window.location.origin}${url}`
      : url;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${absoluteUrl}`)}`;

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      trackWishShared("copy_link");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async (): Promise<void> => {
    try {
      trackWishShared("native_share");
      await navigator.share({ text: shareText, url: absoluteUrl });
    } catch (err) {
      // AbortError: user closed the share sheet
      console.error("Share aborted or failed:", err);
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-6 mb-8">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Send link (private)
        </p>
        {canShare ? (
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-semibold transition-all shadow-md shadow-indigo-600/20"
          >
            <Share2 size={20} />
            <span>Send link</span>
          </button>
        ) : (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackWishShared("whatsapp")}
            className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-xl font-semibold transition-all shadow-md shadow-[#25D366]/20"
          >
            <MessageCircle size={20} />
            <span>Send via WhatsApp</span>
          </a>
        )}
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-4 px-6 rounded-xl font-medium transition-colors"
        >
          {copied ? <Check size={20} className="text-emerald-600" /> : <Copy size={20} />}
          <span>{copied ? "Link Copied!" : "Copy Link"}</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Post publicly (image only, no link)
        </p>
        <InstagramShareButton
          slug={slug}
          label="Share on Instagram Story"
          className="w-full bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold shadow-md"
        />
      </div>
    </div>
  );
}
