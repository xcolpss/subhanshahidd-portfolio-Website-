'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { VIDEO_TESTIMONIALS, TestimonialVideo, ytId } from '@/lib/video-testimonials';

/**
 * Layout: 3 cards across (left preview, center featured, right preview),
 * smooth directional slide (like your text reviews),
 * center is slightly larger + highlighted,
 * small, professional play button (no pulsing/yellow),
 * “Watch on YouTube” link on each card.
 */

const SIDE_W = 'w-[min(92vw,380px)]';
const CENTER_W = 'w-[min(92vw,640px)]';

/** direction-aware slide variants */
const variants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'tween', duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.99,
    transition: { type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function VideoTestimonials() {
  const total = VIDEO_TESTIMONIALS.length;

  // middle-ish to start
  const [index, setIndex] = useState(1);
  const [playing, setPlaying] = useState<number | null>(null);

  // direction (+1 going right → new center comes from right; -1 opposite)
  const last = useRef(index);
  const direction: 1 | -1 | 0 = index === last.current ? 0 : index > last.current ? 1 : -1;
  last.current = index;

  const prevIdx = useMemo(() => (index + total - 1) % total, [index, total]);
  const nextIdx = useMemo(() => (index + 1) % total, [index, total]);

  const goPrev = () => {
    setPlaying(null);
    setIndex((i) => (i + total - 1) % total);
  };
  const goNext = () => {
    setPlaying(null);
    setIndex((i) => (i + 1) % total);
  };

  return (
    <section id="video-testimonials" className="section">
      <div className="container-rl">
        <header className="text-center">
          <h2 className="h1 text-accent drop-shadow">Video Testimonials</h2>
          <p className="p-muted mt-3 max-w-[62ch] mx-auto">
            Watch what our clients say—short, clear, and powerful.
          </p>
        </header>

        <div className="mx-auto mt-6 mb-8 max-w-5xl hairline" />

        {/* track */}
        <div className="relative">
          <div className="flex items-stretch justify-center gap-6 md:gap-8">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {/* left preview */}
              <motion.div
                key={`left-${prevIdx}`}
                className={`hidden md:block ${SIDE_W}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                onClick={() => {
                  setPlaying(null);
                  setIndex(prevIdx);
                }}
              >
                <SideCard clip={VIDEO_TESTIMONIALS[prevIdx]} />
              </motion.div>

              {/* center featured */}
              <motion.div
                key={`center-${index}`}
                className={CENTER_W}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <CenterCard
                  clip={VIDEO_TESTIMONIALS[index]}
                  playing={playing === index}
                  onPlay={() => setPlaying(index)}
                />
              </motion.div>

              {/* right preview */}
              <motion.div
                key={`right-${nextIdx}`}
                className={`hidden md:block ${SIDE_W}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                onClick={() => {
                  setPlaying(null);
                  setIndex(nextIdx);
                }}
              >
                <SideCard clip={VIDEO_TESTIMONIALS[nextIdx]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* controls shared with text testimonials */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button onClick={goPrev} aria-label="Previous" className="testi-nav">
              <ChevronLeft size={20} />
            </button>
            <button onClick={goNext} aria-label="Next" className="testi-nav">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mx-auto mt-10 mb-6 max-w-5xl hairline" />

          <div className="text-center">
            <Link href="/video-testimonials" className="btn btn-ghost">
              View all video testimonials
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================== Cards ====================== */

function CenterCard({
  clip,
  playing,
  onPlay,
}: {
  clip: TestimonialVideo;
  playing: boolean;
  onPlay: () => void;
}) {
  const id = ytId(clip.yt);
  return (
    <article className="rounded-2xl overflow-hidden border border-border glass glass--active ring-1 ring-[var(--accent)]/28 shadow-[0_26px_76px_rgba(0,0,0,.5),0_24px_80px_rgba(255,200,0,.08)]">
      <div className="relative aspect-video">
        {/* subtle top-right link */}
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noreferrer"
          className="absolute right-3 top-3 z-20 rounded-full bg-black/45 text-white/90 hover:text-white backdrop-blur px-2.5 py-1.5 text-xs inline-flex items-center gap-1 border border-white/15"
        >
          <ExternalLink size={14} /> Watch on YouTube
        </a>

        {playing ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={`${clip.who} testimonial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            onClick={onPlay}
            aria-label={`Play ${clip.who}`}
            className="group relative h-full w-full"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={`${clip.who} testimonial thumbnail`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {/* subtle vignette for readability */}
            <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_90%,rgba(0,0,0,.45),transparent)]" />
            {/* professional minimal play */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white/92 text-black shadow-[0_10px_30px_rgba(0,0,0,.25)] ring-1 ring-black/10">
                <Play size={22} className="translate-x-[1px]" />
              </div>
            </div>
          </button>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="text-lg font-semibold text-ink">{clip.who}</div>
        {clip.role && <div className="text-sm text-ink-muted mt-0.5">{clip.role}</div>}
      </div>
    </article>
  );
}

function SideCard({ clip }: { clip: TestimonialVideo }) {
  const id = ytId(clip.yt);
  return (
    <article className="rounded-2xl overflow-hidden border border-border glass hover:translate-y-[-2px] transition-transform cursor-pointer">
      <div className="relative aspect-video">
        <img
          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt={`${clip.who} testimonial thumbnail`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* soft dim so center pops more */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/18 to-transparent" />
        {/* small corner link icon */}
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noreferrer"
          className="absolute right-3 top-3 z-10 rounded-full bg-black/45 text-white/90 hover:text-white backdrop-blur px-2 py-1 text-[11px] inline-flex items-center gap-1 border border-white/15"
        >
          <ExternalLink size={12} /> YouTube
        </a>
      </div>
      <div className="p-4">
        <div className="font-semibold text-ink">{clip.who}</div>
        {clip.role && <div className="text-sm text-ink-muted">{clip.role}</div>}
      </div>
    </article>
  );
}
