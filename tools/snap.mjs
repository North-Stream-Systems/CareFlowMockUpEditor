// Screenshot every page (plus every nav / sidebar / tab click) and fail on runtime errors.
//
//   node tools/snap.mjs <dist dir | base URL> <outDir>
//   node tools/snap.mjs --compare <dirA> <dirB>
//
// The clock is frozen and animations disabled so screenshots are reproducible between runs.
// External requests (Google Fonts) are fetched with curl and cached in .snap/cache,
// because the sandbox's proxy is only usable from curl, not from Chromium directly.
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const PAGES = [
  'index.html',
  'CareFlow_Login.html',
  'CareFlow_Setup.html',
  'CareFlow_Prototype_v3.html',
  'CareFlow_Rostering.html',
  'CareFlow_Clients.html',
  'CareFlow_Finance.html',
  'CareFlow_Mobile.html',
];
// Clickable navigation inside a page. Each match is clicked on a fresh load and screenshotted.
const CLICKABLE = '.nav-btn, .sb-item, .tab, .tab-btn, .ptab, .m-tab, .bn-item, .mob-nav-btn';
const MAX_CLICKS = 60;
const FROZEN = new Date('2026-03-10T10:30:00');
const CACHE = '.snap/cache';

if (process.argv[2] === '--compare') {
  process.exit(compare(process.argv[3], process.argv[4]));
}

const [target, out] = process.argv.slice(2);
if (!target || !out) {
  console.error('usage: node tools/snap.mjs <dist dir | base URL> <outDir> | --compare <dirA> <dirB>');
  process.exit(2);
}
const server = /^https?:/.test(target) ? null : await serve(target);
const base = server ? `http://127.0.0.1:${server.address().port}` : target.replace(/\/$/, '');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(CACHE, { recursive: true });

const browser = await chromium.launch();
const errors = [];
let shots = 0;

for (const pageName of PAGES) {
  const ctx = await newContext();
  const page = await ctx.newPage();
  await open(page, pageName, errors);
  await page.screenshot({ path: path.join(out, `${pageName}__load.png`), fullPage: true, animations: 'disabled', caret: 'hide' });
  shots++;
  const count = Math.min(await page.locator(CLICKABLE).count(), MAX_CLICKS);
  await page.close();

  for (let i = 0; i < count; i++) {
    const p = await ctx.newPage();
    await open(p, pageName, errors);
    const el = p.locator(CLICKABLE).nth(i);
    try {
      if (!(await el.isVisible())) { await p.close(); continue; }
      await el.click({ timeout: 2000 });
      await p.waitForTimeout(300);
      await settle(p);
      await p.screenshot({ path: path.join(out, `${pageName}__click${String(i).padStart(2, '0')}.png`), fullPage: true, animations: 'disabled', caret: 'hide' });
      shots++;
    } catch (e) {
      // Clicking may navigate away to another page; that's expected, not an error.
    }
    await p.close();
  }
  await ctx.close();
}
await browser.close();
server?.close();

console.log(`${shots} screenshots -> ${out}`);
if (errors.length) {
  console.error(`\n${errors.length} runtime error(s):`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}

async function newContext() {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.clock.setFixedTime(FROZEN);
  await ctx.route(/^https?:\/\//, async route => {
    const url = route.request().url();
    if (url.startsWith(base)) return route.continue();
    const body = cachedFetch(url);
    if (!body) return route.abort();
    await route.fulfill({ status: 200, body: body.data, contentType: body.type });
  });
  return ctx;
}

// Remove timing noise: hover states from the last click and scrollIntoView() races.
async function settle(page) {
  await page.mouse.move(0, 0);
  await page.evaluate(() => { window.scrollTo(0, 0); document.activeElement?.blur(); });
  await page.waitForTimeout(100);
}

async function open(page, pageName, errs) {
  page.on('pageerror', e => errs.push(`${pageName}: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errs.push(`${pageName}: console: ${m.text()}`); });
  await page.goto(`${base}/${pageName}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
}

function serve(dir) {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' };
  const srv = http.createServer((req, res) => {
    const root = path.resolve(dir);
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); return res.end();
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => srv.listen(0, '127.0.0.1', () => r(srv)));
}

function cachedFetch(url) {
  const key = createHash('sha1').update(url).digest('hex');
  const file = path.join(CACHE, key);
  if (!fs.existsSync(file)) {
    try {
      const type = execFileSync('curl', ['-fsSL', '-A', 'Mozilla/5.0 Chrome/141', '-o', file, '-w', '%{content_type}', url]).toString();
      fs.writeFileSync(file + '.type', type);
    } catch {
      fs.rmSync(file, { force: true });
      return null;
    }
  }
  return { data: fs.readFileSync(file), type: fs.readFileSync(file + '.type', 'utf8') };
}

function compare(a, b) {
  const files = new Set([...fs.readdirSync(a), ...fs.readdirSync(b)].filter(f => f.endsWith('.png')));
  const diffDir = path.join(b, '_diff');
  fs.rmSync(diffDir, { recursive: true, force: true });
  let diffs = 0;
  for (const f of [...files].sort()) {
    const pa = path.join(a, f), pb = path.join(b, f);
    if (!fs.existsSync(pa) || !fs.existsSync(pb)) { console.log(`MISSING  ${f}`); diffs++; continue; }
    const ia = PNG.sync.read(fs.readFileSync(pa)), ib = PNG.sync.read(fs.readFileSync(pb));
    if (ia.width !== ib.width || ia.height !== ib.height) {
      console.log(`SIZE     ${f}  ${ia.width}x${ia.height} vs ${ib.width}x${ib.height}`); diffs++; continue;
    }
    const out = new PNG({ width: ia.width, height: ia.height });
    const n = pixelmatch(ia.data, ib.data, out.data, ia.width, ia.height, { threshold: 0 });
    if (n) {
      fs.mkdirSync(diffDir, { recursive: true });
      fs.writeFileSync(path.join(diffDir, f), PNG.sync.write(out));
      console.log(`DIFFERS  ${f}  ${n}px`); diffs++;
    }
  }
  console.log(`${files.size} compared, ${diffs} differ${diffs ? ` (diff images in ${diffDir})` : ''}`);
  return diffs ? 1 : 0;
}
