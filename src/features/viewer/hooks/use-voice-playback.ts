"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject, SyntheticEvent } from "react";

export interface VoicePlayback {
  playing: boolean;
  failed: boolean;
  current: number;
  duration: number;
  toggle: () => void;
  retry: () => void;
}

export interface VoiceAudio {
  audioRef: RefObject<HTMLAudioElement | null>;
  voice: VoicePlayback;
  audioProps: {
    preload: "metadata";
    onPlay: () => void;
    onPause: () => void;
    onEnded: () => void;
    onError: () => void;
    onTimeUpdate: (e: SyntheticEvent<HTMLAudioElement>) => void;
    onLoadedMetadata: (e: SyntheticEvent<HTMLAudioElement>) => void;
  };
}

export function formatClock(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function useVoicePlayback(knownDuration?: number): VoiceAudio {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [current, setCurrent] = useState(0);
  const [metaDuration, setMetaDuration] = useState(0);

  const duration = knownDuration && knownDuration > 0 ? knownDuration : metaDuration;

  const play = useCallback((): void => {
    const el = audioRef.current;
    if (!el) return;
    el.play().catch(() => setFailed(true));
  }, []);

  const toggle = useCallback((): void => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) play();
    else el.pause();
  }, [play]);

  const retry = useCallback((): void => {
    const el = audioRef.current;
    if (!el) return;
    setFailed(false);
    el.load();
    play();
  }, [play]);

  useEffect(() => {
    const el = audioRef.current;
    return () => el?.pause();
  }, []);

  return {
    audioRef,
    voice: { playing, failed, current, duration, toggle, retry },
    audioProps: {
      preload: "metadata",
      onPlay: () => setPlaying(true),
      onPause: () => setPlaying(false),
      onEnded: () => {
        setPlaying(false);
        setCurrent(0);
      },
      onError: () => {
        setPlaying(false);
        setFailed(true);
      },
      onTimeUpdate: (e) => setCurrent(e.currentTarget.currentTime),
      onLoadedMetadata: (e) => {
        const d = e.currentTarget.duration;
        if (Number.isFinite(d)) setMetaDuration(d);
      },
    },
  };
}
