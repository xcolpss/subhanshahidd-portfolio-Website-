import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import ShowcaseView from '@/components/showcase/ShowcaseView';
import ServicesSection from '@/components/sections/ServicesSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsGrid from '@/components/sections/SkillsGrid';
import ChannelsSection from '@/components/sections/ChannelsSection';
import ContactSection from '@/components/sections/ContactSection';
import ClientReviewsSection from '@/components/sections/ClientReviewsSection';
import VideoTestimonialsSection from '@/components/sections/VideoTestimonialsSection';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60;

export default async function HomePage() {
  const [
    { data: stats },
    { data: projects },
    { data: reviews },
    { data: videoTestimonials },
    { data: channels },
  ] = await Promise.all([
    supabase.from('stats').select('*').order('display_order', { ascending: true }),
    supabase.from('showcase').select('*').order('display_order', { ascending: true }),
    supabase.from('reviews').select('*').order('created_at', { ascending: false }),
    supabase.from('video_testimonials').select('*').order('created_at', { ascending: false }),
    supabase.from('clients_channels').select('*').order('display_order', { ascending: true }),
  ]);

  return (
    <main className="min-h-screen bg-[#0e0e10] text-neutral-100 font-sans selection:bg-yellow-400 selection:text-neutral-950 overflow-x-hidden">
      
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-36 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
              Available for Commissions & Remote Work
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
              MULTIMEDIA ARTIST & <br />
              <span className="text-yellow-400 underline decoration-neutral-800 decoration-wavy underline-offset-4 sm:underline-offset-8">
                3D / VFX DIRECTOR
              </span>
            </h1>

            <p className="mt-4 sm:mt-5 text-neutral-400 text-sm sm:text-base md:text-lg font-normal max-w-xl leading-relaxed">
              Crafting commercial-grade 3D art, Unreal Engine visual effects, and high-energy video productions that get brands noticed.
            </p>

            {/* Mobile Hero Image Card */}
            <div className="my-5 block lg:hidden relative w-44 sm:w-52 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-neutral-800 shadow-xl bg-neutral-900 mx-auto">
              <Image
                src="/hero.jpg"
                alt="Subhan Shahid"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl bg-[#141416]/95 backdrop-blur-md border border-neutral-800 text-left">
                <div className="text-[9px] font-mono text-yellow-400 uppercase font-bold">Multimedia Artist</div>
                <div className="text-white font-extrabold text-xs mt-0.5">Subhan Shahid</div>
              </div>
            </div>

            <div className="mt-2 sm:mt-6 flex flex-wrap gap-3 justify-center lg:justify-start w-full sm:w-auto">
              <a
                href="#showcase"
                className="px-7 py-3 rounded-xl bg-yellow-400 text-neutral-950 font-black text-xs sm:text-sm tracking-wider uppercase hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/20 text-center"
              >
                View Showcase
              </a>
              <a
                href="#contact"
                className="px-7 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:border-yellow-400/60 hover:text-yellow-400 transition-all text-center"
              >
                Contact Me
              </a>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-2 text-xs text-neutral-500 font-mono uppercase w-full justify-center lg:justify-start">
              <span>Find me on:</span>
              <div className="flex flex-wrap gap-3 text-neutral-300 font-bold text-xs justify-center">
                <a href="https://www.upwork.com/freelancers/~01fc691ec1a320c941?mp_source=share" target="_blank" className="hover:text-yellow-400 transition-colors">
                  Upwork
                </a>
                <a href="https://instagram.com/subhann.shahid" target="_blank" className="hover:text-yellow-400 transition-colors">
                  Instagram
                </a>
                <a href="https://wa.me/923171511108" target="_blank" className="hover:text-yellow-400 transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-neutral-800 shadow-2xl bg-neutral-900 group">
              <Image
                src="/hero.jpg"
                alt="Subhan Shahid"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#141416]/95 backdrop-blur-md border border-neutral-800">
                <div className="text-xs font-mono text-yellow-400 uppercase font-bold">Multimedia Artist</div>
                <div className="text-white font-extrabold text-base mt-0.5">Subhan Shahid</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-neutral-800/80 bg-[#121215]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats?.map((stat) => (
            <div key={stat.id} className="border-l-2 border-yellow-400 pl-4 sm:pl-6 text-left">
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-yellow-400 tracking-tight">{stat.value}</div>
              <div className="text-neutral-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <ServicesSection />

      {/* CHANNELS & CLIENTS */}
      {channels && channels.length > 0 && (
        <ChannelsSection channels={channels} />
      )}

      {/* SHOWCASE SECTION */}
      <ShowcaseView items={projects || []} />

      {/* EXPERIENCE & EDUCATION */}
      <ExperienceSection />

      {/* SKILLS */}
      <SkillsGrid />

      {/* CLIENT REVIEWS */}
      <ClientReviewsSection reviews={reviews || []} />

      {/* VIDEO TESTIMONIALS */}
      {videoTestimonials && videoTestimonials.length > 0 && (
        <VideoTestimonialsSection videoTestimonials={videoTestimonials} />
      )}

      {/* CONTACT */}
      <ContactSection />

      {/* FOOTER */}
      <footer className="border-t border-neutral-800/80 py-8 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-4 text-center sm:text-left">
        <p>&copy; {new Date().getFullYear()} Subhan Shahid. All rights reserved.</p>
        <Link
          href="/admin"
          className="text-neutral-600 hover:text-yellow-400 transition-colors flex items-center gap-1.5"
          title="Admin Panel Login"
        >
          <span>🔒</span> Admin Panel
        </Link>
      </footer>
    </main>
  );
}
