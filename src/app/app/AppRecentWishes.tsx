"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Badge, Skeleton } from "@/components/ui";
import { getWishStats } from "@/lib/api";
import { listOwnedWishes } from "@/lib/wish-tokens";

interface OwnedWish {
  slug: string;
  token: string;
  recipientName?: string;
  occasion?: string;
  createdAt?: string;
}

function readLatest(): string {
  try {
    const all = listOwnedWishes() as OwnedWish[];
    const sorted = [...all].sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
    return JSON.stringify(sorted.slice(0, 3));
  } catch {
    return "[]";
  }
}

const subscribe = (): (() => void) => () => undefined;

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function label(occasion?: string): string {
  if (!occasion) return "";
  const text = occasion.replace(/-/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function Row({ wish }: { wish: OwnedWish }): React.JSX.Element {
  const { data } = useQuery({
    queryKey: ["wish-stats", wish.slug],
    queryFn: () => getWishStats(wish.slug, wish.token),
    staleTime: 60_000,
  });
  const meta = [label(wish.occasion), formatDate(wish.createdAt)].filter(Boolean).join(" · ");
  return (
    <Link
      href="/wishes"
      className="flex items-center gap-3 rounded-[20px] border border-hairline bg-surface p-3.5"
    >
      <span className="h-10 w-10 flex-none rounded-xl bg-brand-soft" aria-hidden="true" />
      <span className="flex min-w-0 flex-1 flex-col">
        <strong className="truncate text-base">
          {wish.recipientName ? `For ${wish.recipientName}` : "Your wish"}
        </strong>
        {meta && <span className="text-[13px] text-muted">{meta}</span>}
      </span>
      {data ? (
        <Badge>
          {data.viewCount} {data.viewCount === 1 ? "view" : "views"}
        </Badge>
      ) : (
        <Skeleton className="h-7 w-16 rounded-full" />
      )}
    </Link>
  );
}

export function AppRecentWishes(): React.JSX.Element {
  const raw = useSyncExternalStore(subscribe, readLatest, () => "[]");
  const wishes = JSON.parse(raw) as OwnedWish[];
  if (wishes.length === 0) {
    return (
      <div className="rounded-[20px] border border-dashed border-hairline bg-surface p-6 text-center">
        <p className="font-bold">No wishes yet</p>
        <p className="mt-1 text-sm text-muted">Make your first one and it will show up here.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {wishes.map((w) => (
        <Row key={w.slug} wish={w} />
      ))}
    </div>
  );
}
