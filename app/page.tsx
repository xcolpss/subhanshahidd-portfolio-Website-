import { supabase } from '@/lib/supabaseClient';
import ShowcaseView from '@/components/showcase/ShowcaseView';
import ServicesSection from '@/components/sections/ServicesSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsGrid from '@/components/sections/SkillsGrid';
import ChannelsSection from '@/components/sections/ChannelsSection';
import ContactSection from '@/components/sections/ContactSection';
import VideoCard from '@/components/ui/VideoCard';
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
      
      {/* NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-neutral-800/80 bg-[#0e0e10]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="S2 Logo" width={32} height={32} className="object-contain" priority />
            <span className="font-black text-lg sm:text-2xl tracking-tight text-white uppercase">
              SUBHAN<span className="text-yellow-400">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold text-neutral-400">
            <a href="#services" className="hover:text-yellow-400 transition-colors">Services</a>
            <a href="#showcase" className="hover:text-yellow-400 transition-colors">Showcase</a>
            <a href="#experience" className="hover:text-yellow-400 transition-colors">Experience</a>
            <a href="#testimonials" className="hover:text-yellow-400 transition-colors">Reviews</a>
            <a href="#video-testimonials" className="hover:text-yellow-400 transition-colors">Testimonials</a>
          </nav>

          <a
            href="#contact"
            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-black tracking-wider bg-yellow-400 text-neutral-950 hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 uppercase"
          >
            Contact
          </a>
        </div>
      </header>

      {/* HERO SECTION - MOBILE OPTIMIZED */}
      <section className="relative pt-28 sm:pt-36 pb-16 px-4 sm:px-6 max-w-7xl mx-auto text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
              Available for Commissions & Remote Work
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
              MULTIMEDIA ARTIST & <br />
              <span className="text-yellow-400 underline decoration-neutral-800 decoration-wavy underline-offset-8">
                3D / VFX DIRECTOR
              </span>
            </h1>

            <p className="mt-6 text-neutral-400 text-base sm:text-lg md:text-xl font-normal max-w-xl leading-relaxed">
              Crafting commercial-grade 3D art, Unreal Engine visual effects, and high-energy video productions that get brands noticed.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5 justify-center lg:justify-start w-full sm:w-auto">
              <a
                href="#showcase"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-yellow-400 text-neutral-950 font-black text-xs sm:text-sm tracking-wider uppercase hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/20 text-center"
              >
                View Showcase
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:border-yellow-400/60 hover:text-yellow-400 transition-all text-center"
              >
                Contact Me
              </a>
            </div>

            {/* Social Links - Mobile Friendly */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 text-xs text-neutral-500 font-mono uppercase w-full justify-center lg:justify-start">
              <span>Find me on:</span>
              <div className="flex flex-wrap gap-4 text-neutral-300 font-bold text-xs sm:text-sm justify-center">
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

          <div className="lg:col-span-5 relative max-w-xs sm:max-w-sm mx-auto w-full">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-neutral-800 shadow-2xl bg-neutral-900 group">
              <Image
                src="/hero.jpg"
                alt="Subhan Shahid"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-[#141416]/95 backdrop-blur-md border border-neutral-800 text-left">
                <div className="text-[10px] font-mono text-yellow-400 uppercase font-bold">Multimedia Artist</div>
                <div className="text-white font-extrabold text-sm sm:text-base mt-0.5">Subhan Shahid</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-neutral-800/80 bg-[#121215]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats?.map((stat) => (
            <div key={stat.id} className="border-l-2 border-yellow-400 pl-4 sm:pl-6 text-left">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-yellow-400 tracking-tight">{stat.value}</div>
              <div className="text-neutral-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mt-1">{stat.label}</div>
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
      <section id="testimonials" className="py-20 sm:py-24 bg-[#121215] border-t border-neutral-800/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3.5 py-1.5 rounded-full border border-yellow-400/20">
              Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
              CLIENT <span className="text-yellow-400">REVIEWS.</span>
            </h2>
          </div>
          <Link
            href="/reviews"
            className="text-xs font-bold text-yellow-400 uppercase tracking-wider hover:underline"
          >
            Read All Reviews &rarr;
          </Link>
        </div>

        <div className="relative w-full">
          <div className="animate-marquee flex gap-5">
            {[...(reviews || []), ...(reviews || [])].map((review, idx) => (
              <div
                key={idx}
                className="w-[300px] sm:w-[360px] p-6 rounded-2xl bg-[#17171a] border border-neutral-800 flex flex-col justify-between shrink-0"
              >
                <div>
                  <div className="text-yellow-400 text-sm mb-4">{"★".repeat(review.rating || 5)}</div>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">"{review.review_text}"</p>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-800">
                  <div className="w-9 h-9 rounded-full bg-yellow-400 text-neutral-950 font-black text-xs flex items-center justify-center">
                    {review.client_name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">{review.client_name}</div>
                    <div className="text-[10px] sm:text-xs text-neutral-500">{review.client_role} {review.company ? `• ${review.company}` : ''}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIALS */}
      {videoTestimonials && videoTestimonials.length > 0 && (
        <section id="video-testimonials" className="py-20 sm:py-24 bg-[#0e0e10] border-t border-neutral-800/80 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3.5 py-1.5 rounded-full border border-yellow-400/20">
                Verified Video Proof
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
                VIDEO <span className="text-yellow-400">TESTIMONIALS.</span>
              </h2>
            </div>
            <Link
              href="/video-testimonials"
              className="text-xs font-bold text-yellow-400 uppercase tracking-wider hover:underline"
            >
              Watch All Video Reviews &rarr;
            </Link>
          </div>

          <div className="relative w-full">
            <div className="animate-marquee flex gap-5">
              {[...(videoTestimonials || []), ...(videoTestimonials || [])].map((vt, idx) => (
                <div key={idx} className="shrink-0 w-[220px] sm:w-[260px]">
                  <VideoCard
                    youtubeId={vt.youtube_id}
                    title={vt.client_name}
                    subtitle={vt.company}
                    aspectRatio="9:16"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <ContactSection />

      {/* FOOTER */}
      <footer className="border-t border-neutral-800/80 py-10 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-4 text-center sm:text-left">
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
