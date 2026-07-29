/**
 * Mahsusa Kur'an - Tam Müfredatlı Elifba & Tecvîd Motoru
 * Kapsam: Diyanet 30 Maddelik Tecvîd Dizini, Zamir (Hâ Harfi) 1/18 Slayt Modülü, QuranKids Filtreleme & Oyunlar
 */

// 1. DİYANET 30 MADDELİK MÜFREDAT DİZİNİ (Görsel 435, 436, 437, 438)
const DIYANET_TOPICS = [
    { id: 1, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "1. HARFLER" },
    { id: 2, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "2. FETHA" },
    { id: 3, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "3. FETHA'NIN UZATILMASI" },
    { id: 4, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "4. FETHA'NIN TENVİNİ (İki Fetha)" },
    { id: 5, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "5. KESRA" },
    { id: 6, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "6. KESRA'NIN UZATILMASI" },
    { id: 7, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "7. KESRA'NIN TENVİNİ (İki Kesra)" },
    { id: 8, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "8. DAMME" },
    { id: 9, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "9. DAMME'NİN UZATILMASI" },
    { id: 10, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "10. DAMME'NİN TENVİNİ (İki Damme)" },
    { id: 11, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "11. CEZM (Harflerin Birleştirilmesi)" },
    { id: 12, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "12. ŞEDDE" },
    { id: 13, cat: "I. BÖLÜM: TEMEL BİLGİLER", title: "13. PEKİŞTİRME" },
    { id: 14, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "14. ZAMİR (Hâ Harfi)" },
    { id: 15, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "15. VAKF" },
    { id: 16, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "16. RÂ HARFİ" },
    { id: 17, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "17. LAFZATULLAH'IN LÂM'I" },
    { id: 18, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "18. İHFÂ - İZHAR" },
    { id: 19, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "19. İDĞÂM-I BİLA ĞUNNE" },
    { id: 20, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "20. İDĞÂM-I MEA'L-ĞUNNE" },
    { id: 21, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "21. İDĞÂM-I MİSLEYN MEA'L-ĞUNNE" },
    { id: 22, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "22. İKLÂB - İHFÂ-İ ŞEFEVİYYE" },
    { id: 23, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "23. İDĞÂM-I MİSLEYN BİLÂ ĞUNNE" },
    { id: 24, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "24. İDĞÂM-I MÜTEKÂRİBEYN / MÜTECÂNİSEYN" },
    { id: 25, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "25. KALKALE" },
    { id: 26, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "26. MEDD-İ TABÎÎ - MEDD-İ MUTTASIL - MEDD-İ MUNFASIL" },
    { id: 27, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "27. MEDD-İ LÂZIM - MEDD-İ ÂRİZ - MEDD-İ LÎN" },
    { id: 28, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "28. HURÛF-U MUKATTAA" },
    { id: 29, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "29. TENVİNLİ KELİMELERDEN GEÇİŞ" },
    { id: 30, cat: "II. BÖLÜM: TECVÎD UYGULAMALARI", title: "30. UYGULAMA VE MUSHAFLARDA YER ALAN İŞARETLER" }
];

// 2. DİYANET ZAMİR (HÂ HARFİ) UZATILDIĞI KONUMLAR KELİME KÜMESİ (Görsel 440 Birebir Verisi)
const ZAMIR_WORDS = [
    { ar: "مَا حَوْلَهُ", tr: "Mā ḥavlahū", highlight: "هُ" },
    { ar: "نَبْذَهُ", tr: "Nabżahū", highlight: "هُ" },
    { ar: "رَبُّهُ", tr: "Rabbuhū", highlight: "هُ" },
    { ar: "لَعَلَّهُ", tr: "La'allahū", highlight: "هُ" },
    { ar: "وَاُمُّهُ", tr: "Va ummuhū", highlight: "هُ" },
    { ar: "إِنَّهُ بِهِمْ", tr: "Innahū bihim", highlight: "هُ" },
    { ar: "اَيْمْسِكُهُ", tr: "Aymsikuhū", highlight: "هُ" },
    { ar: "وَحَمْلُهُ", tr: "Va ḥamluhū", highlight: "هُ" },
    { ar: "وَفِصَالُهُ", tr: "Va fiṣāluhū", highlight: "هُ" },
    { ar: "وَجُنُودُهُ", tr: "Va junūduhū", highlight: "هُ" },
    { ar: "وَمَا نُنَزِّلُهُ", tr: "Va mā nunazziluhū", highlight: "هُ" },
    { ar: "يُحَاوِرُهُ", tr: "Yuhāviruhū", highlight: "هُ" },
    { ar: "بَعْدِهِ", tr: "Ba'dihī", highlight: "هِ" },
    { ar: "يَهْدِى بِهِ", tr: "Yahdī bihī", highlight: "هِ" },
    { ar: "وَكُتُبِهِ", tr: "Va kutubihī", highlight: "هِ" },
    { ar: "وَرُسُلِهِ", tr: "Va rusulihī", highlight: "هِ" },
    { ar: "وَاِخْوَتِهِ", tr: "Va ikhvatihī", highlight: "هِ" },
    { ar: "فِى هٰذِهِ", tr: "Fī hāżihī", highlight: "هِ" }
];

// 3. HARF VERİ KÜMESİ (Görsel 431 Filtreleme Etiketleriyle)
const HARFLER_DATA = [
    { id: 1, char: "ا", name: "Elif", tag: "ince" },
    { id: 2, char: "ب", name: "Be", tag: "ince" },
    { id: 3, char: "ت", name: "Te", tag: "ince" },
    { id: 4, char: "ث", name: "Se", tag: "peltek" },
    { id: 5, char: "ج", name: "Cim", tag: "ince" },
    { id: 6, char: "ح", name: "Ha", tag: "ince" },
    { id: 7, char: "خ", name: "Hı", tag: "kalin" },
    { id: 8, char: "د", name: "Dal", tag: "ince" },
    { id: 9, char: "ذ", name: "Zel", tag: "peltek" },
    { id: 10, char: "ر", name: "Ra", tag: "kalin" },
    { id: 11, char: "ز", name: "Ze", tag: "ince" },
    { id: 12, char: "س", name: "Sin", tag: "ince" },
    { id: 13, char: "ش", name: "Şın", tag: "ince" },
    { id: 14, char: "ص", name: "Sad", tag: "kalin" },
    { id: 15, char: "ض", name: "Dat", tag: "kalin" },
    { id: 16, char: "ط", name: "Tı", tag: "kalin" },
    { id: 17, char: "ظ", name: "Zı", tag: "peltek" },
    { id: 18, char: "ع", name: "Ayn", tag: "ince" },
    { id: 19, char: "غ", name: "Gayn", tag: "kalin" },
    { id: 20, char: "ف", name: "Fe", tag: "ince" },
    { id: 21, char: "ق", name: "Kaf", tag: "kalin" },
    { id: 22, char: "ك", name: "Kef", tag: "ince" },
    { id: 23, char: "ل", name: "Lam", tag: "ince" },
    { id: 24, char: "م", name: "Mim", tag: "ince" },
    { id: 25, char: "ن", name: "Nun", tag: "ince" },
    { id: 26, char: "و", name: "Vav", tag: "ince" },
    { id: 27, char: "هـ", name: "He", tag: "ince" },
    { id: 28, char: "لا", name: "Lamelif", tag: "ince" },
    { id: 29, char: "ي", name: "Ye", tag: "ince" }
];

let appState = {
    session: null,
    activeTab: 'harfler',
    selectedMatchCards: []
};

document.addEventListener('DOMContentLoaded', () => {
    appState.session = getOrInitSession();
    renderAppLayout();
});

function setMode(mode) {
    appState.session.mode = mode;
    localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
    renderAppLayout();
}

function switchTab(tab) {
    appState.activeTab = tab;
    renderAppLayout();
}

// SES MOTORU (ARAPÇA SENTEZLEYİCİ)
function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'ar-SA';
        msg.rate = 0.75;
        window.speechSynthesis.speak(msg);
    }
}

// ARAYÜZ MOTORU
function renderAppLayout() {
    const root = document.getElementById('elifba-app-root');
    const mode = appState.session.mode;
    const body = document.getElementById('elifba-body');

    if (mode === 'child') {
        body.className = "bg-gradient-to-br from-teal-50 via-sky-50 to-emerald-50 text-slate-900 font-sans min-h-screen flex flex-col justify-between";
    } else if (mode === 'diyanet') {
        body.className = "bg-[#fcf8f2] text-slate-900 font-sans min-h-screen flex flex-col justify-between border-t-4 border-[#d4af37]";
    } else {
        body.className = "bg-gradient-to-br from-slate-50 via-emerald-50/40 to-slate-100 text-slate-800 font-sans min-h-screen flex flex-col justify-between";
    }

    root.innerHTML = `
        <!-- ÜST TEMA & SEÇENEK BAR (Görsel 439 & 434 Sentezi) -->
        <div class="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-emerald-100 mb-6 max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                
                <!-- Mod Değiştirici -->
                <div class="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
                    <button onclick="setMode('child')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'child' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-600'}">
                        🎈 Çocuk Modu (QuranKids)
                    </button>
                    <button onclick="setMode('adult')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'adult' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-600'}">
                        🌿 Yetişkin Modu (Elifba.online)
                    </button>
                    <button onclick="setMode('diyanet')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'diyanet' ? 'bg-[#005a42] text-amber-300 shadow-md border border-amber-500/40' : 'text-slate-600'}">
                        📜 Diyanet İleri Seviye (Tecvîd)
                    </button>
                </div>

                <!-- Puan Paneli -->
                <div class="flex items-center gap-3">
                    <div class="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs">
                        ⭐ ${appState.session.stars} Puan
                    </div>
                </div>

            </div>
        </div>

        <!-- MODA GÖRE ARAYÜZ YÜKLEME -->
        <div class="max-w-7xl mx-auto">
            ${mode === 'diyanet' ? renderDiyanetAdvancedView() : (mode === 'child' ? renderChildView() : renderAdultView())}
        </div>
    `;
}

// ==========================================
// 1. DİYANET İLERİ SEVİYE & TECVÎD (Görsel 435-440)
// ==========================================
function renderDiyanetAdvancedView() {
    const currentTopic = DIYANET_TOPICS.find(t => t.id === appState.session.activeDiyanetTopic) || DIYANET_TOPICS[13];

    return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- SOL SOL MENÜ: DİYANET 30 MADDELİK TECVİD DİZİNİ (Görsel 435-438) -->
            <div class="lg:col-span-4 bg-white rounded-3xl p-4 border border-amber-200 shadow-sm space-y-3 max-h-[750px] overflow-y-auto no-scrollbar">
                <div class="p-3 rounded-2xl bg-[#005a42] text-amber-300 font-extrabold text-sm text-center">
                    T.C. DİYANET İŞLERİ BAŞKANLIĞI ELİFBA & TECVİD MÜFREDATI
                </div>

                <div class="space-y-1 text-xs font-semibold">
                    ${DIYANET_TOPICS.map(t => `
                        <button onclick="selectDiyanetTopic(${t.id})" class="w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${appState.session.activeDiyanetTopic === t.id ? 'bg-amber-100/80 border-amber-400 text-amber-900 font-bold' : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                            <span>${t.title}</span>
                            <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- SAĞ ALAN: İNTERAKTİF DETAY VE ZAMİR 1/18 SLAYT EKRANI (Görsel 440) -->
            <div class="lg:col-span-8 space-y-6">
                
                <!-- Başlık ve Kural Açıklaması -->
                <div class="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm space-y-3">
                    <div class="flex items-center justify-between border-b border-amber-100 pb-3">
                        <h2 class="text-xl font-bold text-slate-900">${currentTopic.title}</h2>
                        <button onclick="speakText('${currentTopic.title}')" class="p-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100" title="Sesli Anlatım">
                            <i class="fa-solid fa-volume-high text-lg"></i>
                        </button>
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        Bir önceki harf harekeli olduğunda <strong>"Hâ harfi" (Zamir)</strong> uzatılarak okunur. Aşağıdaki kelimelerde yer alan <strong>"Hâ"</strong> harflerini ritmik usülle uzatarak okuyunuz.
                    </p>
                </div>

                <!-- GÖRSEL 440 BİREBİR İNTERAKTİF EKRANI (18 Kart + Sağ Slayt Penceresi) -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    <!-- Sol 18 Kelime Izgarası -->
                    <div class="md:col-span-7 grid grid-cols-3 gap-3">
                        ${ZAMIR_WORDS.map((w, idx) => `
                            <div onclick="selectZamirSlide(${idx})" class="p-4 rounded-2xl bg-white border ${appState.session.slideIndex === idx ? 'border-amber-500 ring-2 ring-amber-300 bg-amber-50/40' : 'border-amber-200/80 hover:border-amber-400'} cursor-pointer text-center transition-all shadow-sm">
                                <div class="arabic-text text-2xl text-slate-800 font-bold leading-loose">
                                    ${w.ar.replace(w.highlight, `<span class="text-red-600 font-extrabold">${w.highlight}</span>`)}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Sağ Büyütülmüş Canlı Slayt (1/18 Slayt Görseli) -->
                    <div class="md:col-span-5 bg-[#f5efe6] rounded-3xl p-6 border-2 border-amber-300 text-center space-y-6 shadow-md">
                        <div class="text-xs text-slate-400 font-bold tracking-widest">
                            ${appState.session.slideIndex + 1} / ${ZAMIR_WORDS.length}
                        </div>

                        <!-- Büyük Büyüteçli Kelime -->
                        <div class="arabic-text text-5xl text-slate-900 font-bold my-8 py-4 bg-white/60 rounded-2xl border border-amber-200 shadow-inner">
                            ${ZAMIR_WORDS[appState.session.slideIndex].ar.replace(ZAMIR_WORDS[appState.session.slideIndex].highlight, `<span class="text-red-600 font-extrabold">${ZAMIR_WORDS[appState.session.slideIndex].highlight}</span>`)}
                        </div>

                        <div class="text-sm font-bold text-slate-700">
                            Okunuş: <span class="text-amber-900">${ZAMIR_WORDS[appState.session.slideIndex].tr}</span>
                        </div>

                        <!-- İleri / Geri Butonları -->
                        <div class="flex items-center justify-center gap-4 pt-4 border-t border-amber-200">
                            <button onclick="prevZamirSlide()" class="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            <button onclick="speakText('${ZAMIR_WORDS[appState.session.slideIndex].ar}')" class="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow text-lg">
                                <i class="fa-solid fa-volume-high"></i>
                            </button>
                            <button onclick="nextZamirSlide()" class="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    `;
}

function selectDiyanetTopic(id) {
    appState.session.activeDiyanetTopic = id;
    appState.session.slideIndex = 0;
    renderAppLayout();
}

function selectZamirSlide(idx) {
    appState.session.slideIndex = idx;
    speakText(ZAMIR_WORDS[idx].ar);
    renderAppLayout();
}

function nextZamirSlide() {
    if (appState.session.slideIndex < ZAMIR_WORDS.length - 1) {
        appState.session.slideIndex++;
    } else {
        appState.session.slideIndex = 0;
    }
    speakText(ZAMIR_WORDS[appState.session.slideIndex].ar);
    renderAppLayout();
}

function prevZamirSlide() {
    if (appState.session.slideIndex > 0) {
        appState.session.slideIndex--;
    } else {
        appState.session.slideIndex = ZAMIR_WORDS.length - 1;
    }
    speakText(ZAMIR_WORDS[appState.session.slideIndex].ar);
    renderAppLayout();
}

// ==========================================
// 2. QURANKIDS ÇOCUK MODU (Görsel 431, 432, 433, 434)
// ==========================================
function renderChildView() {
    return `
        <div class="space-y-6">
            
            <!-- ÜST TAB NAVİGASYON -->
            <div class="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-emerald-100 text-xs font-bold no-scrollbar">
                <button onclick="switchTab('child-harfler')" class="px-5 py-2.5 rounded-xl ${appState.activeTab === 'child-harfler' || appState.activeTab === 'harfler' ? 'bg-emerald-500 text-white' : 'text-slate-600'}">📚 Harf Çalışması (Filtreli)</button>
                <button onclick="switchTab('child-dersler')" class="px-5 py-2.5 rounded-xl ${appState.activeTab === 'child-dersler' ? 'bg-emerald-500 text-white' : 'text-slate-600'}">🎯 Seviyeli Dersler (Görsel 434)</button>
                <button onclick="switchTab('child-oyunlar')" class="px-5 py-2.5 rounded-xl ${appState.activeTab === 'child-oyunlar' ? 'bg-emerald-500 text-white' : 'text-slate-600'}">🎮 Oyun Listesi (Görsel 433)</button>
                <button onclick="switchTab('child-gelisim')" class="px-5 py-2.5 rounded-xl ${appState.activeTab === 'child-gelisim' ? 'bg-emerald-500 text-white' : 'text-slate-600'}">🚀 Gelişim & Veli (Görsel 432)</button>
            </div>

            <!-- İÇERİK -->
            ${renderChildTabContent()}

        </div>
    `;
}

function renderChildTabContent() {
    if (appState.activeTab === 'child-dersler') return renderChildDersler();
    if (appState.activeTab === 'child-oyunlar') return renderChildOyunlar();
    if (appState.activeTab === 'child-gelisim') return renderChildGelisim();
    return renderChildHarflerFiltered(); // Varsayılan
}

// GÖRSEL 431 BİREBİR FİLTRELİ HARF ÇALIŞMASI EKRANI
function renderChildHarflerFiltered() {
    // Filtreleme mantığı
    let filtered = HARFLER_DATA.filter(h => {
        if (appState.session.filterType === 'peltek') return h.tag === 'peltek';
        if (appState.session.filterType === 'kalin') return h.tag === 'kalin';
        if (appState.session.filterType === 'ince') return h.tag === 'ince';
        return true;
    });

    if (appState.session.hideLearned) {
        filtered = filtered.filter(h => !appState.session.completed.includes(h.name));
    }

    return `
        <div class="space-y-4">
            <!-- Görsel 431 Üst Kontrol Barı -->
            <div class="bg-white p-4 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                <!-- Dropdown Sınıf Filtresi -->
                <div class="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span>Sınıf:</span>
                    <select onchange="changeFilterType(this.value)" class="p-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 font-bold">
                        <option value="all" ${appState.session.filterType === 'all' ? 'selected' : ''}>Tümü</option>
                        <option value="peltek" ${appState.session.filterType === 'peltek' ? 'selected' : ''}>Peltek Harfler</option>
                        <option value="kalin" ${appState.session.filterType === 'kalin' ? 'selected' : ''}>Kalın Harfler</option>
                        <option value="ince" ${appState.session.filterType === 'ince' ? 'selected' : ''}>İnce Harfler</option>
                    </select>
                </div>

                <!-- Gizle Checkbox -->
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-sky-700">
                    <input type="checkbox" onchange="toggleHideLearned(this.checked)" ${appState.session.hideLearned ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-500">
                    <span>Öğrendiğin Harfleri listeden gizle</span>
                </label>

            </div>

            <!-- Harf Grid (Görsel 431 Birebir Dizilimi) -->
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                ${filtered.map(h => {
                    const isDone = appState.session.completed.includes(h.name);
                    return `
                        <div onclick="toggleLearnHarf('${h.name}')" class="p-5 rounded-2xl bg-white border-2 ${isDone ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-400'} cursor-pointer text-center transition-all shadow-sm">
                            <div class="arabic-text text-4xl text-slate-800 mb-1 font-bold">${h.char}</div>
                            <div class="text-xs font-bold text-slate-600">${h.name}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function changeFilterType(val) {
    appState.session.filterType = val;
    renderAppLayout();
}

function toggleHideLearned(checked) {
    appState.session.hideLearned = checked;
    renderAppLayout();
}

function toggleLearnHarf(name) {
    speakText(name);
    if (!appState.session.completed.includes(name)) {
        appState.session.completed.push(name);
        appState.session.stars += 10;
    } else {
        appState.session.completed = appState.session.completed.filter(c => c !== name);
    }
    localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
    renderAppLayout();
}

// GÖRSEL 434 BİREBİR DERSLER YOL HARİTASI
function renderChildDersler() {
    const list = [
        { id: 1, title: "Elifba Harfleri Çalışması", sub: "Sihirli harf yolculuğu", time: "00:00:08", rewards: "8 ⭐" },
        { id: 2, title: "Baş-Orta-Son Gelişmiş Pratik", sub: "Eğlenceli pratik zamanı", time: "00:00:00", rewards: "0 ⭐" },
        { id: 3, title: "Harekeler Çalışması (Üstün-Esre-Ötre)", sub: "Ünlü macerası", time: "00:00:00", rewards: "0 ⭐" },
        { id: 4, title: "Üstün Çalışması", sub: "Ünlü macerası", time: "00:00:00", rewards: "0 ⭐" },
        { id: 5, title: "Esre Çalışması", sub: "Ünlü macerası", time: "00:00:00", rewards: "0 ⭐" },
        { id: 6, title: "Ötre Çalışması", sub: "Ünlü macerası", time: "00:00:00", rewards: "0 ⭐" }
    ];

    return `
        <div class="space-y-4">
            <h3 class="text-base font-bold text-slate-800">Dersler</h3>
            <div class="space-y-3">
                ${list.map(d => `
                    <div class="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-emerald-500 text-white font-extrabold flex items-center justify-center text-sm shadow">
                                ${d.id}
                            </div>
                            <div>
                                <h4 class="text-sm font-bold text-slate-800">${d.title}</h4>
                                <span class="text-xs text-slate-400 font-medium">${d.sub}</span>
                            </div>
                        </div>
                        <div class="text-right text-xs font-bold text-slate-500">
                            <div>${d.time} | ${d.rewards}</div>
                            <span class="text-[10px] text-emerald-600">Sonraki Ödül: 3:00</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// GÖRSEL 433 BİREBİR OYUN LİSTESİ
function renderChildOyunlar() {
    const games = [
        { id: 1, name: "Elifba Oyunum", type: "Klasik", score: 0 },
        { id: 2, name: "Baş Orta Son Oyunu 1", type: "Macera", score: 0 },
        { id: 3, name: "Baş Orta Son Oyunu 2", type: "Macera", score: 0 },
        { id: 4, name: "3. Seviye: Harfler ve Şekiller", type: "Şekil", score: 0 },
        { id: 5, name: "Harf Eşleştirme", type: "Eşleştir", score: "Net 1" }
    ];

    return `
        <div class="space-y-4">
            <h3 class="text-base font-bold text-slate-800">Oyun Listesi</h3>
            <div class="space-y-3">
                ${games.map(g => `
                    <div class="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
                                ${g.id}
                            </div>
                            <div>
                                <h4 class="text-sm font-bold text-slate-800">${g.name}</h4>
                                <span class="text-xs text-slate-400 font-medium">${g.type}</span>
                            </div>
                        </div>
                        <button onclick="startMiniGame('${g.name}')" class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow">
                            Oyna (Skor: ${g.score})
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function startMiniGame(name) {
    speakText(name);
    alert(`${name} başlatılıyor! Harfleri dinleyin ve doğru olanı seçin.`);
}

// GÖRSEL 432 BİREBİR GELİŞİM VE VELİ REHBERİ
function renderChildGelisim() {
    return `
        <div class="space-y-6">
            <div class="p-6 rounded-3xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white space-y-2 shadow-md">
                <h3 class="text-lg font-bold">Küçük adımlar, büyük ilerleme</h3>
                <p class="text-xs leading-relaxed opacity-90">Harf pratikleri ve oyunlarla ilerlemen burada özetlenir. Veliler için ipuçları ve iletişim seçenekleri aşağıdadır.</p>
            </div>

            <div class="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
                <h4 class="text-sm font-bold text-emerald-600">Hakkımızda</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                    Mahsusa Kur'an QuranKids, Kur'an harflerini eğlenceli pratikler ve oyunlarla öğrenmeyi hedefler. Elifba çalışmaları ve çevrimiçi yarışmalar tek yerde toplanır.
                </p>

                <div class="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold space-y-2">
                    <div class="font-bold">Gizlilik ve Güvenlik:</div>
                    <p class="text-[11px] opacity-80">Bu web sürümünde çalışma ilerlemen tarayıcıda (localStorage) saklanır. Çocukların uygulamayı yetişkin gözetiminde kullanması önerilir.</p>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// 3. YETİŞKİN MODU (Elifba.online)
// ==========================================
function renderAdultView() {
    return `
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-base font-bold text-slate-800">Yetişkin Temel Elifba Rehberi</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                ${HARFLER_DATA.map(h => `
                    <div onclick="speakText('${h.name}')" class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-500 text-center cursor-pointer transition-all">
                        <div class="arabic-text text-3xl text-emerald-800 font-bold mb-1">${h.char}</div>
                        <div class="text-xs font-semibold text-slate-700">${h.name}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}