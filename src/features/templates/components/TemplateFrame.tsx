"use client";

import React, { useEffect, useRef, useState } from "react";

const VIEW_W = 390;
const VIEW_H = 844;
const DEBOUNCE_MS = 400;

interface TemplateFrameProps {
  templateId: string;
  recipientName: string;
  senderName: string;
  message: string;
  occasion: string;
  photo?: string;
  /** Rendered pixel width; height follows the 390x844 phone ratio. Ignored with `cover`. */
  width?: number;
  /** Fill the parent box instead: scale to cover it, centred, cropping the overflow. */
  cover?: boolean;
  className?: string;
  title: string;
}

function buildSrc(p: TemplateFrameProps): string {
  const q = new URLSearchParams({
    t: p.templateId,
    to: p.recipientName,
    from: p.senderName,
    msg: p.message,
    occasion: p.occasion,
  });
  // Inline data: photos (local upload fallback) are too long for a URL; preview without them.
  if (p.photo && !p.photo.startsWith("data:")) q.set("photo", p.photo);
  return `/preview?${q.toString()}`;
}

/** Non-interactive template preview rendered in a real 390x844 viewport via an iframe. */
export function TemplateFrame(props: TemplateFrameProps): React.JSX.Element {
  const { width = VIEW_W, cover = false, className, title } = props;
  const target = buildSrc(props);
  const [src, setSrc] = useState(target);
  const [loaded, setLoaded] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (target === src) return;
    const id = setTimeout(() => setSrc(target), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [target, src]);

  useEffect(() => {
    const el = boxRef.current;
    if (!cover || !el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [cover]);

  const scale = cover ? Math.max(box.w / VIEW_W, box.h / VIEW_H) : width / VIEW_W;
  const left = cover ? (box.w - VIEW_W * scale) / 2 : 0;
  const top = cover ? (box.h - VIEW_H * scale) / 2 : 0;
  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={title}
      className={`relative overflow-hidden bg-ground ${cover ? "h-full w-full" : ""} ${className ?? ""}`}
      style={cover ? undefined : { width, height: (width * VIEW_H) / VIEW_W }}
    >
      {!loaded && <div className="absolute inset-0 animate-pulse bg-hairline/60" />}
      <iframe
        src={src}
        title={title}
        aria-hidden="true"
        tabIndex={-1}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="pointer-events-none absolute left-0 top-0 border-0"
        style={{
          width: VIEW_W,
          height: VIEW_H,
          transform: `translate(${left}px, ${top}px) scale(${scale})`,
          transformOrigin: "top left",
          visibility: cover && box.w === 0 ? "hidden" : undefined,
        }}
      />
    </div>
  );
}
