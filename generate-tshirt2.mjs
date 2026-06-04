import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const browser = await chromium.launch({ headless: true });
const page    = await browser.newPage();
await mkdir('./public/brand/tshirt', { recursive: true });

async function capture(html, file, w, h) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: file });
  console.log(`✓  ${file.split('/').pop()}`);
}

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }
body { overflow:hidden; }`;

// ── Reusable front tshirt SVG
function shirtFront(fill, shadow = 'rgba(0,0,0,0.18)') {
  const dark = fill === '#ffffff' ? '#e8e8e8' : fill === '#1B4332' ? '#163728' : fill === '#1a1a2e' ? '#14142a' : fill === '#111827' ? '#0d1117' : '#0d2d52';
  return `<svg width="320" height="360" viewBox="0 0 400 430" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="sh${fill.replace('#','')}"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="${shadow}"/></filter></defs>
    <path filter="url(#sh${fill.replace('#','')})" fill="${fill}" d="M130 0 C130 0,155 22,200 22 C245 22,270 0,270 0 L345 42 L400 85 L368 148 L308 115 L308 430 L92 430 L92 115 L32 148 L0 85 L55 42 Z"/>
    <path fill="${dark}" d="M130 0 C145 32,166 44,200 44 C234 44,255 32,270 0 C254 16,234 30,200 30 C166 30,146 16,130 0Z"/>
  </svg>`;
}

// ── Reusable back tshirt SVG (slightly different shade to indicate back)
function shirtBack(fill) {
  const shade = fill === '#ffffff' ? '#f0f0f0' : fill === '#1B4332' ? '#163728' : fill === '#1a1a2e' ? '#151528' : fill === '#111827' ? '#0d1117' : '#0c2a4a';
  const collar = fill === '#ffffff' ? '#ddd' : fill === '#1B4332' ? '#122e22' : fill === '#1a1a2e' ? '#111126' : fill === '#111827' ? '#090d13' : '#0a2440';
  return `<svg width="320" height="360" viewBox="0 0 400 430" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="shb${fill.replace('#','')}"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="rgba(0,0,0,0.15)"/></filter></defs>
    <path filter="url(#shb${fill.replace('#','')})" fill="${shade}" d="M130 0 C130 0,155 22,200 22 C245 22,270 0,270 0 L345 42 L400 85 L368 148 L308 115 L308 430 L92 430 L92 115 L32 148 L0 85 L55 42 Z"/>
    <path fill="${collar}" d="M130 0 C145 32,166 44,200 44 C234 44,255 32,270 0 C254 16,234 30,200 30 C166 30,146 16,130 0Z"/>
  </svg>`;
}

// ── SHIRT THEMES ──────────────────────────────────────────────────────────────
const THEMES = [
  {
    name: 'navy',
    label: 'Navy Blue',
    fill: '#0F3460',
    textMain: '#ffffff',
    textAccent: '#34C77B',
    textSub: 'rgba(255,255,255,0.5)',
    nsBox: 'rgba(255,255,255,0.1)',
    nsBorder: 'rgba(52,199,123,0.5)',
    nsText: '#fff',
    nsAccent: '#34C77B',
    divider: 'rgba(52,199,123,0.35)',
    bg: '#EEF2F7',
  },
  {
    name: 'black',
    label: 'Jet Black',
    fill: '#111827',
    textMain: '#ffffff',
    textAccent: '#34C77B',
    textSub: 'rgba(255,255,255,0.45)',
    nsBox: 'rgba(255,255,255,0.08)',
    nsBorder: 'rgba(52,199,123,0.5)',
    nsText: '#fff',
    nsAccent: '#34C77B',
    divider: 'rgba(52,199,123,0.3)',
    bg: '#E5E7EB',
  },
  {
    name: 'white',
    label: 'White',
    fill: '#ffffff',
    textMain: '#0F3460',
    textAccent: '#34C77B',
    textSub: '#94A3B8',
    nsBox: '#F1F5F9',
    nsBorder: 'rgba(15,52,96,0.25)',
    nsText: '#0F3460',
    nsAccent: '#34C77B',
    divider: 'rgba(15,52,96,0.12)',
    bg: '#DDE3EA',
  },
  {
    name: 'green',
    label: 'Bottle Green',
    fill: '#1B4332',
    textMain: '#ffffff',
    textAccent: '#ffffff',
    textSub: 'rgba(255,255,255,0.45)',
    nsBox: 'rgba(255,255,255,0.1)',
    nsBorder: 'rgba(255,255,255,0.4)',
    nsText: '#fff',
    nsAccent: '#fff',
    divider: 'rgba(255,255,255,0.2)',
    bg: '#E0EAE4',
  },
];

for (const t of THEMES) {
  await capture(`<!DOCTYPE html><html><head><style>${FONT}
    body { font-family:'Sora',Arial Black,sans-serif; background:${t.bg}; }
  </style></head><body>
  <div style="width:1100px;height:620px;display:flex;flex-direction:column;
    align-items:center;justify-content:center;gap:10px;padding:30px 40px;">

    <!-- header -->
    <div style="font-size:11px;font-weight:600;color:#94A3B8;letter-spacing:3px;
      text-transform:uppercase;margin-bottom:8px;">
      NandedSeva · ${t.label} Shirt · Front &amp; Back
    </div>

    <div style="display:flex;gap:60px;align-items:flex-start;">

      <!-- ── FRONT ─────────────────────────── -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
        <div style="font-size:10px;font-weight:700;color:#94A3B8;letter-spacing:3px;
          text-transform:uppercase;">FRONT</div>

        <div style="position:relative;width:320px;height:360px;">
          ${shirtFront(t.fill)}
          <!-- NS box on left chest -->
          <div style="position:absolute;top:68px;left:95px;display:flex;align-items:center;gap:11px;">
            <!-- NS rounded box -->
            <div style="width:46px;height:46px;border-radius:10px;
              background:${t.nsBox};border:1.5px solid ${t.nsBorder};
              display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <div style="display:flex;align-items:baseline;">
                <span style="font-size:17px;font-weight:700;color:${t.nsText};letter-spacing:-0.5px;">N</span>
                <span style="font-size:17px;font-weight:700;color:${t.nsAccent};letter-spacing:-0.5px;">S</span>
              </div>
            </div>
          </div>
        </div>

        <div style="font-size:10px;color:#94A3B8;text-align:center;line-height:1.6;">
          NS box · left chest<br>~5×5 cm
        </div>
      </div>

      <!-- ── BACK ──────────────────────────── -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
        <div style="font-size:10px;font-weight:700;color:#94A3B8;letter-spacing:3px;
          text-transform:uppercase;">BACK</div>

        <div style="position:relative;width:320px;height:360px;">
          ${shirtBack(t.fill)}

          <!-- back print centred -->
          <div style="position:absolute;top:55px;left:50%;transform:translateX(-50%);
            display:flex;flex-direction:column;align-items:center;gap:0;width:230px;">

            <!-- big NS -->
            <div style="display:flex;align-items:baseline;line-height:1;">
              <span style="font-size:80px;font-weight:700;color:${t.textMain};letter-spacing:-2px;">N</span>
              <span style="font-size:80px;font-weight:700;color:${t.textAccent};letter-spacing:-2px;">S</span>
            </div>

            <!-- green line -->
            <div style="width:48px;height:3px;background:${t.textAccent};
              border-radius:2px;margin:6px 0 10px;"></div>

            <!-- NandedSeva wordmark -->
            <div style="display:flex;align-items:baseline;margin-bottom:8px;">
              <span style="font-size:28px;font-weight:700;color:${t.textMain};letter-spacing:-0.5px;">Nanded</span>
              <span style="font-size:28px;font-weight:700;color:${t.textAccent};letter-spacing:-0.5px;">Seva</span>
            </div>

            <!-- divider -->
            <div style="width:100%;height:1px;background:${t.divider};margin-bottom:8px;"></div>

            <!-- Home & Travel Services -->
            <div style="font-size:11px;font-weight:600;color:${t.textSub};
              letter-spacing:2px;text-transform:uppercase;text-align:center;">
              Home &amp; Travel Services
            </div>

          </div>
        </div>

        <div style="font-size:10px;color:#94A3B8;text-align:center;line-height:1.6;">
          Centre back print<br>~18×20 cm
        </div>
      </div>

    </div>

    <!-- print info bar -->
    <div style="display:flex;gap:24px;margin-top:4px;">
      <div style="font-size:10px;color:#94A3B8;background:rgba(0,0,0,0.05);
        padding:5px 14px;border-radius:20px;">2 colour print</div>
      <div style="font-size:10px;color:#94A3B8;background:rgba(0,0,0,0.05);
        padding:5px 14px;border-radius:20px;">Screen print for 20+ shirts</div>
      <div style="font-size:10px;color:#94A3B8;background:rgba(0,0,0,0.05);
        padding:5px 14px;border-radius:20px;">Vinyl/DTF for small qty</div>
    </div>

  </div>
  </body></html>`,
  `./public/brand/tshirt/combo-${t.name}.png`, 1100, 620);
}

// ── ALL 4 on one sheet ────────────────────────────────────────────────────────
await capture(`<!DOCTYPE html><html><head><style>${FONT}
  body { font-family:'Sora',Arial Black,sans-serif; background:#0F3460; }
</style></head><body>
<div style="width:1200px;height:760px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;padding:40px;gap:24px;">

  <div style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.35);
    letter-spacing:4px;text-transform:uppercase;">NandedSeva · Front NS Chest + Back Print · All Colour Options</div>

  <div style="display:flex;gap:20px;align-items:stretch;">

    ${THEMES.map(t => `
    <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
      border-radius:18px;padding:20px 16px;display:flex;flex-direction:column;
      align-items:center;gap:12px;flex:1;">

      <!-- mini shirt front -->
      <div style="font-size:9px;font-weight:600;color:rgba(255,255,255,0.35);
        letter-spacing:2px;text-transform:uppercase;">FRONT</div>
      <div style="position:relative;width:130px;height:140px;flex-shrink:0;">
        ${shirtFront(t.fill, 'rgba(0,0,0,0.25)')}
        <div style="position:absolute;top:26px;left:36px;display:flex;align-items:center;gap:5px;">
          <div style="width:22px;height:22px;border-radius:5px;
            background:${t.nsBox};border:1px solid ${t.nsBorder};
            display:flex;align-items:center;justify-content:center;">
            <span style="font-size:8px;font-weight:700;color:${t.nsText};">N</span>
            <span style="font-size:8px;font-weight:700;color:${t.nsAccent};">S</span>
          </div>
        </div>
      </div>

      <!-- mini shirt back -->
      <div style="font-size:9px;font-weight:600;color:rgba(255,255,255,0.35);
        letter-spacing:2px;text-transform:uppercase;margin-top:4px;">BACK</div>
      <div style="position:relative;width:130px;height:140px;flex-shrink:0;">
        ${shirtBack(t.fill)}
        <div style="position:absolute;top:20px;left:50%;transform:translateX(-50%);
          display:flex;flex-direction:column;align-items:center;gap:2px;width:100px;">
          <div style="display:flex;align-items:baseline;line-height:1;">
            <span style="font-size:30px;font-weight:700;color:${t.textMain};letter-spacing:-1px;">N</span>
            <span style="font-size:30px;font-weight:700;color:${t.textAccent};letter-spacing:-1px;">S</span>
          </div>
          <div style="width:18px;height:1.5px;background:${t.textAccent};margin:2px 0 3px;"></div>
          <div style="display:flex;align-items:baseline;">
            <span style="font-size:10px;font-weight:700;color:${t.textMain};">Nanded</span>
            <span style="font-size:10px;font-weight:700;color:${t.textAccent};">Seva</span>
          </div>
          <div style="font-size:5.5px;color:${t.textSub};letter-spacing:1px;
            text-transform:uppercase;text-align:center;margin-top:2px;">Home &amp; Travel Services</div>
        </div>
      </div>

      <!-- colour chip + label -->
      <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
        <div style="width:16px;height:16px;border-radius:50%;background:${t.fill};
          border:1.5px solid rgba(255,255,255,0.2);flex-shrink:0;"></div>
        <span style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.7);">${t.label}</span>
      </div>

    </div>`).join('')}

  </div>

  <div style="font-size:10px;color:rgba(255,255,255,0.25);letter-spacing:1px;margin-top:4px;">
    Give any of these PNGs to your local screen printer · 2 colour print · ₹150–250 per shirt
  </div>
</div>
</body></html>`, './public/brand/tshirt/combo-all-colours.png', 1200, 760);

await browser.close();

console.log('\n✅  Done! Files in /public/brand/tshirt/');
console.log('  combo-navy.png');
console.log('  combo-black.png');
console.log('  combo-white.png');
console.log('  combo-green.png');
console.log('  combo-all-colours.png   ← overview sheet');
