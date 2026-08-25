"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";
import type { TemplateProps } from "@/features/templates/types";
import { trackWishViewed } from "@/lib/analytics";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");

interface PublicViewerProps {
  slug: string;
}

interface ApiWishResponse {
  id: string;
  slug: string;
  templateId: string;
  occasion: string;
  content: {
    recipientName?: string;
    senderName?: string;
    message?: string;
    photos?: string[];
    [key: string]: unknown;
  };
  createdAt: string;
}

export function PublicViewer({ slug }: PublicViewerProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wish", slug],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/v1/wishes/${slug}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("NOT_FOUND");
        }
        throw new Error("API_ERROR");
      }
      return res.json() as Promise<ApiWishResponse>;
    },
    retry: false, // Don't retry on 404
  });

  useEffect(() => {
    if (data) {
      trackWishViewed({
        occasion: data.occasion,
        template: data.templateId,
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-slate-50 text-slate-500 font-sans">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-2xl">✨</div>
          <p className="font-medium text-slate-600">Unwrapping your wish...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const isNotFound = error.message === "NOT_FOUND";
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-slate-50 text-slate-900 font-sans p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
            {isNotFound ? "👀" : "🔧"}
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {isNotFound ? "Wishlet Not Found" : "Something went wrong"}
          </h1>
          <p className="text-slate-600 mb-8">
            {isNotFound
              ? "This Wishlet could not be found. The link might be invalid or expired."
              : "We couldn't load this wish due to an unexpected error. Please try again later."}
          </p>
          <Link
            href="/"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Back to Wishlet
          </Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Map API response to TemplateProps
  const templateProps: TemplateProps = {
    recipientName: data.content.recipientName || "Someone special",
    senderName: data.content.senderName || "A friend",
    message: data.content.message || "",
    occasion: data.occasion,
    photos: data.content.photos || [],
    content: data.content,
  };

  return (
    <div className="min-h-[100dvh] w-full">
      <TemplateRenderer templateId={data.templateId} props={templateProps} />
    </div>
  );
}
