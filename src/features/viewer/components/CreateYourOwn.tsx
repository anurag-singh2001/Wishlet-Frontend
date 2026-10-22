import React from "react";
import { Button } from "@/components/ui";

export function CreateYourOwn(): React.ReactElement {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-2 border-t border-hairline pt-6">
      <Button href="/build" size="lg" fullWidth>
        Create your own Wishlet
      </Button>
      <p className="text-sm text-muted">Make a personal wish page in a minute. Free to share.</p>
    </div>
  );
}
