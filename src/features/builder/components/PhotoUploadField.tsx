"use client";

import React from "react";

interface PhotoUploadFieldProps {
  hasPhoto: boolean;
  isUploading: boolean;
  error: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function PhotoUploadField({
  hasPhoto,
  isUploading,
  error,
  onUpload,
  onRemove,
}: PhotoUploadFieldProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-semibold text-slate-700">Add a photo (optional)</label>
      <p className="text-xs text-slate-500 mb-1">
        Your photo will be displayed in the Wishlet you create and can be viewed by anyone you share
        the link with.
      </p>
      <div className="flex items-center space-x-4">
        <label
          className={`flex-shrink-0 cursor-pointer border px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isUploading ? "bg-slate-100 text-slate-400 border-slate-200" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"}`}
        >
          {isUploading ? "Uploading..." : hasPhoto ? "Replace Photo" : "Choose Photo"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>

        {hasPhoto && !isUploading && (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Remove
          </button>
        )}

        <span className="text-xs text-slate-500 truncate">
          {isUploading
            ? "Uploading photo..."
            : hasPhoto
              ? "Photo uploaded successfully"
              : "No file chosen"}
        </span>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
