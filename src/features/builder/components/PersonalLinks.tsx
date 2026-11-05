"use client";

import React, { useState } from "react";
import { Copy, MessageCircle } from "lucide-react";
import { Input, useToast } from "@/components/ui";
import { trackWishShared } from "@/lib/analytics";
import { personalLink, personalName } from "@/features/viewer/lib/personal-name";

interface PersonalLinksProps {
  url: string;
  senderName: string;
}

const BTN =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-control border border-hairline bg-surface px-3 text-[14px] font-bold text-ink disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** Group wishes: make a link that shows one person's name on the card. */
export function PersonalLinks({ url, senderName }: PersonalLinksProps): React.ReactElement {
  const toast = useToast();
  const [name, setName] = useState("");
  const clean = personalName(name);
  const absolute = url.startsWith("http") ? url : `${window.location.origin}${url}`;
  const link = clean ? personalLink(absolute, clean) : "";
  const text = `${senderName || "Someone"} made something special for you, ${clean ?? ""} ❤️`;

  const copy = async (): Promise<void> => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      trackWishShared("copy_link");
      toast(`Link for ${clean} copied`);
      setName("");
    } catch {
      toast("Couldn't copy. Long-press the link to copy it.");
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-2.5 rounded-2xl border border-hairline bg-surface p-4">
      <p className="text-[15px] font-bold text-ink">Personal links</p>
      <p className="text-[13px] text-[#4B4766]">
        Same wish, with their name on the card. Type a name and copy or send.
      </p>
      <Input
        id="personal-name"
        value={name}
        maxLength={40}
        autoComplete="off"
        placeholder="e.g. Priya"
        aria-label="Name for a personal link"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") void copy();
        }}
      />
      {link && <p className="break-all text-[12px] text-[#4B4766]">{link}</p>}
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={BTN} disabled={!link} onClick={() => void copy()}>
          <Copy size={18} aria-hidden="true" />
          Copy link
        </button>
        <a
          href={link ? `https://wa.me/?text=${encodeURIComponent(`${text}\n${link}`)}` : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!link}
          onClick={() => link && trackWishShared("whatsapp")}
          className={`${BTN} ${link ? "" : "pointer-events-none opacity-50"}`}
        >
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
