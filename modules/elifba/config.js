/**
 * Mahsusa Kur'an - Elifba Portal Yapılandırması
 * Domain: mahsusakuran.com
 */

const ELIFBA_CONFIG = {
    MODULE_NAME: "Mahsusa Kur'an - Elifba Portal",
    DOMAIN: "mahsusakuran.com",
    VERSION: "3.0.0",
    
    LEGAL: {
        COPYRIGHT: "© 2026 Mahsusa Kur'an (mahsusakuran.com). Tüm Hakları Saklıdır.",
        KVKK_NOTICE: "Kişisel veri toplanmaz. İlerleme cihazınızın yerel hafızasında saklanır."
    },

    SESSION: {
        STORAGE_KEY: "mahsusakuran_elifba_v3",
        GUEST_PREFIX: "mahsusa_guest_"
    }
};

function getOrInitSession() {
    let session = localStorage.getItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY);
    if (!session) {
        session = {
            userId: ELIFBA_CONFIG.SESSION.GUEST_PREFIX + Math.random().toString(36).substring(2, 8),
            isGuest: true,
            mode: "adult",
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