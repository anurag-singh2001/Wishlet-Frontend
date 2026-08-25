"use client";

import React, { useState, useEffect } from "react";
import { Copy, ExternalLink, Check, Plus, Share2, MessageCircle } from "lucide-react";
import { trackWishShared } from "@/lib/analytics";

interface GenerationSuccessProps {
  url: string;
  senderName: string;
  onReset: () => void;
}

export function GenerationSuccess({ url, senderName, onReset }: GenerationSuccessProps) {
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

  // Ensure URL is always absolute (navigator.share requires it)
  const absoluteUrl = url.startsWith("http") ? url : (typeof window !== "undefined" ? `${window.location.origin}${url}` : url);

  const whatsappText = `${shareText}\n${absoluteUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      trackWishShared("copy_link");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    try {
      if (canShare) {
        trackWishShared("native_share");
        await navigator.share({
          text: shareText,
          url: absoluteUrl,
        });
      }
    } catch (err) {
      // AbortError is common when user closes the share sheet without sharing
      console.error("Share aborted or failed:", err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-8 bg-white text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
        <Check size={40} strokeWidth={3} />
      </div>
      
      <h2 className="text-3xl font-bold text-slate-900 mb-3">Your wish is ready!</h2>
      <p className="text-slate-600 mb-8 max-w-md">
        We&apos;ve generated your personalized occasion page. Share it with your recipient below.
      </p>

      <div className="w-full max-w-sm flex flex-col gap-3 mb-8">
        {canShare ? (
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-semibold transition-all shadow-md shadow-indigo-600/20"
          >
            <Share2 size={20} />
            <span>Share Wishlet</span>
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
            <span>Share via WhatsApp</span>
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

      <div className="w-full max-w-sm pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
        <a
          href={absoluteUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center space-x-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 py-3 px-4 rounded-xl font-medium transition-colors text-sm"
        >
          <ExternalLink size={16} />
          <span>Preview</span>
        </a>
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center space-x-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 py-3 px-4 rounded-xl font-medium transition-colors text-sm"
        >
          <Plus size={16} />
          <span>Create Another</span>
        </button>
      </div>
    </div>
  );
}
