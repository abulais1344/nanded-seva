import type { Locale } from './i18n';

// ── Name translations (English DB name → locale display name) ─────────────────
const NAME_MAP: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
  hi: {
    'Electrician':               'इलेक्ट्रीशियन',
    'AC Repair & Installation':  'AC मरम्मत और इंस्टॉलेशन',
    'Plumbing':                  'प्लंबिंग',
    'RO Water Filter Service':   'RO वॉटर फिल्टर सर्विस',
    'Mistri Work':               'मिस्त्री काम',
    'Painting':                  'पेंटिंग',
    'Washing Machine Repair':    'वॉशिंग मशीन मरम्मत',
    'Driver for a Day':          'एक दिन के लिए ड्राइवर',
    'Car Rental':                'कार किराया',
    'Outstation Taxi Booking':   'आउटस्टेशन टैक्सी बुकिंग',
    'Airport Pickup & Drop':     'एयरपोर्ट पिकअप और ड्रॉप',
    'Nanded to Hyderabad Taxi':  'नांदेड से हैदराबाद टैक्सी',
    'Nanded to Pune Taxi':       'नांदेड से पुणे टैक्सी',
    'Packers & Movers':          'पैकर्स और मूवर्स',
  },
  mr: {
    'Electrician':               'इलेक्ट्रिशियन',
    'AC Repair & Installation':  'AC दुरुस्ती आणि इन्स्टॉलेशन',
    'Plumbing':                  'प्लंबिंग',
    'RO Water Filter Service':   'RO वॉटर फिल्टर सर्व्हिस',
    'Mistri Work':               'मिस्त्री काम',
    'Painting':                  'रंगकाम',
    'Washing Machine Repair':    'वॉशिंग मशीन दुरुस्ती',
    'Driver for a Day':          'एक दिवसासाठी ड्रायव्हर',
    'Car Rental':                'कार भाड्याने',
    'Outstation Taxi Booking':   'आउटस्टेशन टॅक्सी बुकिंग',
    'Airport Pickup & Drop':     'विमानतळ पिकअप आणि ड्रॉप',
    'Nanded to Hyderabad Taxi':  'नांदेड ते हैदराबाद टॅक्सी',
    'Nanded to Pune Taxi':       'नांदेड ते पुणे टॅक्सी',
    'Packers & Movers':          'पॅकर्स आणि मूव्हर्स',
  },
};

// ── Description keys (English DB name → key in common.json) ─────────────────
const DESC_KEY: Record<string, string> = {
  'Electrician':              'services.electricianDesc',
  'AC Repair & Installation': 'services.acRepairDesc',
  'Plumbing':                 'services.plumbingDesc',
  'RO Water Filter Service':  'services.roServiceDesc',
  'Mistri Work':              'services.mistriWorkDesc',
  'Painting':                 'services.paintingDesc',
  'Washing Machine Repair':   'services.washingMachineDesc',
  'Driver for a Day':         'services.driverDayDesc',
  'Car Rental':               'services.carRentalDesc',
  'Outstation Taxi Booking':  'services.outstationTaxiDesc',
  'Airport Pickup & Drop':    'services.airportPickupDesc',
  'Nanded to Hyderabad Taxi': 'services.nandedHydDesc',
  'Nanded to Pune Taxi':      'services.nandedPuneDesc',
};

/** Returns the translated service name, falling back to the English DB value. */
export function getServiceName(englishName: string, locale: Locale): string {
  if (locale === 'en') return englishName;
  return NAME_MAP[locale]?.[englishName] ?? englishName;
}

/**
 * Returns the translated description.
 * Pass the i18n `t` function so it reads from the already-loaded common.json.
 * Falls back to the raw English description from the DB.
 */
export function getServiceDesc(
  englishName: string,
  englishDesc: string | null,
  t: (key: string) => string,
  locale: Locale,
): string {
  if (locale === 'en') return englishDesc ?? '';
  const key = DESC_KEY[englishName];
  if (!key) return englishDesc ?? '';
  const translated = t(key);
  // t() returns the key itself if not found — fall back to English in that case
  return translated === key ? (englishDesc ?? '') : translated;
}
