"use client";
import { createElement, useCallback, useRef, useState } from "react";
import type { ReactElement, RefCallback } from "react";

const DEFAULT_RING =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80 focus-visible:ring-offset-2";

interface UseRevealOptions {
  autoOpen?: boolean;
  reduced?: boolean | null;
  /** Palette-appropriate focus ring classes for the cover. */
  ring?: string;
}

interface UseRevealResult {
  isOpen: boolean;
  open: () => void;
  coverProps: {
    onClick: () => void;
    "aria-expanded": boolean;
    className: string;
  };
  /** Callback ref for the opened card's heading (give it tabIndex={-1}). */
  headingRef: RefCallback<HTMLHeadingElement>;
  /** Visually hidden live region; render once inside the template root. */
  announce: ReactElement;
  /** Shared open transition for covers and cards. */
  transition: { duration: number; ease: "easeOut" };
}

/** Tap-to-open state with focus management and screen reader announcement. */
export function useReveal({ autoOpen, reduced, ring }: UseRevealOptions): UseRevealResult {
  const [isOpen, setIsOpen] = useState(Boolean(autoOpen));
  const [message, setMessage] = useState("");
  const pendingFocus = useRef(false);

  const open = useCallback((): void => {
    pendingFocus.current = true;
    setIsOpen(true);
    setMessage("Card opened");
  }, []);

  const headingRef = useCallback<RefCallback<HTMLHeadingElement>>((el) => {
    if (el && pendingFocus.current) {
      pendingFocus.current = false;
      el.focus({ preventScroll: true });
    }
  }, []);

  const announce = createElement(
    "div",
    { "aria-live": "polite", role: "status", className: "sr-only" },
    message,
  );

  return {
    isOpen,
    open,
    coverProps: { onClick: open, "aria-expanded": isOpen, className: ring ?? DEFAULT_RING },
    headingRef,
    announce,
    transition: { duration: reduced ? 0 : 0.7, ease: "easeOut" },
  };
}
