/* ==========================================================================
   DOSYA ADI: app.js
   AÇIKLAMA: Ekran Hareketleri, Kelime Kelime Meal Tahlili ve Modallar.
   ========================================================================== */

let appSettings = {
    hideArabic: false,
    hideTransliteration: false,
    hideTranslation: false,
    authorId: '1'
};

let debounceTimer;
let cachedSurahList = [];
let activeSessionSeconds = 0;
let activeEditingVerseKey = null;

window.addEventListener('DOMContentLoaded', () => {
    loadSavedProfile();
    loadSavedSettings();
    loadSavedTypography();
    loadLastReadPosition();
    startReadingSessionTimer();
    renderBookmarks();
    renderNotesList();
    setupSearchInput();
    setupThemeToggle();
    setupInlineFilterButtons();
});

// KELİME KELİME MEAL PANELİNİ AÇMA / KAPAMA
async function toggleWordByWord(surah, verse, btnElement) {
    const card = btnElement.closest('.verse-card');
    let wordsContainer = card.querySelector('.words-wrapper');

    // Panel zaten açıksa kapat
    if (wordsContainer) {
        wordsContainer.remove();
        btnElement.style.color = 'var(--text-muted)';
        return;
    }

    btnElement.style.color = 'var(--accent-green)';
    wordsContainer = document.createElement('div');
    wordsContainer.className = 'words-wrapper';
    wordsContainer.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem;">Kelimeler yükleniyor...</span>`;
    card.appendChild(wordsContainer);

    const words = await fetchVerseWords(surah, verse);

    if (!words || words.length === 0) {
        wordsContainer.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem;">Kelime meali bulunamadı.</span>`;
        return;
    }

    wordsContainer.innerHTML = words.map(w => `
        <div class="word-chip">
            <span class="word-arabic">${w.arabic || w.word}</span>
            <span class="word-meaning">${w.translation ? w.translation.text : ''}</span>
        </div>
    `).join('');
}

// KİŞİSEL AYET NOTLARI YÖNETİMİ
function openNoteModal(surah, verse, currentVerseText) {
    activeEditingVerseKey = `${surah}_${verse}`;
    const notes = JSON.parse(localStorage.getItem('mahsusa_verse_notes') || '{}');
    const existingNote = notes[activeEditingVerseKey] ? notes[activeEditingVerseKey].text : '';

    const modalTitle = document.getElementById('note-modal-title');
    const noteInput = document.getElementById('note-modal-input');

    if (modalTitle) modalTitle.textContent = `${surah}. Sure ${verse}. Ayet Notu`;
    if (noteInput) noteInput.value = existingNote;

    openModal('modal-verse-note');
}

function saveCurrentVerseNote() {
    if (!activeEditingVerseKey) return;

    const noteInput = document.getElementById('note-modal-input');
    const noteText = noteInput ? noteInput.value.trim() : '';
    let notes = JSON.parse(localStorage.getItem('mahsusa_verse_notes') || '{}');

    if (noteText === '') {
        delete notes[activeEditingVerseKey];
    } else {
        notes[activeEditingVerseKey] = {
            text: noteText,
            date: new Date().toLocaleDateString('tr-TR')
        };
    }

    localStorage.setItem('mahsusa_verse_notes', JSON.stringify(notes));
    closeModal('modal-verse-note');
    renderNotesList();

    const [surah, verse] = activeEditingVerseKey.split('_');
    const card = document.querySelector(`.verse-card[data-surah="${surah}"][data-verse="${verse}"]`);
    if (card) {
        const badge = card.querySelector('.note-badge');
        if (badge) {
            badge.style.display = noteText !== '' ? 'inline-block' : 'none';
        }
    }
}

function renderNotesList() {
    const container = document.getElementById('notes-tab-list');
    if (!container) return;

    const notes = JSON.parse(localStorage.getItem('mahsusa_verse_notes') || '{}');
    const keys = Object.keys(notes);

    if (keys.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted);">Henüz eklenmiş bir notunuz yok.</p>`;
        return;
    }

    container.innerHTML = keys.map(key => {
        const [surah, verse] = key.split('_');
        const note = notes[key];
        return `
            <div style="background:#101216; padding:0.8rem; border-radius:6px; border:1px solid var(--border-color); display:flex; flex-direction:column; gap:0.4rem;">
                <div style="font-weight:700; color:var(--accent-green); font-size:0.85rem; display:flex; justify-content:space-between;">
                    <span>${surah}. Sure / ${verse}. Ayet</span>
                    <span style="color:var(--text-muted); font-size:0.75rem;">${note.date}</span>
                </div>
                <div style="font-size:0.9rem; color:var(--text-main); line-height:1.4;">${note.text}</div>
                <button style="align-self:flex-end; background:transparent; border:none; color:var(--accent-red); cursor:pointer; font-size:0.8rem;" onclick="deleteNoteFromList('${surah}', '${verse}')">Notu Sil</button>
            </div>
        `;
    }).join('');
}

function deleteNoteFromList(surah, verse) {
    const key = `${surah}_${verse}`;
    let notes = JSON.parse(localStorage.getItem('mahsusa_verse_notes') || '{}');
    delete notes[key];
    localStorage.setItem('mahsusa_verse_notes', JSON.stringify(notes));
    renderNotesList();
}

function startReadingSessionTimer() {
    let savedTotalSeconds = parseInt(localStorage.getItem('mahsusa_total_reading_time') || '20');
    
    setInterval(() => {
        savedTotalSeconds++;
        activeSessionSeconds++;
        localStorage.setItem('mahsusa_total_reading_time', savedTotalSeconds.toString());
        
        const historyTimeEl = document.getElementById('history-total-time');
        if (historyTimeEl) {
            historyTimeEl.textContent = `${savedTotalSeconds} Saniye`;
        }
    }, 1000);
}

function saveLastReadPosition(surah, verse, text = '') {
    const lastReadData = {
        surah: surah,
        verse: verse,
        text: text || `${surah}. Sure ${verse}. Ayet`,
        date: new Date().toLocaleDateString('tr-TR')
    };
    localStorage.setItem('mahsusa_last_read', JSON.stringify(lastReadData));
    updateLastReadUI(lastReadData);
}

function loadLastReadPosition() {
    const saved = localStorage.getItem('mahsusa_last_read');
    if (saved) {
        const lastReadData = JSON.parse(saved);
        updateLastReadUI(lastReadData);
    }
}

function updateLastReadUI(data) {
    const bannerEl = document.getElementById('last-read-banner');
    const historyVerseEl = document.getElementById('history-last-verse');

    if (bannerEl) {
        bannerEl.style.display = 'flex';
        bannerEl.innerHTML = `🔖 Kaldığın Yer: <strong>${data.surah}. Sure / ${data.verse}. Ayet</strong>`;
        bannerEl.onclick = () => resumeLastRead(data.surah, data.verse);
    }

    if (historyVerseEl) {
        historyVerseEl.textContent = `"${data.text}" (${data.surah}, ${data.verse})`;
    }
}

async function resumeLastRead(surah, verse) {
    const resultsContainer = document.getElementById('results-container');
    document.getElementById('results-count').textContent = `${surah}. Sure ${verse}. Ayet Yükleniyor...`;
    resultsContainer.classList.add('show');

    const surahData = await fetchSurahDetails(surah);
    if (surahData && surahData.verses) {
        renderVerses(surahData.verses);
        setTimeout(() => {
            highlightAndScrollToVerse(surah, verse);
        }, 400);
    }
}

function setupSearchInput() {
    const searchInput = document.getElementById('main-search-input');
    const resultsContainer = document.getElementById('results-container');

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();

        if (query === '') {
            resultsContainer.classList.remove('show');
            handleClosePlayer();
            return;
        }

        debounceTimer = setTimeout(async () => {
            document.getElementById('results-count').textContent = "Aranıyor...";
            resultsContainer.classList.add('show');
            
            const results = await searchAyetLive(query);
            renderVerses(results);
        }, 300);
    });
}

function setupInlineFilterButtons() {
    const btnCuz = document.getElementById('btn-cuz');
    if (!btnCuz) return;

    btnCuz.addEventListener('click', async () => {
        openSurahListModal();
    });
}

async function openSurahListModal() {
    openModal('modal-surah-list');
    const container = document.getElementById('surah-grid-container');

    if (cachedSurahList.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted); padding:1rem; text-align:center;">Sureler yükleniyor...</p>`;
        cachedSurahList = await fetchAllSurahsList();
    }

    renderSurahGrid(cachedSurahList);
}

function renderSurahGrid(surahs) {
    const container = document.getElementById('surah-grid-container');
    container.innerHTML = '';

    surahs.forEach(s => {
        const item = document.createElement('div');
        item.className = 'surah-card-item';
        item.onclick = () => selectSurahToRead(s.id, s.name);

        item.innerHTML = `
            <div style="font-weight:700; color:var(--accent-green); font-size:0.95rem;">${s.id}. ${s.name}</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;">${s.translated_name || ''} • ${s.verses_count} Ayet</div>
        `;
        container.appendChild(item);
    });
}

function filterSurahList(query) {
    const filtered = cachedSurahList.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase()) || 
        s.id.toString() === query
    );
    renderSurahGrid(filtered);
}

async function selectSurahToRead(surahId, surahName) {
    closeModal('modal-surah-list');
    const resultsContainer = document.getElementById('results-container');
    document.getElementById('results-count').textContent = `${surahName} Yükleniyor...`;
    resultsContainer.classList.add('show');

    const surahData = await fetchSurahDetails(surahId);
    if (surahData && surahData.verses) {
        renderVerses(surahData.verses);
    }
}

function updateArabicFontSize(sizeVal) {
    document.documentElement.style.setProperty('--arabic-size', `${sizeVal}rem`);
    localStorage.setItem('mahsusa_arabic_size', sizeVal);
}

function updateTranslationFontSize(sizeVal) {
    document.documentElement.style.setProperty('--translation-size', `${sizeVal}rem`);
    localStorage.setItem('mahsusa_translation_size', sizeVal);
}

function loadSavedTypography() {
    const savedArabicSize = localStorage.getItem('mahsusa_arabic_size') || '1.8';
    const savedTransSize = localStorage.getItem('mahsusa_translation_size') || '1.05';
    const savedReciter = localStorage.getItem('mahsusa_reciter') || 'alafasy';

    updateArabicFontSize(savedArabicSize);
    updateTranslationFontSize(savedTransSize);
    if (typeof setSelectedReciter === 'function') setSelectedReciter(savedReciter);

    const sliderArabic = document.getElementById('slider-arabic-font');
    const sliderTrans = document.getElementById('slider-trans-font');
    const selectReciter = document.getElementById('select-reciter');

    if (sliderArabic) sliderArabic.value = savedArabicSize;
    if (sliderTrans) sliderTrans.value = savedTransSize;
    if (selectReciter) selectReciter.value = savedReciter;
}

function copyVerseToClipboard(surah, verse, translationText, arabicText) {
    const fullText = `${surah}. Sure / ${verse}. Ayet\n\n"${translationText}"\n\n${arabicText || ''}\n\n(Mahsusa Kur'an'dan kopyalandı)`;
    navigator.clipboard.writeText(fullText).then(() => {
        alert("Ayet metni panoya kopyalandı!");
    }).catch(err => {
        console.error("Kopyalama hatası:", err);
    });
}

function updateBottomPlayerUI(surah, verse, isPlaying, currentRepeat = 1, totalRepeat = 1) {
    const playerBar = document.getElementById('bottom-audio-player');
    const infoText = document.getElementById('player-info-text');
    const btnPlayPause = document.getElementById('player-btn-play');

    if (playerBar) playerBar.classList.add('active');
    
    const repeatInfo = totalRepeat > 1 ? ` [Tekrar: ${currentRepeat}/${totalRepeat}]` : '';
    if (infoText) infoText.textContent = `${surah}. Sure / ${verse}. Ayet${repeatInfo}`;
    if (btnPlayPause) btnPlayPause.textContent = isPlaying ? '⏸️' : '▶️';

    highlightAndScrollToVerse(surah, verse);
}

function highlightAndScrollToVerse(surah, verse) {
    document.querySelectorAll('.verse-card.playing-active').forEach(card => {
        card.classList.remove('playing-active');
    });

    const targetCard = document.querySelector(`.verse-card[data-surah="${surah}"][data-verse="${verse}"]`);
    if (targetCard) {
        targetCard.classList.add('playing-active');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function handlePlayPauseClick() {
    const isPlaying = toggleAudioPlayPause();
    const btnPlayPause = document.getElementById('player-btn-play');
    if (btnPlayPause) btnPlayPause.textContent = isPlaying ? '⏸️' : '▶️';
}

function handleNextVerse() {
    if (currentPlayingMeta) {
        playVerseAudio(currentPlayingMeta.surah, currentPlayingMeta.verse + 1, true);
    }
}

function handlePrevVerse() {
    if (currentPlayingMeta && currentPlayingMeta.verse > 1) {
        playVerseAudio(currentPlayingMeta.surah, currentPlayingMeta.verse - 1, true);
    }
}

function handleClosePlayer() {
    stopAudioPlayer();
    const playerBar = document.getElementById('bottom-audio-player');
    if (playerBar) playerBar.classList.remove('active');
    document.querySelectorAll('.verse-card.playing-active').forEach(card => {
        card.classList.remove('playing-active');
    });
}

function renderVerses(verses) {
    const verseListContainer = document.getElementById('verse-list');
    const resultsCount = document.getElementById('results-count');
    const savedNotes = JSON.parse(localStorage.getItem('mahsusa_verse_notes') || '{}');
    
    verseListContainer.innerHTML = '';
    resultsCount.textContent = `${verses.length} ayet listelendi`;

    if (verses.length === 0) {
        verseListContainer.innerHTML = `<p style="color:var(--text-muted); padding:1rem;">Sonuç bulunamadı.</p>`;
        return;
    }

    verses.forEach(v => {
        const card = document.createElement('div');
        card.className = 'verse-card';
        const surah = v.surah_id || v.surah;
        const verse = v.verse_number || v.verse;
        const textContent = v.translation ? v.translation.text : (v.text || '');
        const arabicText = v.arabic || v.verse || '';
        const noteKey = `${surah}_${verse}`;
        const hasNote = !!savedNotes[noteKey];

        card.setAttribute('data-surah', surah);
        card.setAttribute('data-verse', verse);

        card.onclick = (e) => {
            if (!e.target.closest('button')) {
                saveLastReadPosition(surah, verse, textContent);
            }
        };

        const arabicHtml = !appSettings.hideArabic ? `<div class="verse-arabic">${arabicText}</div>` : '';
        const translationHtml = !appSettings.hideTranslation ? `<div class="verse-translation">${textContent}</div>` : '';
        const transHtml = !appSettings.hideTransliteration && v.transliteration ? `<div class="verse-transliteration">${v.transliteration}</div>` : '';

        card.innerHTML = `
            <div class="verse-meta">
                <span>
                    ${surah}. Sure / ${verse}. Ayet <span class="author">› ${v.translation ? v.translation.author.name : 'Diyanet'}</span>
                    <span class="note-badge" style="display: ${hasNote ? 'inline-block' : 'none'}; background: var(--accent-green); color: #fff; font-size: 0.65rem; padding: 0.1rem 0.4rem; border-radius: 4px; margin-left: 0.4rem;">Not Var</span>
                </span>
                <div style="display:flex; gap:0.5rem; align-items:center;">
                    <button class="nav-btn" title="Kelime Kelime Meal" onclick="toggleWordByWord('${surah}', '${verse}', this)">🔤</button>
                    <button class="nav-btn" title="Not Ekle" onclick="openNoteModal('${surah}', '${verse}', \`${textContent.replace(/`/g, '')}\`)">📝</button>
                    <button class="nav-btn" title="Kopyala" onclick="copyVerseToClipboard('${surah}', '${verse}', \`${textContent.replace(/`/g, '')}\`, \`${arabicText.replace(/`/g, '')}\`)">📋</button>
                    <button class="nav-btn" title="Dipnot / Tefsir" onclick="showFootnote('${surah}', '${verse}', \`${textContent.replace(/`/g, '')}\`)">💡</button>
                    <button class="nav-btn" title="Dinle" onclick="playVerseAudio(${surah}, ${verse}, true)">🔊</button>
                    <button class="btn-bookmark-verse" onclick="toggleBookmark('${surah}', '${verse}', \`${textContent.replace(/`/g, '')}\`)">🔖</button>
                </div>
            </div>
            ${translationHtml}
            ${arabicHtml}
            ${transHtml}
        `;
        verseListContainer.appendChild(card);
    });
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

function saveProfile() {
    const name = document.getElementById('profile-name').value;
    const city = document.getElementById('profile-city').value;
    localStorage.setItem('mahsusa_name', name);
    localStorage.setItem('mahsusa_city', city);
    alert('Profil kaydedildi.');
    closeModal('modal-settings');
}

function loadSavedProfile() {
    document.getElementById('profile-name').value = localStorage.getItem('mahsusa_name') || 'Eyyüb YAPICI';
    document.getElementById('profile-city').value = localStorage.getItem('mahsusa_city') || 'Malatya';
}

function loadSavedSettings() {
    const saved = localStorage.getItem('mahsusa_settings');
    if (saved) appSettings = JSON.parse(saved);
}

function renderBookmarks() {
    const container = document.getElementById('bookmarks-list');
    const bookmarks = JSON.parse(localStorage.getItem('mahsusa_bookmarks') || '[]');

    if (bookmarks.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted);">Henüz kaydedilmiş bir ayet yok.</p>`;
        return;
    }

    container.innerHTML = bookmarks.map(b => `
        <div style="background:#101216; padding:0.8rem; border-radius:6px; border:1px solid var(--border-color);">
            <div style="font-weight:700; color:var(--accent-green); font-size:0.85rem;">${b.surah}. Sure / ${b.verse}. Ayet</div>
            <div style="font-size:0.9rem; margin-top:0.4rem;">${b.text}</div>
        </div>
    `).join('');
}

function toggleBookmark(surah, verse, text) {
    let bookmarks = JSON.parse(localStorage.getItem('mahsusa_bookmarks') || '[]');
    const exists = bookmarks.find(b => b.surah === surah && b.verse === verse);

    if (!exists) {
        bookmarks.push({ surah, verse, text });
        alert('Yer işaretlerine eklendi.');
    } else {
        bookmarks = bookmarks.filter(b => !(b.surah === surah && b.verse === verse));
        alert('Yer işaretlerinden çıkarıldı.');
    }

    localStorage.setItem('mahsusa_bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
}

function showFootnote(surah, verse, text) {
    const content = document.getElementById('footnote-modal-content');
    content.innerHTML = `
        <h4 style="color:var(--accent-green); margin-bottom:0.5rem;">${surah}. Sure ${verse}. Ayet Açıklaması</h4>
        <p style="font-size:0.95rem; line-height:1.6; color:var(--text-main);">${text}</p>
    `;
    openModal('modal-footnote');
}

function setupThemeToggle() {
    const btnTheme = document.getElementById('btn-theme-toggle');
    const htmlDoc = document.documentElement;
    btnTheme.addEventListener('click', () => {
        const currentTheme = htmlDoc.getAttribute('data-theme');
        htmlDoc.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    });
}