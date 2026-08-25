"use client";

import React from "react";
import { Check } from "lucide-react";

interface BuilderStepperProps {
  currentStep: number; // 1: Occasion, 2: Template, 3: Customize, 4: Share
}

export function BuilderStepper({ currentStep }: BuilderStepperProps) {
  const steps = [
    { id: 1, label: "Occasion" },
    { id: 2, label: "Template" },
    { id: 3, label: "Customize" },
    { id: 4, label: "Share" },
  ];

  return (
    <div className="w-full py-3 px-2 sm:px-4">
      <div className="flex items-center justify-between max-w-xl mx-auto relative">
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0"></div>
        <div 
          className="absolute left-4 top-1/2 -translate-y-1/2 h-[2px] bg-indigo-600 z-0 transition-all duration-300"
          style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 2rem)` }}
        ></div>

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                  isCompleted
                    ? "bg-indigo-600 text-white"
                    : isCurrent
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                    : "bg-white text-slate-400 border-2 border-slate-200"
                }`}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : step.id}
              </div>
              <span
                className={`text-[10px] sm:text-xs font-medium whitespace-nowrap mt-1 transition-colors duration-300 ${
                  isCurrent || isCompleted ? "text-slate-900 font-semibold" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

