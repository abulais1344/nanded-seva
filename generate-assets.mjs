import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const browser = await chromium.launch({ headless: true });
const page    = await browser.newPage();

await mkdir('./public/brand', { recursive: true });

// ── helpers ────────────────────────────────────────────────────────────────
async function capture(html, file, w, h) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);
  await page.screenshot({ path: file, omitBackground: false });
  console.log(`✓  ${file.replace('./public/brand/', '')}  (${w}×${h})`);
}

const BASE = `
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { overflow: hidden; }
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700&display=swap');
    .sora { font-family: 'Sora', Arial Black, sans-serif; font-weight: 700; }
  </style>
`;

// ── 1. Profile Picture — 800×800 (WhatsApp / Instagram / Twitter / Facebook)
await capture(`<!DOCTYPE html><html><head>${BASE}</head><body>
<div style="width:800px;height:800px;background:linear-gradient(145deg,#0F3460 0%,#16213E 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;">
  <!-- decorative circles -->
  <div style="position:absolute;top:-120px;right:-120px;width:420px;height:420px;border-radius:50%;
    background:rgba(52,199,123,0.12);"></div>
  <div style="position:absolute;bottom:-80px;left:-80px;width:280px;height:280px;border-radius:50%;
    background:rgba(52,199,123,0.08);"></div>
  <!-- NS monogram -->
  <div style="display:flex;align-items:baseline;line-height:1;margin-bottom:18px;">
    <span class="sora" style="font-size:220px;color:#ffffff;letter-spacing:-6px;">N</span>
    <span class="sora" style="font-size:220px;color:#34C77B;letter-spacing:-6px;">S</span>
  </div>
  <!-- wordmark -->
  <div style="display:flex;align-items:baseline;">
    <span class="sora" style="font-size:52px;color:#ffffff;letter-spacing:-1px;">Nanded</span>
    <span class="sora" style="font-size:52px;color:#34C77B;letter-spacing:-1px;">Seva</span>
  </div>
  <!-- green line accent -->
  <div style="width:80px;height:4px;background:#34C77B;border-radius:2px;margin-top:20px;"></div>
</div>
</body></html>`, './public/brand/profile-pic-800.png', 800, 800);

// ── 2. Profile Picture — 400×400 (smaller platforms)
await capture(`<!DOCTYPE html><html><head>${BASE}</head><body>
<div style="width:400px;height:400px;background:linear-gradient(145deg,#0F3460 0%,#16213E 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;">
  <div style="position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;
    background:rgba(52,199,123,0.12);"></div>
  <div style="display:flex;align-items:baseline;line-height:1;margin-bottom:8px;">
    <span class="sora" style="font-size:110px;color:#ffffff;letter-spacing:-3px;">N</span>
    <span class="sora" style="font-size:110px;color:#34C77B;letter-spacing:-3px;">S</span>
  </div>
  <div style="display:flex;align-items:baseline;">
    <span class="sora" style="font-size:26px;color:#ffffff;letter-spacing:-0.5px;">Nanded</span>
    <span class="sora" style="font-size:26px;color:#34C77B;letter-spacing:-0.5px;">Seva</span>
  </div>
  <div style="width:40px;height:3px;background:#34C77B;border-radius:2px;margin-top:10px;"></div>
</div>
</body></html>`, './public/brand/profile-pic-400.png', 400, 400);

// ── 3. Square Logo with tagline — 512×512 (app icon / general use)
await capture(`<!DOCTYPE html><html><head>${BASE}</head><body>
<div style="width:512px;height:512px;background:linear-gradient(145deg,#0F3460 0%,#16213E 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;
  border-radius:80px;">
  <div style="position:absolute;top:-80px;right:-80px;width:280px;height:280px;border-radius:50%;
    background:rgba(52,199,123,0.13);"></div>
  <div style="position:absolute;bottom:-60px;left:-60px;width:200px;height:200px;border-radius:50%;
    background:rgba(52,199,123,0.08);"></div>
  <div style="display:flex;align-items:baseline;line-height:1;margin-bottom:14px;">
    <span class="sora" style="font-size:130px;color:#ffffff;letter-spacing:-4px;">N</span>
    <span class="sora" style="font-size:130px;color:#34C77B;letter-spacing:-4px;">S</span>
  </div>
  <div style="display:flex;align-items:baseline;margin-bottom:12px;">
    <span class="sora" style="font-size:36px;color:#ffffff;letter-spacing:-0.5px;">Nanded</span>
    <span class="sora" style="font-size:36px;color:#34C77B;letter-spacing:-0.5px;">Seva</span>
  </div>
  <div style="width:60px;height:3px;background:#34C77B;border-radius:2px;margin-bottom:14px;"></div>
  <div style="font-family:Arial,sans-serif;font-size:16px;color:rgba(255,255,255,0.55);
    letter-spacing:1.5px;text-transform:uppercase;text-align:center;padding:0 40px;">
    Home &amp; Travel Services
  </div>
</div>
</body></html>`, './public/brand/logo-square-512.png', 512, 512);

// ── 4. Horizontal Logo — 1200×400 (website banner / email signature)
await capture(`<!DOCTYPE html><html><head>${BASE}</head><body>
<div style="width:1200px;height:400px;background:linear-gradient(135deg,#0F3460 0%,#16213E 100%);
  display:flex;align-items:center;justify-content:center;gap:60px;position:relative;overflow:hidden;">
  <div style="position:absolute;right:-100px;top:-100px;width:400px;height:400px;border-radius:50%;
    background:rgba(52,199,123,0.1);"></div>
  <!-- icon mark -->
  <div style="width:180px;height:180px;border-radius:32px;background:rgba(255,255,255,0.08);
    border:2px solid rgba(52,199,123,0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
    <div style="display:flex;align-items:baseline;">
      <span class="sora" style="font-size:90px;color:#ffffff;letter-spacing:-2px;">N</span>
      <span class="sora" style="font-size:90px;color:#34C77B;letter-spacing:-2px;">S</span>
    </div>
  </div>
  <!-- text block -->
  <div style="display:flex;flex-direction:column;gap:12px;">
    <div style="display:flex;align-items:baseline;">
      <span class="sora" style="font-size:100px;color:#ffffff;letter-spacing:-3px;">Nanded</span>
      <span class="sora" style="font-size:100px;color:#34C77B;letter-spacing:-3px;">Seva</span>
    </div>
    <div style="font-family:Arial,sans-serif;font-size:22px;color:rgba(255,255,255,0.6);
      letter-spacing:2px;text-transform:uppercase;">
      Trusted Home &amp; Travel Services · Nanded
    </div>
  </div>
</div>
</body></html>`, './public/brand/logo-horizontal-1200.png', 1200, 400);

// ── 5. White / Light Logo — 800×800 (for dark backgrounds, WhatsApp stickers)
await capture(`<!DOCTYPE html><html><head>${BASE}</head><body>
<div style="width:800px;height:800px;background:#ffffff;
  display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;">
  <!-- shadow ring -->
  <div style="width:480px;height:480px;border-radius:50%;
    background:linear-gradient(145deg,#0F3460,#16213E);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    box-shadow:0 24px 80px rgba(15,52,96,0.3);position:relative;overflow:hidden;">
    <div style="position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;
      background:rgba(52,199,123,0.15);"></div>
    <div style="display:flex;align-items:baseline;margin-bottom:8px;">
      <span class="sora" style="font-size:160px;color:#ffffff;letter-spacing:-4px;">N</span>
      <span class="sora" style="font-size:160px;color:#34C77B;letter-spacing:-4px;">S</span>
    </div>
    <div style="width:60px;height:4px;background:#34C77B;border-radius:2px;"></div>
  </div>
  <div style="display:flex;align-items:baseline;margin-top:32px;">
    <span class="sora" style="font-size:56px;color:#0F3460;letter-spacing:-1.5px;">Nanded</span>
    <span class="sora" style="font-size:56px;color:#34C77B;letter-spacing:-1.5px;">Seva</span>
  </div>
  <div style="font-family:Arial,sans-serif;font-size:18px;color:#6B7280;
    letter-spacing:1.5px;text-transform:uppercase;margin-top:10px;">
    Home &amp; Travel Services
  </div>
</div>
</body></html>`, './public/brand/logo-on-white-800.png', 800, 800);

// ── 6. WhatsApp Business cover / Facebook cover — 1640×624
await capture(`<!DOCTYPE html><html><head>${BASE}</head><body>
<div style="width:1640px;height:624px;background:linear-gradient(135deg,#0F3460 0%,#16213E 100%);
  display:flex;align-items:center;padding:0 120px;gap:80px;position:relative;overflow:hidden;">
  <!-- decorative circles -->
  <div style="position:absolute;right:-80px;top:-80px;width:500px;height:500px;border-radius:50%;
    background:rgba(52,199,123,0.1);"></div>
  <div style="position:absolute;left:800px;bottom:-120px;width:300px;height:300px;border-radius:50%;
    background:rgba(52,199,123,0.07);"></div>
  <!-- left: NS mark -->
  <div style="width:200px;height:200px;border-radius:36px;border:2.5px solid rgba(52,199,123,0.4);
    background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
    <div style="display:flex;align-items:baseline;">
      <span class="sora" style="font-size:96px;color:#fff;letter-spacing:-2px;">N</span>
      <span class="sora" style="font-size:96px;color:#34C77B;letter-spacing:-2px;">S</span>
    </div>
  </div>
  <!-- centre: name + tagline + pills -->
  <div style="flex:1;">
    <div style="display:flex;align-items:baseline;margin-bottom:16px;">
      <span class="sora" style="font-size:108px;color:#fff;letter-spacing:-3px;">Nanded</span>
      <span class="sora" style="font-size:108px;color:#34C77B;letter-spacing:-3px;">Seva</span>
    </div>
    <div style="font-family:Arial,sans-serif;font-size:24px;color:rgba(255,255,255,0.65);
      margin-bottom:24px;letter-spacing:0.5px;">
      Trusted Home &amp; Travel Services in Nanded, Maharashtra
    </div>
    <div style="display:flex;gap:14px;flex-wrap:wrap;">
      ${['Electrician','AC Repair','Plumbing','Mistri Work','Drivers','Car Rental'].map(s =>
        `<div style="background:rgba(52,199,123,0.18);border:1.5px solid rgba(52,199,123,0.4);
          color:#34C77B;padding:8px 22px;border-radius:100px;font-family:Arial,sans-serif;
          font-size:18px;font-weight:600;">${s}</div>`
      ).join('')}
    </div>
  </div>
  <!-- right: phone -->
  <div style="display:flex;flex-direction:column;align-items:flex-end;gap:10px;flex-shrink:0;">
    <div style="font-family:Arial,sans-serif;font-size:16px;color:rgba(255,255,255,0.45);
      letter-spacing:1px;text-transform:uppercase;">Call / WhatsApp</div>
    <div style="font-family:Arial,sans-serif;font-size:32px;color:#ffffff;font-weight:700;
      letter-spacing:1px;">+91 84212 22893</div>
    <div style="font-family:Arial,sans-serif;font-size:18px;color:rgba(255,255,255,0.45);">
      nandedseva.com</div>
  </div>
</div>
</body></html>`, './public/brand/cover-photo-1640x624.png', 1640, 624);

await browser.close();

console.log('\n✅  All brand assets saved to /public/brand/');
console.log('\nFiles generated:');
console.log('  profile-pic-800.png    → WhatsApp Business, Instagram, Twitter/X, YouTube');
console.log('  profile-pic-400.png    → Facebook, smaller platforms');
console.log('  logo-square-512.png    → App icon, general use');
console.log('  logo-horizontal-1200.png → Email signature, website banner');
console.log('  logo-on-white-800.png  → Print, light backgrounds');
console.log('  cover-photo-1640x624.png → Facebook cover, WhatsApp Business banner');
