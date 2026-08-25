"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { templateRegistry } from "@/features/templates/registry";
import { TemplateRenderer } from "@/features/templates/components/TemplateRenderer";

const templatesList = Object.values(templateRegistry);

const DEMO_IMAGES: Record<string, string> = {
  birthday: "/demo/birthday.jpg",
  anniversary: "/demo/anniversary.jpg",
  "thank-you": "/demo/thank-you.jpg",
  congratulations: "/demo/congrats.jpg",
  sorry: "/demo/sorry.jpg",
};

const DEMO_MESSAGES: Record<string, string> = {
  birthday: "Happy birthday! Here's to another beautiful year. ❤️",
  anniversary: "Here's to all the moments we've shared. ❤️",
  "thank-you": "Some people make life a little brighter. Thank you.",
  congratulations: "You did it! Here's to everything ahead. 🎉",
  sorry: "I'm sorry. Some things are better said from the heart.",
};

const getDemoWishData = (occasion: string) => ({
  recipientName: "Alex",
  senderName: "Someone special",
  message: DEMO_MESSAGES[occasion] || "For someone special on a special day. ❤️",
  occasion,
  photos: [DEMO_IMAGES[occasion] || "/demo/birthday.jpg"],
  content: {},
});


export function TemplateShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeTemplate = templatesList[currentIndex] || templatesList[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? templatesList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === templatesList.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Explore the templates
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base sm:text-lg">
            See how your Wishlet will look and animate before you create it.
          </p>
        </div>

        {/* Template Selector Pills (Horizontally scrollable on mobile) */}
        <div className="w-full overflow-x-auto pb-4 mb-6 scrollbar-none">
          <div role="tablist" aria-label="Template selection" className="flex items-center justify-start sm:justify-center gap-2 min-w-max px-2 mx-auto">
            {templatesList.map((tpl, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={tpl.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {tpl.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Template Preview Container with Browser Frame */}
        <div className="relative max-w-4xl mx-auto bg-slate-900 rounded-3xl p-2 sm:p-4 shadow-2xl overflow-hidden border border-slate-800">
          {/* Top Control Bar (Neutral Browser UI) */}
          <div className="flex items-center justify-between px-3 py-2 text-slate-400 text-xs sm:text-sm mb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              <span className="ml-2 font-medium text-slate-400 text-xs">
                Wishlet Preview
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700 capitalize">
                {activeTemplate.occasion.replace("-", " ")}
              </span>
              <span className="text-slate-500 text-xs italic hidden xs:inline">
                Tap card to open
              </span>
            </div>
          </div>

          {/* Interactive Preview Viewport (Only active template rendered) */}
          <div className="relative w-full h-[480px] sm:h-[540px] bg-slate-950 rounded-2xl overflow-y-auto overflow-x-hidden shadow-inner">
            <TemplateRenderer 
              key={activeTemplate.id} 
              templateId={activeTemplate.id} 
              props={getDemoWishData(activeTemplate.occasion)} 
            />
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous template"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 flex items-center justify-center backdrop-blur-md transition-transform active:scale-95 z-30 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next template"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 flex items-center justify-center backdrop-blur-md transition-transform active:scale-95 z-30 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bottom Conversion Bar: Details, Pagination & CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
                <span className="font-bold text-slate-900 text-base sm:text-lg">{activeTemplate.name}</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-indigo-100 text-indigo-700 capitalize">
                  {activeTemplate.occasion.replace("-", " ")}
                </span>
              </div>
              <p className="text-xs text-slate-500">{activeTemplate.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Pagination Indicators */}
            <div className="hidden md:flex items-center gap-1.5" aria-label="Carousel pagination">
              {templatesList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to template ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    idx === currentIndex ? "w-6 bg-indigo-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Conversion CTA Button */}
            <Link
              href={`/build?occasion=${activeTemplate.occasion}&template=${activeTemplate.id}`}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span>Create this Wish</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
