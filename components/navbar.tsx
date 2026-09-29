'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-neutral-800/80 bg-[#0e0e10]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="S2 Logo" width={34} height={34} className="object-contain" priority />
          <span className="font-black text-xl sm:text-2xl tracking-tight text-white uppercase">
            SUBHAN<span className="text-yellow-400">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold text-neutral-400">
          <a href="/#services" className="hover:text-yellow-400 transition-colors">Services</a>
          <a href="/#showcase" className="hover:text-yellow-400 transition-colors">Showcase</a>
          <a href="/#experience" className="hover:text-yellow-400 transition-colors">Experience</a>
          <a href="/#testimonials" className="hover:text-yellow-400 transition-colors">Reviews</a>
          <a href="/#video-testimonials" className="hover:text-yellow-400 transition-colors">Testimonials</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className="hidden sm:inline-flex px-6 py-2.5 rounded-full text-xs font-black tracking-wider bg-yellow-400 text-neutral-950 hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 uppercase"
          >
            Contact
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              ) : (
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Hamburger Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-[#121215] border-b border-neutral-800 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <a
            href="/#services"
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold text-neutral-300 hover:text-yellow-400 uppercase tracking-wider py-2 border-b border-neutral-800/60"
          >
            Services
          </a>
          <a
            href="/#showcase"
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold text-neutral-300 hover:text-yellow-400 uppercase tracking-wider py-2 border-b border-neutral-800/60"
          >
            Showcase
          </a>
          <a
            href="/#experience"
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold text-neutral-300 hover:text-yellow-400 uppercase tracking-wider py-2 border-b border-neutral-800/60"
          >
            Experience
          </a>
          <a
            href="/#testimonials"
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold text-neutral-300 hover:text-yellow-400 uppercase tracking-wider py-2 border-b border-neutral-800/60"
          >
            Reviews
          </a>
          <a
            href="/#video-testimonials"
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold text-neutral-300 hover:text-yellow-400 uppercase tracking-wider py-2 border-b border-neutral-800/60"
          >
            Testimonials
          </a>
          <a
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 py-3 rounded-xl bg-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider text-center shadow-lg"
          >
            Contact Me
          </a>
        </div>
      )}
    </header>
  );
}
