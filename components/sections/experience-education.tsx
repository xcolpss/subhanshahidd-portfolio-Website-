'use client';

import { GraduationCap, Award } from 'lucide-react';

type Row = { years: string; title: string; place: string };

const EXP: Row[] = [
  { years: '2020 - 2021', title: 'Senior Graphic Designer', place: 'Gethreem Rawalpindi' },
  { years: '2021 - 2022', title: 'UI Department Head', place: 'Rubrics/Bahria Town ph7' },
  { years: '2015 - Present', title: 'Techno World / Rawalpindi', place: 'Owner & Operations Manager' },
];

const EDU: Row[] = [
  { years: '2017 - 2020', title: 'O - Levels', place: 'Benchmark College' },
  { years: '2020 - 2023', title: 'A - Levels', place: 'Benchmark College' },
];

function GlassCard({ row }: { row: Row }) {
  return (
    <div
      className="
        glass rounded-[22px] border border-border
        px-6 py-5 transition-shadow hover:shadow-[0_12px_44px_rgba(0,0,0,.35)]
      "
    >
      <div className="text-[16px] font-semibold text-accent mb-1">{row.years}</div>
      <div className="text-[24px] md:text-[28px] font-semibold leading-tight tracking-[-0.01em]">
        {row.title}
      </div>
      <div className="text-ink-muted mt-1">{row.place}</div>
    </div>
  );
}

export default function ExperienceEducation() {
  return (
    <section className="section" id="experience">
      <div className="container-rl">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Experience */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Award className="text-accent" size={30} />
              <h2 className="h2 m-0">Experience</h2>
            </div>
            <div className="space-y-5">
              {EXP.map((r) => (
                <GlassCard key={`${r.years}-${r.title}`} row={r} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <GraduationCap className="text-accent" size={30} />
              <h2 className="h2 m-0">Education</h2>
            </div>
            <div className="space-y-5">
              {EDU.map((r) => (
                <GlassCard key={`${r.years}-${r.title}`} row={r} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
