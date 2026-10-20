import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";
import { MyWishesList } from "./MyWishesList";

export function WishesPage(): React.ReactElement {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-xl bg-ground">
      <header className="safe-top flex items-center gap-2 border-b border-hairline px-5 py-4">
        <Link
          href="/"
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brand"
        >
          <ArrowLeft size={22} aria-hidden="true" />
        </Link>
        <h1 className="flex-1 font-display text-[26px] font-extrabold text-ink">My wishes</h1>
        <Button size="sm" href="/build">
          New
        </Button>
      </header>
      <main className="flex flex-col gap-3.5 p-5">
        <p className="text-sm text-[#4B4766]">Saved on this device.</p>
        <MyWishesList />
      </main>
    </div>
  );
}
