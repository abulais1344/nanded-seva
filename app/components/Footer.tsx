'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const NAV_LINKS = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Disclaimer',       href: '/disclaimer' },
];

export default function Footer() {
  const { t } = useI18n();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#16213E' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-heading font-bold text-2xl mb-2">
              <span className="text-white">Nanded</span><span style={{ color: '#34C77B' }}>Seva</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/918421222893?text=Hello%20NandedSeva%2C%20I%20would%20like%20to%20book%20a%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ background: '#34C77B' }}
              >
                <MessageCircle size={16} color="white" />
              </a>
              <a
                href="tel:+918421222893"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ background: '#0F3460' }}
              >
                <Phone size={16} color="white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} className="mb-2" />
              </li>
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-white mb-4">{t('footer.contactUs')}</h4>
            <div className="space-y-3">
              <a
                href="tel:+918421222893"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Phone size={15} color="#34C77B" />
                +91 84212 22893
              </a>
              <a
                href="mailto:contact@nandedseva.com"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Mail size={15} color="#34C77B" />
                contact@nandedseva.com
              </a>
              <div
                className="flex items-start gap-3 text-sm"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <MapPin size={15} color="#34C77B" className="mt-0.5 shrink-0" />
                {t('footer.address')}
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t text-center text-xs flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0"
          style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)' }}
        >
          <span>© 2026 NandedSeva. All rights reserved.</span>
          <span className="hidden sm:inline mx-2" style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span className="flex gap-3">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center gap-3">
                {i > 0 && <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>}
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
