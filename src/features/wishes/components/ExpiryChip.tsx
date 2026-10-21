"use client";

import React from "react";
import { Clock } from "lucide-react";
import { msLeft, SOON_MS, timeLeft, useNow } from "@/lib/expiry";

/** "Expires in 5h 12m" chip; amber under 3 hours. Renders nothing without an expiry. */
export function ExpiryChip({
  expiresAt,
}: {
  expiresAt?: string | null;
}): React.ReactElement | null {
  const now = useNow();
  if (!expiresAt || now === null) return null;
  const { expired, label } = timeLeft(expiresAt, now);
  const soon = (msLeft(expiresAt, now) ?? Infinity) < SOON_MS;
  return (
    <span
      className={`flex items-center gap-1.5 text-[13px] font-bold ${
        soon || expired ? "text-[#8A4B00]" : "text-[#4B4766]"
      }`}
    >
      <Clock size={15} aria-hidden="true" />
      {expired ? "Expired" : `Expires in ${label.replace(" left", "")}`}
    </span>
  );
}
