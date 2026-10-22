import { Button } from "@/components/ui";
import { PhoneDemo } from "./PhoneDemo";

export function Hero(): React.JSX.Element {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 pb-6 pt-7 md:flex-row md:items-center md:gap-14 md:px-8 md:pb-20 md:pt-14">
      <div className="flex flex-col gap-4 md:flex-1 md:gap-6">
        <h1 className="font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[68px] md:leading-[1.02]">
          Turn a wish into a moment they&apos;ll open again and again.
        </h1>
        <p className="max-w-[520px] text-base leading-[1.55] text-muted md:text-xl">
          Pick a design, add your words and a photo, and send one private link. Birthdays,
          anniversaries, thank-yous, sorrys and big wins.
        </p>
        <div className="flex flex-col gap-3.5 sm:flex-row">
          <Button href="/build" size="lg">
            Create a wish
          </Button>
          <Button href="/#how" variant="secondary" size="lg" className="hidden md:inline-flex">
            See how it works
          </Button>
        </div>
        <span className="text-sm text-muted">Takes about a minute · Works on any phone</span>
      </div>
      <div className="py-6 md:flex-1 md:py-0">
        <PhoneDemo />
      </div>
    </section>
  );
}
