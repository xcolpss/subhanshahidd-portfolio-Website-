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
    <main className="min-h-screen bg-[#0e0e10] text-neutral-100 font-sans selection:bg-yellow-400 selection:text-neutral-950">
      
      {/* NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-neutral-800/80 bg-[#0e0e10]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="S2 Logo" width={38} height={38} className="object-contain" priority />
            <span className="font-black text-2xl tracking-tight text-white uppercase">
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
            className="px-6 py-2.5 rounded-full text-xs font-black tracking-wider bg-yellow-400 text-neutral-950 hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 uppercase"
          >
            Contact
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
              Available for Commissions & Remote Work
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
              MULTIMEDIA ARTIST & <br />
              <span className="text-yellow-400 underline decoration-neutral-800 decoration-wavy underline-offset-8">
                3D / VFX DIRECTOR
              </span>
            </h1>

            <p className="mt-8 text-neutral-400 text-lg md:text-xl font-normal max-w-xl leading-relaxed">
              Crafting commercial-grade 3D art, Unreal Engine visual effects, and high-energy video productions that get brands noticed.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#showcase"
                className="px-8 py-4 rounded-xl bg-yellow-400 text-neutral-950 font-black text-sm tracking-wider uppercase hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/20 hover:-translate-y-0.5"
              >
                View Showcase
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold text-sm tracking-wider uppercase hover:border-yellow-400/60 hover:text-yellow-400 transition-all hover:-translate-y-0.5"
              >
                Contact Me
              </a>
            </div>

            {/* ONLY Upwork, Instagram, WhatsApp */}
            <div className="mt-12 flex flex-wrap items-center gap-5 text-xs text-neutral-500 font-mono uppercase">
              <span>Find me on:</span>
              <div className="flex flex-wrap gap-5 text-neutral-300 font-bold text-sm">
                <a href="https://www.upwork.com/freelancers/~01fc691ec1a320c941?mp_source=share" target="_blank" className="hover:text-yellow-400 transition-colors">
                  Upwork
                </a>
                <a href="https://instagram.com/subhann.shahid" target="_blank" className="hover:text-yellow-400 transition-colors">
                  Instagram (@subhann.shahid)
                </a>
                <a href="https://wa.me/923171511108" target="_blank" className="hover:text-yellow-400 transition-colors">
                  WhatsApp (+92 317 1511108)
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
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
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats?.map((stat) => (
            <div key={stat.id} className="border-l-2 border-yellow-400 pl-6">
              <div className="text-4xl md:text-5xl font-black text-yellow-400 tracking-tight">{stat.value}</div>
              <div className="text-neutral-400 text-xs font-bold tracking-widest uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <ServicesSection />

      {/* CHANNELS & CLIENTS WORKED WITH */}
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
      <section id="testimonials" className="py-24 bg-[#121215] border-t border-neutral-800/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
          <div>
            <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3.5 py-1 rounded-full border border-yellow-400/20">
              Endorsements
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
              CLIENT <span className="text-yellow-400">REVIEWS.</span>
            </h2>
            <p className="text-xs text-neutral-500 font-mono mt-2">Hover card to pause scrolling</p>
          </div>
          <Link
            href="/reviews"
            className="text-xs font-bold text-yellow-400 uppercase tracking-wider hover:underline"
          >
            Read All Reviews &rarr;
          </Link>
        </div>

        <div className="relative w-full">
          <div className="animate-marquee flex gap-6">
            {[...(reviews || []), ...(reviews || [])].map((review, idx) => (
              <div
                key={idx}
                className="w-[360px] p-6 rounded-2xl bg-[#17171a] border border-neutral-800 hover:border-yellow-400/60 transition-all flex flex-col justify-between shrink-0"
              >
                <div>
                  <div className="text-yellow-400 text-sm mb-4">{"★".repeat(review.rating || 5)}</div>
                  <p className="text-neutral-300 text-sm leading-relaxed italic">"{review.review_text}"</p>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-800">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-neutral-950 font-black text-xs flex items-center justify-center">
                    {review.client_name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{review.client_name}</div>
                    <div className="text-xs text-neutral-500">{review.client_role} {review.company ? `• ${review.company}` : ''}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIALS */}
      {videoTestimonials && videoTestimonials.length > 0 && (
        <section id="video-testimonials" className="py-24 bg-[#0e0e10] border-t border-neutral-800/80 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
            <div>
              <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3.5 py-1 rounded-full border border-yellow-400/20">
                Verified Video Proof
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
                VIDEO <span className="text-yellow-400">TESTIMONIALS.</span>
              </h2>
              <p className="text-xs text-neutral-500 font-mono mt-2">Hover card to pause scrolling</p>
            </div>
            <Link
              href="/video-testimonials"
              className="text-xs font-bold text-yellow-400 uppercase tracking-wider hover:underline"
            >
              Watch All Video Reviews &rarr;
            </Link>
          </div>

          <div className="relative w-full">
            <div className="animate-marquee flex gap-6">
              {[...(videoTestimonials || []), ...(videoTestimonials || [])].map((vt, idx) => (
                <div key={idx} className="shrink-0 w-[240px]">
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

      {/* DUAL-ACTION CONTACT FORM */}
      <ContactSection />

      {/* FOOTER WITH PASSWORD-PROTECTED ADMIN LINK */}
      <footer className="border-t border-neutral-800/80 py-12 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-4">
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
