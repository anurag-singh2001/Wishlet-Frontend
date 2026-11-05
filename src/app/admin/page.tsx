import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Skeleton } from "@/components/ui";
import { AdminPage } from "@/features/admin/components/AdminPage";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminRoute(): React.ReactElement {
  return (
    <main className="min-h-dvh bg-ground">
      <Suspense fallback={<Skeleton className="m-5 h-96" />}>
        <AdminPage />
      </Suspense>
    </main>
  );
}
