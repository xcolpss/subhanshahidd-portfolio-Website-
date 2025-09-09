'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type Row = {
  id: string;
  title: string;
  blurb: string;
  chips: string[];
  tab: 'photo' | 'video' | '3d';
};

const ROWS: Row[] = [
  {
    id: '01',
    title: 'Photo Editing',
    blurb:
      'Commercial-grade retouching and color science for portraits, fashion & product campaigns.',
    chips: [
      'High-end retouch',
      'Beauty cleanup',
      'Advanced masking',
      'Compositing',
      'RAW workflow',
      'Look LUTs',
      'Product cleanup',
      'Shadow/reflect builds',
      'Delivery: PSD/TIFF',
    ],
    tab: 'photo',
  },
  {
    id: '02',
    title: 'Video Editing (incl. VFX/CGI)',
    blurb:
      'Story-first edits with motion graphics, mix, grade & VFX/CGI integration for ads, reels & trailers.',
    chips: [
      'Assembly→Final',
      'Story & pacing',
      'Motion graphics',
      'Sound design & mix',
      'Subtitles/captions',
      'Color grading',
      'Roto/Key/Track',
      'Compositing/CG',
      'Social crops 9:16/1:1/16:9',
      '4K ProRes/MP4, XML/EDL',
    ],
    tab: 'video',
  },
  {
    id: '03',
    title: '3D / Unreal Engine',
    blurb:
      'Product renders & real-time scenes—modeling, look-dev, lighting, animation & UE5 previz.',
    chips: [
      'Hard-surface modeling',
      'UVs & texturing',
      'Look-dev',
      'Lighting',
      'Animation',
      'Simulations',
      'PBR materials',
      'Product turntables',
      'UE5 real-time/previz',
      'Path-traced renders',
    ],
    tab: '3d',
  },
];

const OTHER = [
  'Brand packages',
  'Thumbnails',
  'Reels / Shorts',
  'YouTube edits',
  'Logo stings',
  'Motion titles',
  'Audio cleanup',
];

export default function Services() {
  return (
    <section className="section">
      <div className="container-rl">
        <h2 className="h1 text-center text-accent drop-shadow">My Quality Services</h2>
        <p className="p-muted text-center mx-auto mt-3">
          End-to-end post-production across <span className="text-ink">Photo</span>,{' '}
          <span className="text-ink">Video</span> & <span className="text-ink">3D</span> — on brand,
          on spec, on time.
        </p>

        <div className="mt-8 space-y-8">
          {ROWS.map((row) => (
            <Link
              key={row.id}
              href={`/showcase?tab=${row.tab}`}
              className="group block rounded-xl border border-border bg-[rgba(255,255,255,.04)] p-5 md:p-6 shadow-card hover:bg-[rgba(255,255,255,.06)] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {/* number pill (tilts back on hover) */}
                  <span className="num-pill mt-[2px] select-none"> {row.id} </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="h2">{row.title}</h3>

                      {/* animated arrow */}
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-[rgba(255,255,255,.05)] transition-all duration-300 group-hover:bg-accent group-hover:text-[#0a0e1a] group-hover:rotate-12">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>

                    <p className="p-muted mt-1">{row.blurb}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {row.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-lg border border-border px-2.5 py-1 text-xs text-ink-muted bg-[rgba(255,255,255,.04)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Other services back in */}
        <div className="mt-10">
          <div className="kicker">Other services</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {OTHER.map((c) => (
              <Link
                key={c}
                href="/showcase?tab=video"
                className="rounded-lg border border-border px-3 py-1.5 text-sm bg-[rgba(255,255,255,.05)] text-ink-muted hover:text-ink hover:bg-[rgba(255,255,255,.08)] transition-colors"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
