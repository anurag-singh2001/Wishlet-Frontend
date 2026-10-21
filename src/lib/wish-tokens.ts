const KEY = "wishlet:owned";

export interface WishMeta {
  recipientName?: string;
  occasion?: string;
  templateId?: string;
  createdAt?: string;
  /** ISO time the link stops working; absent on old wishes (never expire). */
  expiresAt?: string;
}

export interface OwnedWish extends WishMeta {
  slug: string;
  token: string;
}

/** Old entries are a bare token string; new entries are objects. */
type StoredEntry = string | ({ token: string } & WishMeta);

function readAll(): Record<string, StoredEntry> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, StoredEntry>;
    }
  } catch {
    // storage unavailable or corrupt
  }
  return {};
}

function writeAll(map: Record<string, StoredEntry>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // storage unavailable
  }
}

function tokenOf(entry: StoredEntry | undefined): string | null {
  if (typeof entry === "string") return entry;
  return entry && typeof entry.token === "string" ? entry.token : null;
}

export function saveWishToken(slug: string, token: string, meta: WishMeta = {}): void {
  writeAll({ ...readAll(), [slug]: { token, createdAt: new Date().toISOString(), ...meta } });
}

export function getWishToken(slug: string): string | null {
  return tokenOf(readAll()[slug]);
}

export function removeWishToken(slug: string): void {
  const map = readAll();
  delete map[slug];
  writeAll(map);
}

/** Newest first. Entries without a createdAt sort last (kept in storage order). */
export function listOwnedWishes(): OwnedWish[] {
  const out: OwnedWish[] = [];
  for (const [slug, entry] of Object.entries(readAll())) {
    const token = tokenOf(entry);
    if (!token) continue;
    out.push(typeof entry === "string" ? { slug, token } : { ...entry, slug, token });
  }
  return out
    .map((w, i) => ({ w, i }))
    .sort((a, b) => (b.w.createdAt ?? "").localeCompare(a.w.createdAt ?? "") || b.i - a.i)
    .map(({ w }) => w);
}
