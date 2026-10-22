"use client";

import React, { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { formatClock, type VoicePlayback } from "../hooks/use-voice-playback";

interface VoicePillProps {
  voice: VoicePlayback;
  sender: string;
  /** Wrapper around the template; its first interaction starts the reveal timer. */
  watchRef: React.RefObject<HTMLElement | null>;
  /** Below-card section, used to hide the pill when it would duplicate the full player. */
  sectionRef: React.RefObject<HTMLElement | null>;
}

export function VoicePill({
  voice,
  sender,
  watchRef,
  sectionRef,
}: VoicePillProps): React.ReactElement | null {
  const [shown, setShown] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const el = watchRef.current;
    let timer = window.setTimeout(() => setShown(true), 6000);
    const onFirst = (): void => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setShown(true), 1500);
      el?.removeEventListener("pointerdown", onFirst, true);
      el?.removeEventListener("keydown", onFirst, true);
    };
    el?.addEventListener("pointerdown", onFirst, { capture: true, passive: true });
    el?.addEventListener("keydown", onFirst, { capture: true, passive: true });
    return () => {
      window.clearTimeout(timer);
      el?.removeEventListener("pointerdown", onFirst, true);
      el?.removeEventListener("keydown", onFirst, true);
    };
  }, [watchRef]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setSectionVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [sectionRef]);

  if (!shown || sectionVisible || voice.failed) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-3 safe-bottom">
      <button
        type="button"
        onClick={voice.toggle}
        aria-pressed={voice.playing}
        className="pointer-events-auto flex h-11 max-w-full items-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-white shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-safe:animate-fade-in"
      >
        {voice.playing ? (
          <Pause size={16} aria-hidden="true" />
        ) : (
          <Play size={16} aria-hidden="true" />
        )}
        <span className="truncate">
          {voice.playing ? "Pause" : "Voice message"} from {sender}
          {voice.duration > 0 ? ` · ${formatClock(voice.duration)}` : ""}
        </span>
      </button>
    </div>
  );
}
