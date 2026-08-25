import React from "react";
import { Header } from "@/features/landing/components/Header";
import { Hero } from "@/features/landing/components/Hero";
import { TemplateShowcase } from "@/features/landing/components/TemplateShowcase";
import { Occasions } from "@/features/landing/components/Occasions";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { Footer } from "@/features/landing/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Wishlet - Send an experience",
  description: "Create beautiful, personalized, animated web pages for the people you care about. Ready in seconds, remembered forever.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <TemplateShowcase />
        <Occasions />
        <HowItWorks />

        
        {/* Secondary CTA Section */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Ready to make them smile?</h2>
            <p className="text-xl text-slate-300 mb-10 relative z-10 max-w-xl mx-auto">
              Join others who have transformed their wishes into unforgettable digital moments.
            </p>
            <Link 
              href="/build" 
              className="inline-flex bg-white hover:bg-slate-100 text-slate-900 text-lg font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 active:scale-95 relative z-10"
            >
              Start Creating Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
