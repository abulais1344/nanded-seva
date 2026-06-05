'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Locale = 'en' | 'hi' | 'mr';

type Translations = Record<string, unknown>;

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

const cache: Record<string, Translations> = {};

async function loadTranslations(locale: Locale): Promise<Translations> {
  if (cache[locale]) return cache[locale];
  const res = await fetch(`/locales/${locale}/common.json`);
  const data = await res.json();
  cache[locale] = data;
  return data;
}

function getNestedValue(obj: Translations, key: string): string {
  const parts = key.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof current === 'string' ? current : key;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const saved = localStorage.getItem('nandedseva-lang') as Locale | null;

    if (saved) {
      // Return visit — use saved preference, never override
      setLocaleState(saved);
      return;
    }

    // First visit — detect from browser language list
    const langs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    let detected: Locale = 'en';
    for (const lang of langs) {
      if (lang.startsWith('mr')) { detected = 'mr'; break; }
      if (lang.startsWith('hi')) { detected = 'hi'; break; }
    }

    // Save immediately so future visits skip detection
    localStorage.setItem('nandedseva-lang', detected);
    setLocaleState(detected);
  }, []);

  useEffect(() => {
    loadTranslations(locale).then(setTranslations);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('nandedseva-lang', l);
  }, []);

  const t = useCallback((key: string, fallback?: string) => {
    const val = getNestedValue(translations, key);
    return val === key ? (fallback ?? key) : val;
  }, [translations]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
