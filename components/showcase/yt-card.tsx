// components/showcase/yt-card.tsx
'use client';

import { useEffect, useId, useRef } from 'react';
import { ytId } from '@/lib/showcase';

type Props = {
  title: string;
  yt?: string;       // for videos/reels/3d
  img?: string;      // for photos/stills in /public
  meta?: string;
  tags?: string[];
  playingId?: string | null;
  onPlay?: (id: string) => void;
};

export default function YtCard(props: Props) {
  const { title, yt, img, meta, playingId, onPlay } = props;
  const id = useId();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Stop this player when another starts
  useEffect(() => {
    if (!yt || !iframeRef.current) return;
    if (playingId && playingId !== id) {
      try {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'stopVideo' }),
          '*'
        );
      } catch {}
    }
  }, [playingId, yt, id]);

  // ---- Photo (local image) ----
  if (img) {
    return (
      <article className="rounded-2xl overflow-hidden border border-border glass">
        <div className="relative aspect-[16/10] bg-black/10">
          <img
            src={img}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="font-semibold">{title}</div>
          {meta && <div className="text-sm text-ink-muted">{meta}</div>}
        </div>
      </article>
    );
  }

  // ---- YouTube (video/reel/3d) ----
  if (yt) {
    const yid = ytId(yt);
    const src = `https://www.youtube-nocookie.com/embed/${yid}?enablejsapi=1&rel=0&modestbranding=1`;

    return (
      <article className="rounded-2xl overflow-hidden border border-border glass">
        <div className="relative aspect-video">
          <iframe
            ref={iframeRef}
            className="absolute inset-0 h-full w-full"
            src={src}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => {
              // mark this as the active player when user interacts
              const node = iframeRef.current;
              if (!node) return;
              // Click → focus → play → set active
              node.addEventListener(
                'mouseenter',
                () => onPlay?.(id),
                { once: true }
              );
              node.addEventListener(
                'touchstart',
                () => onPlay?.(id),
                { passive: true, once: true }
              );
            }}
          />
        </div>
        <div className="p-4 flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold">{title}</div>
            {meta && <div className="text-sm text-ink-muted">{meta}</div>}
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${yid}`}
            target="_blank"
            className="btn btn-ghost"
          >
            Watch on YouTube
          </a>
        </div>
      </article>
    );
  }

  return null;
}
