import Link from 'next/link';

export default function ShowcaseCTA() {
  return (
    <section className="section">
      <div className="container-rl">
        <div className="glass rounded-2xl p-6 md:p-8 text-center">
          <div className="kicker mb-1">See my showcase</div>
          <p className="p-muted mx-auto max-w-2xl">
            Browse hand-picked edits, VFX shots, and 3D scenes—all in one place.
          </p>
          <div className="mt-4 flex items-center justify-center">
            <Link href="/showcase" className="btn btn-primary">
              Open Showcase
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
