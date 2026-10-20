"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BuilderStepper } from "./BuilderStepper";
import { CustomizationForm } from "./CustomizationForm";
import { LivePreview } from "./LivePreview";
import { GenerationSuccess } from "./GenerationSuccess";
import { MyWishes } from "./MyWishes";
import { MobileTabBar, type MobileTab } from "./MobileTabBar";
import { useTemplates } from "../hooks/use-templates";
import { useGenerateWish } from "../hooks/use-generate-wish";
import { getStepperStep, isBuilderValid } from "../lib/stepper";
import type { BuilderState, BuilderStep, ApiTemplate } from "../types";
import { trackCreateWishStarted } from "@/lib/analytics";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const INITIAL_STATE: BuilderState = {
  occasion: "",
  templateId: "",
  recipientName: "",
  senderName: "",
  message: "",
  photos: [],
};

const DEFAULT_TEMPLATES: ApiTemplate[] = [
  {
    id: "birthday-minimal",
    name: "Birthday Minimal",
    occasion: "birthday",
    description: "A clean, elegant birthday template.",
  },
  {
    id: "anniversary-elegant",
    name: "Elegant Anniversary",
    occasion: "anniversary",
    description: "An elegant template for anniversaries.",
  },
  {
    id: "thank-you-simple",
    name: "Simple Thank You",
    occasion: "thank-you",
    description: "A simple thank you template.",
  },
  {
    id: "congratulations-celebration",
    name: "Celebration",
    occasion: "congratulations",
    description: "A celebratory template.",
  },
  {
    id: "sorry-sincere",
    name: "Sincere Apology",
    occasion: "sorry",
    description: "A sincere apology template.",
  },
  {
    id: "birthday-neon",
    name: "Neon Party",
    occasion: "birthday",
    description: "Dark glow-in-the-night birthday card with neon type and pop-able balloons.",
  },
  {
    id: "anniversary-cinematic",
    name: "Cinematic",
    occasion: "anniversary",
    description:
      "A film-style anniversary with a slow Ken Burns photo, grain and a letterbox reveal.",
  },
  {
    id: "thank-you-botanical",
    name: "Botanical Thank You",
    occasion: "thank-you",
    description: "Hand-drawn vines and flowers bloom around a handwritten thank-you.",
  },
  {
    id: "congratulations-gold",
    name: "Black & Gold",
    occasion: "congratulations",
    description: "Luxe gold type, light rays and a golden confetti burst.",
  },
  {
    id: "sorry-rain-to-sun",
    name: "Rain to Sunshine",
    occasion: "sorry",
    description: "Soft rain clears into a warm sunrise as your apology appears.",
  },
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
  const [generated, setGenerated] = useState({ url: "", slug: "" });
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    trackCreateWishStarted();
  }, []);

  const { data, isLoading: templatesLoading, isError } = useTemplates();
  const templates =
    data?.templates && data.templates.length > 0 ? data.templates : DEFAULT_TEMPLATES;

  const {
    generate,
    isPending,
    error: generationError,
  } = useGenerateWish((created) => {
    setGenerated(created);
    setStep("success");
  });

  const updateState = (updates: Partial<BuilderState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = () => {
    setNotice("");
    generate(state);
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    setStep("edit");
  };

  const handleDeleted = () => {
    handleReset();
    setNotice("Your wish was deleted.");
  };

  const isValid = isBuilderValid(state);
  const currentStepperStep = getStepperStep(state, step);

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
          <GenerationSuccess
            url={generated.url}
            slug={generated.slug}
            senderName={state.senderName}
            onReset={handleReset}
            onDeleted={handleDeleted}
          />
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
          <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:inline">
            Wishlet
          </span>
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

      {notice && (
        <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-700 text-xs px-4 py-2 flex items-center justify-between">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <MyWishes />

      <MobileTabBar tab={mobileTab} onChange={setMobileTab} />

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
            isGenerating={isPending}
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
