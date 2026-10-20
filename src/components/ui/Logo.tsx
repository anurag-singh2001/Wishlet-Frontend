import { cn } from "@/lib/utils";

export interface LogoProps {
  /** Mark size in px. Default 32. */
  size?: number;
  /** Show the "Wishlet" wordmark next to the mark. */
  wordmark?: boolean;
  className?: string;
}

export function Logo({ size = 32, wordmark = true, className }: LogoProps): React.JSX.Element {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        role={wordmark ? undefined : "img"}
        aria-label={wordmark ? undefined : "Wishlet"}
        aria-hidden={wordmark ? true : undefined}
      >
        <rect width="32" height="32" rx="7" fill="#4F46E5" />
        <path
          d="M16 5 C16.5 11 21 15.5 27 16 C21 16.5 16.5 21 16 27 C15.5 21 11 16.5 5 16 C11 15.5 15.5 11 16 5Z"
          fill="white"
        />
        <path
          d="M24 6 C24.2 8 25.5 9.3 27.5 9.5 C25.5 9.7 24.2 11 24 13 C23.8 11 22.5 9.7 20.5 9.5 C22.5 9.3 23.8 8 24 6Z"
          fill="white"
          opacity="0.7"
        />
      </svg>
      {wordmark && (
        <span
          className="font-display font-extrabold tracking-tight text-ink"
          style={{ fontSize: Math.round(size * 0.7) }}
        >
          Wishlet
        </span>
      )}
    </span>
  );
}
