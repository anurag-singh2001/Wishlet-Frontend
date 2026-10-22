"use client";
import React, { useState } from "react";

interface WishPhotoProps {
  src: string;
  alt: string;
  className?: string;
}

/** Photo with a soft shimmer until loaded; renders nothing if it fails to load. */
export function WishPhoto({ src, alt, className = "" }: WishPhotoProps): React.JSX.Element | null {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent motion-safe:animate-pulse"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
