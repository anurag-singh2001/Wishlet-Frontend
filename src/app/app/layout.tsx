import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthGate } from "@/features/auth/AuthGate";

export const metadata: Metadata = { title: "Wishlet app", robots: { index: false } };

export default function AppLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <Suspense fallback={null}>
      <AuthGate>{children}</AuthGate>
    </Suspense>
  );
}
