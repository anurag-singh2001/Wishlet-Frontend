import React from "react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-50 to-white rounded-[100%] blur-3xl -z-10 opacity-70" />
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-8 border border-indigo-100">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
          Make someone&apos;s day special
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Don&apos;t just send a text. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Send an experience.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Create beautiful, personalized, animated web pages for the people you care about. Ready in seconds, remembered forever.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/build" 
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            Create a Wish — It&apos;s Free
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <a 
            href="#how-it-works"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 text-lg font-medium py-4 px-8 rounded-full border border-slate-200 transition-colors flex items-center justify-center"
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}
