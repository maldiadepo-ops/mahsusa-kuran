/* ==========================================================================
   DOSYA ADI: api.js
   AÇIKLAMA: Canlı Kur'an verilerini, Kelime Kelime Meali ve Sesleri Yönetir.
   ========================================================================== */

let currentAudio = null;
let currentPlayingMeta = { surah: 1, verse: 1 };
let isAutoNextEnabled = true;

// Ezber ve Hız Değişkenleri
let audioPlaybackSpeed = 1.0;
let verseRepeatLimit = 1;
let currentRepeatCounter = 1;

// Hafız (Okuyucu) Ses Sunucusu Haritası
const RECITER_URLS = {
    'alafasy': 'https://everydayayah.com/data/Alafasy_128kbps/',
    'abdulbaset': 'https://everydayayah.com/data/Abdul_Samad_128kbps/',
    'ghamadi': 'https://everydayayah.com/data/Ghamadi_40kbps/',
    'minshawi': 'https://everydayayah.com/data/Minshawy_Teacher_128kbps/'
};

let selectedReciter = 'alafasy';

function setSelectedReciter(reciterKey) {
    if (RECITER_URLS[reciterKey]) {
        selectedReciter = reciterKey;
        localStorage.setItem('mahsusa_reciter', reciterKey);
    }
}

function setAudioSpeed(speedValue) {
    audioPlaybackSpeed = parseFloat(speedValue);
    if (currentAudio) {
        currentAudio.playbackRate = audioPlaybackSpeed;
    }
}

function setVerseRepeatLimit(repeatCount) {
    verseRepeatLimit = parseInt(repeatCount);
}

/**
 * 1. Canlı Arama Yapar
 */
async function searchAyetLive(query) {
    try {
        const response = await fetch(`https://api.acikkuran.com/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("Arama API hatası:", error);
        return [];
    }
}

/**
 * 2. 114 Surenin Tam Listesini Çeker
 */
async function fetchAllSurahsList() {
    try {
        const response = await fetch(`https://api.acikkuran.com/surahs`);
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("Sure listesi API hatası:", error);
        return [];
    }
}

/**
 * 3. Belirtilen Cüz Numarasına Göre Ayetleri Çeker
 */
async function fetchVersesByJuz(juzNumber) {
    try {
        const response = await fetch(`https://api.acikkuran.com/juz/${juzNumber}`);
        const data = await response.json();
        return data.data ? data.data.verses : [];
    } catch (error) {
        console.error("Cüz API hatası:", error);
        return [];
    }
}

/**
 * 4. Surenin Tüm Ayetlerini Çeker
 */
async function fetchSurahDetails(surahId) {
    try {
        const response = await fetch(`https://api.acikkuran.com/surah/${surahId}`);
        const data = await response.json();
        return data.data || null;
    } catch (error) {
        console.error("Sure API hatası:", error);
        return null;
    }
}

/**
 * 5. Ayetin Kelime Kelime Meal Verilerini Çeker
 */
async function fetchVerseWords(surahId, verseNumber) {
    try {
        const response = await fetch(`https://api.acikkuran.com/surah/${surahId}/verse/${verseNumber}`);
        const data = await response.json();
        return data.data ? data.data.words : [];
    } catch (error) {
        console.error("Kelime meal API hatası:", error);
        return [];
    }
}

/**
 * 6. Ezber Tekrarı ve Son Konum Kayıtlı Ses Oynatıcı Motoru
 */
function playVerseAudio(surahId, verseNumber, isNewVerse = true) {
    const formattedSurah = String(surahId).padStart(3, '0');
    const formattedVerse = String(verseNumber).padStart(3, '0');
    
    const baseUrl = RECITER_URLS[selectedReciter] || RECITER_URLS['alafasy'];
    const audioUrl = `${baseUrl}${formattedSurah}${formattedVerse}.mp3`;

    if (isNewVerse) {
        currentRepeatCounter = 1;
    }

    currentPlayingMeta = { surah: parseInt(surahId), verse: parseInt(verseNumber) };

    if (typeof saveLastReadPosition === 'function') {
        saveLastReadPosition(currentPlayingMeta.surah, currentPlayingMeta.verse);
    }

    if (currentAudio) {
        currentAudio.pause();
    }

    currentAudio = new Audio(audioUrl);
    currentAudio.playbackRate = audioPlaybackSpeed;

    if (typeof updateBottomPlayerUI === 'function') {
        updateBottomPlayerUI(currentPlayingMeta.surah, currentPlayingMeta.verse, true, currentRepeatCounter, verseRepeatLimit);
    }

    currentAudio.play().catch(err => {
        console.error("Ses çalma hatası:", err);
        if (typeof updateBottomPlayerUI === 'function') {
            updateBottomPlayerUI(currentPlayingMeta.surah, currentPlayingMeta.verse, false, currentRepeatCounter, verseRepeatLimit);
        }
    });

    currentAudio.onended = () => {
        if (currentRepeatCounter < verseRepeatLimit) {
            currentRepeatCounter++;
            playVerseAudio(surahId, verseNumber, false);
        } else {
            if (isAutoNextEnabled) {
                playVerseAudio(currentPlayingMeta.surah, currentPlayingMeta.verse + 1, true);
            } else {
                if (typeof updateBottomPlayerUI === 'function') {
                    updateBottomPlayerUI(currentPlayingMeta.surah, currentPlayingMeta.verse, false, currentRepeatCounter, verseRepeatLimit);
                }
            }
        }
    };
}

function toggleAudioPlayPause() {
    if (!currentAudio) return false;
    if (currentAudio.paused) {
        currentAudio.play();
        return true;
    } else {
        currentAudio.pause();
        return false;
    }
}

function stopAudioPlayer() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
}