'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n, type Locale } from '@/lib/i18n';

const NAV_LINKS = [
  { key: 'nav.home',     href: '/',         section: '#home' },
  { key: 'nav.services', href: '/services', section: '#services' },
  { key: 'nav.about',    href: '/about',    section: '#about' },
  { key: 'nav.contact',  href: '/contact',  section: '#contact' },
];

const LANG_OPTIONS: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'mr', label: 'म' },
];

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change (e.g. browser back button)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent, link: (typeof NAV_LINKS)[number]) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHome && link.section) {
      document.querySelector(link.section)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(link.href);
    }
  };

  const isActive = (link: (typeof NAV_LINKS)[number]) => {
    if (link.href === '/') return pathname === '/';
    return pathname.startsWith(link.href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center font-heading font-bold text-xl tracking-tight">
              <span style={{ color: '#0F3460' }}>Nanded</span><span style={{ color: '#34C77B' }}>Seva</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link) ? 'text-[#0F3460] font-semibold' : 'text-gray-600 hover:text-[#0F3460]'
                  }`}
                >
                  {t(link.key)}
                </a>
              ))}
            </nav>

            {/* Right side: Lang + CTA + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-full px-1 py-1">
                {LANG_OPTIONS.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all ${
                      locale === lang.code ? 'bg-[#0F3460] text-white' : 'text-gray-600 hover:text-[#0F3460]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Book Now (desktop) */}
              <Link
                href="/contact"
                className="hidden md:flex items-center gap-1.5 text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                style={{ background: '#34C77B' }}
              >
                <Phone size={14} />
                {t('nav.bookNow')}
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden p-2 text-[#0F3460]"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <span className="font-heading font-bold text-lg tracking-tight">
                  <span style={{ color: '#0F3460' }}>Nanded</span><span style={{ color: '#34C77B' }}>Seva</span>
                </span>
                <button onClick={() => setMenuOpen(false)} className="p-1 text-gray-500">
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col px-5 py-4 gap-1 flex-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-base font-medium py-3 border-b border-gray-100 transition-colors min-h-[48px] flex items-center ${
                      isActive(link) ? 'text-[#0F3460] font-semibold' : 'text-gray-700 hover:text-[#0F3460]'
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </nav>

              <div className="px-5 py-5 border-t space-y-3">
                <a
                  href="https://wa.me/918421222893?text=Hello%20NandedSeva%2C%20I%20would%20like%20to%20book%20a%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-xl text-sm min-h-[48px]"
                  style={{ background: '#34C77B' }}
                >
                  {t('hero.whatsappNow')}
                </a>
                <a
                  href="tel:+918421222893"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-xl text-sm min-h-[48px]"
                  style={{ background: '#0F3460' }}
                >
                  <Phone size={16} />
                  {t('hero.callNow')}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
