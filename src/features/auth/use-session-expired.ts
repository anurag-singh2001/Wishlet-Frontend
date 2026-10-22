"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";

/** True for the error thrown by API calls that got a 401. */
export function isUnauthorized(err: unknown): boolean {
  return err instanceof Error && err.message === "UNAUTHORIZED";
}

/** Clears the expired session, toasts, and sends the user to sign in (back to /build after). */
export function useSessionExpired(): () => void {
  const { expireSession } = useAuth();
  const router = useRouter();
  return useCallback((): void => {
    expireSession();
    router.replace("/signin?next=%2Fbuild");
  }, [expireSession, router]);
}
