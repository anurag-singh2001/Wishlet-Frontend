import { FPS } from "./config";

const CANDIDATES: { width: number; height: number; bitrate: number; codecs: string[] }[] = [
  {
    width: 1080,
    height: 1920,
    bitrate: 6_000_000,
    codecs: ["avc1.640028", "avc1.64002A", "avc1.4D0028", "avc1.42002A"],
  },
  {
    width: 720,
    height: 1280,
    bitrate: 4_000_000,
    codecs: ["avc1.64001F", "avc1.640028", "avc1.4D001F", "avc1.42001F"],
  },
];

let supported: Promise<VideoEncoderConfig | null> | null = null;

/** First H.264 config the browser can encode, trying 1080x1920 then 720x1280. */
export function findEncoderConfig(): Promise<VideoEncoderConfig | null> {
  supported ??= (async () => {
    if (typeof window === "undefined" || !("VideoEncoder" in window)) return null;
    for (const c of CANDIDATES) {
      for (const codec of c.codecs) {
        const config: VideoEncoderConfig = {
          codec,
          width: c.width,
          height: c.height,
          bitrate: c.bitrate,
          framerate: FPS,
          avc: { format: "avc" },
        };
        try {
          const res = await VideoEncoder.isConfigSupported(config);
          if (res.supported) return config;
        } catch {
          // try the next candidate
        }
      }
    }
    return null;
  })();
  return supported;
}

export async function canRenderStoryVideo(): Promise<boolean> {
  return (await findEncoderConfig()) !== null;
}
