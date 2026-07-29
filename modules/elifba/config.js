/**
 * Mahsusa Kur'an - Elifba Modül Yapılandırması
 * GitHub Pages & KVKK / Telif Uyumlu Mimaridir.
 */

const ELIFBA_CONFIG = {
    MODULE_NAME: "Mahsusa Kur'an - Elifba Modülü",
    VERSION: "1.0.0",
    
    LEGAL: {
        COPYRIGHT: "© 2026 Mahsusa Kur'an. Tüm hakları saklıdır.",
        KVKK_COMPLIANT: true,
        DATA_PRIVACY: "Bu modülde kişisel veri işlenmez. Tüm ilerleme tarayıcı yerel hafızasında (localStorage) saklanır."
    },

    SESSION: {
        STORAGE_KEY: "mahsusa_elifba_progress_v1",
        GUEST_ID_PREFIX: "guest_"
    }
};

function getOrInitSession() {
    let sessionData = localStorage.getItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY);
    
    if (!sessionData) {
        const guestId = ELIFBA_CONFIG.SESSION.GUEST_ID_PREFIX + Math.random().toString(36).substring(2, 9);
        sessionData = {
            userId: guestId,
            isGuest: true,
            completedLessons: [],
            stars: 0,
            mode: "adult"
        };
        localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(sessionData));
    } else {
        sessionData = JSON.parse(sessionData);
    }
    
    return sessionData;
}