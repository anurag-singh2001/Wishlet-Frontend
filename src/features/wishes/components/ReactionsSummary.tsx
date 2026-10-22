"use client";

import React from "react";
import { REACTIONS, type ReactionId } from "@/lib/api";

export function ReactionsSummary({
  reactions,
}: {
  reactions?: Record<ReactionId, number>;
}): React.ReactElement | null {
  if (!reactions) return null;
  const parts = REACTIONS.filter((r) => (reactions[r.id] ?? 0) > 0).map(
    (r) => `${r.emoji} ${reactions[r.id]}`,
  );
  return (
    <span className="text-[13px] font-bold text-[#4B4766]">
      {parts.length > 0 ? parts.join(" · ") : <span className="font-normal">No reactions yet</span>}
    </span>
  );
}
