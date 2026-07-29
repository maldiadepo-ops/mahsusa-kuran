/* --- MAHSUSA KURAN v54 - GOOGLE E-TABLO VERİ GÜVENCESİ & SENKRONİZASYON --- */

const SHEET_API_URL = "https://script.google.com/macros/s/AKfycby.../exec"; // Örnek Google Apps Script API endpoint

async function fetchMahsusaData() {
    try {
        console.log("Mahsusa Kuran: E-Tablo veri kaynak güvenliği denetleniyor...");
        
        // Güvenli veri çekme (Fetch API & Fallback)
        // Gerçek entegrasyonda tablo URL'niz buraya bağlanacaktır.
        const response = await fetch(SHEET_API_URL);
        
        if (!response.ok) {
            throw new Error(`Veri çekme hatası! Durum kodu: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Başarılı! E-Tablo verileri ve yeni modüller (Esmalar, Burçlar, Camiler) yüklendi.");
        return data;

    } catch (error) {
        console.warn("Ağ bağlantısı kurulamadı veya e-tablo yanıt vermedi. Güvenli yedek veri katmanı (Fallback) devreye girdi.", error);
        
        // Hata önleme (Error-Free Fallback): Çökme yaşanmaması için yerel güvenli veri döndürülür
        return {
            status: "offline_secure",
            message: "Mahsusa Kuran çevrimdışı korumalı modda çalışıyor.",
            domain: "mahsusakuran.com"
        };
    }
}

// Uygulama açılışında veri senkronizasyonunu tetikle
document.addEventListener("DOMContentLoaded", () => {
    fetchMahsusaData().then(result => {
        console.log("Senkronizasyon Durumu:", result);
    });
});