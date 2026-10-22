"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, useToast } from "@/components/ui";
import { useAuth } from "./use-auth";

/** Official Google button; a plain button stands in if Google's script can't render it. */
export function GoogleSignInButton({
  className,
}: {
  className?: string;
}): React.ReactElement | null {
  const { gisReady, native, status } = useAuth();
  const toast = useToast();
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!gisReady || !ref.current || !window.google) return;
    try {
      window.google.accounts.id.renderButton(ref.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "signin_with",
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, [gisReady]);

  if (native || status === "signedIn") return null;

  const fallback = !gisReady || failed;
  return (
    <div className={className}>
      <div ref={ref} className={fallback ? "hidden" : "flex min-h-11 justify-center"} />
      {fallback && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            if (window.google) window.google.accounts.id.prompt();
            else toast("Google sign-in is still loading. Try again in a moment");
          }}
        >
          Sign in with Google
        </Button>
      )}
    </div>
  );
}
