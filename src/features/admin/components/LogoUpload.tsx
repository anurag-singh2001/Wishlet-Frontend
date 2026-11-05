"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { uploadLogo } from "../lib/admin-api";

interface LogoUploadProps {
  logoUrl: string | null;
  appName: string;
  onChange: (url: string | null, publicId: string | null) => void;
}

export function LogoUpload({ logoUrl, appName, onChange }: LogoUploadProps): React.ReactElement {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onFile = async (file: File | undefined): Promise<void> => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const { url, publicId } = await uploadLogo(file);
      onChange(url, publicId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-ink">Logo</span>
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <Image
            unoptimized
            src={logoUrl}
            alt={`${appName} logo`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-control border border-hairline object-contain"
          />
        ) : (
          <span className="text-sm text-muted">Using the default mark.</span>
        )}
        <Button size="sm" variant="secondary" loading={busy} onClick={() => input.current?.click()}>
          {logoUrl ? "Replace" : "Upload"}
        </Button>
        {logoUrl && (
          <Button size="sm" variant="ghost" onClick={() => onChange(null, null)}>
            Remove
          </Button>
        )}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        aria-label="Logo file"
        onChange={(e) => void onFile(e.target.files?.[0])}
      />
      {error && (
        <p role="alert" className="text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
