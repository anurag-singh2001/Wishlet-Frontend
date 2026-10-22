"use client";

import { useState } from "react";
import { useToast } from "@/components/ui";
import { updateWishSettings } from "@/lib/api";

export function useReactionsSetting(
  slug: string,
  token: string | null,
  initial: boolean,
  onSaved?: () => void,
): { enabled: boolean; busy: boolean; toggle: () => Promise<void> } {
  const toast = useToast();
  const [enabled, setEnabled] = useState(initial);
  const [busy, setBusy] = useState(false);

  const toggle = async (): Promise<void> => {
    if (!token || busy) {
      if (!token) toast("Couldn't update reactions");
      return;
    }
    const next = !enabled;
    setBusy(true);
    try {
      const res = await updateWishSettings(slug, token, { reactionsEnabled: next });
      setEnabled(res.reactionsEnabled);
      toast(res.reactionsEnabled ? "Reactions turned on" : "Reactions turned off");
      onSaved?.();
    } catch {
      toast("Couldn't update reactions");
    } finally {
      setBusy(false);
    }
  };

  return { enabled, busy, toggle };
}
