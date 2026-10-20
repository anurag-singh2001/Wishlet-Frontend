"use client";

import React, { useState } from "react";
import QRCode from "qrcode";
import { QrCode } from "lucide-react";
import { isNative } from "@/lib/native/share-native";

interface DownloadQrButtonProps {
  url: string;
  slug: string;
}

export function DownloadQrButton({ url, slug }: DownloadQrButtonProps): React.ReactElement {
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
      <button
        type="button"
        onClick={handleDownload}
        className="w-full flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-4 px-6 rounded-xl font-medium transition-colors"
      >
        <QrCode size={20} />
        <span>Download QR</span>
      </button>
      {error && <p className="text-xs text-red-600">Could not create the QR code. Try again.</p>}
    </div>
  );
}
