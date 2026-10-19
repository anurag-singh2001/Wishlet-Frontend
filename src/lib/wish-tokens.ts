const KEY = "wishlet:owned";

function readAll(): Record<string, string> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
  } catch {
    // storage unavailable or corrupt
  }
  return {};
}

function writeAll(map: Record<string, string>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // storage unavailable
  }
}

export function saveWishToken(slug: string, token: string): void {
  writeAll({ ...readAll(), [slug]: token });
}

export function getWishToken(slug: string): string | null {
  return readAll()[slug] ?? null;
}

export function removeWishToken(slug: string): void {
  const map = readAll();
  delete map[slug];
  writeAll(map);
}

export function listOwnedWishes(): { slug: string; token: string }[] {
  return Object.entries(readAll()).map(([slug, token]) => ({ slug, token }));
}
