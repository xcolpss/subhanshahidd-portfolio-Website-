// app/reviews/page.tsx
import { REVIEWS } from '@/lib/reviews';
import { Quote } from 'lucide-react';

export const metadata = {
  title: 'Reviews — Subhan Shahid',
};

export default function ReviewsPage() {
  return (
    <section className="section">
      <div className="container-rl">
        <header className="text-center">
          <h1 className="h1 text-accent drop-shadow">Client Reviews</h1>
          <p className="p-muted mt-3 max-w-[62ch] mx-auto">
            Verified feedback from Upwork clients.
          </p>
        </header>

        <div className="mx-auto mt-6 mb-10 max-w-5xl hairline" />

        <div className="grid gap-6 md:gap-7 md:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <article
              key={i}
              className="relative rounded-2xl border border-border p-6 glass hover:translate-y-[-2px] transition-transform"
            >
              <div className="absolute left-5 top-5 text-ink-muted/70">
                <Quote size={20} />
              </div>
              <p className="mt-8 text-[15px] leading-7 text-ink">“{r.text}”</p>

              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[rgba(255,255,255,.06)] border border-border text-[13px]">
                  <span className="font-semibold text-ink-muted">{initials(r.who)}</span>
                </div>
                <div>
                  <div className="font-semibold text-ink">{r.who}</div>
                  {(r.role || r.source) && (
                    <div className="text-xs text-ink-muted">
                      {r.role ? `${r.role} • ` : ''}{r.source}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const chars = (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
  return chars.toUpperCase();
}
