"use client";

import React from "react";
import { Button } from "@/components/ui";
import { AccountMenu } from "./AccountMenu";
import { useAuth } from "./use-auth";

/** Desktop header: "Sign in" (links to the sign-in page) or the account menu. */
export function HeaderAuth(): React.ReactElement | null {
  const { status, native, user } = useAuth();
  if (native || status === "loading") return null;
  if (status === "signedIn" && user) return <AccountMenu />;
  return (
    <Button href="/signin" variant="ghost" size="sm">
      Sign in
    </Button>
  );
}

/** Inside the phone menu sheet: the Google button inline, or who is signed in. */
export function MenuAuth({ onDone }: { onDone: () => void }): React.ReactElement | null {
  const { status, native, user, signOut } = useAuth();
  if (native || status === "loading") return null;
  if (status === "signedIn" && user) {
    return (
      <div className="flex flex-col gap-1 border-t border-hairline pt-3">
        <p className="truncate text-[14px] text-[#4B4766]">
          Signed in as {user.name || user.email}
        </p>
        <Button
          variant="secondary"
          fullWidth
          onClick={() => {
            onDone();
            signOut();
          }}
        >
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div className="border-t border-hairline pt-3">
      <Button href="/signin" variant="secondary" fullWidth onClick={onDone}>
        Sign in with Google
      </Button>
    </div>
  );
}
