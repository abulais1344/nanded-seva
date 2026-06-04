'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner() {
  const [prompt, setPrompt]     = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible]   = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Don't show if already installed or dismissed in this session
    const dismissed = sessionStorage.getItem('ns-install-dismissed');
    if (dismissed) return;

    // Don't show if running as installed PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      // Show banner after 30 seconds
      setTimeout(() => setVisible(true), 30000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setVisible(false);
      setInstalled(true);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setVisible(false);
    setPrompt(null);
  };

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('ns-install-dismissed', '1');
  };

  if (installed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="fixed bottom-[88px] left-3 right-3 z-50 md:hidden rounded-2xl shadow-2xl overflow-hidden"
          style={{ background: '#0F3460', border: '1px solid rgba(52,199,123,0.3)' }}
        >
          <div className="flex items-center gap-3 px-4 py-3.5">
            {/* App icon mini */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-heading font-bold text-sm"
              style={{ background: 'linear-gradient(135deg,#1a4a7a,#16213E)', border: '1.5px solid rgba(52,199,123,0.4)' }}
            >
              <span className="text-white">N</span><span style={{ color: '#34C77B' }}>S</span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">
                Install NandedSeva App
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Add to home screen for quick bookings
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstall}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full"
                style={{ background: '#34C77B', color: '#fff' }}
              >
                <Download size={13} />
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-full"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Green progress bar — visual accent */}
          <div className="h-0.5 w-full" style={{ background: 'rgba(52,199,123,0.25)' }}>
            <motion.div
              className="h-full"
              style={{ background: '#34C77B' }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 15, ease: 'linear' }}
              onAnimationComplete={handleDismiss}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
