// app/showcase/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import YtCard from '@/components/showcase/yt-card';
import { CLIPS, INTRO_YT, ytId } from '@/lib/showcase';

type CatKey = 'photo' | 'video' | '3d' | 'reel';

const FILTERS: { key: CatKey | 'all'; label: string }[] = [
  { key: 'all',   label: 'All' },
  { key: 'photo', label: 'Photos' },
  { key: 'video', label: 'Videos' },
  { key: '3d',    label: '3D / Unreal' },
  { key: 'reel',  label: 'Reels' },
];

const CATEGORIES: { key: CatKey; label: string }[] = [
  { key: 'photo', label: 'Photos' },
  { key: 'video', label: 'Videos' },
  { key: '3d',    label: '3D / Unreal' },
  { key: 'reel',  label: 'Reels' },
];

function hasTag(tags: string[] | undefined, k: CatKey) {
  const normalized = (tags ?? []).map((t) => (t === 'vfx' ? 'video' : t));
  return normalized.includes(k);
}

export default function ShowcasePage() {
  const [active, setActive] = useState<(typeof FILTERS)[number]['key']>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get('tab');
    if (tab && FILTERS.some((f) => f.key === tab)) setActive(tab as any);
  }, []);

  const introId = ytId(INTRO_YT);

  const groups = useMemo(() => {
    return CATEGORIES
      .map((cat) => ({
        ...cat,
        items: CLIPS.filter((c) => hasTag(c.tags, cat.key)),
      }))
      .filter((g) => g.items.length > 0);
  }, []);

  const filtered = useMemo(() => {
    if (active === 'all') return CLIPS;
    return CLIPS.filter((c) => hasTag(c.tags, active as CatKey));
  }, [active]);

  const activeLabel = FILTERS.find((f) => f.key === active)?.label ?? 'All';

  const switchFilter = (key: (typeof FILTERS)[number]['key']) => {
    setActive(key);
    setPlayingId(null); // stop currently playing video when switching filter
  };

  return (
    <section className="section">
      <div className="container-rl">
        {/* Intro reel */}
        <div className="h-card rounded-2xl overflow-hidden">
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${introId}?rel=0&modestbranding=1`}
              title="Intro Reel"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
              loading="lazy"
              allowFullScreen
            />
          </div>
          <div className="p-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[20px] md:text-[22px] font-semibold">Intro Reel 2025</h2>
              <p className="text-ink-muted text-sm">Video Editing • VFX/CGI • 3D</p>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${introId}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Watch on YouTube
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => switchFilter(f.key)}
              className={[
                'px-3 py-1.5 rounded-full border text-sm transition-colors',
                active === f.key
                  ? 'border-[rgba(255,200,0,.45)] bg-[rgba(255,200,0,.12)] text-accent'
                  : 'border-border bg-[rgba(255,255,255,.06)] text-ink-muted hover:text-ink',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* All → grouped with mobile snap rows; else → single list with snap on mobile */}
        {active === 'all' ? (
          <div className="mt-6 space-y-10">
            {groups.map((g) => (
              <section key={g.key} id={`cat-${g.key}`}>
                <h3 className="text-[22px] md:text-[26px] font-semibold mb-4">{g.label}</h3>

                {/* Mobile: horizontal snap row | Desktop: grid */}
                <div className="md:hidden -mx-4 px-4 snap-x snap-mandatory overflow-x-auto no-scrollbar space-x-4 flex">
                  {g.items.map((c, i) => (
                    <div key={`${g.key}-m-${i}`} className="snap-start shrink-0 w-[84vw] max-w-[420px]">
                      <YtCard
                        title={c.title}
                        yt={c.yt}
                        img={c.img}
                        meta={[c.client, c.role].filter(Boolean).join(' • ')}
                        tags={c.tags}
                        playingId={playingId}
                        onPlay={(id) => setPlayingId(id)}
                      />
                    </div>
                  ))}
                </div>

                <div className="hidden md:grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {g.items.map((c, i) => (
                    <YtCard
                      key={`${g.key}-${i}`}
                      title={c.title}
                      yt={c.yt}
                      img={c.img}
                      meta={[c.client, c.role].filter(Boolean).join(' • ')}
                      tags={c.tags}
                      playingId={playingId}
                      onPlay={(id) => setPlayingId(id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <h3 className="text-[22px] md:text-[26px] font-semibold mb-4">{activeLabel}</h3>

            {/* Mobile: horizontal snap row | Desktop: grid */}
            <div className="md:hidden -mx-4 px-4 snap-x snap-mandatory overflow-x-auto no-scrollbar space-x-4 flex">
              {filtered.map((c, i) => (
                <div key={`${active}-m-${i}`} className="snap-start shrink-0 w-[84vw] max-w-[420px]">
                  <YtCard
                    title={c.title}
                    yt={c.yt}
                    img={c.img}
                    meta={[c.client, c.role].filter(Boolean).join(' • ')}
                    tags={c.tags}
                    playingId={playingId}
                    onPlay={(id) => setPlayingId(id)}
                  />
                </div>
              ))}
            </div>

            <div className="hidden md:grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((c, i) => (
                <YtCard
                  key={`${active}-${i}`}
                  title={c.title}
                  yt={c.yt}
                  img={c.img}
                  meta={[c.client, c.role].filter(Boolean).join(' • ')}
                  tags={c.tags}
                  playingId={playingId}
                  onPlay={(id) => setPlayingId(id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
