"use client";

import React from "react";
import { Button, Logo, Skeleton } from "@/components/ui";

export function ViewerLoading(): React.ReactElement {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-ground p-6"
    >
      <div className="motion-safe:animate-pulse">
        <Logo size={56} wordmark={false} />
      </div>
      <p className="font-display text-lg font-bold text-ink">Unwrapping your wish…</p>
      <div className="flex w-full max-w-xs flex-col gap-3" aria-hidden="true">
        <Skeleton className="h-6 w-2/3 self-center" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}

export function ViewerError({ notFound }: { notFound: boolean }): React.ReactElement {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-ground p-6 text-center">
      <Logo size={48} wordmark={false} />
      <h1 className="font-display text-2xl font-extrabold text-ink">
        {notFound ? "This wish isn't here anymore" : "Something went wrong"}
      </h1>
      <p className="max-w-sm text-muted">
        {notFound
          ? "The link may be mistyped, or the wish was deleted."
          : "We couldn't load this wish. Please try again in a moment."}
      </p>
      <Button href="/build" size="lg">
        Make your own wish
      </Button>
    </div>
  );
}
