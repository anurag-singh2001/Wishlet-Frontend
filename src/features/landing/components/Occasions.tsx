import React from "react";
import Link from "next/link";

const occasions = [
  { id: "birthday", title: "Birthday", emoji: "🎂", color: "bg-orange-100 text-orange-600" },
  { id: "anniversary", title: "Anniversary", emoji: "💍", color: "bg-rose-100 text-rose-600" },
  { id: "thank-you", title: "Thank You", emoji: "🙏", color: "bg-emerald-100 text-emerald-600" },
  { id: "congratulations", title: "Congrats", emoji: "🎉", color: "bg-blue-100 text-blue-600" },
  { id: "sorry", title: "I'm Sorry", emoji: "🥺", color: "bg-purple-100 text-purple-600" },
];

export function Occasions() {
  return (
    <section className="py-20 px-6 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Perfect for every moment</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Whether it&apos;s a major milestone or just because, we have a beautiful template ready for you to customize.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {occasions.map((occ) => (
            <Link
              key={occ.id}
              href={`/build?occasion=${occ.id}`}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${occ.color} group-hover:scale-110 transition-transform`}>
                {occ.emoji}
              </div>
              <h3 className="font-semibold text-slate-900">{occ.title}</h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
