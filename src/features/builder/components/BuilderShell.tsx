"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Sheet } from "@/components/ui";
import { trackCreateWishStarted } from "@/lib/analytics";
import { useTemplates } from "../hooks/use-templates";
import { useGenerateWish } from "../hooks/use-generate-wish";
import { DEFAULT_TEMPLATES, OCCASIONS, templatesFor } from "../lib/occasions";
import { validateDetails } from "../lib/validation";
import type { ApiTemplate, BuilderState, BuilderStep } from "../types";
import { BuilderHeader } from "./BuilderHeader";
import { LivePreview } from "./LivePreview";
import { StepDesign } from "./StepDesign";
import { StepDetails } from "./StepDetails";
import { StepOccasion } from "./StepOccasion";
import { SuccessScreen } from "./SuccessScreen";

const INITIAL_STATE: BuilderState = {
  occasion: "",
  templateId: "",
  recipientName: "",
  senderName: "",
  message: "",
  photos: [],
  reactionsEnabled: true,
};

const NEXT_LABEL: Record<BuilderStep, string> = {
  1: "Next: choose a design",
  2: "Next: add your words",
  3: "Create my wish",
};

export function BuilderShell(): React.ReactElement {
  const searchParams = useSearchParams();
  const occasionParam = searchParams.get("occasion") ?? "";
  const deepLinked = OCCASIONS.some((o) => o.id === occasionParam);

  // The bundled list renders immediately; the API (which may be waking from sleep) only refines it.
  const { data } = useTemplates();
  const templates: ApiTemplate[] = data?.templates?.length ? data.templates : DEFAULT_TEMPLATES;

  const [step, setStep] = useState<BuilderStep>(deepLinked ? 2 : 1);
  const [state, setState] = useState<BuilderState>(() => {
    if (!deepLinked) return INITIAL_STATE;
    const wanted = searchParams.get("template");
    const options = templatesFor(DEFAULT_TEMPLATES, occasionParam);
    const chosen = options.find((t) => t.id === wanted) ?? options[0];
    return { ...INITIAL_STATE, occasion: occasionParam, templateId: chosen?.id ?? "" };
  });
  const [attempted, setAttempted] = useState(false);
  const [stepError, setStepError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [created, setCreated] = useState<{
    url: string;
    slug: string;
    expiresAt?: string;
  } | null>(null);

  useEffect(() => {
    trackCreateWishStarted();
  }, []);

  const { generate, isPending, error: generationError } = useGenerateWish(setCreated);

  const update = useCallback((updates: Partial<BuilderState>): void => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const selectOccasion = (occasion: string): void => {
    const first = templatesFor(templates, occasion)[0];
    // Changing occasion always resets the design to that occasion's first template.
    update({ occasion, templateId: first?.id ?? "" });
    setStepError("");
  };

  const errors = attempted ? validateDetails(state) : {};

  const goNext = (): void => {
    setStepError("");
    if (step === 1) {
      if (!state.occasion) return setStepError("Pick an occasion to continue");
      return setStep(2);
    }
    if (step === 2) {
      if (!state.templateId) return setStepError("Pick a design to continue");
      return setStep(3);
    }
    setAttempted(true);
    if (Object.keys(validateDetails(state)).length > 0) return;
    generate(state);
  };

  const reset = (): void => {
    setState(INITIAL_STATE);
    setStep(1);
    setAttempted(false);
    setCreated(null);
  };

  if (created) {
    return (
      <SuccessScreen
        url={created.url}
        slug={created.slug}
        expiresAt={created.expiresAt}
        state={state}
        onReset={reset}
        onDeleted={reset}
      />
    );
  }

  return (
    <div className="mx-auto flex h-dvh max-w-[1200px] bg-ground">
      <div className="flex h-full w-full flex-col lg:max-w-[560px] lg:border-r lg:border-hairline">
        <BuilderHeader
          step={step}
          onBack={() => setStep((s) => (s > 1 ? ((s - 1) as BuilderStep) : s))}
          onPreview={() => setPreviewOpen(true)}
        />
        <main className="flex-1 overflow-y-auto px-5 py-6">
          {step === 1 ? (
            <StepOccasion value={state.occasion} templates={templates} onSelect={selectOccasion} />
          ) : step === 2 ? (
            <StepDesign
              occasion={state.occasion}
              templateId={state.templateId}
              recipientName={state.recipientName}
              templates={templates}
              onSelect={(templateId) => update({ templateId })}
            />
          ) : (
            <StepDetails
              state={state}
              errors={errors}
              update={update}
              onUploadingChange={setUploading}
            />
          )}
        </main>
        <footer className="safe-bottom border-t border-hairline bg-surface px-5 pb-6 pt-4">
          {(stepError || generationError) && (
            <p role="alert" className="mb-2 text-center text-[13px] font-medium text-danger">
              {stepError || generationError}
            </p>
          )}
          <Button size="lg" fullWidth loading={isPending} disabled={uploading} onClick={goNext}>
            {uploading ? "Uploading..." : NEXT_LABEL[step]}
          </Button>
        </footer>
      </div>

      <aside className="hidden flex-1 items-center justify-center bg-brand-soft p-8 lg:flex">
        <LivePreview state={state} />
      </aside>

      <Sheet open={previewOpen} onClose={() => setPreviewOpen(false)} title="Preview">
        <div className="h-[70dvh]">
          <LivePreview state={state} fill />
        </div>
        <div className="mt-3">
          <Button variant="secondary" fullWidth onClick={() => setPreviewOpen(false)}>
            Close preview
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
