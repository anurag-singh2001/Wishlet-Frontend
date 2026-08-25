import React from "react";
import { Sparkles, Edit3, Send } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Sparkles size={24} className="text-indigo-600" />,
      title: "Choose",
      description: "Select the occasion and pick from our collection of beautiful, animated templates.",
    },
    {
      icon: <Edit3 size={24} className="text-indigo-600" />,
      title: "Customize",
      description: "Add your personal message, recipient name, and an optional photo to make it yours.",
    },
    {
      icon: <Send size={24} className="text-indigo-600" />,
      title: "Share",
      description: "Generate a unique, public URL instantly and share it via WhatsApp, iMessage, or email.",
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">It&apos;s as easy as sending a text</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            But infinitely more memorable. Create a stunning digital experience in under a minute.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-100 -z-10" />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-indigo-100">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
