// app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import Services from '@/components/sections/services';
import Stats from '@/components/sections/stats';
import ExperienceEducation from '@/components/sections/experience-education';
import Skills from '@/components/sections/skills';
import Testimonials from '@/components/sections/testimonials';
import VideoTestimonials from '@/components/sections/video-testimonials';
import ContactSection from '@/components/sections/contact-section';
import ShowcaseCTA from '@/components/sections/showcase-cta';

export default function Home() {
  // Board straightens + glows on hover; aura follows cursor.
  useEffect(() => {
    const board = document.querySelector('.hero-board') as HTMLElement | null;
    const frame = document.querySelector('.hero-frame') as HTMLElement | null;
    if (!board || !frame) return;

    const onEnter = () => {
      board.classList.add('is-hover');
      frame.classList.add('is-hover');
    };

    const onMove = (e: MouseEvent) => {
      const r = board.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;  // 0..1
      const y = (e.clientY - r.top) / r.height;  // 0..1
      board.style.setProperty('--ax', `${x * 100}%`);
      board.style.setProperty('--ay', `${y * 100}%`);
    };

    const onLeave = () => {
      board.classList.remove('is-hover');
      frame.classList.remove('is-hover');
      board.style.removeProperty('--ax');
      board.style.removeProperty('--ay');
    };

    board.addEventListener('mouseenter', onEnter);
    board.addEventListener('mousemove', onMove);
    board.addEventListener('mouseleave', onLeave);
    return () => {
      board.removeEventListener('mouseenter', onEnter);
      board.removeEventListener('mousemove', onMove);
      board.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section id="home" className="section anchor">
        <div className="container-rl grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="kicker">I am Subhan Shahid</div>
            <h1 className="h1 text-accent drop-shadow">Multi-Media Artist</h1>
            <p className="p-muted mt-3">
              A multimedia artist fueled by a passion for creativity and innovation. With
              expertise in 3D modeling, video editing, VFX, CGI, and Unreal Engine,
              I&apos;m dedicated to pushing the boundaries of digital artistry.
            </p>

            <div className="mt-5 flex gap-3">
              <Link href="/#contact" className="btn btn-primary">Work with me</Link>
              <a href="/SubhanShahid-CV.pdf" className="btn btn-ghost" target="_blank" rel="noreferrer">
                Download CV
              </a>
            </div>

            <div className="mt-4 flex items-center gap-3 text-ink-muted text-sm">
              <span>Follow:</span>
              <a
                href="https://www.upwork.com/freelancers/~01fc691ec1a320c941?mp_source=share"
                target="_blank" rel="noreferrer" className="underline"
              >Upwork</a>
              <a
                href="https://www.instagram.com/subhann.shahid"
                target="_blank" rel="noreferrer" className="underline"
              >IG</a>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B923171511108&text=Can%20we%20talk?&type=phone_number&app_absent=0"
                target="_blank" rel="noreferrer" className="underline"
              >WhatsApp</a>
            </div>
          </div>

          {/* Slight tilt by default → straight + glow on hover (aura follows cursor) */}
          <div className="justify-self-center">
            <div className="hero-board">
              <div className="hero-frame relative w-[320px] h-[320px] md:w-[520px] md:h-[520px]">
                <Image
                  src="/hero.jpg"
                  alt="Subhan Shahid"
                  fill
                  sizes="(max-width: 768px) 320px, 520px"
                  priority
                  className="rounded-[14px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider + Stats */}
      <section className="anchor">
        <Stats />
      </section>

      {/* Services */}
      <section id="services" className="section anchor">
        <Services />
      </section>

      {/* Showcase CTA */}
      <section className="anchor">
        <ShowcaseCTA />
      </section>

      {/* Experience & Education */}
      <section className="section anchor">
        <ExperienceEducation />
      </section>

      {/* Skills */}
      <section className="anchor">
        <Skills />
      </section>

      {/* Text Testimonials */}
      <section id="testimonials" className="section anchor">
        <Testimonials />
      </section>

      {/* Video Testimonials */}
      <section id="video-testimonials" className="section anchor">
        <VideoTestimonials />
      </section>

      {/* Contact */}
      <section id="contact" className="section anchor">
        <ContactSection />
      </section>
    </>
  );
}
