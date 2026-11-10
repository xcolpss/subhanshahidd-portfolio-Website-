"use client";

import { useRef } from "react";
import Link from "next/link";

interface Review {
  id: string;
  project_title?: string;
  client_name?: string;
  rating?: number;
  date_range?: string;
  review_text?: string;
  budget?: string;
  type?: string;
  endorsed?: string[];
}

export default function ClientReviewsSection({
  reviews,
}: {
  reviews: Review[];
}) {
  const reviewsRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: "left" | "right") => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 bg-[#121215] border-t border-neutral-800/80 scroll-mt-20 relative"
    >
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
            Read All Reviews →
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollReviews("left")}
              className="w-11 h-11 rounded-2xl bg-neutral-900 border border-neutral-700 text-white hover:bg-yellow-400 hover:text-neutral-950 transition-all font-bold text-lg"
              aria-label="Scroll left"
            >
              ←
            </button>

            <button
              onClick={() => scrollReviews("right")}
              className="w-11 h-11 rounded-2xl bg-neutral-900 border border-neutral-700 text-white hover:bg-yellow-400 hover:text-neutral-950 transition-all font-bold text-lg"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {reviews?.length > 0 ? (
          <div
            ref={reviewsRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {reviews.map((review) => {
              const rating = Math.max(
                0,
                Math.min(5, Number(review.rating) || 5),
              );

              const clientName = review.client_name || "Verified Client";

              return (
                <div
                  key={review.id}
                  className="w-[300px] sm:w-[380px] p-6 rounded-3xl bg-[#17171a] border border-neutral-800 flex flex-col justify-between shrink-0 shadow-2xl"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div>
                    <div className="text-yellow-400 text-xs sm:text-sm mb-3">
                      {"★".repeat(Math.floor(rating))}
                      {rating % 1 >= 0.5 ? "★" : ""}
                      <span className="text-neutral-500 ml-2">
                        {rating.toFixed(1)}/5
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-sm mb-2">
                      {review.project_title || "Client Project"}
                    </h3>

                    {review.review_text && (
                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
                        "{review.review_text}"
                      </p>
                    )}

                    {review.endorsed?.length ? (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {review.endorsed.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded"
                          >
                            ✓ {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-neutral-800">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-yellow-400 text-neutral-950 font-black text-xs flex items-center justify-center">
                        {clientName.slice(0, 2).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-white truncate">
                          {clientName}
                        </div>

                        <div className="text-[10px] text-neutral-500 truncate">
                          {review.date_range || "Completed"}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-white">
                        {review.budget || ""}
                      </div>
                      <div className="text-[9px] text-neutral-500">
                        {review.type || ""}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-neutral-500 text-sm py-8">
            Client reviews will appear here soon.
          </p>
        )}
      </div>
    </section>
  );
}
