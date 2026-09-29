// lib/video-testimonials.ts
export type TestimonialVideo = {
  who: string;          // Person (Dave, Roddy, Avi)
  role?: string;        // Optional subtitle
  yt: string;           // Full YouTube link (shorts ok)
};

// Extract a YouTube ID from full URL, shorts, youtu.be, or bare ID
export function ytId(yt: string): string {
  try {
    // bare id (11 chars)
    if (/^[a-zA-Z0-9_-]{11}$/.test(yt)) return yt;

    const u = new URL(yt);

    // shorts
    const shortsMatch = u.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) return shortsMatch[1];

    // youtu.be
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '');
      if (id) return id;
    }

    // youtube.com/watch?v=ID
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return v;

      // fallback: last segment
      const parts = u.pathname.split('/');
      const last = parts[parts.length - 1];
      if (last && /^[a-zA-Z0-9_-]{11}$/.test(last)) return last;
    }
  } catch {
    // ignore
  }
  return yt; // as-is
}

// Your three YouTube links
export const VIDEO_TESTIMONIALS: TestimonialVideo[] = [
  {
    who: 'Dave',
    role: 'VFX & CGI Client',
    yt: 'https://youtube.com/shorts/h3Hl3kv3nOE?feature=share',
  },
  {
    who: 'Roddy',
    role: 'Brand Manager',
    yt: 'https://youtube.com/shorts/6jEXDgYEoaY?feature=share',
  },
  {
    who: 'Avi',
    role: 'Photoshop Artist',
    yt: 'https://youtube.com/shorts/y3klxSu5wRE?feature=share',
  },
  {
    who: 'Andreas',
    role: 'Photoshop Artist and Video Editor',
    yt: 'https://youtube.com/shorts/hENq6SrrOOk?feature=share',
  },
];
