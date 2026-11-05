import React from "react";
import Link from "next/link";
import { Badge, Button, Card } from "@/components/ui";
import { occasionLabel, templateName } from "@/features/builder/lib/occasions";
import type { AdminWish } from "../types";

interface WishRowProps {
  wish: AdminWish;
  busy: boolean;
  onDelete: () => void;
  onToggleBlock: () => void;
}

export function WishRow({ wish, busy, onDelete, onToggleBlock }: WishRowProps): React.ReactElement {
  const owner = wish.owner;
  const blocked = Boolean(owner?.blockedAt);
  return (
    <Card as="li" className="flex flex-col gap-2 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href={`/w/${wish.slug}`}
          target="_blank"
          className="font-mono text-[15px] font-bold text-brand underline"
        >
          {wish.slug}
        </Link>
        <span className="text-[13px] text-muted">
          {new Date(wish.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm text-ink">
        {occasionLabel(wish.occasion) || wish.occasion} ·{" "}
        {templateName(wish.templateId) || wish.templateId} · {wish.viewCount} views
      </p>
      <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {owner ? owner.email : "Guest (no owner)"}
        {blocked && <Badge tone="party">Blocked</Badge>}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="danger" disabled={busy} onClick={onDelete}>
          Delete
        </Button>
        {owner && (
          <Button size="sm" variant="secondary" disabled={busy} onClick={onToggleBlock}>
            {blocked ? "Unblock owner" : "Block owner"}
          </Button>
        )}
      </div>
    </Card>
  );
}
