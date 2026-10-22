"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/ui";
import { useAuth } from "./use-auth";

/** Renders children only for signed-in users; everyone else is sent to /signin?next=<here>. */
export function AuthGate({ children }: { children: React.ReactNode }): React.ReactElement {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams().toString();

  useEffect(() => {
    if (status !== "signedOut") return;
    const here = query ? `${pathname}?${query}` : pathname;
    router.replace(`/signin?next=${encodeURIComponent(here)}`);
  }, [status, pathname, query, router]);

  if (status !== "signedIn") {
    return (
      <div
        role="status"
        aria-label="Loading"
        className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ground"
      >
        <Logo size={44} className="animate-pulse font-display text-[24px] font-extrabold" />
      </div>
    );
  }
  return <>{children}</>;
}
