"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button, Sheet } from "@/components/ui";
import { useAuth } from "./use-auth";

const ITEM =
  "flex min-h-11 w-full items-center rounded-control px-3 text-left text-[15px] font-semibold text-ink hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function Avatar({ url, label }: { url: string | null; label: string }): React.ReactElement {
  const [broken, setBroken] = useState(false);
  if (url && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[14px] font-bold text-white"
    >
      {label.charAt(0).toUpperCase()}
    </span>
  );
}

function Items({ onDone }: { onDone: () => void }): React.ReactElement {
  const { signOut } = useAuth();
  return (
    <div className="flex flex-col gap-1">
      <Link href="/wishes" onClick={onDone} className={ITEM}>
        My wishes
      </Link>
      <button
        type="button"
        onClick={() => {
          onDone();
          signOut();
        }}
        className={ITEM}
      >
        Sign out
      </button>
    </div>
  );
}

export function AccountMenu(): React.ReactElement | null {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = (): void => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open || phone) return;
    const onDown = (e: MouseEvent): void => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, phone]);

  if (!user) return null;
  const label = user.name || user.email;

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${label}`}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface py-1 pl-1.5 pr-3 text-[14px] font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <Avatar url={user.avatarUrl} label={label} />
        <span className="max-w-[120px] truncate">{user.name?.split(" ")[0] || user.email}</span>
      </button>
      {open && !phone && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 w-48 rounded-control border border-hairline bg-surface p-1.5 shadow-lg"
        >
          <Items onDone={() => setOpen(false)} />
        </div>
      )}
      <Sheet open={open && phone} onClose={() => setOpen(false)} title={label}>
        <Items onDone={() => setOpen(false)} />
        <Button variant="ghost" fullWidth className="mt-2" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Sheet>
    </div>
  );
}
