"use client";

import React, { useState } from "react";
import { Button, Sheet } from "@/components/ui";
import { AccountMenu } from "./AccountMenu";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { useAuth } from "./use-auth";

/** Desktop header: "Sign in" (opens a small sheet) or the account menu. */
export function HeaderAuth(): React.ReactElement | null {
  const { status, native, user } = useAuth();
  const [open, setOpen] = useState(false);
  if (native || status === "loading") return null;
  if (status === "signedIn" && user) return <AccountMenu />;
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Sign in
      </Button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Sign in to Wishlet">
        <p className="mb-4 text-[15px] text-[#4B4766]">
          Keep your wishes on every device. Sending a wish never needs an account.
        </p>
        <GoogleSignInButton />
      </Sheet>
    </>
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
      <GoogleSignInButton />
    </div>
  );
}
