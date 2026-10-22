"use client";

import { createContext, useContext } from "react";
import type { AuthUser } from "@/lib/auth-token";

export type AuthStatus = "loading" | "signedOut" | "signedIn";

export interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  /** True inside the Android app, where Google blocks sign-in. */
  native: boolean;
  /** True once the Google script has loaded and been initialised. */
  gisReady: boolean;
  signingIn: boolean;
  /** Last sign-in failure message, cleared on the next attempt. */
  error: string | null;
  signOut: () => void;
  /** Clears an expired session and toasts; the caller redirects. */
  expireSession: () => void;
  /** Android app only: native Google sign-in. */
  signIn: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  status: "loading",
  native: false,
  gisReady: false,
  signingIn: false,
  error: null,
  signOut: () => undefined,
  expireSession: () => undefined,
  signIn: () => Promise.resolve(),
});

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
