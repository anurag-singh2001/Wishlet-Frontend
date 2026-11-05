"use client";

import React from "react";
import { useSiteConfig } from "../hooks/use-site-config";

export function AnnouncementBanner(): React.JSX.Element | null {
  const { banner } = useSiteConfig().branding;
  if (!banner.enabled || !banner.text) return null;
  const cls = "block bg-brand px-4 py-2 text-center text-[14px] font-semibold text-white";
  return banner.link ? (
    <a href={banner.link} target="_blank" rel="noopener noreferrer" className={`${cls} underline`}>
      {banner.text}
    </a>
  ) : (
    <div role="status" className={cls}>
      {banner.text}
    </div>
  );
}
