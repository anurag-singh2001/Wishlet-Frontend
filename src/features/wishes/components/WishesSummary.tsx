"use client";

import React from "react";
import { useQueries } from "@tanstack/react-query";
import { getWishStats } from "@/lib/api";
import type { ListedWish } from "../types";

export function WishesSummary({ wishes }: { wishes: ListedWish[] }): React.ReactElement {
  const results = useQueries({
    queries: wishes.map((w) => ({
      queryKey: ["wish-stats", w.slug],
      queryFn: () => getWishStats(w.slug, w.token),
      enabled: !w.summary,
      retry: false,
    })),
  });
  const opens = wishes.reduce(
    (sum, w, i) => sum + (w.summary?.viewCount ?? results[i]?.data?.viewCount ?? 0),
    0,
  );
  const loaded = wishes.some((w, i) => w.summary || results[i]?.data);
  const n = wishes.length;
  return (
    <p className="text-[15px] text-[#4B4766]">
      {n} {n === 1 ? "wish" : "wishes"} sent
      {loaded && ` · opened ${opens} ${opens === 1 ? "time" : "times"}`}
    </p>
  );
}
