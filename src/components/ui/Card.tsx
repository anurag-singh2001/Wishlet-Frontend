import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "article" | "section" | "li";
}

export function Card({ as: Tag = "div", className, ...rest }: CardProps): React.JSX.Element {
  return (
    <Tag
      className={cn("rounded-card border border-hairline bg-surface p-5", className)}
      {...rest}
    />
  );
}
