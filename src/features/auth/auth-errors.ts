const GENERIC = "Couldn't sign in with Google. Please try again.";

/** Maps a sign-in failure to a friendly message; null means the user cancelled (stay silent). */
export function describeSignInError(err: unknown): string | null {
  const msg = err instanceof Error ? err.message : String(err ?? "");
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? String((err as { code: unknown }).code)
      : "";
  console.warn("[sign-in]", code, msg);
  const text = `${code} ${msg}`;
  if (/cancel/i.test(text)) return null;
  if (/28444|developer console/i.test(text)) {
    return "Google sign-in isn't set up for this app yet (developer config). Please try again later.";
  }
  if (/no credentials?/i.test(text)) {
    return "No Google account found on this phone. Add one in Settings, then try again.";
  }
  if (/INVALID_GOOGLE_TOKEN/.test(text)) {
    return "Google sign-in couldn't be verified. Please try again.";
  }
  if (err instanceof TypeError || /failed to fetch|network|offline/i.test(text)) {
    return "You're offline. Check your connection and try again.";
  }
  const reason = msg.trim().slice(0, 60);
  return reason ? `${GENERIC.slice(0, -1)} (${reason}).` : GENERIC;
}
