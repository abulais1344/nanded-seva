'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useBooking } from '@/app/components/BookingModal';

export default function FloatingButtons() {
  const { t } = useI18n();
  const { openModal } = useBooking();
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Floating WA + Call — mobile only at bottom */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-between px-4 pointer-events-none md:hidden">
        <button
          onClick={() => openModal()}
          className="pointer-events-auto flex items-center gap-2 text-white font-semibold text-sm px-5 py-3 rounded-full shadow-xl active:scale-95 transition-transform min-h-[48px]"
          style={{ background: '#34C77B' }}
        >
          <MessageCircle size={18} />
          {t('hero.whatsappNow')}
        </button>

        <a
          href="tel:+918421222893"
          className="pointer-events-auto flex items-center gap-2 text-white font-semibold text-sm px-5 py-3 rounded-full shadow-xl active:scale-95 transition-transform min-h-[48px]"
          style={{ background: '#0F3460' }}
        >
          <Phone size={18} />
          {t('hero.callNow')}
        </a>
      </div>

      {/* Desktop WA button (bottom-right) */}
      <button
        onClick={() => openModal()}
        className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full items-center justify-center shadow-xl hover:scale-110 transition-transform"
        style={{ background: '#34C77B' }}
        title="Book a Service"
      >
        <MessageCircle size={26} color="white" />
      </button>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollTop}
            className="fixed bottom-24 right-4 md:bottom-24 md:right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-white transition-transform hover:scale-110 active:scale-95"
            style={{ background: '#0F3460' }}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
