import Link from "next/link";

export function CtaBand(): React.JSX.Element {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-8 md:px-8 md:py-20">
      <div className="flex flex-col gap-4 rounded-[28px] bg-brand p-6 text-white md:flex-row md:items-center md:justify-between md:gap-6 md:rounded-[32px] md:px-12 md:py-14">
        <div className="flex flex-col gap-3 md:max-w-[640px]">
          <h2 className="font-display text-[30px] font-extrabold leading-[1.1] md:text-[44px] md:leading-[1.05] md:tracking-[-0.02em]">
            Someone&apos;s day is about to get better.
          </h2>
          <p className="hidden text-lg text-[#E4E1FF] md:block">
            Make their wish now. It&apos;s free.
          </p>
        </div>
        <Link
          href="/build"
          className="flex h-[52px] items-center justify-center rounded-control bg-white px-7 text-base font-extrabold text-brand-deep hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-14 md:text-[17px]"
        >
          Create a wish
        </Link>
      </div>
    </section>
  );
}
