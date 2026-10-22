"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { Capacitor } from "@capacitor/core";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui";
import { claimWishes, getMe, GOOGLE_CLIENT_ID, signInWithGoogle } from "@/lib/auth-api";
import { clearSession, getSession, saveSession, type AuthUser } from "@/lib/auth-token";
import { describeSignInError } from "./auth-errors";
import { nativeGoogleSignIn, nativeGoogleSignOut } from "@/lib/native/google-signin";
import { listOwnedWishes } from "@/lib/wish-tokens";
import { AuthContext, type AuthContextValue, type AuthStatus } from "./use-auth";

export function AuthProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [native, setNative] = useState(false);
  const [gisReady, setGisReady] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setNative(Capacitor.isNativePlatform());
    const session = getSession();
    if (!session) {
      setStatus("signedOut");
      return;
    }
    setUser(session.user);
    setStatus("signedIn");
    /* eslint-enable react-hooks/set-state-in-effect */
    getMe()
      .then((fresh) => setUser(fresh))
      .catch((err: unknown) => {
        if (err instanceof Error && err.message === "UNAUTHORIZED") {
          clearSession();
          setUser(null);
          setStatus("signedOut");
        }
      });
  }, []);

  const onCredential = useCallback(
    async (credential: string): Promise<void> => {
      setSigningIn(true);
      setError(null);
      try {
        const session = await signInWithGoogle(credential);
        saveSession(session);
        setUser(session.user);
        setStatus("signedIn");
        let claimed = 0;
        const local = listOwnedWishes().map(({ slug, token }) => ({ slug, token }));
        if (local.length > 0) {
          try {
            claimed = await claimWishes(local);
          } catch {
            // wishes stay on this device; they can be claimed on the next sign-in
          }
        }
        void queryClient.invalidateQueries({ queryKey: ["my-wishes"] });
        toast(
          claimed > 0
            ? `Signed in. ${claimed} ${claimed === 1 ? "wish" : "wishes"} saved to your account`
            : `Signed in as ${session.user.name || session.user.email}`,
        );
      } catch (err) {
        const message = describeSignInError(err);
        if (message) {
          setError(message);
          toast(message);
        }
      } finally {
        setSigningIn(false);
      }
    },
    [queryClient, toast],
  );

  const handler = useRef(onCredential);
  useEffect(() => {
    handler.current = onCredential;
  }, [onCredential]);

  const initGis = useCallback((): void => {
    if (!window.google) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (res) => void handler.current(res.credential),
      auto_select: false,
      ux_mode: "popup",
      itp_support: true,
    });
    setGisReady(true);
  }, []);

  const signOut = useCallback((): void => {
    clearSession();
    window.google?.accounts.id.disableAutoSelect();
    if (Capacitor.isNativePlatform()) void nativeGoogleSignOut();
    setUser(null);
    setStatus("signedOut");
    void queryClient.invalidateQueries({ queryKey: ["my-wishes"] });
    toast("Signed out");
  }, [queryClient, toast]);

  const signIn = useCallback(async (): Promise<void> => {
    let idToken: string;
    setError(null);
    setSigningIn(true);
    try {
      idToken = await nativeGoogleSignIn();
    } catch (err) {
      setSigningIn(false);
      const message = describeSignInError(err);
      if (message) {
        setError(message);
        toast(message);
      }
      return;
    }
    await handler.current(idToken);
  }, [toast]);

  /** The server rejected our session: drop it; the caller sends the user to sign in. */
  const expireSession = useCallback((): void => {
    clearSession();
    setUser(null);
    setStatus("signedOut");
    toast("Please sign in again");
  }, [toast]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, native, gisReady, signingIn, error, signOut, signIn, expireSession }),
    [user, status, native, gisReady, signingIn, error, signOut, signIn, expireSession],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {!native && status !== "loading" && (
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onReady={initGis}
        />
      )}
    </AuthContext.Provider>
  );
}
