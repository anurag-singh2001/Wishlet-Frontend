"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button, Sheet } from "@/components/ui";

interface InstagramDesktopPanelProps {
  wishUrl: string;
  onClose: () => void;
}

export function InstagramDesktopPanel({
  wishUrl,
  onClose,
}: InstagramDesktopPanelProps): React.ReactElement {
  const [qr, setQr] = useState("");

  useEffect(() => {
    QRCode.toDataURL(wishUrl, { width: 220, margin: 1 })
      .then(setQr)
      .catch(() => setQr(""));
  }, [wishUrl]);

  return (
    <Sheet open onClose={onClose} title="Post from your phone">
      <div className="text-center">
        <p className="mb-3 text-sm text-muted">
          Instagram Stories can only be posted from a phone.
        </p>
        {qr && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qr}
            alt="QR code to open this wish on your phone"
            className="mx-auto h-44 w-44"
          />
        )}
        <p className="mb-4 mt-2 text-xs text-muted">Scan to open this wish on your phone.</p>
        <Button variant="secondary" fullWidth onClick={onClose}>
          Close
        </Button>
      </div>
    </Sheet>
  );
}
