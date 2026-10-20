import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "brand" | "neutral" | "party";

const TONES: Record<BadgeTone, string> = {
  brand: "bg-brand-soft text-brand-deep",
  neutral: "bg-hairline/60 text-muted",
  party: "bg-party/15 text-[#A8381C]",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

/** Small pill, e.g. `<Badge>12 views</Badge>` or `<Badge tone="neutral">Not opened</Badge>`. */
export function Badge({ tone = "brand", className, ...rest }: BadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[13px] font-semibold",
        TONES[tone],
        className,
      )}
      {...rest}
    />
  );
}
