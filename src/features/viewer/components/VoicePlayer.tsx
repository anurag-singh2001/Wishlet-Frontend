"use client";

import React from "react";
import { Pause, Play } from "lucide-react";
import { formatClock, type VoicePlayback } from "../hooks/use-voice-playback";

interface VoicePlayerProps {
  voice: VoicePlayback;
  sender: string;
}

export function VoicePlayer({ voice, sender }: VoicePlayerProps): React.ReactElement {
  const { playing, failed, current, duration, toggle, retry } = voice;
  const pct = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;

  if (failed) {
    return (
      <div role="alert" className="flex items-center gap-3 text-sm text-ink">
        <span>Couldn&apos;t play the voice message</span>
        <button
          type="button"
          onClick={retry}
          className="h-11 rounded-control px-4 font-bold text-brand focus-visible:outline-2 focus-visible:outline-brand"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-xs items-center gap-3 rounded-card border border-hairline bg-surface p-3 text-left">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause voice message" : "Play voice message"}
        aria-pressed={playing}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {playing ? <Pause size={20} aria-hidden="true" /> : <Play size={20} aria-hidden="true" />}
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="truncate text-sm font-bold text-ink">
          Voice message from {sender}
          {duration > 0 ? ` · ${formatClock(duration)}` : ""}
        </span>
        <div
          role="progressbar"
          aria-label="Voice message progress"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration) || 100}
          aria-valuenow={Math.round(current)}
          className="h-1.5 w-full overflow-hidden rounded-full bg-hairline"
        >
          <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
