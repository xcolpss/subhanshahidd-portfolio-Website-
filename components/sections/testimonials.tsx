'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS, type ReviewItem } from '@/lib/reviews';

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll by exactly one snap (one card width)
  const scrollByOne = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    // Each snap equals container width on mobile (1-up) or 1/3 of it on md+ (3-up).
    const containerW = el.clientWidth;
    const isWide = window.matchMedia('(min-width: 768px)').matches;
    const step = isWide ? containerW / 3 : containerW;

    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="section">
      <div className="container-rl">
        <header className="text-center">
          <h2 className="h1 text-accent drop-shadow">What Our Clients Say</h2>
          <p className="p-muted mt-3 max-w-[62ch] mx-auto">
            Don’t just take our word for it — hear from satisfied clients.
          </p>
        </header>

        <div className="mx-auto mt-6 mb-8 max-w-5xl hairline" />

        {/* Track */}
        <div className="relative">
          <div
            ref={trackRef}
            className="
              no-scrollbar overflow-x-auto
              snap-x snap-mandatory
              flex gap-6 md:gap-7
              scroll-smooth
              px-1
            "
          >
            {REVIEWS.map((item, i) => (
              <div
                key={i}
                className="
                  snap-start shrink-0
                  w-[min(92vw,680px)] md:w-[calc((100%-2*1.75rem)/3)] 
                  /* md: width = (container - two gaps)/3 to show 3 cards exactly */
                "
              >
                <ReviewCard item={item} />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => scrollByOne(-1)}
              aria-label="Previous"
              className="testi-nav"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollByOne(1)}
              aria-label="Next"
              className="testi-nav"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mx-auto mt-10 mb-6 max-w-5xl hairline" />

          <div className="text-center">
            <Link href="/reviews" className="btn btn-ghost">See all reviews</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Card ---------- */

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <article className="relative rounded-2xl border border-border p-6 glass h-full">
      <div className="absolute left-5 top-5 text-ink-muted/70">
        <Quote size={22} />
      </div>

      <p className="mt-8 text-[15px] leading-7 text-ink">
        “{item.text}”
      </p>

      <div className="mt-5 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[rgba(255,255,255,.06)] border border-border text-[13px]">
          <span className="font-semibold text-ink-muted">{initials(item.who)}</span>
        </div>
        <div>
          <div className="font-semibold text-ink">{item.who}</div>
          {(item.role || item.source) && (
            <div className="text-xs text-ink-muted">
              {item.role ? `${item.role} • ` : ''}{item.source}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const chars = (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
  return chars.toUpperCase();
}
