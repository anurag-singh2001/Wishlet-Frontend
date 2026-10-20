import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover active:bg-brand-deep",
  secondary: "bg-surface text-ink border border-hairline hover:bg-brand-soft",
  ghost: "bg-transparent text-brand hover:bg-brand-soft",
  danger: "bg-surface text-danger border border-[#F3C2C0] hover:bg-red-50",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-[15px]",
  md: "h-[52px] px-6 text-base",
  lg: "h-14 px-8 text-base",
};

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a next/link instead of a <button>. */
  href?: string;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

function Spinner(): React.JSX.Element {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps): React.JSX.Element {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-control font-bold transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
    className,
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
