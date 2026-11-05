import Link from "next/link";
import { Button } from "@/components/ui";
import { AppMark } from "@/features/site-config/components/AppMark";
import { QuickStartOccasions } from "@/features/site-config/components/QuickStartOccasions";
import { AppAccountRow } from "./AppAccountRow";
import { AppRecentWishes } from "./AppRecentWishes";

export default function AppHomePage(): React.JSX.Element {
  return (
    <main className="flex min-h-dvh flex-col bg-ground">
      <header className="safe-top rounded-b-[28px] bg-brand text-white">
        <div className="flex flex-col gap-4 px-5 pb-7 pt-6">
          <AppMark />
          <h1 className="font-display text-[30px] font-extrabold leading-[1.1]">
            Who are we making smile today?
          </h1>
          <Link
            href="/build"
            className="flex h-[54px] items-center justify-center rounded-control bg-white text-[17px] font-extrabold text-brand-deep"
          >
            Create a wish
          </Link>
        </div>
      </header>

      <div className="safe-bottom flex flex-col gap-3.5 p-5">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-muted">Quick start</h2>
        <QuickStartOccasions />
        <div className="mt-2 flex items-center justify-between">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-muted">My wishes</h2>
          <Link href="/wishes" className="text-sm font-bold text-brand">
            See all
          </Link>
        </div>
        <AppRecentWishes />
        <Button href="/build" variant="secondary" fullWidth>
          Make another
        </Button>
        <AppAccountRow />
      </div>
    </main>
  );
}
