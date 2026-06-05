'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, X, Info } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { supabase, type Service } from '@/lib/supabase';
import { getIcon, getColor } from '@/lib/services';
import { getServiceName, getServiceDesc } from '@/lib/serviceI18n';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

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
        <div className="h-5 bg-gray-100 rounded-full w-1/2" />
      </div>
      <div className="h-8 bg-gray-100 rounded-lg" />
    </div>
  );
}

export default function ServicesPage() {
  const { t } = useI18n();
  const [category, setCategory] = useState<Category>('all');
  const [query, setQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

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

  const filtered = useMemo(() => {
    let list = category === 'all' ? services : services.filter(s => s.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        (s.description ?? '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [category, query, services]);

  const tabs: { key: Category; label: string }[] = [
    { key: 'all',    label: t('services.all') },
    { key: 'home',   label: t('services.home') },
    { key: 'travel', label: t('services.travel') },
  ];

  const homeServices  = filtered.filter(s => s.category === 'home');
  const travelServices = filtered.filter(s => s.category === 'travel');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pb-[100px] md:pb-10">

        {/* Hero — title only */}
        <div className="pt-24 pb-8 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #0F3460 0%, #16213E 100%)' }}>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            {t('services.title')}
          </motion.h1>
          <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {t('services.subtitle')}
          </p>
        </div>

        {/* Sticky search + filter bar */}
        <div className="sticky top-16 z-20 bg-white border-b border-gray-100 shadow-sm px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-[#34C77B] focus:bg-white transition-colors" />
              {query && (
                <button onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="inline-flex bg-gray-100 rounded-xl p-1 gap-1 shrink-0">
              {tabs.map(tab => (
                <button key={tab.key} onClick={() => setCategory(tab.key)}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    category === tab.key ? 'text-white shadow-sm' : 'text-gray-600 hover:text-[#0F3460]'
                  }`}
                  style={category === tab.key ? { background: '#0F3460' } : {}}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

          {/* Visit charge global note (home services) */}
          {(category === 'all' || category === 'home') && !loading && homeServices.length > 0 && (
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6 text-sm text-blue-700">
              <Info size={15} className="shrink-0 mt-0.5" />
              <span>Visit charge is adjusted in the final bill if work proceeds.</span>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No services found for &quot;{query}&quot;</p>
              <button onClick={() => setQuery('')} className="mt-3 text-sm text-[#0F3460] underline">
                Clear search
              </button>
            </div>
          ) : category === 'all' ? (
            <>
              {homeServices.length > 0 && (
                <ServiceGroup title={t('services.home')} items={homeServices} />
              )}
              {travelServices.length > 0 && (
                <ServiceGroup
                  title={t('services.travel')}
                  items={travelServices}
                  note="Travel charges depend on pickup/drop location. Our team will confirm the final fare before your booking."
                />
              )}
            </>
          ) : category === 'travel' ? (
            <ServiceGroup
              title={t('services.travel')}
              items={travelServices}
              note="Travel charges depend on pickup/drop location. Our team will confirm the final fare before your booking."
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

function formatCharge(value: string): string {
  const v = value.trim();
  if (!v || v.startsWith('₹') || /^free/i.test(v)) return v;
  return `₹${v}`;
}

function ServiceGroup({ title, items, note }: { title: string; items: Service[]; note?: string }) {
  return (
    <div className="mb-10">
      <h2 className="font-heading font-bold text-[#0F3460] text-xl mb-2">{title}</h2>
      {note && (
        <p className="text-xs text-gray-500 italic mb-4 flex items-start gap-1.5">
          <Info size={12} className="shrink-0 mt-0.5 text-gray-400" />
          {note}
        </p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { locale, t } = useI18n();
  const Icon = getIcon(service.icon);
  const color = getColor(service.icon);
  const displayName = getServiceName(service.name, locale);
  const displayDesc = getServiceDesc(service.name, service.description, t, locale);
  const waMsg = encodeURIComponent(`Hello NandedSeva, I would like to book: ${service.name}`);
  const isTravel = service.category === 'travel';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.06, duration: 0.45 }}
      whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(15,52,96,0.16)' }}
      className="bg-white rounded-xl p-4 sm:p-5 flex flex-col gap-3"
      style={{ boxShadow: '0 2px 16px rgba(15,52,96,0.08)' }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15` }}>
        <Icon size={22} color={color} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-sm sm:text-base text-gray-900 mb-1 leading-tight">
          {displayName}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">
          {displayDesc}
        </p>

        {/* Price badge */}
        {service.price && (
          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1"
            style={{ background: `${color}15`, color }}>
            {service.price}
          </span>
        )}

        {/* Visit charge or fare note */}
        {!isTravel && service.visit_charge ? (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {/^free/i.test(service.visit_charge.trim())
                ? formatCharge(service.visit_charge)
                : `${formatCharge(service.visit_charge)} visit charge`}
            </span>
          </div>
        ) : isTravel ? (
          <p className="text-xs text-gray-400 mt-1 italic">Fare confirmed before booking</p>
        ) : null}
      </div>

      <a href={`https://wa.me/918421222893?text=${waMsg}`}
        target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-white transition-all active:scale-95 min-h-[36px]"
        style={{ background: '#34C77B' }}>
        <MessageCircle size={13} />
        Book Now
      </a>
    </motion.div>
  );
}
