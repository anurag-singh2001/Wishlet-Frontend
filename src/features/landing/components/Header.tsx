"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Logo, Sheet } from "@/components/ui";

const LINKS = [
  { href: "/#occasions", label: "Occasions" },
  { href: "/#how", label: "How it works" },
  { href: "/wishes", label: "My wishes" },
];

const LINK_CLASS =
  "inline-flex min-h-11 items-center rounded-control text-[15px] font-semibold text-muted hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function Header(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-hairline bg-ground md:border-b-0">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <Link href="/" aria-label="Wishlet home" className="rounded-control">
          <Logo size={34} className="font-display text-[20px] font-extrabold md:text-[22px]" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={LINK_CLASS}>
              {l.label}
            </Link>
          ))}
          <Button href="/build" size="sm">
            Create a wish
          </Button>
        </nav>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-hairline bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
      <Sheet open={open} onClose={() => setOpen(false)} title="Menu">
        <nav aria-label="Menu" className="flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`${LINK_CLASS} text-base`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3">
            <Button href="/build" fullWidth>
              Create a wish
            </Button>
          </div>
        </nav>
      </Sheet>
    </header>
  );
}
