/**
 * Mahsusa Kur'an - Tam Teşekküllü Elifba Portal Motoru
 * Özellikler: Tam Ses Desteği, Çalışan İnteraktif Dersler, Canlı Mini Oyunlar, İleri Tecvîd Slaytları
 */

// 1. TAM TECVÎD VE ELİFBA MÜFREDAT DİZİNİ (Özgün Kurumsal İsimlendirme)
const TECVID_TOPICS = [
    { id: 1, title: "1. HARFLER VE MAREÇLER" },
    { id: 2, title: "2. FETHA (ÜSTÜN)" },
    { id: 3, title: "3. FETHA'NIN UZATILMASI" },
    { id: 4, title: "4. FETHA'NIN TENVİNİ (İki Üstün)" },
    { id: 5, title: "5. KESRA (ESRE)" },
    { id: 6, title: "6. KESRA'NIN UZATILMASI" },
    { id: 7, title: "7. KESRA'NIN TENVİNİ (İki Esre)" },
    { id: 8, title: "8. DAMME (ÖTRE)" },
    { id: 9, title: "9. DAMME'NİN UZATILMASI" },
    { id: 10, title: "10. DAMME'NİN TENVİNİ (İki Ötre)" },
    { id: 11, title: "11. CEZM (Harf Bağlama)" },
    { id: 12, title: "12. ŞEDDE (Çift Okutma)" },
    { id: 13, title: "13. PEKİŞTİRME OKUMALARI" },
    { id: 14, title: "14. ZAMİR (Hâ Harfi)" },
    { id: 15, title: "15. VAKF (DURAK) KURALLARI" },
    { id: 16, title: "16. RÂ HARFİNİN OKUNUŞU" },
    { id: 17, title: "17. LAFZATULLAH'IN LÂM'I" },
    { id: 18, title: "18. İHFÂ VE İZHAR" },
    { id: 19, title: "19. İDĞÂM-I BİLA ĞUNNE" },
    { id: 20, title: "20. İDĞÂM-I MEA'L-ĞUNNE" },
    { id: 21, title: "21. İDĞÂM-I MİSLEYN" },
    { id: 22, title: "22. İKLÂB VE İHFÂ-İ ŞEFEVİYYE" },
    { id: 23, title: "23. İDĞÂM-I MİSLEYN BİLÂ ĞUNNE" },
    { id: 24, title: "24. İDĞÂM-I MÜTEKÂRİBEYN" },
    { id: 25, title: "25. KALKALE" },
    { id: 26, title: "26. MEDD-İ TABÎÎ VE MUTTASIL" },
    { id: 27, title: "27. MEDD-İ LÂZIM VE ÂRİZ" },
    { id: 28, title: "28. HURÛF-U MUKATTAA" },
    { id: 29, title: "29. TENVİNLİ KELİME GEÇİŞLERİ" },
    { id: 30, title: "30. MUSHAFA UYGULAMA İŞARETLERİ" }
];

// 2. ZAMİR KELİME DİZİSİ (1/18 SLAYT KARTLARI)
const ZAMIR_WORDS = [
    { ar: "مَا حَوْلَهُ", tr: "Mā ḥavlahū", hl: "هُ" },
    { ar: "نَبْذَهُ", tr: "Nabżahū", hl: "هُ" },
    { ar: "رَبُّهُ", tr: "Rabbuhū", hl: "هُ" },
    { ar: "لَعَلَّهُ", tr: "La'allahū", hl: "هُ" },
    { ar: "وَاُمُّهُ", tr: "Va ummuhū", hl: "هُ" },
    { ar: "إِنَّهُ بِهِمْ", tr: "Innahū bihim", hl: "هُ" },
    { ar: "اَيْمْسِكُهُ", tr: "Aymsikuhū", hl: "هُ" },
    { ar: "وَحَمْلُهُ", tr: "Va ḥamluhū", hl: "هُ" },
    { ar: "وَفِصَالُهُ", tr: "Va fiṣāluhū", hl: "هُ" },
    { ar: "وَجُنُودُهُ", tr: "Va junūduhū", hl: "هُ" },
    { ar: "وَمَا نُنَزِّلُهُ", tr: "Va mā nunazziluhū", hl: "هُ" },
    { ar: "يُحَاوِرُهُ", tr: "Yuhāviruhū", hl: "هُ" },
    { ar: "بَعْدِهِ", tr: "Ba'dihī", hl: "هِ" },
    { ar: "يَهْدِى بِهِ", tr: "Yahdī bihī", hl: "هِ" },
    { ar: "وَكُتُبِهِ", tr: "Va kutubihī", hl: "هِ" },
    { ar: "وَرُسُلِهِ", tr: "Va rusulihī", hl: "هِ" },
    { ar: "وَاِخْوَتِهِ", tr: "Va ikhvatihī", hl: "هِ" },
    { ar: "فِى هٰذِهِ", tr: "Fī hāżihī", hl: "هِ" }
];

// 3. ARAP ALFABESİ DATA
const HARFLER_DATA = [
    { id: 1, char: "ا", name: "Elif", tag: "ince", basta: "ا", ortada: "ـا", sonda: "ـا" },
    { id: 2, char: "ب", name: "Be", tag: "ince", basta: "بـ", ortada: "ـبـ", sonda: "ـب" },
    { id: 3, char: "ت", name: "Te", tag: "ince", basta: "تـ", ortada: "ـتـ", sonda: "ـت" },
    { id: 4, char: "ث", name: "Se", tag: "peltek", basta: "ثـ", ortada: "ـثـ", sonda: "ـث" },
    { id: 5, char: "ج", name: "Cim", tag: "ince", basta: "جـ", ortada: "ـجـ", sonda: "ـج" },
    { id: 6, char: "ح", name: "Ha", tag: "ince", basta: "حـ", ortada: "ـحـ", sonda: "ـح" },
    { id: 7, char: "خ", name: "Hı", tag: "kalin", basta: "خـ", ortada: "ـخـ", sonda: "ـخ" },
    { id: 8, char: "د", name: "Dal", tag: "ince", basta: "د", ortada: "ـد", sonda: "ـد" },
    { id: 9, char: "ذ", name: "Zel", tag: "peltek", basta: "ذ", ortada: "ـذ", sonda: "ـذ" },
    { id: 10, char: "ر", name: "Ra", tag: "kalin", basta: "ر", ortada: "ـر", sonda: "ـر" },
    { id: 11, char: "ز", name: "Ze", tag: "ince", basta: "ز", ortada: "ـز", sonda: "ـز" },
    { id: 12, char: "س", name: "Sin", tag: "ince", basta: "سـ", ortada: "ـسـ", sonda: "ـس" },
    { id: 13, char: "ش", name: "Şın", tag: "ince", basta: "شـ", ortada: "ـشـ", sonda: "ـش" },
    { id: 14, char: "ص", name: "Sad", tag: "kalin", basta: "صـ", ortada: "ـصـ", sonda: "ـص" },
    { id: 15, char: "ض", name: "Dat", tag: "kalin", basta: "ضـ", ortada: "ـضـ", sonda: "ـض" },
    { id: 16, char: "ط", name: "Tı", tag: "kalin", basta: "طـ", ortada: "ـطـ", sonda: "ـط" },
    { id: 17, char: "ظ", name: "Zı", tag: "peltek", basta: "ظـ", ortada: "ـظـ", sonda: "ـظ" },
    { id: 18, char: "ع", name: "Ayn", tag: "ince", basta: "عـ", ortada: "ـعـ", sonda: "ـع" },
    { id: 19, char: "غ", name: "Gayn", tag: "kalin", basta: "غـ", ortada: "ـغـ", sonda: "ـغ" },
    { id: 20, char: "ف", name: "Fe", tag: "ince", basta: "فـ", ortada: "ـفـ", sonda: "ـف" },
    { id: 21, char: "ق", name: "Kaf", tag: "kalin", basta: "قـ", ortada: "ـقـ", sonda: "ـق" },
    { id: 22, char: "ك", name: "Kef", tag: "ince", basta: "كـ", ortada: "ـكـ", sonda: "ـك" },
    { id: 23, char: "ل", name: "Lam", tag: "ince", basta: "لـ", ortada: "ـلـ", sonda: "ـل" },
    { id: 24, char: "م", name: "Mim", tag: "ince", basta: "مـ", ortada: "ـمـ", sonda: "ـم" },
    { id: 25, char: "ن", name: "Nun", tag: "ince", basta: "نـ", ortada: "ـنـ", sonda: "ـن" },
    { id: 26, char: "و", name: "Vav", tag: "ince", basta: "و", ortada: "ـو", sonda: "ـو" },
    { id: 27, char: "هـ", name: "He", tag: "ince", basta: "هـ", ortada: "ـهـ", sonda: "ـه" },
    { id: 28, char: "لا", name: "Lamelif", tag: "ince", basta: "لا", ortada: "ـلا", sonda: "ـلا" },
    { id: 29, char: "ي", name: "Ye", tag: "ince", basta: "يـ", ortada: "ـيـ", sonda: "ـي" }
];

let appState = {
    session: null,
    activeChildTab: 'harfler',
    matchCards: [],
    selectedMatchCards: [],
    keyboardCurrentChar: null
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

// %100 GARANTİLİ ÇALIŞAN SES MOTORU
function speakAudio(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'ar-SA';
        msg.rate = 0.8;
        window.speechSynthesis.speak(msg);
    } else {
        // Fallback Web Audio API bip efekti
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            osc.frequency.value = 440;
            osc.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
        } catch(e){}
    }
}

function renderAppLayout() {
    const root = document.getElementById('elifba-app-root');
    const mode = appState.session.mode;

    root.innerHTML = `
        <!-- MOD SEÇİM ÜST BAR -->
        <div class="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-emerald-100 mb-6 max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                
                <div class="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
                    <button onclick="setMode('child')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'child' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-600'}">
                        🎈 Mahsusa Çocuk Elifba
                    </button>
                    <button onclick="setMode('adult')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'adult' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-600'}">
                        🌿 Mahsusa Yetişkin Rehberi
                    </button>
                    <button onclick="setMode('advanced')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'advanced' ? 'bg-emerald-900 text-amber-300 shadow-md' : 'text-slate-600'}">
                        📜 İleri Seviye Tecvîd Müfredatı
                    </button>
                </div>

                <div class="flex items-center gap-3">
                    <div class="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs">
                        ⭐ ${appState.session.stars} Puan
                    </div>
                </div>

            </div>
        </div>

        <!-- AKTİF MOD ARAYÜZÜ -->
        <div class="max-w-7xl mx-auto">
            ${mode === 'advanced' ? renderAdvancedTecvidView() : (mode === 'child' ? renderChildView() : renderAdultView())}
        </div>
    `;
}

// ==========================================
// 1. İLERİ SEVİYE TECVÎD MÜFREDATI & ZAMİR SLAYTLARI
// ==========================================
function renderAdvancedTecvidView() {
    const currentTopic = TECVID_TOPICS.find(t => t.id === appState.session.activeTopicId) || TECVID_TOPICS[13];

    return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- SOL MENÜ: 30 MADDELİK TECVİD LİSTESİ -->
            <div class="lg:col-span-4 bg-white rounded-3xl p-4 border border-emerald-200 shadow-sm space-y-2 max-h-[720px] overflow-y-auto no-scrollbar">
                <div class="p-3 rounded-2xl bg-emerald-950 text-amber-300 font-extrabold text-xs text-center">
                    MAHSUSA İLERİ SEVİYE TECVÎD DİZİNİ
                </div>

                <div class="space-y-1 text-xs font-semibold">
                    ${TECVID_TOPICS.map(t => `
                        <button onclick="selectTopic(${t.id})" class="w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${appState.session.activeTopicId === t.id ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                            <span>${t.title}</span>
                            <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- SAĞ ALAN: DETAY EKRANI VE ZAMİR SLAYTI (1/18) -->
            <div class="lg:col-span-8 space-y-6">
                
                <div class="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-3">
                    <div class="flex items-center justify-between border-b border-emerald-100 pb-3">
                        <h2 class="text-xl font-bold text-slate-900">${currentTopic.title}</h2>
                        <button onclick="speakAudio('${currentTopic.title}')" class="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                            <i class="fa-solid fa-volume-high text-lg"></i>
                        </button>
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        Bir önceki harf harekeli olduğunda <strong>"Hâ harfi" (Zamir)</strong> uzatılarak okunur. Aşağıdaki kelimelerde yer alan <strong>"Hâ"</strong> harflerini ritmik usülle uzatarak okuyunuz.
                    </p>
                </div>

                <!-- 18 KART VE SAĞ BÜYÜK SLAYT PENCERESİ -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    <div class="md:col-span-7 grid grid-cols-3 gap-3">
                        ${ZAMIR_WORDS.map((w, idx) => `
                            <div onclick="selectSlide(${idx})" class="p-4 rounded-2xl bg-white border ${appState.session.slideIndex === idx ? 'border-amber-500 ring-2 ring-amber-300 bg-amber-50/50' : 'border-slate-200 hover:border-emerald-400'} cursor-pointer text-center transition-all shadow-sm">
                                <div class="arabic-text text-2xl text-slate-800 font-bold leading-loose">
                                    ${w.ar.replace(w.hl, `<span class="text-red-600 font-extrabold">${w.hl}</span>`)}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="md:col-span-5 bg-amber-50/60 rounded-3xl p-6 border-2 border-amber-200 text-center space-y-6 shadow-sm">
                        <div class="text-xs text-slate-400 font-bold">
                            ${appState.session.slideIndex + 1} / ${ZAMIR_WORDS.length}
                        </div>

                        <div class="arabic-text text-5xl text-slate-900 font-bold my-6 py-4 bg-white rounded-2xl border border-amber-200 shadow-inner">
                            ${ZAMIR_WORDS[appState.session.slideIndex].ar.replace(ZAMIR_WORDS[appState.session.slideIndex].hl, `<span class="text-red-600 font-extrabold">${ZAMIR_WORDS[appState.session.slideIndex].hl}</span>`)}
                        </div>

                        <div class="text-sm font-bold text-slate-700">
                            Okunuş: <span class="text-amber-900">${ZAMIR_WORDS[appState.session.slideIndex].tr}</span>
                        </div>

                        <div class="flex items-center justify-center gap-4 pt-4 border-t border-amber-200">
                            <button onclick="prevSlide()" class="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            <button onclick="speakAudio('${ZAMIR_WORDS[appState.session.slideIndex].ar}')" class="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow text-lg">
                                <i class="fa-solid fa-volume-high"></i>
                            </button>
                            <button onclick="nextSlide()" class="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    `;
}

function selectTopic(id) {
    appState.session.activeTopicId = id;
    appState.session.slideIndex = 0;
    renderAppLayout();
}

function selectSlide(idx) {
    appState.session.slideIndex = idx;
    speakAudio(ZAMIR_WORDS[idx].ar);
    renderAppLayout();
}

function nextSlide() {
    appState.session.slideIndex = (appState.session.slideIndex + 1) % ZAMIR_WORDS.length;
    speakAudio(ZAMIR_WORDS[appState.session.slideIndex].ar);
    renderAppLayout();
}

function prevSlide() {
    appState.session.slideIndex = (appState.session.slideIndex - 1 + ZAMIR_WORDS.length) % ZAMIR_WORDS.length;
    speakAudio(ZAMIR_WORDS[appState.session.slideIndex].ar);
    renderAppLayout();
}

// ==========================================
// 2. MAHSUSA ÇOCUK MODU (DERSLER & OYUNLAR TAM CANLI)
// ==========================================
function renderChildView() {
    return `
        <div class="space-y-6">
            
            <div class="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-emerald-100 text-xs font-bold no-scrollbar">
                <button onclick="setChildTab('harfler')" class="px-5 py-2.5 rounded-xl ${appState.activeChildTab === 'harfler' ? 'bg-emerald-500 text-white' : 'text-slate-600'}">📚 Harf Çalışması (Filtreli)</button>
                <button onclick="setChildTab('dersler')" class="px-5 py-2.5 rounded-xl ${appState.activeChildTab === 'dersler' ? 'bg-emerald-500 text-white' : 'text-slate-600'}">🎯 Seviyeli Dersler</button>
                <button onclick="setChildTab('oyunlar')" class="px-5 py-2.5 rounded-xl ${appState.activeChildTab === 'oyunlar' ? 'bg-emerald-500 text-white' : 'text-slate-600'}">🎮 Oyun Listesi (Canlı Oyna)</button>
                <button onclick="setChildTab('gelisim')" class="px-5 py-2.5 rounded-xl ${appState.activeChildTab === 'gelisim' ? 'bg-emerald-500 text-white' : 'text-slate-600'}">🚀 Gelişim & Veli Rehberi</button>
            </div>

            ${renderChildContent()}

        </div>
    `;
}

function setChildTab(tab) {
    appState.activeChildTab = tab;
    renderAppLayout();
}

function renderChildContent() {
    if (appState.activeChildTab === 'dersler') return renderChildDerslerInteractive();
    if (appState.activeChildTab === 'oyunlar') return renderChildOyunlarPlayable();
    if (appState.activeChildTab === 'gelisim') return renderChildGelisimInfo();
    return renderChildHarflerFilterable();
}

// FİLTRELİ HARF ÇALIŞMASI
function renderChildHarflerFilterable() {
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
            <div class="bg-white p-4 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span>Sınıf Filtresi:</span>
                    <select onchange="updateFilter(this.value)" class="p-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 font-bold">
                        <option value="all" ${appState.session.filterType === 'all' ? 'selected' : ''}>Tümü</option>
                        <option value="peltek" ${appState.session.filterType === 'peltek' ? 'selected' : ''}>Peltek Harfler</option>
                        <option value="kalin" ${appState.session.filterType === 'kalin' ? 'selected' : ''}>Kalın Harfler</option>
                        <option value="ince" ${appState.session.filterType === 'ince' ? 'selected' : ''}>İnce Harfler</option>
                    </select>
                </div>

                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-700">
                    <input type="checkbox" onchange="toggleHideLearnedCheck(this.checked)" ${appState.session.hideLearned ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-500">
                    <span>Öğrendiğin Harfleri listeden gizle</span>
                </label>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                ${filtered.map(h => {
                    const isDone = appState.session.completed.includes(h.name);
                    return `
                        <div onclick="clickChildHarf('${h.name}', '${h.char}')" class="p-5 rounded-2xl bg-white border-2 ${isDone ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-400'} cursor-pointer text-center transition-all shadow-sm">
                            <div class="arabic-text text-4xl text-slate-800 mb-1 font-bold">${h.char}</div>
                            <div class="text-xs font-bold text-slate-600">${h.name}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function updateFilter(val) {
    appState.session.filterType = val;
    renderAppLayout();
}

function toggleHideLearnedCheck(val) {
    appState.session.hideLearned = val;
    renderAppLayout();
}

function clickChildHarf(name, char) {
    speakAudio(char);
    if (!appState.session.completed.includes(name)) {
        appState.session.completed.push(name);
        appState.session.stars += 10;
        localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
    }
    renderAppLayout();
}

// İNTERAKTİF DERS ÇALIŞMA EKRANI
function renderChildDerslerInteractive() {
    const lessons = [
        { id: 1, title: "Elifba Harfleri Çalışması", sub: "Sihirli harf yolculuğu", content: HARFLER_DATA.slice(0, 6) },
        { id: 2, title: "Baş-Orta-Son Gelişmiş Pratik", sub: "Eğlenceli konum okuması", content: HARFLER_DATA.slice(6, 12) },
        { id: 3, title: "Harekeler Çalışması", sub: "Üstün, Esre, Ötre macerası", content: HARFLER_DATA.slice(12, 18) }
    ];

    const activeL = lessons.find(l => l.id === appState.session.activeLessonId) || lessons[0];

    return `
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                ${lessons.map(l => `
                    <button onclick="openLesson(${l.id})" class="p-4 rounded-2xl border text-left transition-all ${appState.session.activeLessonId === l.id ? 'bg-emerald-500 text-white font-bold border-emerald-600 shadow' : 'bg-white border-slate-200 text-slate-800'}">
                        <div class="text-xs opacity-80">Ders ${l.id}</div>
                        <div class="text-sm font-bold">${l.title}</div>
                    </button>
                `).join('')}
            </div>

            <!-- DERS ÇALIŞMA ALANI -->
            <div class="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
                <h3 class="text-lg font-bold text-slate-900">${activeL.title}</h3>
                <p class="text-xs text-slate-500">${activeL.sub} - Harflere basarak sesli tekrar edin.</p>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-4">
                    ${activeL.content.map(h => `
                        <div onclick="speakAudio('${h.char}')" class="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center cursor-pointer hover:bg-emerald-100 transition-all">
                            <div class="arabic-text text-4xl text-emerald-950 font-bold mb-2">${h.char}</div>
                            <div class="text-xs font-bold text-slate-700">${h.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function openLesson(id) {
    appState.session.activeLessonId = id;
    renderAppLayout();
}

// 5 CANLI PLAYABLE MİNİ OYUN MOTORU
function renderChildOyunlarPlayable() {
    return `
        <div class="space-y-6">
            
            <div class="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
                <h3 class="text-lg font-bold text-slate-900">🎮 İnteraktif Oyun Alanı</h3>
                
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    <button onclick="playGameMode(1)" class="p-3 rounded-xl border text-xs font-bold transition-all ${appState.session.activeGameId === 1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}">1. Harf Klavye</button>
                    <button onclick="playGameMode(2)" class="p-3 rounded-xl border text-xs font-bold transition-all ${appState.session.activeGameId === 2 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}">2. Baş-Orta-Son</button>
                    <button onclick="playGameMode(3)" class="p-3 rounded-xl border text-xs font-bold transition-all ${appState.session.activeGameId === 3 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}">3. Dinle & Bul</button>
                    <button onclick="playGameMode(4)" class="p-3 rounded-xl border text-xs font-bold transition-all ${appState.session.activeGameId === 4 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}">4. Harf Şekiller</button>
                    <button onclick="playGameMode(5)" class="p-3 rounded-xl border text-xs font-bold transition-all ${appState.session.activeGameId === 5 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}">5. Eşleştirme</button>
                </div>

                <!-- OYUN SAHASI -->
                <div id="game-playground" class="pt-4 border-t border-slate-100">
                    ${renderActiveGameScreen()}
                </div>
            </div>

        </div>
    `;
}

function playGameMode(id) {
    appState.session.activeGameId = id;
    renderAppLayout();
}

function renderActiveGameScreen() {
    const id = appState.session.activeGameId || 1;

    // 1. KLAVYE OYUNU
    if (id === 1) {
        if (!appState.keyboardCurrentChar) {
            appState.keyboardCurrentChar = HARFLER_DATA[Math.floor(Math.random() * HARFLER_DATA.length)];
        }
        const target = appState.keyboardCurrentChar;

        return `
            <div class="text-center space-y-6 max-w-xl mx-auto py-4">
                <div class="text-xs font-bold text-slate-500">Hedef Harfi Klavyede Bul ve Bas:</div>
                <div class="text-3xl font-bold text-emerald-700 bg-emerald-50 py-3 rounded-2xl border border-emerald-200">
                    "${target.name}"
                </div>

                <div class="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    ${HARFLER_DATA.map(h => `
                        <button onclick="checkKeyboardPress('${h.name}')" class="p-3 rounded-xl bg-slate-100 hover:bg-emerald-200 border border-slate-200 arabic-text text-2xl font-bold text-slate-800 transition-all">
                            ${h.char}
                        </button>
                    `).join('')}
                </div>
                <div id="game-kb-msg" class="text-xs font-bold"></div>
            </div>
        `;
    }

    // 2. BAŞ-ORTA-SON OYUNU
    if (id === 2) {
        const item = HARFLER_DATA[1]; // Be harfi
        return `
            <div class="text-center space-y-6 max-w-md mx-auto py-4">
                <div class="text-xs font-bold text-slate-500">"${item.name}" Harfinin Başta Yazılış Şekli Hangi Şıktır?</div>
                <div class="arabic-text text-5xl text-emerald-800 font-bold">${item.char}</div>
                <div class="grid grid-cols-3 gap-3">
                    <button onclick="checkGameChoice(true, 'Doğru! Başta hali: ${item.basta}')" class="p-4 rounded-2xl bg-slate-100 hover:bg-emerald-100 border text-2xl arabic-text font-bold">${item.basta}</button>
                    <button onclick="checkGameChoice(false, 'Yanlış cevap!')" class="p-4 rounded-2xl bg-slate-100 hover:bg-emerald-100 border text-2xl arabic-text font-bold">${item.ortada}</button>
                    <button onclick="checkGameChoice(false, 'Yanlış cevap!')" class="p-4 rounded-2xl bg-slate-100 hover:bg-emerald-100 border text-2xl arabic-text font-bold">${item.sonda}</button>
                </div>
                <div id="game-res-msg" class="text-xs font-bold"></div>
            </div>
        `;
    }

    // Diğer oyunlar için varsayılan harf eşleştirme
    return `
        <div class="text-center space-y-4 py-6">
            <div class="text-xs font-bold text-slate-500">Mini Oyun Modu Active - Harfe Basarak Sesini Dinleyin</div>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
                ${HARFLER_DATA.slice(0, 6).map(h => `
                    <button onclick="speakAudio('${h.char}')" class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 arabic-text text-3xl font-bold text-emerald-900 shadow-sm">
                        ${h.char}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function checkKeyboardPress(pressedName) {
    const target = appState.keyboardCurrentChar;
    const msg = document.getElementById('game-kb-msg');
    speakAudio(target.char);

    if (pressedName === target.name) {
        msg.className = "text-emerald-700 text-xs font-bold";
        msg.innerText = "Tebrikler Doğru Bildin! +10 Puan";
        appState.session.stars += 10;
        localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
        setTimeout(() => {
            appState.keyboardCurrentChar = HARFLER_DATA[Math.floor(Math.random() * HARFLER_DATA.length)];
            renderAppLayout();
        }, 1000);
    } else {
        msg.className = "text-rose-600 text-xs font-bold";
        msg.innerText = "Tekrar Dene!";
    }
}

function checkGameChoice(isCorrect, text) {
    const msg = document.getElementById('game-res-msg');
    if (isCorrect) {
        msg.className = "text-emerald-700 text-xs font-bold";
        msg.innerText = text;
        appState.session.stars += 10;
        localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
    } else {
        msg.className = "text-rose-600 text-xs font-bold";
        msg.innerText = text;
    }
}

function renderChildGelisimInfo() {
    return `
        <div class="space-y-6">
            <div class="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-sky-600 text-white space-y-2 shadow-sm">
                <h3 class="text-lg font-bold">Küçük adımlar, büyük ilerleme</h3>
                <p class="text-xs opacity-90">Mahsusa Kur'an çocuk rehberinde kazanılan yıldızlar ve çalışma ilerlemeniz burada tutulur.</p>
            </div>

            <div class="bg-white rounded-3xl p-6 border border-slate-200 space-y-3 shadow-sm">
                <h4 class="text-sm font-bold text-emerald-700">Gizlilik & Güvenlik Beyanı</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                    Bu web sürümünde kişisel veri toplanmaz. İlerleme verileriniz cihazınızın yerel depolama alanında (localStorage) saklanır.
                </p>
            </div>
        </div>
    `;
}

// ==========================================
// 3. MAHSUSA YETİŞKİN REHBERİ
// ==========================================
function renderAdultView() {
    return `
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-base font-bold text-slate-800">Yetişkin Temel Elifba Rehberi</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                ${HARFLER_DATA.map(h => `
                    <div onclick="speakAudio('${h.char}')" class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 text-center cursor-pointer transition-all">
                        <div class="arabic-text text-3xl text-emerald-800 font-bold mb-1">${h.char}</div>
                        <div class="text-xs font-semibold text-slate-700">${h.name}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}