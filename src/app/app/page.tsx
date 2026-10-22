import Link from "next/link";
import { Button } from "@/components/ui";
import { AppAccountRow } from "./AppAccountRow";
import { AppRecentWishes } from "./AppRecentWishes";

const OCCASIONS = [
  { id: "birthday", label: "Birthday" },
  { id: "anniversary", label: "Anniversary" },
  { id: "thank-you", label: "Thank you" },
  { id: "congratulations", label: "Congratulations" },
  { id: "sorry", label: "Sorry" },
];

export default function AppHomePage(): React.JSX.Element {
  return (
    <main className="flex min-h-dvh flex-col bg-ground">
      <header className="safe-top rounded-b-[28px] bg-brand text-white">
        <div className="flex flex-col gap-4 px-5 pb-7 pt-6">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 1c.5 6 4.5 10.5 11 11-6.5.5-10.5 5-11 11-.5-6-4.5-10.5-11-11 6.5-.5 10.5-5 11-11z"
                fill="#fff"
              />
            </svg>
            <span className="font-display text-[22px] font-extrabold">Wishlet</span>
          </div>
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
        <div className="scrollbar-hide -mx-5 flex gap-2.5 overflow-x-auto px-5">
          {OCCASIONS.map((o) => (
            <Link
              key={o.id}
              href={`/build?occasion=${o.id}`}
              className="flex-none rounded-2xl border border-hairline bg-surface px-3.5 py-3 text-sm font-bold text-ink"
            >
              {o.label}
            </Link>
          ))}
        </div>
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
