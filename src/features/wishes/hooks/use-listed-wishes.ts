"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/use-auth";
import { getMyWishes } from "@/lib/auth-api";
import { listOwnedWishes } from "@/lib/wish-tokens";
import type { ListedWish } from "../types";

/** Account wishes (when signed in) merged with this device's wishes, deduped by slug. */
export function useListedWishes(): { wishes: ListedWish[] | null; drop: (slug: string) => void } {
  const { status } = useAuth();
  const signedIn = status === "signedIn";
  const [local, setLocal] = useState<ListedWish[] | null>(null);
  const [dropped, setDropped] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocal(listOwnedWishes());
  }, [status]);

  const remote = useQuery({
    queryKey: ["my-wishes"],
    queryFn: getMyWishes,
    enabled: signedIn,
    retry: false,
  });

  const drop = useCallback((slug: string): void => {
    setDropped((prev) => [...prev, slug]);
  }, []);

  const wishes = useMemo<ListedWish[] | null>(() => {
    if (local === null || status === "loading" || (signedIn && remote.isPending)) return null;
    const localBySlug = new Map(local.map((w) => [w.slug, w]));
    const fromAccount: ListedWish[] = (signedIn ? (remote.data ?? []) : []).map((s) => ({
      ...localBySlug.get(s.slug),
      slug: s.slug,
      token: localBySlug.get(s.slug)?.token ?? null,
      recipientName: s.recipientName ?? undefined,
      occasion: s.occasion,
      templateId: s.templateId,
      createdAt: s.createdAt,
      expiresAt: s.expiresAt ?? undefined,
      summary: s,
    }));
    const seen = new Set(fromAccount.map((w) => w.slug));
    return [...fromAccount, ...local.filter((w) => !seen.has(w.slug))].filter(
      (w) => !dropped.includes(w.slug),
    );
  }, [local, status, signedIn, remote.isPending, remote.data, dropped]);

  return { wishes, drop };
}
