// app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  // Prevent Next.js OG/Twitter warnings
  metadataBase: new URL('https://subhan-portfolionew.vercel.app'),

  title: 'Subhan Shahid — Multimedia Artist (Video Editing, VFX/CGI, 3D/UE5)',
  description:
    'Portfolio of Subhan Shahid: high-impact video editing, cinematic color, VFX/CGI, and Unreal Engine scenes.',
  icons: { icon: '/logo.png' },

  openGraph: {
    type: 'website',
    url: 'https://subhan-portfolionew.vercel.app',
    title: 'Subhan Shahid — Portfolio',
    siteName: 'Subhan Shahid',
    images: ['/hero.jpg'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Subhan Shahid — Portfolio',
    images: ['/hero.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0e1a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Speed up first YouTube play (showcase, reels, etc.) */}
        <link rel="preconnect" href="https://www.youtube-nocookie.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />

        {/* Canonical link for SEO */}
        <link rel="canonical" href="https://subhan-portfolionew.vercel.app/" />
      </head>

      <body className="min-h-screen bg-[var(--bg)] text-ink antialiased">
        {/* Accessible skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-md focus:bg-black/70 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
