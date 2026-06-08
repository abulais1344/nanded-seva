'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  ArrowLeft,
  MessageCircle,
  Zap,
  Droplets,
  Wind,
  Thermometer,
  Truck,
  HelpCircle,
} from 'lucide-react';
import { useI18n, type Locale } from '@/lib/i18n';

// ─── Context ──────────────────────────────────────────────────────────────────

interface BookingContextType {
  openModal: (service?: string) => void;
}

const BookingContext = createContext<BookingContextType>({ openModal: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

// ─── State ────────────────────────────────────────────────────────────────────

type ModalState =
  | { open: false }
  | { open: true; step: 1 }
  | { open: true; step: 2; service: string; fromStep1: boolean };

// ─── Provider ─────────────────────────────────────────────────────────────────

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>({ open: false });

  const openModal = useCallback((svc?: string) => {
    if (svc) {
      setState({ open: true, step: 2, service: svc, fromStep1: false });
    } else {
      setState({ open: true, step: 1 });
    }
  }, []);

  const close = useCallback(() => setState({ open: false }), []);

  const selectService = useCallback((svc: string) => {
    setState({ open: true, step: 2, service: svc, fromStep1: true });
  }, []);

  const goBack = useCallback(() => setState({ open: true, step: 1 }), []);

  return (
    <BookingContext.Provider value={{ openModal }}>
      {children}
      <AnimatePresence>
        {state.open && (
          <ModalShell
            key="booking-modal"
            state={state}
            onClose={close}
            onSelectService={selectService}
            onBack={goBack}
          />
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}

// ─── Quick-select service options ─────────────────────────────────────────────

const QUICK_SERVICES = [
  { tKey: 'plumber',       Icon: Droplets,    color: '#3B82F6' },
  { tKey: 'electrician',   Icon: Zap,         color: '#F59E0B' },
  { tKey: 'acRepair',      Icon: Wind,        color: '#06B6D4' },
  { tKey: 'fridgeRepair',  Icon: Thermometer, color: '#10B981' },
  { tKey: 'packersMovers', Icon: Truck,       color: '#F97316' },
  { tKey: 'other',         Icon: HelpCircle,  color: '#6B7280' },
] as const;

// ─── WhatsApp message builder ─────────────────────────────────────────────────

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '918421222893';

function buildWAMessage(
  locale: Locale,
  service: string,
  name: string,
  phone: string,
  problem: string,
): string {
  if (locale === 'hi') {
    return `नमस्ते NandedSeva, मुझे ${service} चाहिए।\nनाम: ${name}\nफोन: ${phone}\nसमस्या: ${problem}`;
  }
  if (locale === 'mr') {
    return `नमस्कार NandedSeva, मला ${service} हवी आहे.\nनाव: ${name}\nफोन: ${phone}\nसमस्या: ${problem}`;
  }
  return `Hi NandedSeva, I need ${service}.\nName: ${name}\nPhone: ${phone}\nProblem: ${problem}`;
}

// ─── Modal shell — backdrop + bottom sheet ────────────────────────────────────

interface ShellProps {
  state: Extract<ModalState, { open: true }>;
  onClose: () => void;
  onSelectService: (svc: string) => void;
  onBack: () => void;
}

function ModalShell({ state, onClose, onSelectService, onBack }: ShellProps) {
  const { t, locale } = useI18n();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 z-[100]"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {state.step === 1 ? (
          <Step1 t={t} onClose={onClose} onSelect={onSelectService} />
        ) : (
          <Step2
            t={t}
            locale={locale}
            service={state.service}
            fromStep1={state.fromStep1}
            onClose={onClose}
            onBack={onBack}
          />
        )}
      </motion.div>
    </>
  );
}

// ─── Step 1 — service selector ────────────────────────────────────────────────

function Step1({
  t,
  onClose,
  onSelect,
}: {
  t: (k: string) => string;
  onClose: () => void;
  onSelect: (svc: string) => void;
}) {
  return (
    <div className="px-5 pb-8 pt-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading font-bold text-lg text-gray-900">
          {t('bookingModal.selectService')}
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {QUICK_SERVICES.map(({ tKey, Icon, color }) => (
          <button
            key={tKey}
            onClick={() => onSelect(t(`bookingModal.${tKey}`))}
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:border-[#0F3460] hover:shadow-md transition-all text-left active:scale-95"
            style={{ boxShadow: '0 2px 8px rgba(15,52,96,0.06)' }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${color}18` }}
            >
              <Icon size={18} color={color} />
            </div>
            <span className="text-sm font-semibold text-gray-800 leading-tight">
              {t(`bookingModal.${tKey}`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2 — details form ────────────────────────────────────────────────────

interface FormState {
  name: string;
  phone: string;
  problem: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  problem?: string;
}

function Step2({
  t,
  locale,
  service,
  fromStep1,
  onClose,
  onBack,
}: {
  t: (k: string) => string;
  locale: Locale;
  service: string;
  fromStep1: boolean;
  onClose: () => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', problem: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const errs: FormErrors = {};
    if (form.name.trim().length < 2) errs.name = t('bookingModal.nameTooShort');
    if (!/^\d{10}$/.test(form.phone.trim())) errs.phone = t('bookingModal.phoneInvalid');
    if (form.problem.trim().length < 5) errs.problem = t('bookingModal.problemTooShort');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const msg = buildWAMessage(
      locale,
      service,
      form.name.trim(),
      form.phone.trim(),
      form.problem.trim(),
    );
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer',
    );
    onClose();
  }

  function update(key: keyof FormState, value: string) {
    setForm(f => ({ ...f, [key]: value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }));
  }

  return (
    <div className="px-5 pb-8 pt-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        {fromStep1 && (
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={t('bookingModal.back')}
          >
            <ArrowLeft size={20} className="text-gray-500" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide truncate" style={{ color: '#34C77B' }}>
            {service}
          </p>
          <h2 className="font-heading font-bold text-lg text-gray-900 leading-tight">
            {t('booking.title')}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors shrink-0"
          aria-label="Close"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            {t('bookingModal.name')}
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder={t('bookingModal.name')}
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
              errors.name
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 bg-gray-50 focus:border-[#0F3460] focus:bg-white'
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            {t('bookingModal.phone')}
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => update('phone', e.target.value.replace(/\D/g, ''))}
            placeholder="98765 43210"
            maxLength={10}
            inputMode="numeric"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
              errors.phone
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 bg-gray-50 focus:border-[#0F3460] focus:bg-white'
            }`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* Problem */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            {t('bookingModal.problem')}
          </label>
          <textarea
            value={form.problem}
            onChange={e => update('problem', e.target.value)}
            placeholder={t('bookingModal.problemPlaceholder')}
            rows={2}
            maxLength={200}
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none ${
              errors.problem
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 bg-gray-50 focus:border-[#0F3460] focus:bg-white'
            }`}
          />
          {errors.problem && <p className="text-xs text-red-500 mt-1">{errors.problem}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 shadow-lg mt-1"
          style={{ background: '#34C77B' }}
        >
          <MessageCircle size={18} />
          {t('bookingModal.submit')}
        </button>
      </form>
    </div>
  );
}
