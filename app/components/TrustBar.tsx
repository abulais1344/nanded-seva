'use client';

import { ShieldCheck, Zap, IndianRupee, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const ITEMS = [
  { icon: ShieldCheck, key: 'trustBar.verified', color: '#0F3460' },
  { icon: Zap, key: 'trustBar.sameDay', color: '#34C77B' },
  { icon: IndianRupee, key: 'trustBar.fairPricing', color: '#0F3460' },
  { icon: MapPin, key: 'trustBar.localExperts', color: '#34C77B' },
];

export default function TrustBar() {
  const { t } = useI18n();
  return (
    <section className="py-6 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ITEMS.map(({ icon: Icon, key, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${color}15` }}
              >
                <Icon size={20} color={color} />
              </div>
              <span className="text-sm font-semibold text-gray-800">{t(key)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
