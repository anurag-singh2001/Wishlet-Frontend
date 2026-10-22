import React, { Suspense } from "react";
import { SignInView } from "@/features/auth/SignInView";

export const metadata = {
  title: "Sign in | Wishlet",
  description: "Sign in with Google to start creating wishes.",
  robots: { index: false },
};

export default function SignInPage(): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <SignInView />
    </Suspense>
  );
}
