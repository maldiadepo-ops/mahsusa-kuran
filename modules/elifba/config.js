/**
 * Mahsusa Kur'an - Elifba & Tecvîd Portal Yapılandırması
 * Domain: mahsusakuran.com
 * Telif & Yasal Zemin: %100 Mahsusa Kur'an Özgün Mimarisi
 */

const ELIFBA_CONFIG = {
    MODULE_NAME: "Mahsusa Kur'an - Elifba Portalı",
    DOMAIN: "mahsusakuran.com",
    VERSION: "5.0.0",
    
    LEGAL: {
        COPYRIGHT: "© 2026 Mahsusa Kur'an (mahsusakuran.com). Tüm Hakları Saklıdır.",
        NOTICE: "Bu portal özgün eğitim içerikleri ve KVKK standartlarına uygun olarak kodlanmıştır."
    },

    SESSION: {
        STORAGE_KEY: "mahsusa_kuran_elifba_v5",
        GUEST_PREFIX: "mahsusa_user_"
    }
};

function getOrInitSession() {
    let session = localStorage.getItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY);
    if (!session) {
        session = {
            userId: ELIFBA_CONFIG.SESSION.GUEST_PREFIX + Math.random().toString(36).substring(2, 8),
            isGuest: true,
            mode: "child", // 'child' | 'adult' | 'advanced'
            completed: [],
            hideLearned: false,
            filterType: "all",
            activeTopicId: 14, // Varsayılan: Zamir
            slideIndex: 0,
            activeLessonId: 1,
            activeGameId: null,
            stars: 20
        };
        localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(session));
    } else {
        session = JSON.parse(session);
    }
    return session;
}