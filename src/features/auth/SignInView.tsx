"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/ui";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { SignInBenefits } from "./SignInBenefits";
import { useAuth } from "./use-auth";

/** Only same-site paths are allowed as a post-sign-in target. */
function safeNext(raw: string | null, fallback: string): string {
  return raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : fallback;
}

function Hero(): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-card bg-gradient-to-br from-brand to-violet"
    >
      <svg width="64" height="64" viewBox="0 0 24 24" className="drop-shadow-lg">
        <path
          d="M12 1c.5 6 4.5 10.5 11 11-6.5.5-10.5 5-11 11-.5-6-4.5-10.5-11-11 6.5-.5 10.5-5 11-11z"
          fill="#fff"
        />
      </svg>
      <svg width="22" height="22" viewBox="0 0 24 24" className="absolute right-8 top-4 opacity-70">
        <path
          d="M12 1c.5 6 4.5 10.5 11 11-6.5.5-10.5 5-11 11-.5-6-4.5-10.5-11-11 6.5-.5 10.5-5 11-11z"
          fill="#FFC94A"
        />
      </svg>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        className="absolute bottom-5 left-10 opacity-60"
      >
        <path
          d="M12 1c.5 6 4.5 10.5 11 11-6.5.5-10.5 5-11 11-.5-6-4.5-10.5-11-11 6.5-.5 10.5-5 11-11z"
          fill="#fff"
        />
      </svg>
    </div>
  );
}

export function SignInView(): React.ReactElement {
  const { status, native, signingIn, error } = useAuth();
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"), native ? "/app" : "/build");

  useEffect(() => {
    if (status === "signedIn") router.replace(next);
  }, [status, next, router]);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-6 px-5 pb-8 safe-top safe-bottom">
      <div className="pt-5">
        <Logo size={34} className="font-display text-[22px] font-extrabold" />
      </div>
      <Hero />
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[32px] font-extrabold leading-[1.1] text-ink">
          Sign in to start creating
        </h1>
        <p className="text-[16px] leading-normal text-[#4B4766]">
          Make someone&apos;s day with a wish they&apos;ll open again and again.
        </p>
      </div>
      <SignInBenefits />
      <section
        aria-label="Sign in"
        className="flex flex-col items-center gap-3 rounded-card border border-hairline bg-surface p-5"
      >
        {status === "signedIn" || signingIn ? (
          <p
            role="status"
            className="flex min-h-[52px] items-center gap-2 text-[16px] font-semibold text-ink"
          >
            <Loader2 size={20} className="animate-spin" aria-hidden="true" />
            Signing you in…
          </p>
        ) : (
          <GoogleSignInButton className="w-full" />
        )}
        {error && (
          <p role="alert" className="text-center text-[14px] font-semibold text-danger">
            {error}
          </p>
        )}
        <p className="text-center text-[13px] text-[#4B4766]">
          We only use your name, email and photo to save your wishes.
        </p>
      </section>
    </main>
  );
}
