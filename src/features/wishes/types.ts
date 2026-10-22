import type { OwnedWishSummary } from "@/lib/auth-api";
import type { WishMeta } from "@/lib/wish-tokens";

/** A wish in My wishes: from this device (has a token), the account (has a summary), or both. */
export interface ListedWish extends WishMeta {
  slug: string;
  token: string | null;
  summary?: OwnedWishSummary;
}
