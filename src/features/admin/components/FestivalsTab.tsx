"use client";

import React from "react";
import { Skeleton } from "@/components/ui";
import { useAdminConfig } from "../hooks/use-admin";
import { FestivalsEditor } from "./FestivalsEditor";

export function FestivalsTab(): React.ReactElement {
  const { data, isPending } = useAdminConfig();
  if (isPending || !data) return <Skeleton className="h-64" />;
  return <FestivalsEditor initial={data.catalog.occasions} />;
}
