'use client';

interface ChannelItem {
  id: string;
  name: string;
  platform: string;
  url: string;
  avatar_url?: string | null;
}

export default function ChannelsSection({ channels }: { channels: ChannelItem[] }) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-800/80">
      <div className="mb-14">
        <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3.5 py-1.5 rounded-full border border-yellow-400/30">
          Trusted Creators & Brands
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
          CHANNELS & ACCOUNTS <span className="text-yellow-400">I'VE WORKED WITH.</span>
        </h2>
        <p className="text-neutral-400 text-sm mt-3">
          Click any creator or brand card below to explore their official channels.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {channels.map((ch) => {
          const isYt = ch.platform.toLowerCase().includes('youtube');
          return (
            <a
              key={ch.id}
              href={ch.url}
              target="_blank"
              rel="noreferrer"
              className="p-5 sm:p-6 rounded-3xl bg-[#141417] border border-neutral-800 hover:border-yellow-400/80 transition-all duration-300 group flex flex-col items-center text-center shadow-lg hover:-translate-y-1"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-4 border-2 border-neutral-800 group-hover:border-yellow-400 transition-colors bg-neutral-900 flex items-center justify-center">
                {ch.avatar_url ? (
                  <img
                    src={ch.avatar_url}
                    alt={ch.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback avatar letter
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}
                <span className="font-black text-lg text-yellow-400 select-none">
                  {ch.name.slice(0, 2).toUpperCase()}
                </span>
              </div>

              <span className={`text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full mb-2 ${
                isYt ? 'bg-red-950/80 text-red-400 border border-red-800/40' : 'bg-pink-950/80 text-pink-400 border border-pink-800/40'
              }`}>
                {ch.platform}
              </span>

              <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-yellow-400 transition-colors line-clamp-1">
                {ch.name}
              </h4>
              <span className="text-[11px] text-neutral-500 font-mono mt-1 group-hover:underline">
                Visit Channel ↗
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
