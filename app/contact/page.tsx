'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle, Loader2, Info } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { TALUKAS, FREE_TALUKA } from '@/lib/talukas';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';

const SERVICES_LIST = [
  'Electrician',
  'AC Repair & Installation',
  'Plumbing',
  'RO Water Filter Service',
  'Mistri Work',
  'Painting',
  'Washing Machine Repair',
  'Driver for a Day',
  'Car Rental',
  'Outstation Taxi Booking',
  'Airport Pickup & Drop',
  'Nanded to Hyderabad Taxi',
  'Nanded to Pune Taxi',
];

interface FormState {
  name: string;
  mobile: string;
  service: string;
  address: string;
  taluka: string;
  preferred_date: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: '', mobile: '', service: '', address: '',
  taluka: '', preferred_date: '', message: '',
};

function validateMobile(mobile: string) {
  return /^[6-9]\d{9}$/.test(mobile.trim());
}

export default function ContactPage() {
  const { t, locale } = useI18n();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value }));
      setErrors(err => ({ ...err, [key]: undefined }));
    };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.mobile.trim())  e.mobile  = 'Mobile number is required';
    else if (!validateMobile(form.mobile)) e.mobile = 'Enter a valid 10-digit Indian mobile number';
    if (!form.service)        e.service = 'Please select a service';
    if (!form.address.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    const { error } = await supabase.from('leads').insert({
      name:           form.name.trim(),
      mobile:         form.mobile.trim(),
      service:        form.service,
      address:        form.address.trim(),
      taluka:         form.taluka || null,
      preferred_date: form.preferred_date || null,
      message:        form.message.trim() || null,
      status:         'New',
      language:       locale,
    });

    if (error) { console.error(error); setStatus('error'); }
    else       { setStatus('success'); setForm(EMPTY_FORM); }
  };

  const showDistanceNote = form.taluka && form.taluka !== FREE_TALUKA;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-[100px] md:pb-10 bg-gray-50">
        {/* Hero */}
        <div className="pt-24 pb-12 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #0F3460 0%, #16213E 100%)' }}>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            {t('booking.title')}
          </motion.h1>
          <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Fill the form below or WhatsApp us directly — we respond within minutes
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading font-bold text-[#0F3460] text-lg mb-5">Contact Us</h2>
              <div className="space-y-4">
                <ContactItem icon={<Phone size={18} color="#34C77B" />}
                  label="Phone / WhatsApp" value="+91 84212 22893" href="tel:+918421222893" />
                <ContactItem icon={<MessageCircle size={18} color="#34C77B" />}
                  label="WhatsApp" value="Chat with us instantly"
                  href="https://wa.me/918421222893?text=Hello%20NandedSeva%2C%20I%20would%20like%20to%20book%20a%20service." external />
                <ContactItem icon={<Mail size={18} color="#34C77B" />}
                  label="Email" value="contact@nandedseva.com" href="mailto:contact@nandedseva.com" />
                <ContactItem icon={<MapPin size={18} color="#34C77B" />}
                  label="Location" value="Nanded, Maharashtra - 431601" />
              </div>
            </div>

            <a href="https://wa.me/918421222893?text=Hello%20NandedSeva%2C%20I%20would%20like%20to%20book%20a%20service."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-semibold text-sm sm:text-base shadow-md hover:opacity-90 transition-opacity"
              style={{ background: '#34C77B' }}>
              <MessageCircle size={20} />
              {t('hero.whatsappNow')}
            </a>

            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ height: 200 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60337.15!2d77.3152!3d19.1383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d5b7d4ae7e2f%3A0x3c9b6b6b6b6b6b6b!2sNanded%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625000000000"
                width="100%" height="200" style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="NandedSeva location" />
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-heading font-bold text-[#0F3460] text-lg mb-6">Book a Service</h2>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-4 mb-6">
                  <CheckCircle size={20} color="#16a34a" className="shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800 text-sm">Thank you! Our team will contact you shortly.</p>
                    <p className="text-green-700 text-xs mt-1 leading-relaxed">
                      A small visit charge applies for inspection, which is adjusted in the final bill if work proceeds.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-4 mb-6">
                  <AlertCircle size={20} color="#dc2626" className="shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{t('booking.error')}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={t('booking.name')} error={errors.name}>
                    <input type="text" value={form.name} onChange={set('name')}
                      placeholder="e.g. Rahul Patil" className={fieldClass(!!errors.name)} />
                  </Field>
                  <Field label={t('booking.mobile')} error={errors.mobile}>
                    <input type="tel" value={form.mobile} onChange={set('mobile')}
                      placeholder="10-digit mobile number" maxLength={10} inputMode="numeric"
                      className={fieldClass(!!errors.mobile)} />
                  </Field>
                </div>

                <Field label={t('booking.service')} error={errors.service}>
                  <select value={form.service} onChange={set('service')} className={fieldClass(!!errors.service)}>
                    <option value="">{t('booking.selectService')}</option>
                    {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>

                <Field label={t('booking.address')} error={errors.address}>
                  <input type="text" value={form.address} onChange={set('address')}
                    placeholder="e.g. Plot 12, Shivajinagar, Nanded" className={fieldClass(!!errors.address)} />
                </Field>

                {/* Taluka / Area dropdown */}
                <Field label="Area / Taluka">
                  <select value={form.taluka} onChange={set('taluka')} className={fieldClass(false)}>
                    <option value="">Select your area...</option>
                    {TALUKAS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {showDistanceNote && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                      <Info size={12} className="shrink-0 mt-0.5" />
                      Distance charges may apply if your technician travels from a different area. Our team will confirm before visit.
                    </motion.div>
                  )}
                </Field>

                <Field label={t('booking.date')}>
                  <input type="date" value={form.preferred_date} onChange={set('preferred_date')}
                    min={new Date().toISOString().split('T')[0]} className={fieldClass(false)} />
                </Field>

                <Field label={t('booking.message')}>
                  <textarea value={form.message} onChange={set('message')} rows={3}
                    placeholder="Any specific details about the work needed..."
                    className={`${fieldClass(false)} resize-none`} />
                </Field>

                <button type="submit" disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-xl text-sm sm:text-base transition-all hover:opacity-90 disabled:opacity-60 min-h-[52px]"
                  style={{ background: '#0F3460' }}>
                  {status === 'loading'
                    ? <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                    : t('booking.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

function fieldClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
    hasError
      ? 'border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50'
      : 'border-gray-200 focus:ring-2 focus:ring-[#0F3460]/20 focus:border-[#0F3460]'
  }`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function ContactItem({ icon, label, value, href, external }:
  { icon: React.ReactNode; label: string; value: string; href?: string; external?: boolean }) {
  const inner = (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#34C77B15' }}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
  if (!href) return inner;
  return (
    <a href={href} target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="hover:opacity-80 transition-opacity block">{inner}</a>
  );
}
