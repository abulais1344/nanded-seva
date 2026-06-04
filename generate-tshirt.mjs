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

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }
body { overflow:hidden; font-family:'Sora',Arial Black,sans-serif; }`;

// ── T-shirt SVG path (simple front silhouette)
const tshirtPath = (fill) => `
<svg viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-10%" y="-5%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.18)"/>
    </filter>
  </defs>
  <path filter="url(#shadow)" fill="${fill}" d="
    M 130 0
    C 130 0, 155 20, 200 20
    C 245 20, 270 0, 270 0
    L 340 40
    L 400 80
    L 370 140
    L 310 110
    L 310 420
    L 90 420
    L 90 110
    L 30 140
    L 0 80
    L 60 40
    Z
  "/>
  <!-- collar -->
  <path fill="${fill === '#1a1a2e' ? '#16162a' : fill === '#0F3460' ? '#0d2d52' : '#e8e8e8'}"
    d="M 130 0 C 145 30, 165 42, 200 42 C 235 42, 255 30, 270 0
       C 255 15, 235 28, 200 28 C 165 28, 145 15, 130 0 Z"/>
</svg>`;

// ══════════════════════════════════════════════════════════════
// 1. Navy shirt — Left chest small logo (most common style)
// ══════════════════════════════════════════════════════════════
await capture(`<!DOCTYPE html><html><head><style>${FONT}</style></head><body>
<div style="width:900px;height:700px;background:#F0F4F8;display:flex;align-items:center;
  justify-content:center;flex-direction:column;gap:20px;">

  <div style="font-family:'Sora',sans-serif;font-size:13px;font-weight:600;color:#94A3B8;
    letter-spacing:3px;text-transform:uppercase;margin-bottom:4px;">Style 1 — Left Chest Print · Navy Shirt</div>

  <div style="position:relative;width:400px;height:420px;">
    ${tshirtPath('#1a1a2e')}
    <!-- left chest logo -->
    <div style="position:absolute;top:90px;left:115px;display:flex;flex-direction:column;
      align-items:flex-start;gap:3px;">
      <div style="display:flex;align-items:baseline;line-height:1;">
        <span style="font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Nanded</span>
        <span style="font-size:28px;font-weight:700;color:#34C77B;letter-spacing:-0.5px;">Seva</span>
      </div>
      <div style="width:100%;height:2px;background:#34C77B;border-radius:1px;"></div>
      <div style="font-size:9px;color:rgba(255,255,255,0.55);letter-spacing:1.5px;
        text-transform:uppercase;">Home · Travel · Nanded</div>
    </div>
  </div>

  <div style="font-family:Arial,sans-serif;font-size:12px;color:#94A3B8;">
    Chest print area: ~8cm × 4cm · 2 colours
  </div>
</div>
</body></html>`, './public/brand/tshirt/style1-chest-navy.png', 900, 700);

// ══════════════════════════════════════════════════════════════
// 2. White shirt — Full front centre print
// ══════════════════════════════════════════════════════════════
await capture(`<!DOCTYPE html><html><head><style>${FONT}</style></head><body>
<div style="width:900px;height:700px;background:#F0F4F8;display:flex;align-items:center;
  justify-content:center;flex-direction:column;gap:20px;">

  <div style="font-family:'Sora',sans-serif;font-size:13px;font-weight:600;color:#94A3B8;
    letter-spacing:3px;text-transform:uppercase;margin-bottom:4px;">Style 2 — Full Front Centre · White Shirt</div>

  <div style="position:relative;width:400px;height:420px;">
    ${tshirtPath('#ffffff')}
    <!-- large centre print -->
    <div style="position:absolute;top:100px;left:50%;transform:translateX(-50%);
      display:flex;flex-direction:column;align-items:center;gap:8px;width:220px;">
      <!-- NS monogram -->
      <div style="display:flex;align-items:baseline;line-height:1;">
        <span style="font-size:72px;font-weight:700;color:#0F3460;letter-spacing:-2px;">N</span>
        <span style="font-size:72px;font-weight:700;color:#34C77B;letter-spacing:-2px;">S</span>
      </div>
      <div style="width:50px;height:3px;background:#34C77B;border-radius:2px;"></div>
      <div style="display:flex;align-items:baseline;">
        <span style="font-size:22px;font-weight:700;color:#0F3460;letter-spacing:-0.5px;">Nanded</span>
        <span style="font-size:22px;font-weight:700;color:#34C77B;letter-spacing:-0.5px;">Seva</span>
      </div>
      <div style="font-size:9px;color:#94A3B8;letter-spacing:2px;text-transform:uppercase;
        text-align:center;">Home &amp; Travel Services</div>
    </div>
  </div>

  <div style="font-family:Arial,sans-serif;font-size:12px;color:#94A3B8;">
    Front print area: ~18cm × 20cm · 2 colours
  </div>
</div>
</body></html>`, './public/brand/tshirt/style2-front-white.png', 900, 700);

// ══════════════════════════════════════════════════════════════
// 3. Navy shirt — Back full print with services
// ══════════════════════════════════════════════════════════════
await capture(`<!DOCTYPE html><html><head><style>${FONT}</style></head><body>
<div style="width:900px;height:700px;background:#F0F4F8;display:flex;align-items:center;
  justify-content:center;flex-direction:column;gap:20px;">

  <div style="font-family:'Sora',sans-serif;font-size:13px;font-weight:600;color:#94A3B8;
    letter-spacing:3px;text-transform:uppercase;margin-bottom:4px;">Style 3 — Back Print · Navy Shirt</div>

  <div style="position:relative;width:400px;height:420px;">
    ${tshirtPath('#1a1a2e')}
    <!-- back design (shown on front for preview) -->
    <div style="position:absolute;top:60px;left:50%;transform:translateX(-50%);
      display:flex;flex-direction:column;align-items:center;gap:7px;width:240px;">
      <div style="font-size:10px;color:rgba(255,255,255,0.4);letter-spacing:3px;
        text-transform:uppercase;">Est. 2024 · Nanded</div>
      <div style="width:30px;height:1.5px;background:rgba(52,199,123,0.5);"></div>
      <div style="display:flex;align-items:baseline;">
        <span style="font-size:40px;font-weight:700;color:#fff;letter-spacing:-1px;">Nanded</span>
        <span style="font-size:40px;font-weight:700;color:#34C77B;letter-spacing:-1px;">Seva</span>
      </div>
      <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1.5px;
        text-transform:uppercase;text-align:center;">Trusted Home &amp; Travel Services</div>
      <div style="width:100%;height:1px;background:rgba(52,199,123,0.25);margin:4px 0;"></div>
      <!-- service list -->
      <div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;">
        ${['Electrician','AC Repair','Plumbing','Mistri Work','Painting','RO Service','Drivers','Car Rental'].map(s =>
          `<span style="font-size:7.5px;color:rgba(255,255,255,0.55);background:rgba(255,255,255,0.07);
            padding:3px 8px;border-radius:20px;letter-spacing:0.5px;">${s}</span>`
        ).join('')}
      </div>
      <div style="width:100%;height:1px;background:rgba(52,199,123,0.25);margin:4px 0;"></div>
      <div style="font-size:9px;color:rgba(52,199,123,0.7);letter-spacing:1px;">
        +91 84212 22893 · nandedseva.com
      </div>
    </div>
  </div>

  <div style="font-family:Arial,sans-serif;font-size:12px;color:#94A3B8;">
    Back print area: ~22cm × 28cm · 2 colours
  </div>
</div>
</body></html>`, './public/brand/tshirt/style3-back-navy.png', 900, 700);

// ══════════════════════════════════════════════════════════════
// 4. Dark green shirt — Minimal logo (WhatsApp colour brand)
// ══════════════════════════════════════════════════════════════
await capture(`<!DOCTYPE html><html><head><style>${FONT}</style></head><body>
<div style="width:900px;height:700px;background:#F0F4F8;display:flex;align-items:center;
  justify-content:center;flex-direction:column;gap:20px;">

  <div style="font-family:'Sora',sans-serif;font-size:13px;font-weight:600;color:#94A3B8;
    letter-spacing:3px;text-transform:uppercase;margin-bottom:4px;">Style 4 — Left Chest Minimal · Bottle Green Shirt</div>

  <div style="position:relative;width:400px;height:420px;">
    ${tshirtPath('#1B4332')}
    <!-- minimal NS mark on left chest -->
    <div style="position:absolute;top:85px;left:110px;display:flex;flex-direction:column;
      align-items:flex-start;gap:4px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <!-- NS box -->
        <div style="width:42px;height:42px;border-radius:8px;border:1.5px solid rgba(255,255,255,0.5);
          display:flex;align-items:center;justify-content:center;">
          <span style="font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.5px;">NS</span>
        </div>
        <div>
          <div style="font-size:16px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;line-height:1.1;">NandedSeva</div>
          <div style="font-size:7.5px;color:rgba(255,255,255,0.5);letter-spacing:1.5px;text-transform:uppercase;">
            Home &amp; Travel
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="font-family:Arial,sans-serif;font-size:12px;color:#94A3B8;">
    Chest print area: ~9cm × 4.5cm · 1 colour (white only — cheap to print)
  </div>
</div>
</body></html>`, './public/brand/tshirt/style4-minimal-green.png', 900, 700);

// ══════════════════════════════════════════════════════════════
// 5. Side-by-side comparison sheet
// ══════════════════════════════════════════════════════════════
await capture(`<!DOCTYPE html><html><head><style>${FONT}
  body { background:#0F3460; }
  .card { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
    border-radius:16px; padding:24px; display:flex; flex-direction:column;
    align-items:center; gap:12px; }
  .label { font-size:11px; font-weight:600; color:rgba(255,255,255,0.45);
    letter-spacing:2px; text-transform:uppercase; text-align:center; }
  .tag { font-size:9px; color:#34C77B; letter-spacing:1.5px; text-transform:uppercase;
    background:rgba(52,199,123,0.12); padding:3px 10px; border-radius:20px; }
</style></head><body>
<div style="width:1200px;height:500px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;padding:40px;gap:24px;">

  <div style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.35);
    letter-spacing:4px;text-transform:uppercase;">NandedSeva T-Shirt Print Options</div>

  <div style="display:flex;gap:20px;align-items:stretch;justify-content:center;">

    <!-- Card 1 -->
    <div class="card" style="width:240px;">
      <div class="label">Style 1</div>
      <div style="background:#1a1a2e;border-radius:12px;padding:20px 24px;width:100%;">
        <div style="display:flex;align-items:baseline;">
          <span style="font-size:20px;font-weight:700;color:#fff;">Nanded</span>
          <span style="font-size:20px;font-weight:700;color:#34C77B;">Seva</span>
        </div>
        <div style="width:100%;height:2px;background:#34C77B;margin:4px 0;"></div>
        <div style="font-size:7px;color:rgba(255,255,255,0.4);letter-spacing:1.5px;text-transform:uppercase;">Home · Travel · Nanded</div>
      </div>
      <div class="tag">Left Chest · Navy</div>
      <div class="label">Best for staff uniforms</div>
    </div>

    <!-- Card 2 -->
    <div class="card" style="width:240px;">
      <div class="label">Style 2</div>
      <div style="background:#ffffff;border-radius:12px;padding:16px 24px;width:100%;
        display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div style="display:flex;align-items:baseline;">
          <span style="font-size:36px;font-weight:700;color:#0F3460;letter-spacing:-1px;">N</span>
          <span style="font-size:36px;font-weight:700;color:#34C77B;letter-spacing:-1px;">S</span>
        </div>
        <div style="width:28px;height:2px;background:#34C77B;"></div>
        <div style="display:flex;align-items:baseline;">
          <span style="font-size:13px;font-weight:700;color:#0F3460;">Nanded</span>
          <span style="font-size:13px;font-weight:700;color:#34C77B;">Seva</span>
        </div>
      </div>
      <div class="tag">Full Front · White</div>
      <div class="label">Best for promotions</div>
    </div>

    <!-- Card 3 -->
    <div class="card" style="width:240px;">
      <div class="label">Style 3</div>
      <div style="background:#1a1a2e;border-radius:12px;padding:14px 20px;width:100%;
        display:flex;flex-direction:column;align-items:center;gap:5px;">
        <div style="font-size:8px;color:rgba(255,255,255,0.35);letter-spacing:2px;text-transform:uppercase;">Est. 2024 · Nanded</div>
        <div style="display:flex;align-items:baseline;">
          <span style="font-size:20px;font-weight:700;color:#fff;">Nanded</span>
          <span style="font-size:20px;font-weight:700;color:#34C77B;">Seva</span>
        </div>
        <div style="font-size:7px;color:rgba(255,255,255,0.4);letter-spacing:1px;text-transform:uppercase;">
          Trusted Home &amp; Travel Services
        </div>
        <div style="width:100%;height:0.5px;background:rgba(52,199,123,0.3);"></div>
        <div style="font-size:7px;color:rgba(52,199,123,0.6);">+91 84212 22893</div>
      </div>
      <div class="tag">Back Print · Navy</div>
      <div class="label">Best for events &amp; fairs</div>
    </div>

    <!-- Card 4 -->
    <div class="card" style="width:240px;">
      <div class="label">Style 4</div>
      <div style="background:#1B4332;border-radius:12px;padding:18px 20px;width:100%;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;border-radius:7px;border:1.5px solid rgba(255,255,255,0.45);
            display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="font-size:14px;font-weight:700;color:#fff;">NS</span>
          </div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#fff;">NandedSeva</div>
            <div style="font-size:7px;color:rgba(255,255,255,0.45);letter-spacing:1.5px;text-transform:uppercase;">Home &amp; Travel</div>
          </div>
        </div>
      </div>
      <div class="tag">Chest · Bottle Green</div>
      <div class="label">Budget-friendly, 1 colour</div>
    </div>

  </div>

  <div style="font-size:10px;color:rgba(255,255,255,0.25);letter-spacing:1px;margin-top:4px;">
    Brand colours: Navy #0F3460 · Green #34C77B · White #FFFFFF
  </div>
</div>
</body></html>`, './public/brand/tshirt/all-styles-comparison.png', 1200, 500);

await browser.close();

console.log('\n✅  T-shirt designs saved to /public/brand/tshirt/');
console.log('\n  style1-chest-navy.png       → Left chest · Navy shirt');
console.log('  style2-front-white.png      → Full front centre · White shirt');
console.log('  style3-back-navy.png        → Back full print · Navy shirt');
console.log('  style4-minimal-green.png    → Minimal chest · Bottle green shirt');
console.log('  all-styles-comparison.png   → Side-by-side overview');
