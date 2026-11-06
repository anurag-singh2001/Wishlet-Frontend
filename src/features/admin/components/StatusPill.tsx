import React from "react";
import type { CatalogOccasion } from "../types";

const STYLES: Record<CatalogOccasion["status"], { text: string; cls: string }> = {
  off: { text: "Off", cls: "bg-hairline text-ink" },
  scheduled: { text: "Scheduled", cls: "bg-[#FFF3D6] text-[#7A5200]" },
  live: { text: "Live", cls: "bg-[#DDF5E4] text-[#14653A]" },
  ended: { text: "Ended", cls: "bg-[#FDE2E2] text-[#8A1C1C]" },
};

export function StatusPill({ status }: { status: CatalogOccasion["status"] }): React.ReactElement {
  const s = STYLES[status];
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${s.cls}`}>{s.text}</span>;
}
