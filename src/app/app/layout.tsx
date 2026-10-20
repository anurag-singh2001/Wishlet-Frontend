import type { Metadata } from "next";

export const metadata: Metadata = { title: "Wishlet app", robots: { index: false } };

export default function AppLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <>{children}</>;
}
