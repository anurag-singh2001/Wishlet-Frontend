"use client";

import React from "react";
import { Logo, type LogoProps } from "@/components/ui";
import { FestivalMark } from "@/features/festivals/components/FestivalMark";
import { useActiveFestival } from "@/features/festivals/components/FestivalProvider";
import { useSiteConfig } from "../hooks/use-site-config";

/** The Logo with the app name and logo image from site settings. */
export function BrandLogo(props: Omit<LogoProps, "appName" | "logoUrl">): React.JSX.Element {
  const { branding } = useSiteConfig();
  const festival = useActiveFestival();
  return (
    <Logo
      {...props}
      appName={branding.appName}
      logoUrl={branding.logoUrl}
      mark={festival ? <FestivalMark size={props.size ?? 32} /> : undefined}
    />
  );
}
