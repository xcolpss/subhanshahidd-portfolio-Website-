const SERVICES = [
  {
    num: '01',
    title: 'Photo Editing',
    desc: 'Commercial-grade retouching and color science for portraits, fashion & product campaigns.',
    anchor: '#cat-photo',
    tags: [
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
  },
  {
    num: '02',
    title: 'Video Editing (incl. VFX/CGI)',
    desc: 'Story-first edits with motion graphics, mix, grade & VFX/CGI integration for ads, reels & trailers.',
    anchor: '#cat-video',
    tags: [
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
  },
  {
    num: '03',
    title: '3D / Unreal Engine',
    desc: 'Product renders & real-time scenes—modeling, look-dev, lighting, animation & UE5 previz.',
    anchor: '#cat-3d',
    tags: [
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
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="mb-14">
        <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3.5 py-1.5 rounded-full border border-yellow-400/30">
          Core Offerings
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
          SERVICES & <span className="text-yellow-400">CAPABILITIES.</span>
        </h2>
        <p className="text-neutral-400 text-sm mt-3">
          Click any card to jump directly to its works in the showcase below.
        </p>
      </div>

      <div className="space-y-6">
        {SERVICES.map((svc, idx) => (
          <a
            key={idx}
            href={svc.anchor}
            className="block p-8 sm:p-10 rounded-3xl bg-[#131316] border border-neutral-800/90 hover:border-yellow-400/80 transition-all duration-300 group shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-neutral-500 font-bold">{svc.num}</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-yellow-400 transition-colors flex items-center gap-2">
                {svc.title}
                <span className="text-sm px-2 py-0.5 rounded-md bg-neutral-800 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-neutral-950 transition-colors">
                  ↗
                </span>
              </h3>
            </div>

            <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
              {svc.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {svc.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-[#1a1a1e] border border-neutral-800 text-[11px] font-mono text-neutral-300 group-hover:border-neutral-700 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
