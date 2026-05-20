const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const htmlPath = 'file://' + path.join(__dirname, 'wireframes.html').replace(/\\/g, '/');

const pages = [
  { id: 'page-landing',        file: '01-landing-page.png' },
  { id: 'page-book',           file: '02-booking-form.png' },
  { id: 'page-dashboard',      file: '03-dashboard.png' },
  { id: 'page-booking-detail', file: '04-booking-detail.png' },
  { id: 'page-calendar',       file: '05-calendar.png' },
];

(async () => {
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const tab = await browser.newPage();

  await tab.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await tab.goto(htmlPath, { waitUntil: 'networkidle0' });

  for (const p of pages) {
    const el = await tab.$(`#${p.id}`);
    if (!el) { console.warn(`⚠️  #${p.id} not found, skip`); continue; }

    const outPath = path.join(outputDir, p.file);
    await el.screenshot({ path: outPath });
    console.log(`✅ ${p.file}`);
  }

  await browser.close();
  console.log('\n🎉 Done! Output folder: output/');
  console.log('👉 Upload ke shots.so → dark gradient bg → export PNG');
})();
