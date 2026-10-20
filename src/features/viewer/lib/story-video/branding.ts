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

let iconPromise: Promise<HTMLImageElement | null> | null = null;

/** The site's sparkle logo (`/icon.svg`); resolves to null if it can't load. */
export function loadBrandIcon(): Promise<HTMLImageElement | null> {
  iconPromise ??= new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = "/icon.svg";
  });
  return iconPromise;
}

export interface EndCardBrand {
  font: string;
  host: string;
  icon: HTMLImageElement | null;
}

const UI_FONT = "system-ui, -apple-system, Roboto, sans-serif";

/** Site address in a white pill, shrunk to fit narrow frames. */
function drawLinkPill(ctx: CanvasRenderingContext2D, w: number, y: number, host: string): number {
  const k = w / 1080;
  let size = 46 * k;
  ctx.font = `700 ${size}px ${UI_FONT}`;
  while (ctx.measureText(host).width > w * 0.74 && size > 24 * k) {
    size -= 2 * k;
    ctx.font = `700 ${size}px ${UI_FONT}`;
  }
  const ph = size * 2.4;
  const pw = ctx.measureText(host).width + size * 2.4;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(w / 2 - pw / 2, y - ph / 2, pw, ph, ph / 2);
  ctx.fill();
  ctx.fillStyle = "#4338ca";
  ctx.fillText(host, w / 2, y + 2 * k);
  return ph;
}

/** Branded closing frame: logo, wordmark, tagline and the site address. `e` is 0..1. */
export function drawEndCard(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  brand: EndCardBrand,
  e: number,
): void {
  if (e <= 0) return;
  const k = w / 1080;
  const cx = w / 2;
  const lift = (1 - e) * 48 * k; // content rises slightly as it fades in
  ctx.save();
  ctx.globalAlpha = e;
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#4338ca");
  bg.addColorStop(1, "#7c3aed");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const logo = 220 * k;
  if (brand.icon) ctx.drawImage(brand.icon, cx - logo / 2, h * 0.31 - logo / 2 + lift, logo, logo);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${132 * k}px ${brand.font}`;
  ctx.fillText("Wishlet", cx, h * 0.43 + lift);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `500 ${44 * k}px ${UI_FONT}`;
  ctx.fillText("Send a wish they'll never forget", cx, h * 0.485 + lift);

  const pillY = h * 0.58 + lift;
  const ph = drawLinkPill(ctx, w, pillY, brand.host);
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = `600 ${36 * k}px ${UI_FONT}`;
  ctx.fillText("Make yours free in a minute", cx, pillY + ph / 2 + 64 * k);
  ctx.restore();
}
