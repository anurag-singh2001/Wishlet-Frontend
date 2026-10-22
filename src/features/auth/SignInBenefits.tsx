import React from "react";
import { Eye, Smartphone, Trash2 } from "lucide-react";

const BENEFITS = [
  { icon: Smartphone, text: "Your wishes on every device" },
  { icon: Eye, text: "See who opened and reacted" },
  { icon: Trash2, text: "Delete or manage anytime" },
];

export function SignInBenefits(): React.ReactElement {
  return (
    <ul className="flex w-full flex-col gap-3">
      {BENEFITS.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-3 text-[15px] font-semibold text-ink">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-soft text-brand">
            <Icon size={20} aria-hidden="true" />
          </span>
          {text}
        </li>
      ))}
    </ul>
  );
}
