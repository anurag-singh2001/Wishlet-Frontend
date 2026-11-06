"use client";

import React from "react";
import Image from "next/image";
import { FestivalMark } from "@/features/festivals/components/FestivalMark";
import { useActiveFestival } from "@/features/festivals/components/FestivalProvider";
import { useSiteConfig } from "../hooks/use-site-config";

/** Mark + name for the Android app header (white on the brand background). */
export function AppMark(): React.JSX.Element {
  const { branding } = useSiteConfig();
  const festival = useActiveFestival();
  return (
    <div className="flex items-center gap-2">
      {branding.logoUrl ? (
        <Image
          unoptimized
          src={branding.logoUrl}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 rounded-md object-contain"
        />
      ) : festival ? (
        <FestivalMark size={28} onDark />
      ) : (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 1c.5 6 4.5 10.5 11 11-6.5.5-10.5 5-11 11-.5-6-4.5-10.5-11-11 6.5-.5 10.5-5 11-11z"
            fill="#fff"
          />
        </svg>
      )}
      <span className="font-display text-[22px] font-extrabold">{branding.appName}</span>
    </div>
  );
}
