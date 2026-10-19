"use client";

import React from "react";
import { Eye, Edit3 } from "lucide-react";

export type MobileTab = "edit" | "preview";

interface MobileTabBarProps {
  tab: MobileTab;
  onChange: (tab: MobileTab) => void;
}

export function MobileTabBar({ tab, onChange }: MobileTabBarProps) {
  const cls = (active: boolean) =>
    `flex-1 py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all ${
      active ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
    }`;
  return (
    <div className="flex lg:hidden bg-slate-100 p-1 border-b border-slate-200">
      <button onClick={() => onChange("edit")} className={cls(tab === "edit")}>
        <Edit3 size={14} />
        <span>Edit Form</span>
      </button>
      <button onClick={() => onChange("preview")} className={cls(tab === "preview")}>
        <Eye size={14} />
        <span>Live Preview</span>
      </button>
    </div>
  );
}
