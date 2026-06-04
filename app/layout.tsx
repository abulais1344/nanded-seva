import type { Metadata } from 'next';
import { Sora, Noto_Sans } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600'],
  variable: '--font-noto',
  display: 'swap',
});

const SITE_URL = 'https://www.nandedseva.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'NandedSeva | Electrician, Plumbing, AC Repair, Drivers & Car Rentals in Nanded',
  description:
    'NandedSeva provides trusted electricians, plumbers, AC repair, RO service, Mistri work, drivers and car rental services across Nanded, Maharashtra.',
  keywords:
    'Electrician Nanded, Plumber Nanded, AC Repair Nanded, RO Service Nanded, Mistri Nanded, Driver Nanded, Car Rental Nanded, Taxi Service Nanded, Home Services Nanded',
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'NandedSeva',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'NandedSeva | Trusted Home & Travel Services in Nanded',
    description:
      'Book verified electricians, plumbers, AC technicians, drivers and rental vehicles in Nanded.',
    url: SITE_URL,
    siteName: 'NandedSeva',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'NandedSeva — Trusted Home & Travel Services in Nanded',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NandedSeva | Trusted Home & Travel Services in Nanded',
    description:
      'Book verified electricians, plumbers, AC technicians, drivers and rental vehicles in Nanded.',
    images: ['/api/og'],
  },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NandedSeva',
  url: SITE_URL,
  telephone: '+918421222893',
  email: 'contact@nandedseva.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nanded',
    addressRegion: 'Maharashtra',
    postalCode: '431601',
    addressCountry: 'IN',
  },
  areaServed: 'Nanded',
  description:
    'Trusted home and travel services in Nanded — electricians, plumbers, AC repair, drivers, car rentals and more.',
  priceRange: '₹₹',
  sameAs: [`https://wa.me/918421222893`],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${notoSans.variable}`}>
      <head>
        <meta name="theme-color" content="#0F3460" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .catch(function(err) { console.log('SW registration failed:', err); });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col"
        style={{ fontFamily: 'var(--font-noto), sans-serif' }}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
