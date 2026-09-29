'use client';

import { useRef } from 'react';
import Link from 'next/link';

export default function ClientReviewsSection({ reviews }: { reviews: any[] }) {
  const reviewsRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: 'left' | 'right') => {
    if (reviewsRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      reviewsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-[#121215] border-t border-neutral-800/80 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3.5 py-1.5 rounded-full border border-yellow-400/20">
            Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-3">
            CLIENT <span className="text-yellow-400">REVIEWS.</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/reviews"
            className="text-xs font-bold text-yellow-400 uppercase tracking-wider hover:underline"
          >
            Read All Reviews &rarr;
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollReviews('left')}
              className="w-11 h-11 rounded-2xl bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center hover:bg-yellow-400 hover:text-neutral-950 hover:border-yellow-400 transition-all shadow-lg font-bold text-lg cursor-pointer active:scale-95"
              aria-label="Scroll left"
            >
              &larr;
            </button>
            <button
              onClick={() => scrollReviews('right')}
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
          ref={reviewsRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="w-[300px] sm:w-[380px] p-6 rounded-3xl bg-[#17171a] border border-neutral-800 flex flex-col justify-between shrink-0 shadow-2xl"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div>
                <div className="text-yellow-400 text-xs sm:text-sm mb-3">{"★".repeat(review.rating || 5)}</div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">"{review.review_text}"</p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-neutral-950 font-black text-xs flex items-center justify-center">
                  {review.client_name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">{review.client_name}</div>
                  <div className="text-[10px] sm:text-xs text-neutral-500">{review.client_role} {review.company ? `• ${review.company}` : ''}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
