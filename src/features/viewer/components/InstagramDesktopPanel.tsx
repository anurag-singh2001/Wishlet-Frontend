"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

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
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 text-center text-slate-700 shadow-lg">
      <p className="text-sm font-medium mb-3">Instagram Stories can only be posted from a phone.</p>
      {qr && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qr} alt="QR code to open this wish on your phone" className="mx-auto w-44 h-44" />
      )}
      <p className="text-xs text-slate-500 mt-2">Scan to open this wish on your phone.</p>
      <button
        type="button"
        onClick={onClose}
        className="mt-3 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        Close
      </button>
    </div>
  );
}
