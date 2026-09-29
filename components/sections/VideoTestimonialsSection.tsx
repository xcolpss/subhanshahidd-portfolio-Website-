'use client';

import { useRef } from 'react';
import Link from 'next/link';
import VideoCard from '@/components/ui/VideoCard';

export default function VideoTestimonialsSection({ videoTestimonials }: { videoTestimonials: any[] }) {
  const vtRef = useRef<HTMLDivElement>(null);

  const scrollVt = (direction: 'left' | 'right') => {
    if (vtRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      vtRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="video-testimonials" className="py-16 sm:py-24 bg-[#0e0e10] border-t border-neutral-800/80 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3.5 py-1.5 rounded-full border border-yellow-400/20">
            Verified Video Proof
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-3">
            VIDEO <span className="text-yellow-400">TESTIMONIALS.</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/video-testimonials"
            className="text-xs font-bold text-yellow-400 uppercase tracking-wider hover:underline"
          >
            Watch All &rarr;
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollVt('left')}
              className="w-11 h-11 rounded-2xl bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center hover:bg-yellow-400 hover:text-neutral-950 hover:border-yellow-400 transition-all shadow-lg font-bold text-lg cursor-pointer active:scale-95"
              aria-label="Scroll left"
            >
              &larr;
            </button>
            <button
              onClick={() => scrollVt('right')}
              className="w-11 h-11 rounded-2xl bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center hover:bg-yellow-400 hover:text-neutral-950 hover:border-yellow-400 transition-all shadow-lg font-bold text-lg cursor-pointer active:scale-95"
              aria-label="Scroll right"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={vtRef}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {videoTestimonials.map((vt) => (
            <div key={vt.id} className="w-[240px] sm:w-[280px] shrink-0" style={{ scrollSnapAlign: 'start' }}>
              <VideoCard
                youtubeId={vt.youtube_id}
                title={vt.client_name}
                subtitle={vt.company}
                aspectRatio="9:16"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
