"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { resolveActiveFestival } from "../lib/resolve";
import type { FestivalPack } from "../types";

const LiveFestivalContext = createContext<string | null>(null);

const noopSubscribe = (): (() => void) => () => {};
const readPreview = (): string | null => {
  try {
    return new URLSearchParams(window.location.search).get("festival");
  } catch {
    return null;
  }
};
const serverPreview = (): string | null => null;

/** Passes the server-resolved live festival id down; the preview is read on the client. */
export function FestivalProvider({
  festivalId,
  children,
}: {
  festivalId: string | null;
  children: React.ReactNode;
}): React.JSX.Element {
  return <LiveFestivalContext.Provider value={festivalId}>{children}</LiveFestivalContext.Provider>;
}

export function useActiveFestival(): FestivalPack | null {
  const live = useContext(LiveFestivalContext);
  const preview = useSyncExternalStore(noopSubscribe, readPreview, serverPreview);
  return resolveActiveFestival(preview, live);
}
