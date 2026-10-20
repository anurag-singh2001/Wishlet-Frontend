import { FONT_FALLBACK, FONT_FAMILY } from "./config";

let fontPromise: Promise<string> | null = null;

/** Loads Playfair Display from Google Fonts; resolves to a font stack, never rejects. */
export function loadBrandFont(): Promise<string> {
  fontPromise ??= (async () => {
    try {
      const css = await (
        await fetch(
          "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap",
        )
      ).text();
      const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)];
      const url = urls[urls.length - 1]?.[1];
      if (!url) return FONT_FALLBACK;
      const face = new FontFace(FONT_FAMILY, `url(${url})`, { weight: "700" });
      await face.load();
      document.fonts.add(face);
      return `${FONT_FAMILY}, ${FONT_FALLBACK}`;
    } catch {
      return FONT_FALLBACK;
    }
  })();
  return fontPromise;
}

/** Small corner watermark, visible for the whole clip. */
export function drawWatermark(
  ctx: CanvasRenderingContext2D,
  w: number,
  font: string,
  alpha: number,
): void {
  const k = w / 1080;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `700 ${40 * k}px ${font}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 8 * k;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("wishlet", 56 * k, 130 * k);
  ctx.restore();
}

/** Dims the card and shows the wordmark and call to action. `e` is 0..1. */
export function drawEndCard(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  font: string,
  host: string,
  e: number,
): void {
  if (e <= 0) return;
  const k = w / 1080;
  ctx.save();
  ctx.fillStyle = `rgba(10,8,14,${0.82 * e})`;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = e;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${64 * k}px ${font}`;
  ctx.fillText("Made with Wishlet", w / 2, h / 2 - 40 * k);
  ctx.fillStyle = "#fda4af";
  ctx.font = `700 ${40 * k}px ${font}`;
  ctx.fillText(`Make yours free at ${host}`, w / 2, h / 2 + 50 * k);
  ctx.restore();
}
