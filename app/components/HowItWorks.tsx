'use client';

import { motion } from 'framer-motion';
import { Search, Send, UserCheck, CheckCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const STEPS = [
  { icon: Search, num: 1, titleKey: 'howItWorks.step1Title', descKey: 'howItWorks.step1Desc' },
  { icon: Send, num: 2, titleKey: 'howItWorks.step2Title', descKey: 'howItWorks.step2Desc' },
  { icon: UserCheck, num: 3, titleKey: 'howItWorks.step3Title', descKey: 'howItWorks.step3Desc' },
  { icon: CheckCircle, num: 4, titleKey: 'howItWorks.step4Title', descKey: 'howItWorks.step4Desc' },
];

export default function HowItWorks() {
  const { t } = useI18n();
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="font-heading font-bold mb-3"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#0F3460' }}
          >
            {t('howItWorks.title')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">{t('howItWorks.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5"
            style={{ background: 'linear-gradient(90deg, #34C77B, #0F3460)' }}
          />

          {STEPS.map(({ icon: Icon, num, titleKey, descKey }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 sm:mb-4 relative"
                style={{ background: 'linear-gradient(135deg, #0F3460, #1a4a7a)' }}
              >
                <Icon size={22} className="sm:hidden" color="#34C77B" />
                <Icon size={28} className="hidden sm:block" color="#34C77B" />
                <span
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ background: '#34C77B' }}
                >
                  {num}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2 text-base">
                {t(titleKey)}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{t(descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
