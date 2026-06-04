import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F3460',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(52,199,123,0.12)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(52,199,123,0.08)', display: 'flex' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 20 }}>
          <span style={{ color: '#ffffff', fontSize: 88, fontWeight: 700, letterSpacing: '-2px' }}>Nanded</span>
          <span style={{ color: '#34C77B', fontSize: 88, fontWeight: 700, letterSpacing: '-2px' }}>Seva</span>
        </div>

        {/* Tagline */}
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 34, textAlign: 'center', maxWidth: 760, lineHeight: 1.4, marginBottom: 36 }}>
          Trusted Home &amp; Travel Services in Nanded
        </div>

        {/* Service pills */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900 }}>
          {['Electrician', 'AC Repair', 'Plumbing', 'Drivers', 'Car Rental', 'Mistri Work'].map((s) => (
            <div
              key={s}
              style={{
                background: 'rgba(52,199,123,0.18)',
                border: '1.5px solid rgba(52,199,123,0.45)',
                color: '#34C77B',
                padding: '8px 22px',
                borderRadius: 100,
                fontSize: 22,
                fontWeight: 600,
                display: 'flex',
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 22, marginTop: 44, letterSpacing: '1px' }}>
          nandedseva.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
