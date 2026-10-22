"use client";

import React from "react";
import { GoogleSignInButton } from "@/features/auth/GoogleSignInButton";
import { useAuth } from "@/features/auth/use-auth";

export function AppAccountRow(): React.ReactElement | null {
  const { status, user, signOut } = useAuth();
  if (status === "loading") return null;
  if (status === "signedIn" && user) {
    const name = user.name || user.email;
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface p-3">
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white"
          >
            {name.charAt(0).toUpperCase()}
          </span>
        )}
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
          Signed in as {name}
        </p>
        <button
          type="button"
          onClick={signOut}
          className="min-h-11 px-2 text-sm font-bold text-brand"
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-4">
      <p className="text-sm font-semibold text-ink">Save your wishes to your Google account</p>
      <GoogleSignInButton />
    </div>
  );
}
