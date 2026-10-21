"use client";

import { useEffect, useState } from "react";

export const SOON_MS = 3 * 60 * 60 * 1000;

export function msLeft(expiresAt: string | null | undefined, now = Date.now()): number | null {
  if (!expiresAt) return null;
  const t = new Date(expiresAt).getTime();
  return Number.isNaN(t) ? null : t - now;
}

/** "23h 59m left", "45m left" or "Expired". Missing expiry counts as not expired. */
export function timeLeft(
  expiresAt: string | null | undefined,
  now = Date.now(),
): { expired: boolean; label: string } {
  const ms = msLeft(expiresAt, now);
  if (ms === null) return { expired: false, label: "" };
  if (ms <= 0) return { expired: true, label: "Expired" };
  const mins = Math.max(1, Math.floor(ms / 60_000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return { expired: false, label: `${h > 0 ? `${h}h ${m}m` : `${m}m`} left` };
}

/** Current time, ticking. Null until mounted so server and client markup match. */
export function useNow(intervalMs = 60_000): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
