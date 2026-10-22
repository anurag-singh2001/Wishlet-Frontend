"use client";

import React from "react";
import { GoogleSignInButton } from "@/features/auth/GoogleSignInButton";
import { useAuth } from "@/features/auth/use-auth";

/** Subtle account nudge on the success screen (hidden for guests inside the Android app). */
export function SaveToAccount(): React.ReactElement | null {
  const { status, native } = useAuth();
  if (native || status === "loading") return null;
  if (status === "signedIn") {
    return <p className="mt-3 text-center text-[13px] text-[#4B4766]">Saved to your account</p>;
  }
  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <p className="text-[13px] text-[#4B4766]">Sign in to keep this wish on all your devices</p>
      <GoogleSignInButton />
    </div>
  );
}
