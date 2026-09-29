'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string;
  youtube_id?: string | null;
  live_url?: string | null;
}

export default function ShowcaseSection({ items }: { items: ShowcaseItem[] }) {
  const [filter, setFilter] = useState('ALL');
  const [activeItem, setActiveItem] = useState<ShowcaseItem | null>(null);

  const categories = ['ALL', ...Array.from(new Set(items.map((i) => i.category.toUpperCase())))];

  const filtered = filter === 'ALL'
    ? items
    : items.filter((i) => i.category.toUpperCase() === filter);

  return (
    <section id="showcase" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
            Selected Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-4">
            FEATURED <span className="text-yellow-400">WORKS.</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                filter === cat
                  ? 'bg-yellow-400 text-neutral-950 shadow-lg shadow-yellow-400/20'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => setActiveItem(item)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 hover:border-yellow-400/60 transition-all duration-500 cursor-pointer shadow-xl hover:-translate-y-1"
          >
            <Image
              src={item.thumbnail_url}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Hover Badge */}
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-neutral-950/80 border border-neutral-800 text-yellow-400 font-bold backdrop-blur-md">
                {item.category}
              </span>
            </div>

            {/* Card Details */}
            <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">Click to view full preview &rarr;</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center font-bold text-sm transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                ↗
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Video Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-black">
              {activeItem.youtube_id ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeItem.youtube_id}?autoplay=1&rel=0`}
                  title={activeItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <Image
                  src={activeItem.thumbnail_url}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <div className="p-6 flex items-center justify-between bg-neutral-950 border-t border-neutral-800">
              <div>
                <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest">{activeItem.category}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{activeItem.title}</h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold tracking-wider"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
