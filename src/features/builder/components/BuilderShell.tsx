"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { BuilderStepper } from "./BuilderStepper";
import { CustomizationForm } from "./CustomizationForm";
import { LivePreview } from "./LivePreview";
import { GenerationSuccess } from "./GenerationSuccess";
import type { BuilderState, BuilderStep, ApiTemplate } from "../types";
import { trackCreateWishStarted, trackWishCreated } from "@/lib/analytics";

import Link from "next/link";
import { ArrowLeft, Eye, Edit3 } from "lucide-react";

const INITIAL_STATE: BuilderState = {
  occasion: "",
  templateId: "",
  recipientName: "",
  senderName: "",
  message: "",
  photos: [],
};

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");

const DEFAULT_TEMPLATES: ApiTemplate[] = [
  { id: "birthday-minimal", name: "Birthday Minimal", occasion: "birthday", description: "A clean, elegant birthday template." },
  { id: "anniversary-elegant", name: "Elegant Anniversary", occasion: "anniversary", description: "An elegant template for anniversaries." },
  { id: "thank-you-simple", name: "Simple Thank You", occasion: "thank-you", description: "A simple thank you template." },
  { id: "congratulations-celebration", name: "Celebration", occasion: "congratulations", description: "A celebratory template." },
  { id: "sorry-sincere", name: "Sincere Apology", occasion: "sorry", description: "A sincere apology template." },
];

export function BuilderShell() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<BuilderStep>("edit");
  const [state, setState] = useState<BuilderState>(() => {
    const occasionParam = searchParams.get("occasion");
    const templateParam = searchParams.get("template");
    return {
      ...INITIAL_STATE,
      ...(occasionParam ? { occasion: occasionParam } : {}),
      ...(templateParam ? { templateId: templateParam } : {}),
    };
  });
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [generationError, setGenerationError] = useState<string>("");

  useEffect(() => {
    trackCreateWishStarted();
  }, []);

  // Fetch templates from API with fallback
  const { data, isLoading: templatesLoading, isError } = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/v1/templates`);
      if (!res.ok) throw new Error("Failed to load templates");
      return res.json() as Promise<{ templates: ApiTemplate[] }>;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const templates = (data?.templates && data.templates.length > 0) 
    ? data.templates 
    : DEFAULT_TEMPLATES;

  // Generate wish mutation
  const generateMutation = useMutation({
    mutationFn: async (payload: BuilderState) => {
      setGenerationError("");
      const res = await fetch(`${API_URL}/api/v1/wishes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: payload.templateId,
          occasion: payload.occasion,
          content: {
            recipientName: payload.recipientName,
            senderName: payload.senderName,
            message: payload.message,
            photos: payload.photos,
          },
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to generate wish");
      }
      return res.json();
    },
    onSuccess: (data, variables) => {
      setGeneratedUrl(data.url);
      setStep("success");
      trackWishCreated({
        occasion: variables.occasion,
        template: variables.templateId,
      });
    },
    onError: (error) => {
      setGenerationError(error.message || "An error occurred while creating your Wishlet.");
    },
  });

  const updateState = (updates: Partial<BuilderState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = () => {
    generateMutation.mutate(state);
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    setStep("edit");
  };

  // Simple validation
  const isValid =
    state.occasion !== "" &&
    state.templateId !== "" &&
    state.recipientName.trim() !== "" &&
    state.senderName.trim() !== "" &&
    state.message.trim() !== "";

  // Compute current stepper step based on form progress
  let currentStepperStep = 1; // Default: Occasion
  if (state.occasion) currentStepperStep = 2; // Template
  if (state.templateId) currentStepperStep = 3; // Customize
  if (isValid) currentStepperStep = 4; // Share/Ready to generate
  if (step === "success") currentStepperStep = 5; // Done

  if (templatesLoading && !isError && templates.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-400">Loading builder...</div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden min-h-[60vh] flex">
          <GenerationSuccess url={generatedUrl} senderName={state.senderName} onReset={handleReset} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Top Header with Wishlet Brand & Return Home Link */}
      <header className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between z-20">
        <Link href="/" className="flex items-center gap-2 group" title="Return to Wishlet Home">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
            ✨
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:inline">Wishlet</span>
        </Link>

        <div className="flex-1 max-w-md mx-2">
          <BuilderStepper currentStep={Math.min(currentStepperStep, 4)} />
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden xs:inline">Home</span>
        </Link>
      </header>

      {/* Mobile Tab Toggle */}
      <div className="flex lg:hidden bg-slate-100 p-1 border-b border-slate-200">
        <button
          onClick={() => setMobileTab("edit")}
          className={`flex-1 py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "edit" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Edit3 size={14} />
          <span>Edit Form</span>
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "preview" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Eye size={14} />
          <span>Live Preview</span>
        </button>
      </div>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Form Column */}
        <section
          className={`w-full lg:w-[450px] xl:w-[500px] flex-shrink-0 bg-white border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 h-full overflow-y-auto flex flex-col ${
            mobileTab === "edit" ? "flex" : "hidden lg:flex"
          }`}
        >
          <CustomizationForm
            state={state}
            updateState={updateState}
            templates={templates}
            onGenerate={handleGenerate}
            isGenerating={generateMutation.isPending}
            isValid={isValid}
            generationError={generationError}
          />
        </section>

        {/* Live Preview Column */}
        <section
          className={`flex-1 bg-slate-100/50 items-center justify-center p-2 sm:p-4 lg:p-8 h-full overflow-y-auto ${
            mobileTab === "preview" ? "flex" : "hidden lg:flex"
          }`}
        >
          <LivePreview state={state} />
        </section>
      </main>
    </div>
  );
}

