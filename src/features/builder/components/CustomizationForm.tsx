"use client";

import React from "react";
import type { BuilderState, ApiTemplate } from "../types";

interface CustomizationFormProps {
  state: BuilderState;
  updateState: (updates: Partial<BuilderState>) => void;
  templates: ApiTemplate[];
  onGenerate: () => void;
  isGenerating: boolean;
  isValid: boolean;
  generationError?: string;
}

export function CustomizationForm({
  state,
  updateState,
  templates,
  onGenerate,
  isGenerating,
  isValid,
  generationError,
}: CustomizationFormProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState("");

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");

    // Client-side format validation (JPEG, PNG, WebP)
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(file.type)) {
      setUploadError("Unsupported format. Please upload a JPEG, PNG, or WebP image.");
      if (e.target) e.target.value = "";
      return;
    }

    // Client-side size validation (10 MB maximum)
    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      setUploadError("File size exceeds the 10 MB limit.");
      if (e.target) e.target.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      
      // Step A: Attempt direct Cloudinary signed upload
      let uploadedUrl: string | null = null;
      let photoPublicId: string | null = null;

      try {
        const sigRes = await fetch(`${API_URL}/api/v1/uploads/signature`, {
          method: "POST",
        });

        if (sigRes.ok) {
          const sigData = await sigRes.json();
          const cloudinaryFormData = new FormData();
          cloudinaryFormData.append("file", file);
          cloudinaryFormData.append("api_key", sigData.apiKey);
          cloudinaryFormData.append("timestamp", sigData.timestamp.toString());
          cloudinaryFormData.append("signature", sigData.signature);
          cloudinaryFormData.append("folder", sigData.folder);

          const cloudRes = await fetch(sigData.uploadUrl, {
            method: "POST",
            body: cloudinaryFormData,
          });

          if (cloudRes.ok) {
            const cloudData = await cloudRes.json();
            uploadedUrl = cloudData.secure_url;
            photoPublicId = cloudData.public_id;
          }
        }
      } catch {
        // Fallback to server-assisted upload if direct signature fails
      }

      // Step B: Fallback to server-assisted upload if direct upload did not complete
      if (!uploadedUrl) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${API_URL}/api/v1/uploads/image`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to upload image. Please try again.");
        }

        const data = await res.json();
        uploadedUrl = data.url;
        photoPublicId = data.publicId || null;
      }

      if (uploadedUrl) {
        updateState({
          photos: [uploadedUrl],
          ...(photoPublicId ? { photoPublicId } : {}),
        });
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Network error uploading file. Please try again.";
      setUploadError(errorMsg);
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
      if (e.target) {
        e.target.value = ""; // Reset input
      }
    }
  };

  const handleRemovePhoto = () => {
    updateState({ photos: [] });
    setUploadError("");
  };

  const occasions = ["birthday", "anniversary", "sorry", "thank-you", "congratulations"];

  return (
    <div className="w-full flex flex-col space-y-8 p-6 bg-white overflow-y-auto h-full scrollbar-hide">
      
      {/* 1. Basics */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">1. Basics</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-slate-700">Occasion</label>
            <select
              value={state.occasion}
              onChange={(e) => updateState({ occasion: e.target.value })}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            >
              <option value="">Select occasion</option>
              {occasions.map((occ) => (
                <option key={occ} value={occ}>
                  {occ.charAt(0).toUpperCase() + occ.slice(1).replace("-", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-slate-700">Template</label>
            <select
              value={state.templateId}
              onChange={(e) => updateState({ templateId: e.target.value })}
              disabled={!state.occasion}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors disabled:opacity-50"
            >
              <option value="">Select template</option>
              {templates
                .filter((t) => t.occasion === state.occasion || !state.occasion)
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Personalization */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">2. Personalize</h3>
        
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-slate-700">To (Recipient)</label>
          <input
            type="text"
            placeholder="e.g. Sarah"
            value={state.recipientName}
            onChange={(e) => updateState({ recipientName: e.target.value })}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-slate-700">From (Sender)</label>
          <input
            type="text"
            placeholder="e.g. James"
            value={state.senderName}
            onChange={(e) => updateState({ senderName: e.target.value })}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-slate-700">Message</label>
          <textarea
            placeholder="Write something nice..."
            value={state.message}
            onChange={(e) => updateState({ message: e.target.value })}
            rows={4}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors resize-none"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-slate-700">Add a photo (optional)</label>
          <p className="text-xs text-slate-500 mb-1">
            Your photo will be displayed in the Wishlet you create and can be viewed by anyone you share the link with.
          </p>
          <div className="flex items-center space-x-4">
            <label className={`flex-shrink-0 cursor-pointer border px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isUploading ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>
              {isUploading ? "Uploading..." : state.photos.length > 0 ? "Replace Photo" : "Choose Photo"}
              <input 
                type="file" 
                accept="image/jpeg,image/png,image/webp" 
                onChange={handlePhotoUpload} 
                className="hidden" 
                disabled={isUploading} 
              />
            </label>
            
            {state.photos.length > 0 && !isUploading && (
              <button 
                type="button"
                onClick={handleRemovePhoto}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Remove
              </button>
            )}

            <span className="text-xs text-slate-500 truncate">
              {isUploading 
                ? "Uploading photo..." 
                : state.photos.length > 0 
                  ? "Photo uploaded successfully" 
                  : "No file chosen"}
            </span>
          </div>
          {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
        </div>
      </div>

      <div className="pt-8 mt-auto">
        {generationError && (
          <div className="mb-3 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2 animate-fadeIn">
            <span className="font-bold shrink-0">⚠️ Error:</span>
            <span>{generationError}</span>
          </div>
        )}
        <button
          type="button"
          onClick={onGenerate}
          disabled={!isValid || isGenerating}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isGenerating ? "Generating..." : "Generate Wish Link ✨"}
        </button>
      </div>

    </div>
  );
}
