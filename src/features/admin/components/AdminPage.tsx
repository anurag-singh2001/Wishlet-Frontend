"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, Skeleton } from "@/components/ui";
import { AuthGate } from "@/features/auth/AuthGate";
import { useAdminConfig } from "../hooks/use-admin";
import { BrandingTab } from "./BrandingTab";
import { CatalogTab } from "./CatalogTab";
import { ModerationTab } from "./ModerationTab";
import { OverviewTab } from "./OverviewTab";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "catalog", label: "Occasions & Templates" },
  { id: "branding", label: "Branding" },
  { id: "moderation", label: "Moderation" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Panel({ tab }: { tab: TabId }): React.ReactElement {
  if (tab === "overview") return <OverviewTab />;
  if (tab === "catalog") return <CatalogTab />;
  if (tab === "branding") return <BrandingTab />;
  return <ModerationTab />;
}

function AdminContent(): React.ReactElement {
  const [tab, setTab] = useState<TabId>("overview");
  const { isPending, error } = useAdminConfig();

  if (isPending) return <Skeleton className="m-5 h-96" />;
  if (error) {
    const forbidden = error.message === "FORBIDDEN";
    return (
      <Card role="alert" className="mx-auto mt-10 max-w-md text-center">
        <h1 className="font-display text-[22px] font-extrabold text-ink">
          {forbidden ? "Not authorized" : "Couldn't load admin"}
        </h1>
        <p className="mt-2 text-muted">
          {forbidden ? "This account is not an admin." : "Please try again in a moment."}
        </p>
        <Link href="/" className="mt-4 inline-block font-bold text-brand underline">
          Back to home
        </Link>
      </Card>
    );
  }

  return (
    <div className="mx-auto flex max-w-[960px] flex-col gap-4 px-5 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[26px] font-extrabold text-ink">Admin</h1>
        <Link href="/" className="text-sm font-bold text-brand">
          Back to site
        </Link>
      </div>
      <div
        role="tablist"
        aria-label="Admin sections"
        className="scrollbar-hide flex gap-2 overflow-x-auto"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === tab}
            onClick={() => setTab(t.id)}
            className={`min-h-11 flex-none rounded-full border px-4 text-sm font-bold ${
              t.id === tab
                ? "border-brand bg-brand text-white"
                : "border-hairline bg-surface text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        <Panel tab={tab} />
      </div>
    </div>
  );
}

export function AdminPage(): React.ReactElement {
  return (
    <AuthGate>
      <AdminContent />
    </AuthGate>
  );
}
