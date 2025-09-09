'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

type NavItem = { label: string; href: string };

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);                 // mobile menu
  const [scrolled, setScrolled] = useState(false);         // shadow on scroll

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sections present on the home page (for scroll-spy)
  const hashTargets = useMemo(
    () => ['#services', '#testimonials', '#video-testimonials', '#contact'],
    []
  );

  const links: NavItem[] = [
    { label: 'Services',            href: '/#services' },
    { label: 'Showcase',            href: '/showcase' },
    { label: 'Reviews',             href: '/#testimonials' },
    { label: 'Video Testimonials',  href: '/#video-testimonials' },
  ];

  // Only 1 item can be active. For home route we store '/#id', otherwise '/path'
  const [active, setActive] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Smooth scroll for hash links while already on home page
  function onHashClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('/#')) return;     // normal link
    if (pathname !== '/') return;           // let Next.js navigate from another page

    e.preventDefault();
    const id = href.slice(2); // 'services' etc.
    const node = document.getElementById(id);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
      setOpen(false); // close mobile menu after click
    }
  }

  // Scroll to hash after navigation (e.g. coming from /showcase -> /#services)
  useEffect(() => {
    if (pathname !== '/') return;
    const h = window.location.hash;
    if (!h) return;

    const node = document.getElementById(h.slice(1));
    if (!node) return;

    const t = setTimeout(() => {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(`/${h}`);
    }, 60);
    return () => clearTimeout(t);
  }, [pathname]);

  // Scroll spy: highlight current section on the home page
  useEffect(() => {
    if (pathname !== '/') {
      setActive(pathname);
      return;
    }

    // initialize from current hash
    if (window.location.hash && hashTargets.includes(window.location.hash)) {
      setActive(`/${window.location.hash}`);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) {
            best = e;
          }
        }
        if (best?.target instanceof HTMLElement) {
          const id = best.target.id;
          if (id && hashTargets.includes(`#${id}`)) {
            setActive(`/#${id}`);
          }
        }
      },
      {
        root: null,
        // keep items from hiding under the bar
        rootMargin: '-96px 0px -55% 0px',
        threshold: [0.2, 0.4, 0.6, 0.8, 1],
      }
    );
    observerRef.current = obs;

    hashTargets
      .map((h) => document.getElementById(h.slice(1)))
      .filter(Boolean)
      .forEach((el) => obs.observe(el as Element));

    const onHashChange = () => {
      const h = window.location.hash;
      if (h && hashTargets.includes(h)) setActive(`/${h}`);
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      obs.disconnect();
      observerRef.current = null;
    };
  }, [pathname, hashTargets]);

  const isActive = (href: string) => {
    if (pathname === '/') return href === active;
    return href === pathname;
  };

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b border-border',
        // Solid, readable background (no transparency haze)
        'bg-[#0b0f1d] backdrop-blur-none',
        scrolled ? 'shadow-[0_8px_30px_rgba(0,0,0,.35)]' : '',
      ].join(' ')}
    >
      {/* taller to fit a 60–64px logo comfortably */}
      <nav className="container-rl flex h-16 items-center justify-between">
        {/* Left: Brand (logo only) */}
        <Link
          href="/#home"
          onClick={(e) => onHashClick(e as any, '/#home')}
          className="flex items-center"
          aria-label="Go to top"
        >
          <Image
            src="/logo.png"
            alt="SS logo"
            width={70}
            height={60}
            className="block sm:h-[35px] sm:w-[70px]"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const activeNow = isActive(l.href);
            return (
              <li key={l.href} className="relative">
                <Link
                  href={l.href}
                  onClick={(e) => onHashClick(e, l.href)}
                  className={['nav-link', activeNow ? 'nav-link--active' : ''].join(' ')}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Contact + Mobile hamburger */}
        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            onClick={(e) => onHashClick(e, '/#contact')}
            className="hidden sm:inline-flex btn btn-primary"
          >
            Contact
          </Link>

          {/* Hamburger (mobile) */}
          <button
            aria-label="Menu"
            className="md:hidden grid place-items-center h-10 w-10 rounded-lg bg-[rgba(255,255,255,.06)] border border-border"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-border bg-[#0b0f1d]">
          <div className="container-rl py-2 flex flex-col">
            {links.map((l) => {
              const activeNow = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    onHashClick(e, l.href);
                    setOpen(false);
                  }}
                  className={['py-3 nav-link', activeNow ? 'nav-link--active' : ''].join(' ')}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={(e) => {
                onHashClick(e, '/#contact');
                setOpen(false);
              }}
              className="mt-2 btn btn-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
