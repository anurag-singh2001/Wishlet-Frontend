const MAX_NAME = 40;

/**
 * Name from a personalized group link (`/w/<slug>?to=Priya`).
 * Trims, collapses whitespace, drops control characters and caps the length.
 */
export function personalName(raw: string | string[] | undefined): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return null;
  const clean = value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NAME);
  return clean || null;
}

/** Personal link for one person from a group wish URL. */
export function personalLink(url: string, name: string): string {
  const clean = personalName(name);
  if (!clean) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}to=${encodeURIComponent(clean)}`;
}
