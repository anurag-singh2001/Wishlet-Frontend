"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Sheet, Skeleton } from "@/components/ui";
import { useAdminWishes, useBlockUser, useDeleteWish } from "../hooks/use-admin";
import type { AdminWish } from "../types";
import { Notice, type NoticeState } from "./Notice";
import { WishRow } from "./WishRow";

const PAGE_SIZE = 20;

export function ModerationTab(): React.ReactElement {
  const [input, setInput] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState<AdminWish | null>(null);
  const [notice, setNotice] = useState<NoticeState | null>(null);
  const { data, isPending, error } = useAdminWishes(q, page);
  const del = useDeleteWish();
  const block = useBlockUser();

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(input.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [input]);

  const onError = (e: Error): void => setNotice({ tone: "error", text: e.message });
  const confirmDelete = (): void => {
    if (!toDelete) return;
    del.mutate(toDelete.id, {
      onSuccess: () => {
        setNotice({ tone: "success", text: `Deleted ${toDelete.slug}` });
        setToDelete(null);
      },
      onError: (e) => {
        onError(e);
        setToDelete(null);
      },
    });
  };
  const toggleBlock = (w: AdminWish): void => {
    if (!w.owner) return;
    const blocked = !w.owner.blockedAt;
    block.mutate(
      { id: w.owner.id, blocked },
      {
        onSuccess: () =>
          setNotice({
            tone: "success",
            text: `${blocked ? "Blocked" : "Unblocked"} ${w.owner?.email}`,
          }),
        onError,
      },
    );
  };

  const pages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  return (
    <div className="flex flex-col gap-4">
      <Input
        id="mod-q"
        type="search"
        aria-label="Search by slug or owner email"
        placeholder="Search by slug or owner email"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Notice notice={notice} />
      {isPending && <Skeleton className="h-48" />}
      {error && (
        <p role="alert" className="text-danger">
          Couldn&apos;t load wishes.
        </p>
      )}
      {data && data.items.length === 0 && <p className="text-muted">No wishes found.</p>}
      <ul className="flex flex-col gap-3">
        {data?.items.map((w) => (
          <WishRow
            key={w.id}
            wish={w}
            busy={del.isPending || block.isPending}
            onDelete={() => setToDelete(w)}
            onToggleBlock={() => toggleBlock(w)}
          />
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <Button
          size="sm"
          variant="secondary"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <span className="text-sm text-muted">
          Page {page} of {pages} ({data?.total ?? 0})
        </span>
        <Button
          size="sm"
          variant="secondary"
          disabled={page >= pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
      <Sheet open={toDelete !== null} onClose={() => setToDelete(null)} title="Delete this wish?">
        <p className="mb-4 text-[15px] text-muted">
          {toDelete?.slug} and its photos and voice message will be removed permanently.
        </p>
        <div className="flex flex-col gap-2">
          <Button variant="danger" fullWidth loading={del.isPending} onClick={confirmDelete}>
            Delete wish
          </Button>
          <Button variant="ghost" fullWidth onClick={() => setToDelete(null)}>
            Cancel
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
