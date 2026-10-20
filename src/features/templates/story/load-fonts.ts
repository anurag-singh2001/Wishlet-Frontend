import type { StoryFontFamily, StoryFontWeight } from "./fonts";

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: StoryFontWeight;
  style: "normal" | "italic";
}

// Google's CSS API serves TrueType to clients that don't advertise woff2 (Satori can't read woff2).
const FACE_RE =
  /font-style:\s*(normal|italic);\s*font-weight:\s*(\d+);[^}]*?src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype)'\)/g;

const ASCII = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join("");

/** Every character a card may draw, deduplicated, so Google returns a tiny subset font. */
export function storyFontText(...parts: string[]): string {
  return [...new Set(ASCII + "’“”…♥·" + parts.join(""))].join("");
}

function cssUrl(font: StoryFontFamily, text: string): string {
  const italic = font.faces.some((f) => f.italic);
  const axes = font.faces
    .map((f) => (italic ? `${f.italic ? 1 : 0},${f.weight}` : String(f.weight)))
    .sort()
    .join(";");
  const family = `${font.family.replace(/ /g, "+")}:${italic ? "ital,wght" : "wght"}@${axes}`;
  return `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
}

async function fetchOk(url: string): Promise<Response> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font request failed: ${res.status}`);
  return res;
}

async function loadFamily(font: StoryFontFamily, text: string): Promise<OgFont[]> {
  const css = await (await fetchOk(cssUrl(font, text))).text();
  return Promise.all(
    [...css.matchAll(FACE_RE)].map(async ([, style, weight, url]) => ({
      name: font.family,
      style: style === "italic" ? "italic" : "normal",
      weight: Number(weight) as StoryFontWeight,
      data: await (await fetchOk(url)).arrayBuffer(),
    })),
  );
}

/** Loads the families in parallel. A family that fails is skipped, so the card still renders. */
export async function loadStoryFonts(fonts: StoryFontFamily[], text: string): Promise<OgFont[]> {
  const results = await Promise.allSettled(fonts.map((font) => loadFamily(font, text)));
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}
