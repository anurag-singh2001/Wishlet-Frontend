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
  icon: HTMLImageElement | null;
}

const UI_FONT = "system-ui, -apple-system, Roboto, sans-serif";

/** Branded closing frame: logo, wordmark and tagline. `e` is 0..1. */
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
  const logo = 240 * k;
  if (brand.icon) ctx.drawImage(brand.icon, cx - logo / 2, h * 0.38 - logo / 2 + lift, logo, logo);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${140 * k}px ${brand.font}`;
  ctx.fillText("Wishlet", cx, h * 0.51 + lift);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `500 ${46 * k}px ${UI_FONT}`;
  ctx.fillText("Send a wish they'll never forget", cx, h * 0.565 + lift);
  ctx.restore();
}
