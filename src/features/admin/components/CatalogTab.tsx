"use client";

import React from "react";
import { Skeleton } from "@/components/ui";
import { useAdminConfig } from "../hooks/use-admin";
import { CatalogEditor } from "./CatalogEditor";

export function CatalogTab(): React.ReactElement {
  const { data, isPending } = useAdminConfig();
  if (isPending || !data) return <Skeleton className="h-64" />;
  return <CatalogEditor initial={data.catalog} />;
}
