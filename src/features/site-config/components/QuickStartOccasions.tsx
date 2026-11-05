"use client";

import React from "react";
import Link from "next/link";
import { useSiteConfig } from "../hooks/use-site-config";

export function QuickStartOccasions(): React.JSX.Element {
  const { occasions } = useSiteConfig();
  return (
    <div className="scrollbar-hide -mx-5 flex gap-2.5 overflow-x-auto px-5">
      {occasions.map((o) => (
        <Link
          key={o.id}
          href={`/build?occasion=${o.id}`}
          className="flex-none rounded-2xl border border-hairline bg-surface px-3.5 py-3 text-sm font-bold text-ink"
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
