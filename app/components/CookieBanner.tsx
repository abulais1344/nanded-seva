'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'nandedseva-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] px-4 pb-4 sm:pb-5">
      <div
        className="max-w-4xl mx-auto rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl"
        style={{ background: '#0F3460' }}
      >
        <p className="text-white text-sm flex-1 leading-relaxed">
          We use cookies to improve your experience on NandedSeva. By continuing, you accept our{' '}
          <Link
            href="/privacy-policy"
            className="underline font-semibold"
            style={{ color: '#34C77B' }}
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={accept}
            className="flex-1 sm:flex-none text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all active:scale-95 hover:opacity-90"
            style={{ background: '#34C77B' }}
          >
            Accept
          </button>
          <Link
            href="/privacy-policy"
            className="flex-1 sm:flex-none text-center text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.35)', color: 'white' }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
