"use client";

import React from "react";
import type { BuilderState, ApiTemplate } from "../types";
import { usePhotoUpload } from "../hooks/use-photo-upload";
import { PhotoUploadField } from "./PhotoUploadField";

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
  const { isUploading, uploadError, handleUpload, removePhoto } = usePhotoUpload(updateState);

  const occasions = ["birthday", "anniversary", "sorry", "thank-you", "congratulations"];

  return (
    <div className="w-full flex flex-col space-y-8 p-6 bg-white overflow-y-auto h-full scrollbar-hide">
      {/* 1. Basics */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          1. Basics
        </h3>

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
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          2. Personalize
        </h3>

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

        <PhotoUploadField
          hasPhoto={state.photos.length > 0}
          isUploading={isUploading}
          error={uploadError}
          onUpload={handleUpload}
          onRemove={removePhoto}
        />
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
          disabled={!isValid || isGenerating || isUploading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isGenerating
            ? "Generating..."
            : isUploading
              ? "Uploading Photo..."
              : "Generate Wish Link ✨"}
        </button>
      </div>
    </div>
  );
}
