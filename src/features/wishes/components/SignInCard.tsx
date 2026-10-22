"use client";

import React from "react";
import { Button } from "@/components/ui";
import { useAuth } from "@/features/auth/use-auth";

export function SignInCard(): React.ReactElement | null {
  const { status } = useAuth();
  if (status !== "signedOut") return null;
  return (
    <section
      aria-label="Sign in"
      className="flex flex-col items-start gap-3 rounded-card border border-hairline bg-brand-soft p-4"
    >
      <div>
        <h2 className="font-display text-[18px] font-extrabold text-ink">
          Keep your wishes on every device
        </h2>
        <p className="text-[14px] text-[#4B4766]">
          Sign in with Google to see them anywhere. Wishes on this device are added automatically.
        </p>
      </div>
      <Button href="/signin?next=%2Fwishes" size="sm">
        Sign in with Google
      </Button>
    </section>
  );
}
