"use client";

import { Button, Logo } from "@/components/ui";

export default function GlobalError({
  reset,
}: {
  error: Error;
  reset: () => void;
}): React.JSX.Element {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-ground p-6 text-center">
      <Logo size={48} wordmark={false} />
      <h1 className="font-display text-2xl font-extrabold text-ink">Something went wrong</h1>
      <p className="max-w-sm text-muted">
        Please try again. If it keeps happening, come back soon.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} size="lg">
          Try again
        </Button>
        <Button href="/" variant="secondary" size="lg">
          Home
        </Button>
      </div>
    </main>
  );
}
