import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { uploadToCloudinary } from "@/lib/api";
import type { BuilderState } from "../types";

export const VOICE_MAX_SECONDS = 60;
const MIN_SECONDS = 1;
const MIME_CANDIDATES = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];

export type VoiceStatus =
  "idle" | "requesting" | "recording" | "recorded" | "uploading" | "uploaded" | "error";
export type VoiceErrorKind = "unsupported" | "denied" | "upload" | "too-short";

function isSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined"
  );
}

function subscribeNoop(): () => void {
  return () => {};
}

function pickMime(): string {
  return MIME_CANDIDATES.find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
}

function extFor(mime: string): string {
  if (mime.includes("mp4")) return "mp4";
  if (mime.includes("ogg")) return "ogg";
  return "webm";
}

export function useVoiceRecorder(update: (updates: Partial<BuilderState>) => void) {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [errorKind, setErrorKind] = useState<VoiceErrorKind | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const supported = useSyncExternalStore(subscribeNoop, isSupported, () => true);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blobRef = useRef<{ blob: Blob; ext: string; seconds: number } | null>(null);
  const urlRef = useRef("");
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const setPreview = (url: string): void => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = url;
    setPreviewUrl(url);
  };

  const fail = (kind: VoiceErrorKind): void => {
    setErrorKind(kind);
    setStatus("error");
  };

  const upload = useCallback(async (): Promise<void> => {
    const rec = blobRef.current;
    if (!rec) return;
    setErrorKind(null);
    setStatus("uploading");
    try {
      const res = await uploadToCloudinary(rec.blob, "audio", `voice.${rec.ext}`);
      if (!aliveRef.current) return;
      if (!res) return fail("upload");
      const secs = Math.min(
        VOICE_MAX_SECONDS,
        Math.max(1, Math.round(res.duration ?? rec.seconds)),
      );
      setDuration(secs);
      update({ voice: { url: res.url, publicId: res.publicId, duration: secs } });
      setStatus("uploaded");
    } catch {
      if (aliveRef.current) fail("upload");
    }
  }, [update]);

  const stop = useCallback((): void => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }, []);

  const start = useCallback(async (): Promise<void> => {
    if (!isSupported()) return fail("unsupported");
    setErrorKind(null);
    setStatus("requesting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      if (aliveRef.current) fail("denied");
      return;
    }
    if (!aliveRef.current) {
      stream.getTracks().forEach((t) => t.stop());
      return;
    }
    streamRef.current = stream;
    const mime = pickMime();
    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    recorderRef.current = recorder;
    const startedAt = Date.now();
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stream.getTracks().forEach((t) => t.stop());
      if (!aliveRef.current) return;
      const seconds = Math.min(VOICE_MAX_SECONDS, (Date.now() - startedAt) / 1000);
      if (seconds < MIN_SECONDS || chunks.length === 0) return fail("too-short");
      const type = recorder.mimeType || mime || "audio/webm";
      const blob = new Blob(chunks, { type });
      blobRef.current = { blob, ext: extFor(type), seconds };
      setDuration(Math.max(1, Math.round(seconds)));
      setPreview(URL.createObjectURL(blob));
      setStatus("recorded");
      void upload();
    };
    recorder.start();
    setElapsed(0);
    setStatus("recording");
    timerRef.current = setInterval(() => {
      const secs = Math.floor((Date.now() - startedAt) / 1000);
      setElapsed(Math.min(secs, VOICE_MAX_SECONDS));
      if (secs >= VOICE_MAX_SECONDS) stop();
    }, 250);
  }, [upload, stop]);

  const remove = useCallback((): void => {
    blobRef.current = null;
    setPreview("");
    setDuration(0);
    setErrorKind(null);
    setStatus("idle");
    update({ voice: undefined });
  }, [update]);

  const busy = status === "requesting" || status === "recording" || status === "uploading";

  return {
    status,
    errorKind: supported ? errorKind : ("unsupported" as VoiceErrorKind),
    elapsed,
    duration,
    previewUrl,
    busy,
    start,
    stop,
    retry: upload,
    remove,
  };
}

export type VoiceRecorder = ReturnType<typeof useVoiceRecorder>;
