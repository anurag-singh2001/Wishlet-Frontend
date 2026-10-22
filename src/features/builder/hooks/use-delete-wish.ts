import { useState } from "react";
import { deleteWish } from "@/lib/api";
import { trackWishDeleted } from "@/lib/analytics";
import { getSession } from "@/lib/auth-token";
import { getWishToken, removeWishToken } from "@/lib/wish-tokens";

export function useDeleteWish(onDeleted: (slug: string) => void): {
  remove: (slug: string) => Promise<void>;
  deleting: boolean;
  error: string;
  clearError: () => void;
} {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const remove = async (slug: string): Promise<void> => {
    const token = getWishToken(slug);
    if (!token && !getSession()) {
      setError("Delete key not found on this device.");
      return;
    }
    setDeleting(true);
    setError("");
    try {
      await deleteWish(slug, token);
      removeWishToken(slug);
      trackWishDeleted();
      onDeleted(slug);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete wish.");
    } finally {
      setDeleting(false);
    }
  };

  return { remove, deleting, error, clearError: () => setError("") };
}
