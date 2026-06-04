'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const TESTIMONIALS = [
  {
    name: 'Rajesh Kulkarni',
    area: 'Shivajinagar, Nanded',
    rating: 5,
    text: 'Excellent service! The electrician came within 2 hours and fixed all wiring issues. Very professional and affordable. Will definitely use NandedSeva again.',
  },
  {
    name: 'Priya Deshmukh',
    area: 'Vazirabad, Nanded',
    rating: 5,
    text: 'Booked AC repair through WhatsApp and got a technician the same evening. The AC is working perfectly now. Super fast and reliable service!',
  },
  {
    name: 'Mohammad Shaikh',
    area: 'Naganpura, Nanded',
    rating: 5,
    text: 'Used the Driver for a Day service for my wedding functions. The driver was punctual, polite, and knew all roads in Nanded. Highly recommended!',
  },
  {
    name: 'Sunita Patil',
    area: 'Vishnupuri, Nanded',
    rating: 5,
    text: 'RO water purifier was giving problems for weeks. NandedSeva sent a technician who fixed it in 30 minutes at a very reasonable price. Great experience!',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
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
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">{t('testimonials.subtitle')}</p>
        </motion.div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <Quote size={28} color="#34C77B" className="mb-3 opacity-60" />
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {TESTIMONIALS[current].text}
                </p>
                <Stars count={TESTIMONIALS[current].rating} />
                <div className="mt-3">
                  <p className="font-semibold text-gray-900 text-sm">{TESTIMONIALS[current].name}</p>
                  <p className="text-gray-500 text-xs">{TESTIMONIALS[current].area}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center items-center gap-4 mt-5">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === current ? '#0F3460' : '#CBD5E1' }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-5 shadow-md flex flex-col gap-3"
            >
              <Quote size={24} color="#34C77B" className="opacity-60" />
              <p className="text-gray-700 text-sm leading-relaxed flex-1">{testimonial.text}</p>
              <Stars count={testimonial.rating} />
              <div>
                <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                <p className="text-gray-500 text-xs">{testimonial.area}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
