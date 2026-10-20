"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useToast } from "@/components/ui";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";
import { useDeleteWish } from "../hooks/use-delete-wish";
import { DeleteWishSheet } from "./DeleteWishSheet";
import { ShareActions } from "./ShareActions";
import type { BuilderState } from "../types";

interface SuccessScreenProps {
  url: string;
  slug: string;
  state: BuilderState;
  onReset: () => void;
  onDeleted: () => void;
}

const LINK =
  "flex h-11 items-center justify-center rounded-control text-[15px] font-bold text-brand focus-visible:outline-2 focus-visible:outline-brand";

export function SuccessScreen({
  url,
  slug,
  state,
  onReset,
  onDeleted,
}: SuccessScreenProps): React.ReactElement {
  const toast = useToast();
  const [confirming, setConfirming] = useState(false);
  const { remove, deleting, error, clearError } = useDeleteWish(() => {
    toast("Wish deleted");
    onDeleted();
  });
  const name = state.recipientName.trim();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col p-5 safe-top">
      <div className="flex justify-end">
        <Link href="/" aria-label="Close" className="flex h-11 w-11 items-center justify-center">
          <X size={22} aria-hidden="true" />
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3.5 text-center">
        <div
          className="h-[230px] w-[150px] overflow-hidden rounded-[22px] border-[6px] border-ink shadow-xl"
          aria-hidden="true"
        >
          <div className="pointer-events-none h-[640px] w-[360px] origin-top-left scale-[0.38]">
            <TemplateRenderer
              templateId={state.templateId}
              props={{
                recipientName: name,
                senderName: state.senderName,
                message: state.message,
                occasion: state.occasion,
                photos: state.photos,
                content: {},
              }}
            />
          </div>
        </div>
        <h1 className="font-display text-[30px] font-extrabold text-ink">
          {name ? `${name}'s wish is ready` : "Your wish is ready"}
        </h1>
        <p className="text-[15px] leading-normal text-[#4B4766]">
          Only people you send the link to can open it.
        </p>
      </div>

      <div className="mt-6">
        <ShareActions url={url} slug={slug} senderName={state.senderName} recipientName={name} />
      </div>

      <div className="mt-auto flex flex-col gap-1 border-t border-hairline pt-3">
        <a href={url} target="_blank" rel="noreferrer" className={LINK}>
          View the wish
        </a>
        <button type="button" onClick={onReset} className={LINK}>
          Create another
        </button>
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="h-11 rounded-control text-[15px] font-bold text-[#B42318] focus-visible:outline-2 focus-visible:outline-brand"
        >
          Delete this wish
        </button>
      </div>

      <DeleteWishSheet
        open={confirming}
        name={name}
        deleting={deleting}
        error={error}
        onConfirm={() => void remove(slug)}
        onClose={() => {
          setConfirming(false);
          clearError();
        }}
      />
    </div>
  );
}
