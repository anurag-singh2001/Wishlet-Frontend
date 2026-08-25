import React, { Suspense } from "react";
import { BuilderShell } from "@/features/builder/components/BuilderShell";

export const metadata = {
  title: "Create a Wish | Wishlet",
  description: "Create a personalized, beautiful occasion page in seconds.",
};

export default function BuildPage() {
  return (
    <main>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-pulse text-slate-400">Loading builder...</div>
        </div>
      }>
        <BuilderShell />
      </Suspense>
    </main>
  );
}

