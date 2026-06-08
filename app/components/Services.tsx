'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Settings } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { supabase, type Service } from '@/lib/supabase';
import { getIcon, getColor } from '@/lib/services';
import { getServiceName, getServiceDesc } from '@/lib/serviceI18n';
import { trackServiceClick } from '@/lib/analytics';
import { useBooking } from '@/app/components/BookingModal';

type Category = 'all' | 'home' | 'travel';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 flex flex-col gap-3 animate-pulse"
      style={{ boxShadow: '0 2px 16px rgba(15,52,96,0.08)' }}>
      <div className="w-11 h-11 rounded-xl bg-gray-100" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
      </div>
      <div className="h-8 bg-gray-100 rounded-lg" />
    </div>
  );
}

export default function Services() {
  const { t } = useI18n();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Category>('all');

  useEffect(() => {
    supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data) setServices(data as Service[]);
        setLoading(false);
      });
  }, []);

  const filtered = active === 'all'
    ? services
    : services.filter(s => s.category === active);

  const tabs: { key: Category; label: string }[] = [
    { key: 'all',    label: t('services.all') },
    { key: 'home',   label: t('services.home') },
    { key: 'travel', label: t('services.travel') },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading font-bold mb-3"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#0F3460' }}>
            {t('services.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white border border-gray-200 rounded-full p-1 gap-1 shadow-sm">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActive(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  active === tab.key ? 'text-white shadow-sm' : 'text-gray-600 hover:text-[#0F3460]'
                }`}
                style={active === tab.key ? { background: '#0F3460' } : {}}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} t={t} />
              ))
          }
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, t }: { service: Service; index: number; t: (k: string) => string }) {
  const { locale } = useI18n();
  const { openModal } = useBooking();
  const Icon = getIcon(service.icon);
  const color = getColor(service.icon);
  const displayName = getServiceName(service.name, locale);
  const displayDesc = getServiceDesc(service.name, service.description, t, locale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.07, duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(15,52,96,0.16)' }}
      className="bg-white rounded-xl p-4 sm:p-5 flex flex-col gap-3"
      style={{ boxShadow: '0 2px 16px rgba(15,52,96,0.08)' }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15` }}>
        <Icon size={22} color={color} />
      </div>
      <div className="flex-1">
        <h3 className="font-heading font-semibold text-sm sm:text-base text-gray-900 mb-1 leading-tight">
          {displayName}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {displayDesc}
        </p>
      </div>
      <button
        onClick={() => { trackServiceClick(service.name); openModal(displayName); }}
        className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-white transition-all active:scale-95 min-h-[36px] w-full"
        style={{ background: '#34C77B' }}
      >
        <MessageCircle size={13} />
        {t('services.bookNow')}
      </button>
    </motion.div>
  );
}
