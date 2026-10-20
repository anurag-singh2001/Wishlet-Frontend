"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Eye } from "lucide-react";
import { getWishStats } from "@/lib/api";
import { listOwnedWishes, removeWishToken } from "@/lib/wish-tokens";

interface RowProps {
  slug: string;
  token: string;
  onGone: (slug: string) => void;
}

function MyWishRow({ slug, token, onGone }: RowProps): React.ReactElement {
  const { data, isError, error } = useQuery({
    queryKey: ["wish-stats", slug],
    queryFn: () => getWishStats(slug, token),
    retry: false,
  });

  useEffect(() => {
    if (isError && (error.message === "FORBIDDEN" || error.message === "NOT_FOUND")) {
      removeWishToken(slug);
      onGone(slug);
    }
  }, [isError, error, slug, onGone]);

  return (
    <li className="flex items-center justify-between gap-3 py-2 text-xs">
      <div className="min-w-0">
        <a
          href={`/w/${slug}`}
          target="_blank"
          rel="noreferrer"
          className="block truncate font-medium text-indigo-600 hover:underline"
        >
          /w/{slug}
        </a>
        <span className="text-slate-400">
          {data ? new Date(data.createdAt).toLocaleDateString() : "—"}
        </span>
      </div>
      <span className="flex shrink-0 items-center gap-1 text-slate-600">
        <Eye size={14} />
        {data ? data.viewCount : "—"}
      </span>
    </li>
  );
}

export function MyWishes(): React.ReactElement | null {
  const [owned, setOwned] = useState<{ slug: string; token: string }[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOwned(listOwnedWishes());
  }, []);

  const handleGone = React.useCallback((slug: string): void => {
    setOwned((prev) => prev.filter((w) => w.slug !== slug));
  }, []);

  if (owned.length === 0) return null;

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2 text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between font-medium text-slate-700"
      >
        <span>My wishes ({owned.length})</span>
        <ChevronDown size={16} className={open ? "rotate-180 transition" : "transition"} />
      </button>
      {open && (
        <ul className="mt-1 max-h-40 divide-y divide-slate-100 overflow-y-auto">
          {owned.map((w) => (
            <MyWishRow key={w.slug} slug={w.slug} token={w.token} onGone={handleGone} />
          ))}
        </ul>
      )}
    </div>
  );
}
