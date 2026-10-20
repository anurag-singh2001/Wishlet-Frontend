const STEPS = [
  {
    title: "Pick a design",
    body: "Choose the occasion, then a design you can see before you choose.",
  },
  {
    title: "Make it personal",
    body: "Their name, your words and a favourite photo. See it live as you type.",
  },
  { title: "Send the link", body: "Share it on WhatsApp, or post an animated story to Instagram." },
];

export function HowItWorks(): React.JSX.Element {
  return (
    <section id="how" className="mt-4 scroll-mt-4 border-y border-hairline bg-surface md:mt-0">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 py-8 md:gap-8 md:px-8 md:py-[72px]">
        <h2 className="font-display text-[28px] font-extrabold md:text-[40px] md:tracking-[-0.02em]">
          Three steps. One minute.
        </h2>
        <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-3.5 md:flex-col md:gap-2.5">
              <span className="w-6 font-display text-[28px] font-extrabold leading-none text-brand md:w-auto md:text-[44px]">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1">
                <strong className="md:text-xl">{s.title}</strong>
                <span className="text-[15px] leading-normal text-muted md:text-base md:leading-[1.55]">
                  {s.body}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
