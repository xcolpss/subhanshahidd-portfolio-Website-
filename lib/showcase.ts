// lib/showcase.ts
export type Clip = {
  title: string;
  yt?: string;          // YouTube URL (for videos/reels/3D)
  img?: string;         // local image path under /public (for photos/stills)
  client?: string;
  role?: string;
  tags: Array<'photo' | 'video' | '3d' | 'reel'>;
};

// helper – stable ID for YouTube embeds
export function ytId(url: string) {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    const id = u.searchParams.get('v');
    if (id) return id;
    const parts = u.pathname.split('/');
    const i = parts.indexOf('shorts');
    if (i >= 0) return parts[i + 1];
  } catch {}
  return url;
}

// ── Intro reel shown on top
export const INTRO_YT =
  'https://youtu.be/QLIgdqbA7rc';

// ── Showcase items
export const CLIPS: Clip[] = [
  // ------ Photos (local images) ------
  { title: 'Photo — 01', img: '/photos/p01.jpg', tags: ['photo'] },
  { title: 'Photo — 02', img: '/photos/p02.jpg', tags: ['photo'] },
  { title: 'Photo — 03', img: '/photos/p03.jpg', tags: ['photo'] },
  { title: 'Photo — 04', img: '/photos/p04.jpg', tags: ['photo'] },
  { title: 'Photo — 05', img: '/photos/p05.jpg', tags: ['photo'] },
  { title: 'Photo — 06', img: '/photos/p06.jpg', tags: ['photo'] },
  { title: 'Photo — 07', img: '/photos/p07.jpg', tags: ['photo'] },
  { title: 'Photo — 08', img: '/photos/p08.jpg', tags: ['photo'] },
  { title: 'Photo — 09', img: '/photos/p09.jpg', tags: ['photo'] },

  // ------ Videos ------
  { title: 'Cinematic Brand Reel', yt: 'https://youtu.be/qLk8uT0dhas', role: 'Direct Client • Video Editing', tags: ['video'] },
  { title: 'VFX Breakdown Energy Burst', yt: 'https://www.youtube.com/watch?v=_h5ZSblll0I', role: 'Personal R&D • VFX/CGI', tags: ['video'] },
  { title: 'Ad Edit — Quick Cuts', yt: 'https://www.youtube.com/watch?v=OsNbwJviA0o', role: 'Agency • Video Editing', tags: ['video'] },
  { title: 'Product Edit', yt: 'https://www.youtube.com/watch?v=wbJWCOh_QZw', role: 'Mock Brand • VFX/CGI', tags: ['video'] },
  { title: 'Intro Reel 2025 (alt)', yt: 'https://youtu.be/BrsYABe8U5U', role: 'Reel', tags: ['video'] },
  { title: 'Cinematic Cut', yt: 'https://youtu.be/ti2O0LynRwc', tags: ['video'] },

  // ------ 3D / Unreal ------
  { title: 'UE5 Short Scene', yt: 'https://youtu.be/6eKGS2cD56I', tags: ['3d'] },
  { title: 'CGI Product Shot', yt: 'https://youtu.be/LGVvrcEQmgk', tags: ['3d'] },
  { title: 'UE5 Scene', yt: 'https://youtu.be/PTlP39kfMKA', tags: ['3d'] },
  { title: 'CGI Pass', yt: 'https://youtu.be/A27fy5Tyyqk', tags: ['3d'] },
  { title: 'UE5 Env', yt: 'https://youtu.be/Zu7g91mpCi4', tags: ['3d'] },
  { title: 'CGI Lookdev', yt: 'https://www.youtube.com/watch?v=ZzmeE2ooYJ8', tags: ['3d'] },
  { title: 'CGI Pass 2', yt: 'https://www.youtube.com/watch?v=Unc5CwvaqI4', tags: ['3d'] },
  { title: 'CGI Pass 3', yt: 'https://www.youtube.com/watch?v=ZfZm2SE03fQ', tags: ['3d'] },
  { title: 'CGI Pass 4', yt: 'https://www.youtube.com/watch?v=7FGGjTL1CnU', tags: ['3d'] },
  { title: 'CGI Pass 5', yt: 'https://www.youtube.com/watch?v=TfdC_kuFis0', tags: ['3d'] },
  { title: 'CGI Pass 6', yt: 'https://www.youtube.com/watch?v=d9LoH35yd70', tags: ['3d'] },

  // local stills → now inside 3D
  { title: 'Still — 01', img: '/stills/s01.jpg', tags: ['3d'] },
  { title: 'Still — 02', img: '/stills/s02.jpg', tags: ['3d'] },
  { title: 'Still — 03', img: '/stills/s03.jpg', tags: ['3d'] },

  // ------ Reels ------
  { title: 'Reel — 01', yt: 'https://youtube.com/shorts/BKcFi2bFfUY', tags: ['reel'] },
  { title: 'Reel — 02', yt: 'https://youtube.com/shorts/sMUKF749JI0', tags: ['reel'] },
  { title: 'Reel — 03', yt: 'https://youtube.com/shorts/eBQ5VBTdSGA', tags: ['reel'] },
  { title: 'Reel — 04', yt: 'https://youtube.com/shorts/AxeDCZPChoY', tags: ['reel'] },
  { title: 'Reel — 05', yt: 'https://youtube.com/shorts/0NYecQ7dmII', tags: ['reel'] },
  { title: 'Reel — 06', yt: 'https://youtube.com/shorts/LPEh0u9ZT0M', tags: ['reel'] },
];
