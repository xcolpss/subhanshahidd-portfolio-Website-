'use client';
import Image from 'next/image';

type Skill = { name: string; src: string };

const skills: Skill[] = [
  { name: 'Blender',          src: '/skills/blender.png' },
  { name: 'DaVinci Resolve',  src: '/skills/davinci.png' },
  { name: 'Adobe Photoshop',  src: '/skills/photoshop.png' },
  { name: 'After Effects',    src: '/skills/aftereffects.png' },
  { name: 'Premiere Pro',     src: '/skills/premierepro.png' },
  { name: 'Unreal Engine',    src: '/skills/unrealengine.png' },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container-rl">
        <h2 className="h2 mb-6">Skills</h2>

        {/* 2 → 3 → 6 columns, greyscale → color on hover (handled by .skill-logo in globals.css) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {skills.map((s) => (
            <div key={s.name} className="h-card p-6 flex items-center justify-center filter grayscale hover:grayscale-0 hover:saturate-100 transition duration-200">
              <Image
                src={s.src}
                alt={s.name}
                width={120}
                height={120}
                className="skill-logo"
                title={s.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
