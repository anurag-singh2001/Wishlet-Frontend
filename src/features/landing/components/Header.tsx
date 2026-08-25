import React from "react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            ✨
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Wishlet</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/build" className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-5 rounded-full transition-colors text-sm">
            Create a Wish
          </Link>
        </nav>
      </div>
    </header>
  );
}
