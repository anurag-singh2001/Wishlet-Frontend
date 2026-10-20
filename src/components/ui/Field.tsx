import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const BASE =
  "w-full rounded-control bg-surface px-3.5 text-[15px] font-medium text-ink placeholder:text-muted/60 " +
  "border outline-none transition-colors focus:border-2 focus:border-brand disabled:opacity-50";

function stateClass(error?: string): string {
  return error ? "border-danger-border" : "border-hairline";
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Label + control + hint/error. Give the control the same `id`; use Input/Textarea for wiring. */
export function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: FieldProps): React.JSX.Element {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[13px] font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface ControlExtras {
  id: string;
  /** Error message: turns the border red and sets aria-invalid/aria-describedby. */
  error?: string;
  /** Pass true when the Field shows a hint, so aria-describedby points at it. */
  hasHint?: boolean;
}

function describedBy(id: string, error?: string, hasHint?: boolean): string | undefined {
  if (error) return `${id}-error`;
  return hasHint ? `${id}-hint` : undefined;
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & ControlExtras;

export function Input({ id, error, hasHint, className, ...rest }: InputProps): React.JSX.Element {
  return (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hasHint)}
      className={cn(BASE, "h-12", stateClass(error), className)}
      {...rest}
    />
  );
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & ControlExtras;

export function Textarea({
  id,
  error,
  hasHint,
  className,
  ...rest
}: TextareaProps): React.JSX.Element {
  return (
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hasHint)}
      className={cn(BASE, "min-h-24 resize-none py-3", stateClass(error), className)}
      {...rest}
    />
  );
}
