import React, { useRef, useState } from "react";
import { VOICE_MAX_SECONDS, type VoiceRecorder } from "../hooks/use-voice-recorder";

function fmt(total: number): string {
  const s = Math.max(0, Math.floor(total));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const BTN =
  "h-11 min-w-11 rounded-control px-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-brand";

export function VoiceField({ recorder }: { recorder: VoiceRecorder }): React.ReactElement | null {
  const { status, errorKind, elapsed, duration, previewUrl, start, stop, retry, remove } = recorder;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (errorKind === "unsupported") {
    return (
      <p className="rounded-2xl border border-dashed border-[#C9C2EC] bg-surface p-3 text-[13px] text-[#4B4766]">
        Voice messages aren&apos;t supported in this browser
      </p>
    );
  }

  const togglePlay = (): void => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };

  const hasClip = status === "recorded" || status === "uploading" || status === "uploaded";
  const errorText =
    errorKind === "denied"
      ? "Microphone access is blocked. Allow it in your browser settings and try again."
      : errorKind === "too-short"
        ? "That was too short. Hold on a little longer and try again."
        : errorKind === "upload"
          ? "We couldn't upload your recording."
          : "";

  return (
    <div>
      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[#C9C2EC] bg-surface p-3">
        <div className="flex flex-1 flex-col gap-0.5" role="status">
          {status === "recording" ? (
            <strong className="flex items-center gap-2 text-sm text-ink">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#D92D20]" aria-hidden />
              Recording {fmt(elapsed)} / {fmt(VOICE_MAX_SECONDS)}
            </strong>
          ) : status === "requesting" ? (
            <strong className="text-sm text-ink">Waiting for microphone...</strong>
          ) : status === "uploading" ? (
            <strong className="flex items-center gap-2 text-sm text-ink">
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent"
                aria-hidden
              />
              Uploading...
            </strong>
          ) : hasClip ? (
            <strong className="text-sm text-ink">Voice message added ({fmt(duration)})</strong>
          ) : (
            <strong className="text-sm text-ink">Add a voice message (optional)</strong>
          )}
          {!hasClip && status !== "recording" && (
            <span className="text-[13px] text-[#4B4766]">
              Up to 1 minute. Anyone with the link can hear it
            </span>
          )}
        </div>
        {status === "recording" && (
          <button type="button" onClick={stop} className={`${BTN} bg-[#D92D20] text-white`}>
            Stop
          </button>
        )}
        {(status === "idle" || status === "error") && (
          <button type="button" onClick={() => void start()} className={`${BTN} text-brand`}>
            {errorKind === "upload" ? "Re-record" : "Record"}
          </button>
        )}
        {status === "error" && errorKind === "upload" && (
          <button type="button" onClick={() => void retry()} className={`${BTN} text-brand`}>
            Retry
          </button>
        )}
      </div>
      {hasClip && previewUrl && (
        <div className="mt-2 flex flex-wrap items-center gap-1">
          <audio
            ref={audioRef}
            src={previewUrl}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
          <button type="button" onClick={togglePlay} className={`${BTN} text-brand`}>
            {playing ? "Pause preview" : "Play preview"}
          </button>
          {status !== "uploading" && (
            <>
              <button type="button" onClick={() => void start()} className={`${BTN} text-brand`}>
                Re-record
              </button>
              <button type="button" onClick={remove} className={`${BTN} text-[#B42318]`}>
                Delete
              </button>
            </>
          )}
        </div>
      )}
      {errorText && (
        <p role="alert" className="mt-1 text-[13px] text-[#B42318]">
          {errorText}
        </p>
      )}
    </div>
  );
}
