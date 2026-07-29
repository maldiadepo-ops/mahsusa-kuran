/**
 * Mahsusa Kur'an - Elifba & Tecvîd Portal Yapılandırması
 */

const ELIFBA_CONFIG = {
    MODULE_NAME: "Mahsusa Kur'an - Elifba & Tecvîd Portalı",
    DOMAIN: "mahsusakuran.com",
    VERSION: "4.0.0",
    
    LEGAL: {
        COPYRIGHT: "© 2026 Mahsusa Kur'an (mahsusakuran.com). Tüm Hakları Saklıdır.",
        KVKK_NOTICE: "Kişisel veri toplanmaz. Tüm ilerleme tarayıcınızın yerel hafızasında saklanır."
    },

    SESSION: {
        STORAGE_KEY: "mahsusakuran_elifba_v4",
        GUEST_PREFIX: "mahsusa_guest_"
    }
};

function getOrInitSession() {
    let session = localStorage.getItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY);
    if (!session) {
        session = {
            userId: ELIFBA_CONFIG.SESSION.GUEST_PREFIX + Math.random().toString(36).substring(2, 8),
            isGuest: true,
            mode: "child", // 'child' | 'adult' | 'diyanet'
            completed: [],
            hideLearned: false,
            filterType: "all", // 'all' | 'peltek' | 'kalin' | 'ince'
            activeDiyanetTopic: 14, // Varsayılan: Zamir (Hâ Harfi)
            slideIndex: 0,
            stars: 0
        };
        localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(session));
    } else {
        session = JSON.parse(session);
    }
    return session;
}