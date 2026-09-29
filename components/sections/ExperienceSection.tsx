export default function ExperienceSection() {
  const experiences = [
    {
      period: '2020 - 2021',
      title: 'Senior Graphic Designer',
      place: 'Gethreem Rawalpindi',
    },
    {
      period: '2021 - 2022',
      title: 'UI Department Head',
      place: 'Rubrics/Bahria Town ph7',
    },
    {
      period: '2015 - Present',
      title: 'Techno World / Rawalpindi',
      place: 'Owner & Operations Manager',
    },
  ];

  const education = [
    {
      period: '2017 - 2020',
      title: 'O - Levels',
      place: 'Benchmark College',
    },
    {
      period: '2020 - 2023',
      title: 'A - Levels',
      place: 'Benchmark College',
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-800/80 scroll-mt-20">
      <div className="mb-14">
        <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3.5 py-1.5 rounded-full border border-yellow-400/30">
          Career Timeline
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
          EXPERIENCE & <span className="text-yellow-400">EDUCATION.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Experience Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-2xl font-black text-white mb-6">
            <span className="text-yellow-400 text-xl">🎖</span> Experience
          </div>
          {experiences.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#131316] border border-neutral-800 hover:border-yellow-400/50 transition-all duration-300 shadow-xl"
            >
              <div className="text-xs font-mono font-bold text-yellow-400">{item.period}</div>
              <h3 className="text-2xl font-black text-white mt-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm mt-1">{item.place}</p>
            </div>
          ))}
        </div>

        {/* Education Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-2xl font-black text-white mb-6">
            <span className="text-yellow-400 text-xl">🎓</span> Education
          </div>
          {education.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#131316] border border-neutral-800 hover:border-yellow-400/50 transition-all duration-300 shadow-xl"
            >
              <div className="text-xs font-mono font-bold text-yellow-400">{item.period}</div>
              <h3 className="text-2xl font-black text-white mt-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm mt-1">{item.place}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
