"use client";

import React from "react";
import { Button, Sheet } from "@/components/ui";

interface DeleteWishSheetProps {
  open: boolean;
  name: string;
  deleting: boolean;
  error: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteWishSheet({
  open,
  name,
  deleting,
  error,
  onConfirm,
  onClose,
}: DeleteWishSheetProps): React.ReactElement {
  return (
    <Sheet open={open} onClose={onClose} title="Delete this wish?">
      <p className="mb-4 text-[15px] text-[#4B4766]">
        {name ? `${name}'s wish` : "This wish"} will stop working for anyone who has the link. This
        can&apos;t be undone.
      </p>
      {error && (
        <p role="alert" className="mb-3 text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-2">
        <Button variant="danger" fullWidth loading={deleting} onClick={onConfirm}>
          Delete wish
        </Button>
        <Button variant="secondary" fullWidth disabled={deleting} onClick={onClose}>
          Keep it
        </Button>
      </div>
    </Sheet>
  );
}
