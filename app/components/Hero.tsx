'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Phone, Zap, Shield, Tag } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

function FadeUp({ delay, children, className }: { delay: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

const BADGES = [
  { icon: Shield, key: 'hero.badge1' },
  { icon: Zap, key: 'hero.badge2' },
  { icon: Tag, key: 'hero.badge3' },
];

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F3460 0%, #16213E 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: '#34C77B' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: '#34C77B' }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Tagline pill */}
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#34C77B' }} />
              {t('hero.tagline')}
            </div>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.12}>
            <h1
              className="font-heading font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)' }}
            >
              {t('hero.headline')}{' '}
              <span style={{ color: '#34C77B' }}>{t('hero.headlineAccent')}</span>
            </h1>
          </FadeUp>

          {/* Subheadline */}
          <FadeUp delay={0.24}>
            <p
              className="text-base sm:text-lg mb-8 leading-relaxed max-w-2xl"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {t('hero.subheadline')}
            </p>
          </FadeUp>

          {/* CTA Buttons */}
          <FadeUp delay={0.36}>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-4 rounded-xl text-sm sm:text-base transition-all hover:opacity-90 active:scale-95 min-h-[48px]"
                style={{ background: '#34C77B' }}
              >
                {t('hero.bookService')}
              </a>

              <a
                href="https://wa.me/918421222893?text=Hello%20NandedSeva%2C%20I%20would%20like%20to%20book%20a%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-4 rounded-xl text-sm sm:text-base transition-all hover:opacity-90 active:scale-95 min-h-[48px]"
                style={{ background: '#34C77B' }}
              >
                <MessageCircle size={18} />
                {t('hero.whatsappNow')}
              </a>

              <a
                href="tel:+918421222893"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-4 rounded-xl text-sm sm:text-base transition-all hover:bg-white/20 active:scale-95 min-h-[48px]"
              >
                <Phone size={18} />
                {t('hero.callNow')}
              </a>
            </div>
          </FadeUp>

          {/* Trust Badges */}
          <FadeUp delay={0.48}>
            <div className="flex flex-wrap gap-3">
              {BADGES.map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                >
                  <Icon size={14} color="#34C77B" />
                  <span className="text-xs sm:text-sm font-medium text-white/90">{t(key)}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 40C1200 80 720 0 0 40L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
