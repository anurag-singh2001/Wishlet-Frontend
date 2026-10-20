"use client";

import React, { useState } from "react";
import QRCode from "qrcode";
import { QrCode } from "lucide-react";
import { isNative } from "@/lib/native/share-native";

interface DownloadQrButtonProps {
  url: string;
  slug: string;
  className?: string;
}

export function DownloadQrButton({
  url,
  slug,
  className = "",
}: DownloadQrButtonProps): React.ReactElement {
  const [error, setError] = useState(false);

  const handleDownload = async (): Promise<void> => {
    setError(false);
    try {
      const dataUrl = await QRCode.toDataURL(url, { width: 600, margin: 2 });
      if (isNative()) {
        const { shareFileNative } = await import("@/lib/native/share-native");
        await shareFileNative(dataUrl.split(",")[1] ?? "", `wishlet-${slug}-qr.png`);
        return;
      }
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `wishlet-${slug}-qr.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <button type="button" onClick={handleDownload} className={className}>
        <QrCode size={22} aria-hidden="true" />
        QR code
      </button>
      {error && (
        <p role="alert" className="text-center text-xs text-danger">
          Could not create the QR code.
        </p>
      )}
    </div>
  );
}
