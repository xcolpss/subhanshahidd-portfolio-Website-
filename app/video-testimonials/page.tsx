// app/video-testimonials/page.tsx
import { VIDEO_TESTIMONIALS, ytId } from '@/lib/video-testimonials';

export const metadata = {
  title: 'Video Testimonials — Subhan Shahid',
};

export default function AllVideoTestimonialsPage() {
  return (
    <section className="section">
      <div className="container-rl">
        <h1 className="h1 text-accent drop-shadow text-center">All Video Testimonials</h1>
        <p className="p-muted text-center mx-auto mt-3">
          Watch the full collection of short client videos.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEO_TESTIMONIALS.map((v) => {
            const id = ytId(v.yt);
            return (
              <a
                key={`${v.who}-${id}`}
                href={`https://www.youtube.com/watch?v=${id}`}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-2xl overflow-hidden border border-border hover:translate-y-[-2px] transition-transform"
              >
                <div className="relative aspect-video">
                  <img
                    src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                    alt={`${v.who} testimonial thumbnail`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="font-semibold text-ink">{v.who}</div>
                  {v.role && <div className="text-sm text-ink-muted">{v.role}</div>}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
