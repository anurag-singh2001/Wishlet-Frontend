import { Button } from "@/components/ui";
import { FestivalDecor } from "@/features/festivals/components/FestivalDecor";
import type { FestivalPack } from "@/features/festivals/types";
import { PhoneDemo } from "./PhoneDemo";

/** Landing hero while a festival look is active: dark festive panel with hanging decor. */
export function FestiveHero({ pack }: { pack: FestivalPack }): React.JSX.Element {
  const { hero, colors } = pack;
  return (
    <section className="mx-auto max-w-[1200px] px-3 pb-6 pt-3 md:px-8 md:pb-16 md:pt-6">
      <div
        className="relative overflow-hidden rounded-[28px] md:rounded-[40px]"
        style={{ background: `linear-gradient(150deg, ${colors.heroFrom}, ${colors.heroTo})` }}
      >
        <FestivalDecor />
        <div className="relative flex flex-col gap-6 px-5 pb-8 pt-28 text-white md:flex-row md:items-center md:gap-14 md:px-12 md:pb-14 md:pt-40">
          <div className="flex flex-col gap-4 md:flex-1 md:gap-6">
            <span
              className="text-sm font-bold uppercase tracking-[0.14em]"
              style={{ color: colors.accent }}
            >
              {hero.eyebrow}
            </span>
            <h1 className="font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[64px] md:leading-[1.02]">
              {hero.headline}
            </h1>
            <p className="max-w-[520px] text-base leading-[1.55] text-white/80 md:text-xl">
              {hero.subtitle}
            </p>
            <div className="flex flex-col gap-3.5 sm:flex-row">
              <Button
                href={`/build?occasion=${pack.id}`}
                size="lg"
                className="!bg-sunshine !text-[#2B1148] hover:!brightness-105"
              >
                {hero.ctaLabel}
              </Button>
            </div>
            <span className="text-sm text-white/70">Takes about a minute · Works on any phone</span>
          </div>
          <div className="py-4 md:flex-1 md:py-0">
            <PhoneDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
