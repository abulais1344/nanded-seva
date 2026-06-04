'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Users, MapPin, Heart, Zap, Star } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

const VALUES = [
  { icon: ShieldCheck, title: 'Trust & Transparency', desc: 'Every professional is background-verified. No surprises, no hidden charges — just honest, reliable service.', color: '#0F3460' },
  { icon: Zap, title: 'Speed & Reliability', desc: 'We understand your time matters. Most requests are fulfilled same-day or next-day across Nanded.', color: '#34C77B' },
  { icon: MapPin, title: 'Rooted in Nanded', desc: 'We are not a distant startup. We live here, we know the city, and we employ local talent from Nanded.', color: '#F59E0B' },
  { icon: Heart, title: 'Customer First', desc: 'Your satisfaction is our measure of success. We follow up on every booking to ensure you are happy.', color: '#EC4899' },
  { icon: Users, title: 'Empowering Workers', desc: 'We help local electricians, plumbers, drivers, and contractors earn better and reach more customers.', color: '#8B5CF6' },
  { icon: Star, title: 'Quality Every Time', desc: 'We maintain strict quality standards. Any professional who does not meet our bar is not on our platform.', color: '#06B6D4' },
];

const STATS = [
  { number: '500+', label: 'Happy Customers' },
  { number: '50+', label: 'Verified Professionals' },
  { number: '13', label: 'Services Offered' },
  { number: '4.9★', label: 'Average Rating' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-[100px] md:pb-10">
        {/* Hero */}
        <div
          className="pt-24 pb-16 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #0F3460 0%, #16213E 100%)' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            About <span style={{ color: '#34C77B' }}>NandedSeva</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            Nanded's trusted platform for home services and travel — connecting local professionals with families who need them.
          </motion.p>
        </div>

        {/* Stats bar */}
        <div className="bg-white border-b border-gray-100 py-8">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="font-heading font-bold text-2xl sm:text-3xl" style={{ color: '#0F3460' }}>
                  {stat.number}
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: '#34C77B20', color: '#34C77B' }}
              >
                Our Story
              </span>
              <h2
                className="font-heading font-bold mb-4 leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#0F3460' }}
              >
                Built for Nanded, by people who call it home
              </h2>
              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  NandedSeva was born out of a simple frustration — finding a reliable electrician, plumber, or driver in Nanded was harder than it should be. You had to rely on word-of-mouth, wait days, and often overpay for sub-standard work.
                </p>
                <p>
                  We set out to change that. We built a platform that connects Nanded families with verified, trained, local professionals — people from your own city who take pride in their work.
                </p>
                <p>
                  Today, NandedSeva serves hundreds of households across the city, from Shivajinagar to Cidco, for everything from a leaking tap to an outstation taxi to Hyderabad.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-8 text-white"
              style={{ background: 'linear-gradient(135deg, #0F3460, #16213E)' }}
            >
              <h3 className="font-heading font-bold text-xl mb-4">Our Mission</h3>
              <p className="leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
                To make quality home and travel services accessible, affordable, and trustworthy for every family in Nanded — while creating dignified livelihoods for local workers.
              </p>
              <h3 className="font-heading font-bold text-xl mb-4">Our Vision</h3>
              <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                To become the most trusted local services brand in Maharashtra's Tier-2 and Tier-3 cities, starting right here in Nanded.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section
          className="py-14 px-4"
          style={{ background: '#F8FAFC' }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="font-heading font-bold mb-2"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#0F3460' }}
              >
                What We Stand For
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">The principles that guide every booking we handle</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALUES.map(({ icon: Icon, title, desc, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-xl p-5 flex gap-4 items-start shadow-sm"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={20} color={color} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 text-center">
          <h2
            className="font-heading font-bold mb-3"
            style={{ fontSize: 'clamp(1.4rem, 4vw, 1.875rem)', color: '#0F3460' }}
          >
            Ready to experience the NandedSeva difference?
          </h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">Book a service today — same-day availability for most requests.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-sm sm:text-base transition-all hover:opacity-90"
            style={{ background: '#34C77B' }}
          >
            Book a Service
          </a>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
