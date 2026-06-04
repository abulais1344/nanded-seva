'use client';

export default function OfflinePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-content px-6 text-center"
      style={{ background: 'linear-gradient(135deg,#0F3460 0%,#16213E 100%)', justifyContent: 'center' }}
    >
      {/* Logo */}
      <div className="font-heading font-bold text-4xl tracking-tight mb-2">
        <span className="text-white">Nanded</span>
        <span style={{ color: '#34C77B' }}>Seva</span>
      </div>

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center my-8"
        style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)' }}
      >
        <svg width="36" height="36" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M5.636 5.636a9 9 0 000 12.728M8.464 8.464a5 5 0 000 7.072M12 12h.01" />
        </svg>
      </div>

      <h1 className="font-heading font-bold text-white text-2xl mb-3">
        No Internet Connection
      </h1>
      <p className="text-sm mb-8 max-w-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
        Looks like you are offline. Please check your connection and try again.
      </p>

      {/* WhatsApp CTA — always works as it opens the WA app */}
      <a
        href="https://wa.me/918421222893?text=Hello%20NandedSeva%2C%20I%20would%20like%20to%20book%20a%20service."
        className="flex items-center gap-2 font-semibold text-white px-7 py-3.5 rounded-full mb-4 text-sm"
        style={{ background: '#34C77B' }}
      >
        WhatsApp Us to Book
      </a>

      <button
        onClick={() => window.location.reload()}
        className="text-sm font-medium px-6 py-2.5 rounded-full"
        style={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        Try Again
      </button>

      <p className="mt-10 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
        +91 84212 22893 · nandedseva.com
      </p>
    </div>
  );
}
