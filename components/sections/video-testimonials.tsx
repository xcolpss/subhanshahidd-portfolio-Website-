"use client";

import { useState } from "react";

export interface VideoTestimonial {
  id: string;
  client_name: string;
  company?: string | null;
  youtube_id: string;
}

export default function VideoTestimonialsSection({
  videoTestimonials,
}: {
  videoTestimonials: VideoTestimonial[];
}) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!videoTestimonials?.length) return null;

  return (
    <section
      id="video-testimonials"
      className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      <div className="mb-12">
        <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
          Video Endorsements
        </span>

        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-4">
          VIDEO <span className="text-yellow-400">TESTIMONIALS.</span>
        </h2>

        <p className="text-neutral-400 text-xs sm:text-sm mt-2">
          Direct feedback from creators and founders on delivered projects and
          production workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videoTestimonials.map((vt) => {
          const isPlaying = playingId === vt.id;

          return (
            <div
              key={vt.id}
              className="group relative rounded-3xl overflow-hidden bg-[#141417] border border-neutral-800/80 hover:border-yellow-400/60 transition-all duration-300 shadow-2xl aspect-[9/16] w-full max-w-[320px] mx-auto"
            >
              {!isPlaying ? (
                <button
                  type="button"
                  aria-label={`Play testimonial from ${vt.client_name}`}
                  onClick={() => setPlayingId(vt.id)}
                  className="w-full h-full relative text-left cursor-pointer"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${vt.youtube_id}/hqdefault.jpg`}
                    alt={vt.client_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-90" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-neutral-950 flex items-center justify-center font-bold text-lg shadow-xl group-hover:scale-110 transition-transform">
                      ▶
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">
                      Verified Client
                    </span>

                    <h4 className="text-white font-bold text-base mt-2">
                      {vt.client_name}
                    </h4>

                    <p className="text-xs font-mono text-neutral-400">
                      {vt.company}
                    </p>
                  </div>
                </button>
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${vt.youtube_id}?autoplay=1&rel=0`}
                  title={vt.client_name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
