"use client";

import React, { useState } from "react";
import { ExternalLink, Check, Plus } from "lucide-react";
import { ShareOptions } from "./ShareOptions";
import { trackWishDeleted } from "@/lib/analytics";
import { deleteWish } from "@/lib/api";
import { getWishToken, removeWishToken } from "@/lib/wish-tokens";

interface GenerationSuccessProps {
  url: string;
  slug: string;
  senderName: string;
  onReset: () => void;
  onDeleted: () => void;
}

export function GenerationSuccess({
  url,
  slug,
  senderName,
  onReset,
  onDeleted,
}: GenerationSuccessProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = async () => {
    const token = getWishToken(slug);
    if (!token) {
      setDeleteError("Delete key not found on this device.");
      return;
    }
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteWish(slug, token);
      removeWishToken(slug);
      trackWishDeleted();
      onDeleted();
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete wish.");
      setDeleting(false);
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

      <ShareOptions url={url} slug={slug} senderName={senderName} />

      <div className="w-full max-w-sm pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
        <a
          href={url}
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

      <div className="w-full max-w-sm mt-6 text-center">
        {confirmingDelete ? (
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-slate-700">Delete permanently?</span>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Yes"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              disabled={deleting}
              className="font-medium text-slate-500 hover:text-slate-700 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="text-xs text-slate-400 hover:text-red-600 hover:underline transition-colors"
          >
            Delete this wish
          </button>
        )}
        {deleteError && <p className="text-xs text-red-500 mt-2">{deleteError}</p>}
      </div>

      <div className="w-full max-w-sm mt-6 pt-6 border-t border-slate-100/80 text-center">
        <p className="text-sm font-semibold text-slate-800 mb-0.5">How was your experience?</p>
        <p className="text-xs text-slate-500 mb-2.5">We&apos;d love to hear what you think.</p>
        <a
          href="https://forms.gle/5zA5dNXDY2PexPHx9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
        >
          Share feedback →
        </a>
      </div>
    </div>
  );
}
