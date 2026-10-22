import { GOOGLE_CLIENT_ID } from "@/lib/auth-api";

let initialized = false;

function errorCode(err: unknown): string {
  if (typeof err === "object" && err !== null && "code" in err) {
    return String((err as { code: unknown }).code);
  }
  return "";
}

/** Android app only: native Google sign-in. Resolves with a Google ID token. */
export async function nativeGoogleSignIn(): Promise<string> {
  const { SocialLogin } = await import("@capgo/capacitor-social-login");
  try {
    if (!initialized) {
      await SocialLogin.initialize({ google: { webClientId: GOOGLE_CLIENT_ID } });
      initialized = true;
    }
    // Account bottom sheet (Credential Manager's Google ID option). The default "Sign in with
    // Google" flow fails on some phones with "[16] Account reauth failed"; the plugin still
    // falls back to it on its own if this fails that way.
    const res = await SocialLogin.login({
      provider: "google",
      options: { style: "bottom", filterByAuthorizedAccounts: false, forcePrompt: true },
    });
    const result = res.result;
    if (result.responseType === "online" && result.idToken) return result.idToken;
    throw new Error("NO_ID_TOKEN");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (errorCode(err) === "USER_CANCELLED" || /cancel/i.test(msg)) throw new Error("CANCELLED");
    throw err instanceof Error ? err : new Error("SIGN_IN_FAILED");
  }
}

export async function nativeGoogleSignOut(): Promise<void> {
  try {
    const { SocialLogin } = await import("@capgo/capacitor-social-login");
    await SocialLogin.logout({ provider: "google" });
  } catch {
    // nothing to sign out of
  }
}
