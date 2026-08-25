import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12 px-6 text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-white text-xs">
            ✨
          </div>
          <span className="font-bold text-white tracking-tight">Wishlet</span>
        </div>
        
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Wishlet. Designed for moments that matter.
        </p>
        
        <div className="flex gap-6 text-sm">
          <Link href="/build" className="hover:text-white transition-colors">Create a Wish</Link>
          <a href="https://github.com/wishlet/wishlet" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
