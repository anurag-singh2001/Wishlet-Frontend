import { useState } from "react";
import { getUploadSignature, uploadImageFallback } from "@/lib/api";
import { compressImage } from "../lib/compress-image";
import type { BuilderState } from "../types";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

async function uploadDirect(
  file: Blob,
  filename: string,
): Promise<{ url: string; publicId: string | null } | null> {
  try {
    const sig = await getUploadSignature();
    if (!sig) return null;
    const form = new FormData();
    form.append("file", file, filename);
    form.append("api_key", sig.apiKey);
    form.append("timestamp", sig.timestamp.toString());
    form.append("signature", sig.signature);
    form.append("folder", sig.folder);
    const res = await fetch(sig.uploadUrl, { method: "POST", body: form });
    if (!res.ok) return null;
    const data = (await res.json()) as { secure_url?: string; public_id?: string };
    return data.secure_url ? { url: data.secure_url, publicId: data.public_id ?? null } : null;
  } catch {
    return null; // fall back to server-assisted upload
  }
}

export function usePhotoUpload(updateState: (updates: Partial<BuilderState>) => void) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const rawFile = input.files?.[0];
    if (!rawFile) return;
    setUploadError("");

    if (!ALLOWED_TYPES.includes(rawFile.type)) {
      setUploadError("Unsupported format. Please upload a JPEG, PNG, or WebP image.");
      input.value = "";
      return;
    }
    if (rawFile.size > MAX_SIZE_BYTES) {
      setUploadError("File size exceeds the 10 MB limit.");
      input.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const file = await compressImage(rawFile);
      const result =
        (await uploadDirect(file, rawFile.name)) ?? (await uploadImageFallback(file, rawFile.name));
      updateState({
        photos: [result.url],
        ...(result.publicId ? { photoPublicId: result.publicId } : {}),
      });
    } catch (err: unknown) {
      setUploadError(
        err instanceof Error ? err.message : "Network error uploading file. Please try again.",
      );
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
      input.value = "";
    }
  };

  const removePhoto = () => {
    updateState({ photos: [] });
    setUploadError("");
  };

  return { isUploading, uploadError, handleUpload, removePhoto };
}
