"use client";

import Link from "next/link";
import { templateRegistry } from "@/features/templates/registry";

interface Occasion {
  id: string;
  label: string;
  bg: string;
  stroke: string;
  icon: React.ReactNode;
}

const OCCASIONS: Occasion[] = [
  {
    id: "birthday",
    label: "Birthday",
    bg: "#FFF1EC",
    stroke: "#B4401F",
    icon: (
      <>
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V8M12 11V6M16 11V8" />
      </>
    ),
  },
  {
    id: "anniversary",
    label: "Anniversary",
    bg: "#FDEBF3",
    stroke: "#B0285E",
    icon: (
      <>
        <circle cx="9" cy="14" r="5" />
        <circle cx="15" cy="14" r="5" />
        <path d="M9 5l3-2 3 2" />
      </>
    ),
  },
  {
    id: "thank-you",
    label: "Thank you",
    bg: "#EAF7EF",
    stroke: "#1F7A45",
    icon: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
  },
  {
    id: "congratulations",
    label: "Congratulations",
    bg: "#FFF6DC",
    stroke: "#8A5A00",
    icon: (
      <>
        <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
        <path d="M12 14v4M8 20h8M7 6H4a3 3 0 0 0 3 3M17 6h3a3 3 0 0 1-3 3" />
      </>
    ),
  },
  {
    id: "sorry",
    label: "Sorry",
    bg: "#ECEFFB",
    stroke: "#3B4A8C",
    icon: (
      <>
        <path d="M7 15a5 5 0 0 1 0-10 6 6 0 0 1 11 3 4 4 0 0 1-1 7z" />
        <path d="M9 19l-1 2M13 19l-1 2M17 19l-1 2" />
      </>
    ),
  },
];

function designCount(id: string): number {
  return Object.values(templateRegistry).filter((t) => t.occasion === id).length;
}

export function Occasions(): React.JSX.Element {
  return (
    <section
      id="occasions"
      className="mx-auto flex max-w-[1200px] scroll-mt-4 flex-col gap-4 px-5 py-6 md:gap-7 md:px-8 md:pb-20 md:pt-10"
    >
      <h2 className="font-display text-[28px] font-extrabold md:text-[40px] md:tracking-[-0.02em]">
        What&apos;s the occasion?
      </h2>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        {OCCASIONS.map((o, i) => (
          <li key={o.id} className={i === 4 ? "col-span-2 md:col-span-1" : undefined}>
            <Link
              href={`/build?occasion=${o.id}`}
              className="flex h-full flex-col gap-2.5 rounded-[20px] border border-hairline bg-surface p-4 transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:gap-3.5 md:rounded-card md:p-6"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-[12px] md:h-12 md:w-12 md:rounded-control"
                style={{ background: o.bg }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={o.stroke}
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  {o.icon}
                </svg>
              </span>
              <strong className="text-base md:text-lg">{o.label}</strong>
              <span className="text-sm text-muted">{designCount(o.id)} designs</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
