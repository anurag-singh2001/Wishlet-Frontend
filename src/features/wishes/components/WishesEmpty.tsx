import React from "react";
import { Button, Logo } from "@/components/ui";

export function WishesEmpty(): React.ReactElement {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-hairline bg-surface px-6 py-12 text-center">
      <Logo size={72} wordmark={false} />
      <h2 className="font-display text-[24px] font-extrabold text-ink">No wishes yet</h2>
      <p className="max-w-xs text-[15px] text-[#4B4766]">
        The ones you create on this phone show up here.
      </p>
      <Button href="/build" className="mt-2">
        Create a wish
      </Button>
    </div>
  );
}
