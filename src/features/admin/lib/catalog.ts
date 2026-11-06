export function dateOnly(iso: string | null): string {
  return iso ? iso.slice(0, 10) : "";
}

export function toIso(date: string, endOfDay: boolean): string | null {
  return date ? `${date}T${endOfDay ? "23:59:59.000" : "00:00:00.000"}Z` : null;
}

export function blankToNull(value: string): string | null {
  const v = value.trim();
  return v ? v : null;
}
