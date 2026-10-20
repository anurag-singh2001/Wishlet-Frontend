import { ArrayBufferTarget, Muxer } from "mp4-muxer";
import { loadBrandFont } from "./branding";
import { FPS, KEYFRAME_EVERY, STAGE_COUNT, TOTAL_FRAMES } from "./config";
import { drawFrame, type FrameScene } from "./draw-frame";
import { canRenderStoryVideo, findEncoderConfig } from "./encoder-config";
import { createParticles, kindForOccasion } from "./particles";

export { canRenderStoryVideo };

async function fetchStages(slug: string): Promise<{ stages: ImageBitmap[]; occasion: string }> {
  const responses = await Promise.all(
    Array.from({ length: STAGE_COUNT }, (_, n) => fetch(`/w/${slug}/story?reveal=${n}`)),
  );
  if (responses.some((r) => !r.ok)) throw new Error("Could not create story frames");
  const occasion = decodeURIComponent(responses[0]?.headers.get("x-wishlet-occasion") ?? "");
  const stages = await Promise.all(responses.map(async (r) => createImageBitmap(await r.blob())));
  return { stages, occasion };
}

const tick = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

/** Renders the 15 s animated story as an H.264 MP4 using WebCodecs. Faster than real time. */
export async function renderStoryVideo(
  slug: string,
  onProgress: (fraction: number) => void,
): Promise<Blob> {
  const config = await findEncoderConfig();
  if (!config) throw new Error("Video encoding is not supported");
  const { width, height } = config;
  const [{ stages, occasion }, font] = await Promise.all([fetchStages(slug), loadBrandFont()]);
  onProgress(0.03);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available");
  const kind = kindForOccasion(occasion);
  const scene: FrameScene = {
    ctx,
    width,
    height,
    stages,
    kind,
    particles: createParticles(kind),
    font,
    host: window.location.host,
  };

  const muxer = new Muxer({
    target: new ArrayBufferTarget(),
    video: { codec: "avc", width, height },
    fastStart: "in-memory",
  });
  let failure: Error | null = null;
  const encoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: (e) => {
      failure = e;
    },
  });
  encoder.configure(config);

  try {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (failure) throw failure;
      drawFrame(scene, i / FPS);
      const frame = new VideoFrame(canvas, {
        timestamp: Math.round((i * 1_000_000) / FPS),
        duration: Math.round(1_000_000 / FPS),
      });
      encoder.encode(frame, { keyFrame: i % KEYFRAME_EVERY === 0 });
      frame.close();
      while (encoder.encodeQueueSize > 6) await tick();
      if (i % 8 === 0) {
        onProgress(0.03 + 0.95 * (i / TOTAL_FRAMES));
        await tick();
      }
    }
    await encoder.flush();
    if (failure) throw failure;
    muxer.finalize();
  } finally {
    if (encoder.state !== "closed") encoder.close();
    stages.forEach((b) => b.close());
  }
  onProgress(1);
  return new Blob([muxer.target.buffer], { type: "video/mp4" });
}
