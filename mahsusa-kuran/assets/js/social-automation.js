/* --- MAHSUSA KURAN v54 - SOSYAL MEDYA OTOMASYON & PAYLAŞIM MOTORU --- */

class SocialAutomationEngine {
    constructor() {
        this.domain = "mahsusakuran.com";
        this.hashtag = "#mahsusakuran";
        this.platforms = ["Instagram", "TikTok", "YouTube Shorts", "Facebook"];
    }

    // Günlük Ayet ve Reels Kuyruk Planlayıcısı
    scheduleDailyContent(verseData) {
        console.log(`[OTOMASYON] Günlük içerik kuyruğa alındı: ${verseData.surah} ${verseData.verseNo}`);
        
        const contentPackage = {
            mediaType: "Reels / Görsel Kart",
            caption: `${verseData.meal}\n\nKaynak: ${this.domain} ${this.hashtag}`,
            targetPlatforms: this.platforms,
            timestamp: new Date().toISOString()
        };

        return contentPackage;
    }

    // Özel Gün Motoru (Cuma, Kandil, Ramazan)
    checkSpecialDays() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 5 = Cuma
        
        if (dayOfWeek === 5) {
            console.log("[ÖZEL GÜN] Cuma teması ve özel Cuma ayet kartları aktif edildi!");
            return "Cuma_Special_Theme";
        }
        
        return "Standard_Theme";
    }

    init() {
        console.log("Mahsusa Kuran Sosyal Medya Otomasyon Motoru Aktif.");
        const activeTheme = this.checkSpecialDays();
        console.log("Aktif Paylaşım Teması:", activeTheme);
    }
}

// Otomasyonu Başlat
document.addEventListener("DOMContentLoaded", () => {
    const automation = new SocialAutomationEngine();
    automation.init();
});