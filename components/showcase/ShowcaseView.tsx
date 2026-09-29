'use client';

import { useState, useMemo, useEffect } from 'react';

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string;
  youtube_id?: string | null;
  live_url?: string | null;
}

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'photo', label: 'Photos' },
  { key: 'video', label: 'Videos' },
  { key: '3d', label: '3D / Unreal' },
  { key: 'reel', label: 'Reels' },
];

export default function ShowcaseSection({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [modalImg, setModalImg] = useState<string | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['cat-photo', 'cat-video', 'cat-3d', 'cat-reel'].includes(hash)) {
        setActive(hash.replace('cat-', ''));
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const groups = useMemo(() => {
    return [
      { key: 'photo', label: 'Photos', items: items.filter((i) => i.category.toLowerCase().includes('photo')) },
      { key: 'video', label: 'Videos', items: items.filter((i) => i.category.toLowerCase() === 'videos') },
      { key: '3d', label: '3D / Unreal', items: items.filter((i) => i.category.toLowerCase().includes('3d') || i.category.toLowerCase().includes('unreal')) },
      { key: 'reel', label: 'Reels', items: items.filter((i) => i.category.toLowerCase().includes('reel')) },
    ].filter((g) => g.items.length > 0);
  }, [items]);

  const filtered = useMemo(() => {
    if (active === 'all') return items;
    return items.filter((i) => {
      const c = i.category.toLowerCase();
      if (active === 'photo') return c.includes('photo');
      if (active === 'video') return c === 'videos';
      if (active === '3d') return c.includes('3d') || c.includes('unreal');
      if (active === 'reel') return c.includes('reel');
      return true;
    });
  }, [active, items]);

  const renderCard = (item: ShowcaseItem, isReel: boolean) => {
    const isPlaying = playingId === item.id;
    const thumb = item.thumbnail_url || (item.youtube_id ? `https://i.ytimg.com/vi/${item.youtube_id}/hqdefault.jpg` : '/photos/p01.jpg');

    return (
      <div
        key={item.id}
        className={`group relative rounded-2xl overflow-hidden bg-[#161619] border border-neutral-800/80 hover:border-yellow-400/80 transition-all duration-300 shadow-xl ${
          isReel ? 'aspect-[9/16] w-full max-w-[210px] mx-auto' : 'aspect-video w-full'
        }`}
      >
        {!isPlaying ? (
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={() => {
              if (item.youtube_id) {
                setPlayingId(item.id);
              } else {
                setModalImg(thumb);
              }
            }}
          >
            <img
              src={thumb}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/15 transition-colors" />

            {item.youtube_id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-7 sm:w-12 sm:h-8 rounded-lg bg-red-600/90 group-hover:bg-red-600 flex items-center justify-center text-white font-bold shadow-lg transition-transform group-hover:scale-110">
                  <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent">
              <h4 className="text-white font-bold text-xs sm:text-sm line-clamp-1 group-hover:text-yellow-400 transition-colors">
                {item.title}
              </h4>
              <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-widest">{item.category}</span>
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtube_id}?autoplay=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        )}
      </div>
    );
  };

  return (
    <section id="showcase" className="py-20 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* INTRO REEL BANNER */}
      <div className="mb-14 sm:mb-16 rounded-3xl overflow-hidden bg-[#161619] border border-neutral-800 p-3 sm:p-6 shadow-2xl">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
          <iframe
            src="https://www.youtube-nocookie.com/embed/QLIgdqbA7rc?rel=0&modestbranding=1"
            title="Intro Reel 2025"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Intro Reel 2025</h2>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">Video Editing • VFX/CGI • 3D</p>
          </div>
          <a
            href="https://www.youtube.com/watch?v=QLIgdqbA7rc"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-bold text-neutral-200 hover:border-yellow-400 hover:text-yellow-400 transition-all self-start sm:self-auto"
          >
            Watch on YouTube ↗
          </a>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {CATEGORIES.map((f) => (
          <button
            key={f.key}
            onClick={() => {
              setActive(f.key);
              setPlayingId(null);
            }}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 ${
              active === f.key
                ? 'bg-yellow-400 text-neutral-950 shadow-lg shadow-yellow-400/20'
                : 'bg-[#18181b] text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* RENDER CATEGORIES */}
      {active === 'all' ? (
        <div className="space-y-16">
          {groups.map((g) => {
            const isReelGroup = g.key === 'reel';
            return (
              <div key={g.key} id={`cat-${g.key}`} className="scroll-mt-28">
                <h3 className="text-xl sm:text-2xl font-black text-white mb-5 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  {g.label}
                </h3>

                {/* Horizontal scroll snap track on mobile or compact desktop */}
                {isReelGroup ? (
                  <div className="overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 flex gap-4 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:overflow-visible">
                    {g.items.map((item) => (
                      <div key={item.id} className="shrink-0 w-[180px] sm:w-auto">
                        {renderCard(item, true)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="md:hidden -mx-4 px-4 snap-x snap-mandatory overflow-x-auto no-scrollbar space-x-4 flex pb-2">
                      {g.items.map((item) => (
                        <div key={item.id} className="snap-start shrink-0 w-[84vw] max-w-[380px]">
                          {renderCard(item, false)}
                        </div>
                      ))}
                    </div>
                    <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {g.items.map((item) => renderCard(item, false))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="scroll-mt-28">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            {CATEGORIES.find((c) => c.key === active)?.label}
          </h3>

          {active === 'reel' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filtered.map((item) => renderCard(item, true))}
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => renderCard(item, false))}
            </div>
          )}
        </div>
      )}

      {/* FULL-IMAGE MODAL */}
      {modalImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalImg(null)}
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
            <img src={modalImg} alt="Preview" className="max-w-full max-h-[80vh] object-contain rounded-2xl" />
            <button
              onClick={() => setModalImg(null)}
              className="mt-4 px-6 py-2 rounded-full bg-neutral-900 border border-neutral-700 text-white text-xs font-bold hover:border-yellow-400"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
