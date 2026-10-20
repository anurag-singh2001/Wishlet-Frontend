"use client";

import React from "react";
import { useQueries } from "@tanstack/react-query";
import { getWishStats } from "@/lib/api";
import type { OwnedWish } from "@/lib/wish-tokens";

export function WishesSummary({ wishes }: { wishes: OwnedWish[] }): React.ReactElement {
  const results = useQueries({
    queries: wishes.map((w) => ({
      queryKey: ["wish-stats", w.slug],
      queryFn: () => getWishStats(w.slug, w.token),
      retry: false,
    })),
  });
  const opens = results.reduce((sum, r) => sum + (r.data?.viewCount ?? 0), 0);
  const loaded = results.some((r) => r.data);
  const n = wishes.length;
  return (
    <p className="text-[15px] text-[#4B4766]">
      {n} {n === 1 ? "wish" : "wishes"} sent
      {loaded && ` · opened ${opens} ${opens === 1 ? "time" : "times"}`}
    </p>
  );
}
