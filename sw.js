// =================================================================
// MAHSUSA KUR'AN - SERVICE WORKER (ÇEVRİMDIŞI KULLANIM SCRIPT'İ)
// Dosya Adı: sw.js (Projenin en dış kök klasörüne kaydedilmelidir)
// =================================================================

const CACHE_NAME = 'mahsusa-kuran-v1';

// Önbelleğe alınacak kritik dosya yolları
const ONBELLEKLENECEK_DOSYALAR = [
  './',
  './index.html',
  './modules/elifba/index.html',
  './modules/yarisma/index.html',
  './modules/paket/index.html',
  'https://cdn.tailwindcss.com'
];

// 1. KURULUM (INSTALL): Dosyaları tarayıcı hafızasına kaydeder
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA] Dosyalar önbelleğe alınıyor...');
      return cache.addAll(ONBELLEKLENECEK_DOSYALAR);
    })
  );
});

// 2. VERİ ÇEKME (FETCH): İnternet yoksa veriyi önbellekten sunar
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Önbellekte varsa oradan döndür, yoksa ağdan çek
      return response || fetch(event.request);
    })
  );
});