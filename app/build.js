// Gera docs/ (versão PWA instalável) a partir de app/tormenta.html
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), out = path.join(root, 'docs');
fs.mkdirSync(out, { recursive: true });
const body = fs.readFileSync(path.join(__dirname, 'tormenta.html'), 'utf8');
const version = Date.now().toString(36);
const head = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#16171d">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Tormenta20">
<link rel="manifest" href="manifest.json">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icon-192.png">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
</head><body>`;
fs.writeFileSync(path.join(out, 'index.html'), head + body + '</body></html>');
fs.copyFileSync(path.join(__dirname, 'icon.svg'), path.join(out, 'icon.svg'));
for (const f of ['icon-192.png', 'icon-512.png']) if (fs.existsSync(path.join(__dirname, f))) fs.copyFileSync(path.join(__dirname, f), path.join(out, f));
fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify({
  name: 'Grimório da Tormenta', short_name: 'Tormenta20', lang: 'pt-BR', start_url: './', scope: './', display: 'standalone',
  background_color: '#111217', theme_color: '#16171d',
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
  ],
}, null, 2));
fs.writeFileSync(path.join(out, 'sw.js'), `const CACHE = 't20-${version}';
const FILES = ['./', 'index.html', 'manifest.json', 'icon.svg', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok && (e.request.url.startsWith(self.location.origin) || e.request.url.includes('fonts.g'))) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
    return res;
  }).catch(() => caches.match('index.html'))));
});
`);
console.log('docs/ gerado');
