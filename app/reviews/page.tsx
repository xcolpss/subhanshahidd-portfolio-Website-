import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export const revalidate = 60;

export default async function ReviewsPage() {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#0e0e10] text-neutral-100 font-sans selection:bg-yellow-400 selection:text-neutral-950 pt-28 pb-20 px-6">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-xs font-mono text-yellow-400 uppercase tracking-widest mb-8 hover:underline">
          &larr; Back to Portfolio
        </Link>

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
          ALL CLIENT <span className="text-yellow-400">REVIEWS.</span>
        </h1>
        <p className="text-neutral-400 text-sm max-w-xl mb-14">
          Unfiltered feedback and verified endorsements from studios, founders, and directors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-[#141416] border border-neutral-800 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="text-yellow-400 text-sm mb-4">{"★".repeat(review.rating || 5)}</div>
                <p className="text-neutral-300 text-sm leading-relaxed italic">"{review.review_text}"</p>
              </div>
              <div className="flex items-center gap-3 mt-8 pt-4 border-t border-neutral-800">
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
    </main>
  );
}
