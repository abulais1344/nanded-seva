import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const browser = await chromium.launch({ headless: true });
const page    = await browser.newPage();
await mkdir('./public/icons', { recursive: true });

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@700&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }
body { overflow:hidden; }`;

function iconHTML(size) {
  const dot   = Math.round(size * 0.11);   // green dot
  const dotX  = Math.round(size * 0.76);
  const dotY  = Math.round(size * 0.09);
  const ns    = Math.round(size * 0.45);   // NS font size
  const sub   = Math.round(size * 0.09);   // sub-label font size
  const radius = Math.round(size * 0.18);  // corner radius
  const padB  = Math.round(size * 0.18);   // bottom padding for label

  return `<!DOCTYPE html><html><head>
  <style>${FONT}
    body { font-family:'Sora',Arial Black,sans-serif; background:transparent; }
  </style></head><body>
  <div style="width:${size}px;height:${size}px;
    background:linear-gradient(145deg,#0F3460 0%,#16213E 100%);
    border-radius:${radius}px;
    display:flex;flex-direction:column;align-items:center;
    justify-content:center;position:relative;overflow:hidden;">

    <!-- subtle circle glow -->
    <div style="position:absolute;top:${Math.round(-size*0.15)}px;right:${Math.round(-size*0.15)}px;
      width:${Math.round(size*0.55)}px;height:${Math.round(size*0.55)}px;
      border-radius:50%;background:rgba(52,199,123,0.12);"></div>

    <!-- green dot top-right -->
    <div style="position:absolute;top:${dotY}px;right:${dotX - size*0.55}px;
      width:${dot}px;height:${dot}px;border-radius:50%;background:#34C77B;"></div>

    <!-- NS monogram -->
    <div style="display:flex;align-items:baseline;line-height:1;margin-bottom:${Math.round(size*0.03)}px;">
      <span style="font-size:${ns}px;font-weight:700;color:#ffffff;letter-spacing:${Math.round(-ns*0.04)}px;">N</span>
      <span style="font-size:${ns}px;font-weight:700;color:#34C77B;letter-spacing:${Math.round(-ns*0.04)}px;">S</span>
    </div>

    <!-- green underline -->
    <div style="width:${Math.round(size*0.18)}px;height:${Math.round(size*0.018)}px;
      background:#34C77B;border-radius:${Math.round(size*0.01)}px;
      margin-bottom:${Math.round(size*0.05)}px;"></div>

    <!-- sub label -->
    <div style="font-size:${sub}px;font-weight:700;color:rgba(255,255,255,0.55);
      letter-spacing:${Math.round(sub*0.15)}px;text-transform:uppercase;">Nanded</div>
  </div>
  </body></html>`;
}

async function capture(size) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(iconHTML(size), { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `./public/icons/icon-${size}x${size}.png`,
    clip: { x: 0, y: 0, width: size, height: size },
  });
  console.log(`✓  icon-${size}x${size}.png`);
}

await capture(192);
await capture(512);

// Also Apple touch icon (180x180)
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(iconHTML(180), { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
await page.screenshot({ path: './public/icons/apple-touch-icon.png', clip: { x: 0, y: 0, width: 180, height: 180 } });
console.log('✓  apple-touch-icon.png  (180×180)');

await browser.close();
console.log('\n✅  PWA icons saved to /public/icons/');
