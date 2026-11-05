"use client";

import React from "react";
import { useSiteConfig } from "../hooks/use-site-config";

export function AppName(): React.JSX.Element {
  return <>{useSiteConfig().branding.appName}</>;
}
