/* --- MAHSUSA KURAN v54 - ÇEVRİMDIŞI ÇALIŞMA (SERVICE WORKER) --- */

const CACHE_NAME = "mahsusa-kuran-v54-cache";
const assetsToCache = [
    "/index.html",
    "/assets/css/style.css",
    "/assets/js/app.js",
    "/assets/js/sheets-sync.js",
    "/assets/js/social-automation.js"
];

// Kurulum ve Dosyaları Önbelleğe Alma
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Çevrimdışı dosyalar önbelleğe alınıyor...");
            return cache.addAll(assetsToCache);
        })
    );
});

// Çevrimdışı İstekleri Yakalama
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});