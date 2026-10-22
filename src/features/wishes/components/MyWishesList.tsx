"use client";

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui";
import { DeleteWishSheet } from "@/features/builder/components/DeleteWishSheet";
import { useDeleteWish } from "@/features/builder/hooks/use-delete-wish";
import { useListedWishes } from "../hooks/use-listed-wishes";
import type { ListedWish } from "../types";
import { OccasionChips } from "./OccasionChips";
import { WishCard } from "./WishCard";
import { WishesEmpty } from "./WishesEmpty";
import { WishesSummary } from "./WishesSummary";

interface MyWishesListProps {
  /** Show only the newest N wishes. */
  limit?: number;
  /** Trimmed cards (no delete) for embedding, e.g. on the app home. */
  compact?: boolean;
}

export function MyWishesList({ limit, compact = false }: MyWishesListProps): React.ReactElement {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { wishes, drop } = useListedWishes();
  const [filter, setFilter] = useState("all");
  const [target, setTarget] = useState<ListedWish | null>(null);

  const { remove, deleting, error, clearError } = useDeleteWish((slug) => {
    drop(slug);
    queryClient.removeQueries({ queryKey: ["wish-stats", slug] });
    void queryClient.invalidateQueries({ queryKey: ["my-wishes"] });
    setTarget(null);
    toast("Wish deleted");
  });

  if (wishes === null) return <div aria-busy="true" className="min-h-24" />;
  if (wishes.length === 0) return <WishesEmpty />;

  const full = !compact && !limit;
  const occasions = Array.from(new Set(wishes.map((w) => w.occasion).filter(Boolean))) as string[];
  const showChips = full && occasions.length > 1;
  const filtered =
    showChips && filter !== "all" ? wishes.filter((w) => w.occasion === filter) : wishes;
  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="flex flex-col gap-4">
      {full && <WishesSummary wishes={wishes} />}
      {showChips && <OccasionChips occasions={occasions} value={filter} onChange={setFilter} />}
      <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((w) => (
          <WishCard key={w.slug} wish={w} compact={compact} onGone={drop} onMore={setTarget} />
        ))}
      </ul>
      <DeleteWishSheet
        open={target !== null}
        name={target?.recipientName ?? ""}
        deleting={deleting}
        error={error}
        onConfirm={() => target && void remove(target.slug)}
        onClose={() => {
          setTarget(null);
          clearError();
        }}
      />
    </div>
  );
}
