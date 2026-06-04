import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// OG Image
await page.setViewportSize({ width: 1200, height: 630 });
await page.goto('http://localhost:3001/api/og', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({ path: '/tmp/p3-og-image.png' });
console.log('OG image captured');

// Services page on mobile with visit charges
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3001/services', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.screenshot({ path: '/tmp/p3-services.png' });
console.log('Services page captured');

// Contact page with taluka
await page.goto('http://localhost:3001/contact', { waitUntil: 'networkidle' });
await page.waitForTimeout(1800);
await page.evaluate(() => window.scrollBy(0, 400));
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/p3-contact.png' });
console.log('Contact page captured');

// Admin services tab (after login)
await page.goto('http://localhost:3001/admin/login', { waitUntil: 'networkidle' });
await page.fill('input[type="text"]', 'admin123');
await page.fill('input[type="password"]', 'admin123');
await page.click('button[type="submit"]');
await page.waitForURL('**/admin', { timeout: 8000 });
await page.waitForTimeout(2000);
// Click Services tab
await page.getByRole('button', { name: /services/i }).first().click();
await page.waitForTimeout(2000);
await page.setViewportSize({ width: 1280, height: 900 });
await page.screenshot({ path: '/tmp/p3-admin-services.png' });
console.log('Admin services tab captured');

await browser.close();
