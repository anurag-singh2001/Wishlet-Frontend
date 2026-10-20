import React from "react";

interface PhotoFieldProps {
  photoUrl: string | undefined;
  isUploading: boolean;
  error: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function PhotoField({
  photoUrl,
  isUploading,
  error,
  onUpload,
  onRemove,
}: PhotoFieldProps): React.ReactElement {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[#C9C2EC] bg-surface p-3">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt="" className="h-14 w-14 flex-none rounded-xl object-cover" />
        ) : (
          <div className="h-14 w-14 flex-none rounded-xl bg-ground" aria-hidden="true" />
        )}
        <div className="flex flex-1 flex-col gap-0.5">
          <strong className="text-sm text-ink">
            {isUploading ? "Uploading..." : photoUrl ? "Photo added" : "Add a photo (optional)"}
          </strong>
          <span className="text-[13px] text-[#4B4766]">
            {photoUrl ? "Shown in the card" : "Anyone with the link can see it"}
          </span>
        </div>
        {photoUrl && !isUploading ? (
          <button
            type="button"
            onClick={onRemove}
            className="h-11 rounded-control px-3 text-sm font-bold text-[#B42318] focus-visible:outline-2 focus-visible:outline-brand"
          >
            Remove
          </button>
        ) : (
          <label
            className={`flex h-11 cursor-pointer items-center rounded-control px-3 text-sm font-bold text-brand focus-within:outline-2 focus-within:outline-brand ${
              isUploading ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Choose
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={onUpload}
              disabled={isUploading}
              className="sr-only"
              aria-label="Choose a photo"
            />
          </label>
        )}
      </div>
      {error && (
        <p role="alert" className="mt-1 text-[13px] text-[#B42318]">
          {error}
        </p>
      )}
    </div>
  );
}
