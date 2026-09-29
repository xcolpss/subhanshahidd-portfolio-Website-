'use client';

import { useState } from 'react';

interface VideoCardProps {
  youtubeId: string;
  title: string;
  subtitle?: string;
  aspectRatio?: '16:9' | '9:16';
}

export default function VideoCard({
  youtubeId,
  title,
  subtitle,
  aspectRatio = '16:9',
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isVertical = aspectRatio === '9:16';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#141417] border border-neutral-800 hover:border-yellow-400/80 transition-all duration-300 group shadow-xl ${
        isVertical ? 'aspect-[9/16] w-full max-w-[280px]' : 'aspect-video w-full'
      }`}
    >
      {!isPlaying ? (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

          {/* Clean YouTube style play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-10 rounded-xl bg-red-600/90 group-hover:bg-red-600 flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-xl">
              <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <h4 className="text-white font-bold text-sm line-clamp-1 group-hover:text-yellow-400 transition-colors">
              {title}
            </h4>
            {subtitle && <p className="text-neutral-400 text-xs mt-0.5">{subtitle}</p>}
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      )}
    </div>
  );
}
