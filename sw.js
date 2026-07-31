/* ==========================================================================
   DOSYA ADI: sw.js
   AÇIKLAMA: Servis Çalıştırıcısı (Service Worker) - Çevrimdışı Çalışma Motoru
   ========================================================================== */

const CACHE_NAME = 'mahsusa-kuran-v1';

// Hafızaya Alınacak Temel Dosya Listesi
const ASSETS_TO_CACHE = [
  './index.html',
  './api.js',
  './app.js',
  './manifest.json'
];

// 1. Uygulama Yüklendiğinde Dosyaları Hafızaya Al
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Dosyalar hafızaya kaydediliyor...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. İnternet İsteği Geldiğinde Önce Hafızadan Hızlıca Getir
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Hafızada varsa internete gitmeden anında aç
      }
      return fetch(event.request); // Hafızada yoksa canlı internetten çek
    })
  );
});