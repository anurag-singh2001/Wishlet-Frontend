"use client";

import React from "react";
import { Skeleton } from "@/components/ui";
import { useAdminConfig } from "../hooks/use-admin";
import { BrandingEditor } from "./BrandingEditor";

export function BrandingTab(): React.ReactElement {
  const { data, isPending } = useAdminConfig();
  if (isPending || !data) return <Skeleton className="h-64" />;
  return <BrandingEditor initial={data.branding} />;
}
