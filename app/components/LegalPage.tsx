import Navbar from './Navbar';
import Footer from './Footer';

export interface LegalSection {
  id: string;
  title: string;
}

interface LegalPageProps {
  title: string;
  sections: LegalSection[];
  children: React.ReactNode;
}

export default function LegalPage({ title, sections, children }: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero banner */}
        <div
          className="py-12 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #0F3460 0%, #16213E 100%)' }}
        >
          <h1
            className="font-heading font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}
          >
            {title}
          </h1>
          <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Last Updated: June 2026
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 pb-16">
          {/* Anchor navigation */}
          <div className="mb-10 p-4 rounded-xl border border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Contents
            </p>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors hover:bg-[#0F3460] hover:text-white hover:border-[#0F3460]"
                  style={{ borderColor: '#0F3460', color: '#0F3460' }}
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Page content */}
          <div className="space-y-10">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ── Reusable section wrapper ─────────────────────────────────────────────── */

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2
        className="font-heading font-bold text-lg sm:text-xl mb-3 pb-2 border-b border-gray-100"
        style={{ color: '#0F3460' }}
      >
        {title}
      </h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

/* ── Alert box (for critical clauses) ────────────────────────────────────── */

export function LegalAlert({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 text-sm leading-relaxed border-l-4"
      style={{ background: '#FEF2F2', borderColor: '#EF4444', color: '#991B1B' }}
    >
      {children}
    </div>
  );
}

/* ── Numbered steps ──────────────────────────────────────────────────────── */

export function LegalSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-2 list-none">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
            style={{ background: '#0F3460' }}
          >
            {i + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}
