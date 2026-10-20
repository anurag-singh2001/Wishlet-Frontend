"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, useToast } from "@/components/ui";
import { DeleteWishSheet } from "@/features/builder/components/DeleteWishSheet";
import { useDeleteWish } from "@/features/builder/hooks/use-delete-wish";
import { listOwnedWishes, type OwnedWish } from "@/lib/wish-tokens";
import { WishCard } from "./WishCard";

interface MyWishesListProps {
  /** Show only the newest N wishes. */
  limit?: number;
  /** Trimmed cards (no menu) for embedding, e.g. on the app home. */
  compact?: boolean;
}

export function MyWishesList({ limit, compact = false }: MyWishesListProps): React.ReactElement {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [wishes, setWishes] = useState<OwnedWish[] | null>(null);
  const [target, setTarget] = useState<OwnedWish | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWishes(listOwnedWishes());
  }, []);

  const drop = useCallback((slug: string): void => {
    setWishes((prev) => (prev ? prev.filter((w) => w.slug !== slug) : prev));
  }, []);

  const { remove, deleting, error, clearError } = useDeleteWish((slug) => {
    drop(slug);
    queryClient.removeQueries({ queryKey: ["wish-stats", slug] });
    setTarget(null);
    toast("Wish deleted");
  });

  if (wishes === null) return <div aria-busy="true" className="min-h-24" />;

  if (wishes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card border border-hairline bg-surface p-8 text-center">
        <h2 className="font-display text-[22px] font-extrabold text-ink">No wishes yet</h2>
        <p className="text-[15px] text-[#4B4766]">Make your first one in under a minute.</p>
        <Button href="/build">Create a wish</Button>
      </div>
    );
  }

  const visible = limit ? wishes.slice(0, limit) : wishes;

  return (
    <>
      <ul className="flex flex-col gap-3.5">
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
    </>
  );
}
