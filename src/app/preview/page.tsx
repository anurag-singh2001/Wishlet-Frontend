import type { Metadata } from "next";
import { Suspense } from "react";
import { PreviewClient } from "@/features/templates/components/PreviewClient";

export const metadata: Metadata = { robots: { index: false } };

export default function PreviewPage(): React.JSX.Element {
  return (
    <Suspense fallback={null}>
      <PreviewClient />
    </Suspense>
  );
}
