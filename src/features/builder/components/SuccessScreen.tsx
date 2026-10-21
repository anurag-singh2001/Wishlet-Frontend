"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, X } from "lucide-react";
import { useToast } from "@/components/ui";
import { TemplateFrame } from "@/features/templates/components/TemplateFrame";
import { msLeft, timeLeft, useNow } from "@/lib/expiry";
import { useDeleteWish } from "../hooks/use-delete-wish";
import { DeleteWishSheet } from "./DeleteWishSheet";
import { ShareActions } from "./ShareActions";
import type { BuilderState } from "../types";

interface SuccessScreenProps {
  url: string;
  slug: string;
  expiresAt?: string;
  state: BuilderState;
  onReset: () => void;
  onDeleted: () => void;
}

const LINK =
  "flex h-11 items-center justify-center rounded-control text-[15px] font-bold text-brand focus-visible:outline-2 focus-visible:outline-brand";

function expiryClock(expiresAt: string, now: number): string {
  const d = new Date(expiresAt);
  const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(d);
  const sameDay = d.toDateString() === new Date(now).toDateString();
  return `${time} ${sameDay ? "today" : "tomorrow"}`;
}

export function SuccessScreen({
  url,
  slug,
  expiresAt,
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
  const now = useNow();
  const name = state.recipientName.trim();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col p-5 safe-top">
      <div className="flex justify-end">
        <Link href="/" aria-label="Close" className="flex h-11 w-11 items-center justify-center">
          <X size={22} aria-hidden="true" />
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3.5 text-center">
        <div className="h-[230px] w-[150px] overflow-hidden rounded-[22px] border-[6px] border-ink shadow-xl">
          <TemplateFrame
            templateId={state.templateId}
            recipientName={name}
            senderName={state.senderName}
            message={state.message}
            occasion={state.occasion}
            photo={state.photos[0]}
            cover
            title={`Preview of ${name || "your"} wish`}
          />
        </div>
        <h1 className="font-display text-[30px] font-extrabold text-ink">
          {name ? `${name}'s wish is ready` : "Your wish is ready"}
        </h1>
        <p className="text-[15px] leading-normal text-[#4B4766]">
          Only people you send the link to can open it.
        </p>
        {expiresAt && now !== null && (msLeft(expiresAt, now) ?? 0) > 0 && (
          <p className="flex items-center justify-center gap-1.5 text-[13px] text-[#4B4766]">
            <Clock size={15} aria-hidden="true" />
            Link expires in {timeLeft(expiresAt, now).label.replace(" left", "")} · at{" "}
            {expiryClock(expiresAt, now)}
          </p>
        )}
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
