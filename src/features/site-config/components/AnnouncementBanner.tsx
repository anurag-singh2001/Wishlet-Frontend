"use client";

import React from "react";
import { useActiveFestival } from "@/features/festivals/components/FestivalProvider";
import { useSiteConfig } from "../hooks/use-site-config";

export function AnnouncementBanner(): React.JSX.Element | null {
  const { banner } = useSiteConfig().branding;
  const festival = useActiveFestival();
  const own = banner.enabled && banner.text !== "";
  const text = own ? banner.text : (festival?.bannerText ?? "");
  if (!text) return null;
  const cls = "block bg-brand px-4 py-2 text-center text-[14px] font-semibold text-white";
  return own && banner.link ? (
    <a href={banner.link} target="_blank" rel="noopener noreferrer" className={`${cls} underline`}>
      {text}
    </a>
  ) : (
    <div role="status" className={cls}>
      {text}
    </div>
  );
}
