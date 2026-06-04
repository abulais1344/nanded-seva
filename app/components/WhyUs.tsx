'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, IndianRupee, MapPin, Smartphone, Heart } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const CARDS = [
  { icon: ShieldCheck, titleKey: 'whyUs.verified', descKey: 'whyUs.verifiedDesc', color: '#0F3460' },
  { icon: Zap, titleKey: 'whyUs.quick', descKey: 'whyUs.quickDesc', color: '#34C77B' },
  { icon: IndianRupee, titleKey: 'whyUs.affordable', descKey: 'whyUs.affordableDesc', color: '#F59E0B' },
  { icon: MapPin, titleKey: 'whyUs.local', descKey: 'whyUs.localDesc', color: '#8B5CF6' },
  { icon: Smartphone, titleKey: 'whyUs.easyBooking', descKey: 'whyUs.easyBookingDesc', color: '#06B6D4' },
  { icon: Heart, titleKey: 'whyUs.satisfaction', descKey: 'whyUs.satisfactionDesc', color: '#EC4899' },
];

export default function WhyUs() {
  const { t } = useI18n();
  return (
    <section
      id="about"
      className="py-16 sm:py-20"
      style={{ background: 'linear-gradient(135deg, #0F3460 0%, #16213E 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            {t('whyUs.title')}
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {t('whyUs.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map(({ icon: Icon, titleKey, descKey, color }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="rounded-xl p-5 flex gap-4 items-start"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${color}20` }}
              >
                <Icon size={22} color={color} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-white mb-1">{t(titleKey)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {t(descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
