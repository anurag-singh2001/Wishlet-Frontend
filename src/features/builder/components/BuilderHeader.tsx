import React from "react";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import type { BuilderStep } from "../types";

interface BuilderHeaderProps {
  step: BuilderStep;
  onBack: () => void;
  onPreview: () => void;
}

const ICON_BTN =
  "flex h-11 w-11 items-center justify-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function BuilderHeader({ step, onBack, onPreview }: BuilderHeaderProps): React.ReactElement {
  return (
    <header className="safe-top border-b border-hairline bg-ground px-5 pb-3 pt-3">
      <div className="flex items-center justify-between">
        {step === 1 ? (
          <Link href="/" aria-label="Close" className={ICON_BTN}>
            <X size={22} aria-hidden="true" />
          </Link>
        ) : (
          <button type="button" aria-label="Back" onClick={onBack} className={ICON_BTN}>
            <ArrowLeft size={22} aria-hidden="true" />
          </button>
        )}
        <span className="text-sm font-bold text-[#4B4766]">Step {step} of 3</span>
        {step === 3 ? (
          <button
            type="button"
            onClick={onPreview}
            className="h-11 rounded-control px-3 text-[15px] font-bold text-brand focus-visible:outline-2 focus-visible:outline-brand lg:invisible"
          >
            Preview
          </button>
        ) : (
          <span className="w-11" aria-hidden="true" />
        )}
      </div>
      <div
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={1}
        aria-valuemax={3}
        aria-valuenow={step}
        className="mt-3 h-1.5 rounded-full bg-hairline"
      >
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
    </header>
  );
}
