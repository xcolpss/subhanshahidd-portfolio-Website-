import { supabase } from '@/lib/supabaseClient';
import VideoCard from '@/components/ui/VideoCard';
import Link from 'next/link';

export const revalidate = 60;

export default async function AllVideoTestimonialsPage() {
  const { data: testimonials } = await supabase
    .from('video_testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#0e0e10] text-neutral-100 font-sans p-6 md:p-16 selection:bg-yellow-400 selection:text-neutral-950">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-xs font-mono text-yellow-400 uppercase tracking-widest mb-10 hover:underline">
          &larr; Back to Portfolio
        </Link>

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
          ALL VIDEO <span className="text-yellow-400">TESTIMONIALS.</span>
        </h1>
        <p className="text-neutral-400 text-sm max-w-xl mb-16">
          Watch verified short client reviews and production endorsements.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((v) => (
            <VideoCard
              key={v.id}
              youtubeId={v.youtube_id}
              title={v.client_name}
              subtitle={v.company}
              aspectRatio={v.aspect_ratio}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
