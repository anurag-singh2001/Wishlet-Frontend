import React, { Suspense } from "react";
import { BuilderShell } from "@/features/builder/components/BuilderShell";
import { Skeleton } from "@/components/ui";
import { AuthGate } from "@/features/auth/AuthGate";

export const metadata = {
  title: "Create a Wish | Wishlet",
  description: "Create a personalized, beautiful occasion page in seconds.",
};

export default function BuildPage(): React.ReactElement {
  return (
    <main>
      <Suspense fallback={<Skeleton className="m-5 h-96" />}>
        <AuthGate>
          <BuilderShell />
        </AuthGate>
      </Suspense>
    </main>
  );
}
