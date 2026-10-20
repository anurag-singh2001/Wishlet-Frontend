import { drawEndCard, drawWatermark, type EndCardBrand } from "./branding";
import {
  DURATION_S,
  END_CARD_START_S,
  CROSSFADE_S,
  FADE_IN_S,
  STAGE_STARTS_S,
  ZOOM_END,
  ramp,
} from "./config";
import { drawParticles, type ParticleKind } from "./particles";

export interface FrameScene extends EndCardBrand {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  stages: ImageBitmap[];
  kind: ParticleKind;
  particles: Parameters<typeof drawParticles>[2];
}

/** Draws the frame at time `t` seconds. */
export function drawFrame(s: FrameScene, t: number): void {
  const { ctx, width: w, height: h } = s;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  const zoom = 1 + (ZOOM_END - 1) * (t / DURATION_S);
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-w / 2, -h / 2);
  ctx.globalAlpha = ramp(t, 0, FADE_IN_S);
  ctx.drawImage(s.stages[0]!, 0, 0, w, h);
  STAGE_STARTS_S.forEach((start, i) => {
    const a = ramp(t, start, CROSSFADE_S) * ramp(t, 0, FADE_IN_S);
    const bmp = s.stages[i + 1];
    if (a <= 0 || !bmp) return;
    ctx.globalAlpha = a;
    ctx.drawImage(bmp, 0, 0, w, h);
  });
  ctx.restore();

  ctx.globalAlpha = ramp(t, 0, FADE_IN_S);
  drawParticles(ctx, s.kind, s.particles, t, w, h);
  const end = ramp(t, END_CARD_START_S, CROSSFADE_S);
  drawEndCard(ctx, w, h, s, end);
  // The end card carries the full branding, so the corner mark fades out under it.
  drawWatermark(ctx, w, s.font, ramp(t, 0, FADE_IN_S) * (1 - end));
  ctx.globalAlpha = 1;
}
