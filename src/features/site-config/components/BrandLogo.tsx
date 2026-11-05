"use client";

import React from "react";
import { Logo, type LogoProps } from "@/components/ui";
import { useSiteConfig } from "../hooks/use-site-config";

/** The Logo with the app name and logo image from site settings. */
export function BrandLogo(props: Omit<LogoProps, "appName" | "logoUrl">): React.JSX.Element {
  const { branding } = useSiteConfig();
  return <Logo {...props} appName={branding.appName} logoUrl={branding.logoUrl} />;
}
