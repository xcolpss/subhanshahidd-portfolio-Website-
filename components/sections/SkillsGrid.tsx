'use client';

const SKILLS = [
  {
    name: 'Blender',
    hoverBorder: 'hover:border-[#EA7600] hover:text-[#EA7600]',
    svg: (
      <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
        <path d="M12.518 0a3.483 3.483 0 0 0-3.48 3.48c0 .248.026.49.076.723L3.738 6.425a3.482 3.482 0 0 0-2.22-.807A3.483 3.483 0 1 0 5 9.1a3.473 3.473 0 0 0-.25-1.284l5.37-2.22c.677.585 1.554.945 2.517.945a3.483 3.483 0 0 0 3.481-3.481A3.483 3.483 0 0 0 12.518 0zm.065 11.557c-3.834 0-6.943 3.11-6.943 6.943s3.11 6.943 6.943 6.943 6.943-3.11 6.943-6.943-3.11-6.943-6.943-6.943zm0 3.14a3.803 3.803 0 1 1 0 7.606 3.803 3.803 0 0 1 0-7.606z"/>
      </svg>
    ),
  },
  {
    name: 'DaVinci Resolve',
    hoverBorder: 'hover:border-[#DE4032] hover:text-[#DE4032]',
    svg: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="7.8" r="2.3" fill="currentColor" />
        <circle cx="8" cy="15.2" r="2.3" fill="currentColor" />
        <circle cx="16" cy="15.2" r="2.3" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Photoshop',
    hoverBorder: 'hover:border-[#31A8FF] hover:text-[#31A8FF]',
    svg: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8"/>
        <text x="5.5" y="16.5" fill="currentColor" fontSize="12" fontWeight="900" fontFamily="sans-serif">Ps</text>
      </svg>
    ),
  },
  {
    name: 'After Effects',
    hoverBorder: 'hover:border-[#9999FF] hover:text-[#9999FF]',
    svg: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8"/>
        <text x="4.5" y="16.5" fill="currentColor" fontSize="12" fontWeight="900" fontFamily="sans-serif">Ae</text>
      </svg>
    ),
  },
  {
    name: 'Premiere Pro',
    hoverBorder: 'hover:border-[#EA77FF] hover:text-[#EA77FF]',
    svg: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8"/>
        <text x="5" y="16.5" fill="currentColor" fontSize="12" fontWeight="900" fontFamily="sans-serif">Pr</text>
      </svg>
    ),
  },
  {
    name: 'Unreal Engine',
    hoverBorder: 'hover:border-white hover:text-white',
    svg: (
      <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.846A10.154 10.154 0 1 1 1.846 12 10.154 10.154 0 0 1 12 1.846zm-3.692 4.154v7.385c0 2.04 1.652 3.692 3.692 3.692s3.692-1.652 3.692-3.692V6h-2.307v7.385c0 .765-.62 1.384-1.385 1.384s-1.385-.62-1.385-1.384V6H8.308z"/>
      </svg>
    ),
  },
];

export default function SkillsGrid() {
  return (
    <section className="py-16 sm:py-20 px-6 max-w-7xl mx-auto border-t border-neutral-800/80">
      <h3 className="text-2xl sm:text-3xl font-black text-white mb-8">Skills</h3>
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-3 sm:gap-4">
        {SKILLS.map((s, idx) => (
          <div
            key={idx}
            className={`w-full sm:w-28 h-24 sm:h-28 rounded-2xl bg-[#141417] border border-neutral-800/90 flex flex-col items-center justify-center gap-2 text-neutral-400 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1 ${s.hoverBorder}`}
          >
            {s.svg}
            <span className="text-[10px] font-mono text-neutral-300 font-bold text-center line-clamp-1">
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
