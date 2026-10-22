"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, useToast } from "@/components/ui";
import { useAuth } from "./use-auth";

function NativeButton({
  className,
  disabled,
  onClick,
}: {
  className?: string;
  disabled: boolean;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Continue with Google"
      className={`flex h-[52px] w-full items-center justify-center gap-3 rounded-full border border-hairline bg-white px-6 text-[16px] font-semibold text-ink disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className ?? ""}`}
    >
      <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.3 5.7c4.3-4 6.7-9.8 6.7-17.4z"
        />
        <path
          fill="#FBBC05"
          d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.3-5.7c-2 1.4-4.9 2.3-8.6 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
        />
      </svg>
      Continue with Google
    </button>
  );
}

/** Official Google button; a plain button stands in if Google's script can't render it. */
export function GoogleSignInButton({
  className,
}: {
  className?: string;
}): React.ReactElement | null {
  const { gisReady, native, status, signIn, signingIn } = useAuth();
  const toast = useToast();
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!gisReady || !ref.current || !window.google) return;
    try {
      window.google.accounts.id.renderButton(ref.current, {
        theme: "outline",
        size: "large",
        width: 320,
        shape: "pill",
        text: "continue_with",
        logo_alignment: "left",
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, [gisReady]);

  if (status === "signedIn") return null;
  if (native)
    return (
      <NativeButton className={className} disabled={signingIn} onClick={() => void signIn()} />
    );

  const fallback = !gisReady || failed;
  return (
    <div className={`${signingIn ? "pointer-events-none opacity-50" : ""} ${className ?? ""}`}>
      <div ref={ref} className={fallback ? "hidden" : "flex min-h-11 justify-center"} />
      {fallback && (
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          disabled={signingIn}
          onClick={() => {
            if (window.google) window.google.accounts.id.prompt();
            else toast("Google sign-in is still loading. Try again in a moment");
          }}
        >
          Continue with Google
        </Button>
      )}
    </div>
  );
}
