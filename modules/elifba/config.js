/**
 * Mahsusa Kur'an - Elifba Modül Yapılandırması
 * Domain: mahsusakuran.com
 * Mimarisi: KVKK, Patent & Telif Korumalı Bağımsız Modül
 */

const ELIFBA_CONFIG = {
    MODULE_NAME: "Mahsusa Kur'an - Elifba Portal",
    DOMAIN: "mahsusakuran.com",
    VERSION: "2.0.0",
    
    // Kurumsal ve Hukuki Beyanlar
    LEGAL: {
        COPYRIGHT: "© 2026 Mahsusa Kur'an (mahsusakuran.com). Tüm Hakları Saklıdır.",
        KVKK_NOTICE: "Bu modülde KVKK gereği kişisel veri işlenmez. Öğrenci ilerlemesi cihazınızda tutulur.",
        PATENT_NOTE: "Mahsusa Kur'an interaktif eğitim modülleri ve arayüz dizaynı koruma altındadır."
    },

    SESSION: {
        STORAGE_KEY: "mahsusakuran_elifba_v2",
        GUEST_PREFIX: "mahsusa_guest_"
    }
};

function getOrInitSession() {
    let session = localStorage.getItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY);
    if (!session) {
        session = {
            userId: ELIFBA_CONFIG.SESSION.GUEST_PREFIX + Math.random().toString(36).substring(2, 8),
            isGuest: true,
            mode: "child", // Default: Çocuk Modu
            completed: [],
            stars: 0,
            lastAccess: new Date().toLocaleDateString('tr-TR')
        };
        localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(session));
    } else {
        session = JSON.parse(session);
    }
    return session;
}