import { cn } from "@/lib/utils";

/** Placeholder block. Size it with className, e.g. `<Skeleton className="h-6 w-40" />`. */
export function Skeleton({ className }: { className?: string }): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-control bg-hairline", className)}
    />
  );
}
