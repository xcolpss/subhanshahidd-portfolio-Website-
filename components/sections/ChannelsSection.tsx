"use client";

export interface ChannelItem {
  id: string;
  name: string;
  platform: string;
  url: string;
  handle: string;
  avatar_url?: string | null;
}

export default function ChannelsSection({
  channels,
}: {
  channels: ChannelItem[];
}) {
  if (!channels?.length) return null;

  return (
    <section
      id="channels"
      className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      <div className="mb-12 text-center">
        <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
          Collaborations & Brands
        </span>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-4">
          CHANNELS & <span className="text-yellow-400">CLIENTS.</span>
        </h2>

        <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
          Creators, businesses, and media channels I have produced visual
          content, edits, and branding for.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {channels.map((ch) => (
          <a
            key={ch.id}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-[#141417] border border-neutral-800/80 hover:border-yellow-400/60 transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:-translate-y-1.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#1c1c20] border border-neutral-700/80 flex items-center justify-center font-black text-sm text-yellow-400 mb-3 group-hover:scale-105 group-hover:border-yellow-400 transition-all overflow-hidden shadow-inner">
              {ch.avatar_url ? (
                <img
                  src={ch.avatar_url}
                  alt={ch.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : ch.platform === "YouTube" ? (
                <span className="text-red-500 text-base">▶</span>
              ) : (
                <span className="text-pink-500 text-base">◎</span>
              )}
            </div>

            <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
              {ch.name}
            </h4>

            <span className="text-[10px] font-mono text-neutral-400 mt-0.5 line-clamp-1">
              {ch.handle}
            </span>

            <span className="text-[9px] font-mono uppercase tracking-wider text-yellow-400/90 mt-2 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
              {ch.platform} ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
