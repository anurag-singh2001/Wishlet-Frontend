/** Swaps item `i` with its neighbour among the indexes in `group` (positions inside `list`). */
export function moveWithin<T>(list: T[], group: number[], i: number, dir: -1 | 1): T[] {
  const at = group.indexOf(i);
  const other = group[at + dir];
  if (at < 0 || other === undefined) return list;
  const next = [...list];
  [next[i], next[other]] = [next[other], next[i]];
  return next;
}

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
