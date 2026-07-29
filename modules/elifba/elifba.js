/**
 * Mahsusa Kur'an - Tam Teşekküllü Elifba Portal Motoru
 * Kapsam: Harfler, Yazılışlar, Harekeler, Med Harfleri, Pratik, Quiz, İnteraktif Oyunlar
 */

const ELIFBA_DATA = [
    { id: 1, char: "ا", name: "Elif", basta: "ا", ortada: "ـا", sonda: "ـا", mahrec: "Boğaz dibinden çıkan düz ve ince sestir.", audio: "elif.mp3" },
    { id: 2, char: "ب", name: "Be", basta: "بـ", ortada: "ـبـ", sonda: "ـب", mahrec: "Dudakların iç kısımları hafifçe değdirilir.", audio: "be.mp3" },
    { id: 3, char: "ت", name: "Te", basta: "تـ", ortada: "ـتـ", sonda: "ـت", mahrec: "Dil ucu üst ön dişlerin iç yüzüne değdirilir.", audio: "te.mp3" },
    { id: 4, char: "ث", name: "Se", basta: "ثـ", ortada: "ـثـ", sonda: "ـث", mahrec: "Dil ucu ön dişlerin arasından çıkarılır (Peltek).", audio: "se.mp3" },
    { id: 5, char: "ج", name: "Cim", basta: "جـ", ortada: "ـجـ", sonda: "ـج", mahrec: "Dil ortası üst damağa oturtulur.", audio: "cim.mp3" },
    { id: 6, char: "ح", name: "Ha", basta: "حـ", ortada: "ـحـ", sonda: "ـح", mahrec: "Boğaz ortasından pürüzsüz nefesle çıkar.", audio: "ha.mp3" },
    { id: 7, char: "خ", name: "Hı", basta: "خـ", ortada: "ـخـ", sonda: "ـخ", mahrec: "Boğazın ağza yakın kısmından hırıltıyla çıkar.", audio: "hi.mp3" },
    { id: 8, char: "د", name: "Dal", basta: "د", ortada: "ـد", sonda: "ـد", mahrec: "Dil ucu üst ön diş köklerine dokundurulur.", audio: "dal.mp3" },
    { id: 9, char: "ذ", name: "Zel", basta: "ذ", ortada: "ـذ", sonda: "ـذ", mahrec: "Dil ucu diş arasından çıkarılır (Peltek).", audio: "zel.mp3" },
    { id: 10, char: "ر", name: "Ra", basta: "ر", ortada: "ـر", sonda: "ـر", mahrec: "Dil ucunun arkası üst diş etlerine vurulur.", audio: "ra.mp3" },
    { id: 11, char: "ز", name: "Ze", basta: "ز", ortada: "ـز", sonda: "ـز", mahrec: "Dil ucu alt ön dişlere değdirilir (Keskin ses).", audio: "ze.mp3" },
    { id: 12, char: "س", name: "Sin", basta: "سـ", ortada: "ـسـ", sonda: "ـس", mahrec: "Dil ucu alt dişlerde tutularak ıslık sesi verilir.", audio: "sin.mp3" },
    { id: 13, char: "ش", name: "Şın", basta: "شـ", ortada: "ـشـ", sonda: "ـش", mahrec: "Dil ortası kabartılır, ses ağız içine yayılır.", audio: "sin2.mp3" },
    { id: 14, char: "ص", name: "Sad", basta: "صـ", ortada: "ـصـ", sonda: "ـص", mahrec: "Dil arkası yükseltilerek tok ve kalın ses verilir.", audio: "sad.mp3" },
    { id: 15, char: "ض", name: "Dat", basta: "ضـ", ortada: "ـضـ", sonda: "ـض", mahrec: "Dilin yan tarafı üst azı dişlerine basılır.", audio: "dat.mp3" },
    { id: 16, char: "ط", name: "Tı", basta: "طـ", ortada: "ـطـ", sonda: "ـط", mahrec: "Dil ucu üst diş köklerine kuvvetlice bastırılır.", audio: "ti.mp3" },
    { id: 17, char: "ظ", name: "Zı", basta: "ظـ", ortada: "ـظـ", sonda: "ـظ", mahrec: "Dil ucu dişlerden hafif taşırılarak kalın peltek söylenir.", audio: "zi.mp3" },
    { id: 18, char: "ع", name: "Ayn", basta: "عـ", ortada: "ـعـ", sonda: "ـع", mahrec: "Boğaz ortası hafifçe sıkılarak genizden çıkarılır.", audio: "ayn.mp3" },
    { id: 19, char: "غ", name: "Gayn", basta: "غـ", ortada: "ـغـ", sonda: "ـغ", mahrec: "Boğazın üst kısmından tok ve yumuşak çıkar.", audio: "gayn.mp3" },
    { id: 20, char: "ف", name: "Fe", basta: "فـ", ortada: "ـفـ", sonda: "ـف", mahrec: "Üst ön dişler alt dudağın ıslak yerine dokundurulur.", audio: "fe.mp3" },
    { id: 21, char: "ق", name: "Kaf", basta: "قـ", ortada: "ـقـ", sonda: "ـق", mahrec: "Dil kökü ile yumuşak damak buluşur.", audio: "kaf.mp3" },
    { id: 22, char: "ك", name: "Kef", basta: "كـ", ortada: "ـكـ", sonda: "ـك", mahrec: "Dil kökünün biraz önü sert damağa dokundurulur.", audio: "kef.mp3" },
    { id: 23, char: "ل", name: "Lam", basta: "لـ", ortada: "ـلـ", sonda: "ـل", mahrec: "Dil ucunun geniş yüzeyi üst ön damağa dayanır.", audio: "lam.mp3" },
    { id: 24, char: "م", name: "Mim", basta: "مـ", ortada: "ـمـ", sonda: "ـم", mahrec: "Dudaklar kapatılarak geniz sesiyle çıkarılır.", audio: "mim.mp3" },
    { id: 25, char: "ن", name: "Nun", basta: "نـ", ortada: "ـنـ", sonda: "ـن", mahrec: "Dil ucu üst diş etlerine değdirilir.", audio: "nun.mp3" },
    { id: 26, char: "و", name: "Vav", basta: "و", ortada: "ـو", sonda: "ـو", mahrec: "Dudaklar büzülüp ileriye doğru yuvarlatılır.", audio: "vav.mp3" },
    { id: 27, char: "هـ", name: "He", basta: "هـ", ortada: "ـهـ", sonda: "ـه", mahrec: "Göğse yakın boğaz dibinden pürüzsüz çıkar.", audio: "he.mp3" },
    { id: 28, char: "ي", name: "Ye", basta: "يـ", ortada: "ـيـ", sonda: "ـي", mahrec: "Dil ortası damağa yaklaştırılarak çıkarılır.", audio: "ye.mp3" }
];

let appState = {
    session: null,
    activeTab: 'harfler',
    gameScore: 0,
    matchCards: [],
    selectedCards: []
};

document.addEventListener('DOMContentLoaded', () => {
    appState.session = getOrInitSession();
    renderAppLayout();
});

// MOD DEĞİŞİMİ VE ARKA PLAN RENK DÖNÜŞÜMÜ
function setMode(mode) {
    appState.session.mode = mode;
    localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
    applyBodyTheme(mode);
    renderAppLayout();
}

function applyBodyTheme(mode) {
    const body = document.getElementById('elifba-body');
    if (!body) return;
    
    if (mode === 'child') {
        // ÇOCUK MODU TEMA: Açık Gökyüzü Mavisi / Bulut Beyazı
        body.className = "bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50 text-slate-900 font-sans min-h-screen flex flex-col justify-between";
    } else if (mode === 'adult') {
        // YETİŞKİN MODU TEMA: Ferah Zümrüt Yeşili / Beyaz
        body.className = "bg-gradient-to-br from-slate-50 via-emerald-50/50 to-slate-100 text-slate-800 font-sans min-h-screen flex flex-col justify-between";
    } else {
        // DİYANET İLERİ SEVİYE TEMA: Kurumsal Altın Krem / Zümrüt
        body.className = "bg-gradient-to-b from-amber-50/70 via-emerald-50/30 to-slate-100 text-slate-800 font-sans min-h-screen flex flex-col justify-between";
    }
}

function switchTab(tab) {
    appState.activeTab = tab;
    renderAppLayout();
}

// ÇALIŞAN GARANTİLİ SES MOTORU (SPEECH SYNTHESIS + WEB AUDIO)
function playHarf(audioFile, charName) {
    // Görsel Vurgu
    const card = document.querySelector(`[data-char="${charName}"]`);
    if (card) {
        card.classList.add('ring-4', 'ring-emerald-500', 'scale-105');
        setTimeout(() => card.classList.remove('ring-4', 'ring-emerald-500', 'scale-105'), 500);
    }

    const audio = new Audio(`assets/audio/${audioFile}`);
    audio.play().catch(() => {
        // Tarayıcı Sentezleyicisi Devrede
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const msg = new SpeechSynthesisUtterance(charName);
            msg.lang = 'ar-SA';
            msg.rate = 0.8;
            window.speechSynthesis.speak(msg);
        }
    });

    if (!appState.session.completed.includes(charName)) {
        appState.session.completed.push(charName);
        appState.session.stars += 10;
        localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
    }
    
    const starEl = document.getElementById('star-val');
    if (starEl) starEl.innerText = appState.session.stars;
}

// KARNE İNDİRME UZANTI DÜZELTMESİ (.JSON UZANTISI GARANTİLİ)
function downloadKarne() {
    const reportData = {
        portal: "mahsusakuran.com",
        kullanici: appState.session.userId,
        tamamlananHarfSayisi: appState.session.completed.length,
        toplamPuan: appState.session.stars,
        tamamlananHarfler: appState.session.completed,
        tarih: new Date().toLocaleString('tr-TR')
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = "mahsusa_elifba_karne.json"; // Temiz uzantı
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ARAYÜZ MOTORU
function renderAppLayout() {
    const root = document.getElementById('elifba-app-root');
    const mode = appState.session.mode;
    applyBodyTheme(mode);

    root.innerHTML = `
        <!-- MOD SEÇİCİ VE KONTROL PANELİ -->
        <div class="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 mb-6 max-w-6xl mx-auto">
            <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
                
                <!-- Mod Değiştirici -->
                <div class="flex flex-wrap items-center gap-2 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
                    <button onclick="setMode('child')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'child' ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' : 'text-slate-600 hover:text-slate-900'}">
                        🎈 Çocuk Modu
                    </button>
                    <button onclick="setMode('adult')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'adult' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-600 hover:text-slate-900'}">
                        🌿 Yetişkin Modu
                    </button>
                    <button onclick="setMode('diyanet')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'diyanet' ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30' : 'text-slate-600 hover:text-slate-900'}">
                        📜 Diyanet İleri Seviye
                    </button>
                </div>

                <!-- Puan ve Karne İndir -->
                <div class="flex items-center gap-3">
                    <div class="px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs flex items-center gap-1.5 shadow-sm">
                        ⭐ <span id="star-val">${appState.session.stars}</span> Puan
                    </div>
                    <button onclick="downloadKarne()" title="Karneni mahsusakuran.com formatında indir" class="px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm">
                        <i class="fa-solid fa-download"></i> Karnemi İndir (.json)
                    </button>
                </div>

            </div>

            <!-- TÜM MÜFREDAT TABLARI -->
            <div class="flex items-center gap-2 overflow-x-auto mt-6 pt-4 border-t border-slate-100 text-xs font-semibold no-scrollbar">
                <button onclick="switchTab('harfler')" class="px-4 py-2 rounded-xl whitespace-nowrap transition-all ${appState.activeTab === 'harfler' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">1. Harfler (28)</button>
                <button onclick="switchTab('yazilis')" class="px-4 py-2 rounded-xl whitespace-nowrap transition-all ${appState.activeTab === 'yazilis' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">2. Yazılışlar</button>
                <button onclick="switchTab('harekeler')" class="px-4 py-2 rounded-xl whitespace-nowrap transition-all ${appState.activeTab === 'harekeler' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">3. Harekeler</button>
                <button onclick="switchTab('med')" class="px-4 py-2 rounded-xl whitespace-nowrap transition-all ${appState.activeTab === 'med' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">4. Med Harfleri</button>
                <button onclick="switchTab('pratik')" class="px-4 py-2 rounded-xl whitespace-nowrap transition-all ${appState.activeTab === 'pratik' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">5. Okuma Pratiği</button>
                <button onclick="switchTab('quiz')" class="px-4 py-2 rounded-xl whitespace-nowrap transition-all ${appState.activeTab === 'quiz' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">6. Quiz / Test</button>
                <button onclick="switchTab('oyun')" class="px-4 py-2 rounded-xl whitespace-nowrap transition-all ${appState.activeTab === 'oyun' ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">🎮 Eğitici Oyunlar</button>
            </div>
        </div>

        <!-- İÇERİK ALANI -->
        <div class="max-w-6xl mx-auto">
            ${renderContentArea()}
        </div>
    `;
}

function renderContentArea() {
    switch(appState.activeTab) {
        case 'harfler': return renderHarfler();
        case 'yazilis': return renderYazilislar();
        case 'harekeler': return renderHarekeler();
        case 'med': return renderMedHarfleri();
        case 'pratik': return renderPratik();
        case 'quiz': return renderQuiz();
        case 'oyun': return renderOyunlar();
        default: return renderHarfler();
    }
}

// 1. HARFLER
function renderHarfler() {
    return `
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            ${ELIFBA_DATA.map(h => {
                const isDone = appState.session.completed.includes(h.name);
                return `
                    <div data-char="${h.name}" onclick="playHarf('${h.audio}', '${h.name}')" 
                         class="p-4 rounded-2xl bg-white border ${isDone ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-emerald-400'} transition-all cursor-pointer text-center group shadow-sm hover:shadow-md">
                        <div class="arabic-text text-4xl text-emerald-800 mb-1 group-hover:scale-110 transition-transform">${h.char}</div>
                        <div class="text-xs font-bold text-slate-800">${h.name}</div>
                        <div class="text-[10px] text-slate-400 mt-1 line-clamp-1">${h.mahrec}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// 2. YAZILIŞLAR
function renderYazilislar() {
    return `
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-x-auto">
            <h3 class="text-base font-bold text-slate-800 mb-4">Harflerin Kelime İçindeki Konumları (Baştan, Ortadan, Sondan)</h3>
            <table class="w-full text-center border-collapse text-sm">
                <thead>
                    <tr class="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-bold">
                        <th class="p-3">Harf Adı</th>
                        <th class="p-3">Yalın Hali</th>
                        <th class="p-3">Başta</th>
                        <th class="p-3">Ortada</th>
                        <th class="p-3">Sonda</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${ELIFBA_DATA.map(h => `
                        <tr class="hover:bg-emerald-50/40">
                            <td class="p-3 font-semibold text-slate-700 text-xs">${h.name}</td>
                            <td class="p-3 arabic-text text-2xl text-emerald-800">${h.char}</td>
                            <td class="p-3 arabic-text text-2xl text-sky-700">${h.basta}</td>
                            <td class="p-3 arabic-text text-2xl text-sky-700">${h.ortada}</td>
                            <td class="p-3 arabic-text text-2xl text-sky-700">${h.sonda}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// 3. HAREKELER
function renderHarekeler() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3">
                <div class="arabic-text text-5xl text-emerald-600 text-center">َ</div>
                <h3 class="text-base font-bold text-slate-800">Üstün (Fatha)</h3>
                <p class="text-xs text-slate-600 leading-relaxed">İnce harfleri "e", kalın harfleri "a" sesiyle okutur.</p>
                <div class="arabic-text text-2xl text-emerald-800 bg-emerald-50/50 p-3 rounded-2xl text-center">بَ - دَ - رَ</div>
            </div>
            <div class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3">
                <div class="arabic-text text-5xl text-emerald-600 text-center">ِ</div>
                <h3 class="text-base font-bold text-slate-800">Esre (Kasra)</h3>
                <p class="text-xs text-slate-600 leading-relaxed">İnce harfleri "i", kalın harfleri "ı-i" arası sesle okutur.</p>
                <div class="arabic-text text-2xl text-emerald-800 bg-emerald-50/50 p-3 rounded-2xl text-center">بِ - دِ - رِ</div>
            </div>
            <div class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3">
                <div class="arabic-text text-5xl text-emerald-600 text-center">ُ</div>
                <h3 class="text-base font-bold text-slate-800">Ötre (Damma)</h3>
                <p class="text-xs text-slate-600 leading-relaxed">İnce harfleri "ü", kalın harfleri "u" sesiyle okutur.</p>
                <div class="arabic-text text-2xl text-emerald-800 bg-emerald-50/50 p-3 rounded-2xl text-center">بُ - دُ - رُ</div>
            </div>
        </div>
    `;
}

// 4. MED HARFLERİ (elifba.online REFERANSI)
function renderMedHarfleri() {
    return `
        <div class="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm space-y-6">
            <div>
                <h3 class="text-lg font-bold text-slate-800">Medd-i Tabii (Tabi Uzatma Kuralları)</h3>
                <p class="text-xs text-slate-600 mt-1">Harfi bir elif miktarı (bir parmak kaldıracak süre) uzatır.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2 text-center">
                    <span class="text-xs font-bold text-sky-800 block">Elif Meddi (Uzatan Elif)</span>
                    <p class="text-[11px] text-slate-600">Üstünden sonra harekesiz Elif gelirse uzatılır.</p>
                    <div class="arabic-text text-3xl text-emerald-800 pt-2">قَالَ</div>
                    <span class="text-xs text-slate-500 font-semibold block">Okunuş: Kâle</span>
                </div>
                <div class="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2 text-center">
                    <span class="text-xs font-bold text-sky-800 block">Ye Meddi (Uzatan Ye)</span>
                    <p class="text-[11px] text-slate-600">Esreden sonra harekesiz Ye gelirse uzatılır.</p>
                    <div class="arabic-text text-3xl text-emerald-800 pt-2">قِيلَ</div>
                    <span class="text-xs text-slate-500 font-semibold block">Okunuş: Kîle</span>
                </div>
                <div class="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2 text-center">
                    <span class="text-xs font-bold text-sky-800 block">Vav Meddi (Uzatan Vav)</span>
                    <p class="text-[11px] text-slate-600">Ötreden sonra harekesiz Vav gelirse uzatılır.</p>
                    <div class="arabic-text text-3xl text-emerald-800 pt-2">يَقُولُ</div>
                    <span class="text-xs text-slate-500 font-semibold block">Okunuş: Yekûlu</span>
                </div>
            </div>
        </div>
    `;
}

// 5. OKUMA PRATİĞİ (kuran-ogreniyorum.com REFERANSI)
function renderPratik() {
    const list = [
        { w: "كَتَبَ", r: "Ketebe", d: "Üstün harekeli 3 harf" },
        { w: "قُرِئَ", r: "Kuri'e", d: "Karma harekeli okuma" },
        { w: "رَسُولُ", r: "Rasûlu", d: "Vav Meddi içerikli" },
        { w: "مَسْجِدٌ", r: "Mescidun", d: "Cezm ve Tenvin" }
    ];

    return `
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            ${list.map(p => `
                <div onclick="playHarf('', '${p.w}')" class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm text-center space-y-3 cursor-pointer hover:border-emerald-500 transition-all">
                    <div class="arabic-text text-4xl text-emerald-900 font-bold">${p.w}</div>
                    <div class="text-sm font-bold text-slate-800">${p.r}</div>
                    <div class="text-[10px] text-slate-400 bg-slate-50 p-2 rounded-xl">${p.d}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// 6. QUIZ / TEST MOTORU
function renderQuiz() {
    return `
        <div class="max-w-xl mx-auto bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
            <div class="flex items-center justify-between text-xs text-slate-400">
                <span>İnteraktif Test Engine</span>
                <span class="font-bold text-emerald-600">Soru 1 / 1</span>
            </div>
            <h3 class="text-base font-bold text-slate-800">Harfi bir elif miktarı uzatan harflere ne ad verilir?</h3>
            <div class="space-y-3">
                <button onclick="answerQuiz(0)" class="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 text-left text-xs font-bold text-slate-700">Tenvin</button>
                <button onclick="answerQuiz(1)" class="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 text-left text-xs font-bold text-slate-700">Med Harfleri</button>
                <button onclick="answerQuiz(2)" class="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 text-left text-xs font-bold text-slate-700">Cezm (Sükun)</button>
            </div>
            <div id="quiz-ans-result" class="hidden p-4 rounded-2xl text-xs"></div>
        </div>
    `;
}

function answerQuiz(idx) {
    const res = document.getElementById('quiz-ans-result');
    res.classList.remove('hidden');
    if (idx === 1) {
        res.className = "p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium";
        res.innerHTML = "<strong>Doğru Tebrikler!</strong> Elif, Vav ve Ye harfleri harekesiz geldiklerinde kendinden önceki harfi uzatırlar.";
    } else {
        res.className = "p-4 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium";
        res.innerHTML = "<strong>Yanlış Cevap.</strong> Doğru cevap: Med Harfleri olmalıydı.";
    }
}

// 7. GERÇEK ÇALIŞAN İNTERAKTİF OYUNLAR (ALERT'SİZ GERÇEK OYUN ENGINE)
function renderOyunlar() {
    return `
        <div class="space-y-6">
            <div class="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-bold text-slate-800">🎮 Harf Eşleştirme Oyunu</h3>
                        <p class="text-xs text-slate-500">Arapça harfleri doğru isimleriyle eşleştir ve puan kazan!</p>
                    </div>
                    <button onclick="startMatchGame()" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md">
                        Oyunu Yeniden Başlat
                    </button>
                </div>
                
                <div id="game-match-board" class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                    <!-- JS İle Canlı Oyun Kartları Basılır -->
                </div>
            </div>
        </div>
    `;
}

// HARF EŞLEŞTİRME OYUN MOTORU
function startMatchGame() {
    const board = document.getElementById('game-match-board');
    if (!board) return;

    const sample = ELIFBA_DATA.slice(0, 4);
    let cards = [];
    sample.forEach(h => {
        cards.push({ id: h.id, val: h.char, type: 'ar' });
        cards.push({ id: h.id, val: h.name, type: 'tr' });
    });
    
    // Kartları karıştır
    cards.sort(() => Math.random() - 0.5);
    appState.matchCards = cards;
    appState.selectedCards = [];

    board.innerHTML = cards.map((c, i) => `
        <button id="card-${i}" onclick="selectMatchCard(${i}, ${c.id})" class="p-5 rounded-2xl bg-slate-100 hover:bg-amber-100 border-2 border-slate-200 text-center font-bold text-lg text-slate-800 transition-all">
            ${c.type === 'ar' ? `<span class="arabic-text text-3xl text-emerald-800">${c.val}</span>` : `<span>${c.val}</span>`}
        </button>
    `).join('');
}

function selectMatchCard(index, cardId) {
    const btn = document.getElementById(`card-${index}`);
    if (!btn || btn.disabled) return;

    btn.classList.add('border-amber-500', 'bg-amber-50');
    appState.selectedCards.push({ index, cardId, btn });

    if (appState.selectedCards.length === 2) {
        const [c1, c2] = appState.selectedCards;
        if (c1.cardId === c2.cardId && c1.index !== c2.index) {
            // Eşleşti
            c1.btn.className = "p-5 rounded-2xl bg-emerald-500 text-white font-bold text-lg transition-all cursor-default";
            c2.btn.className = "p-5 rounded-2xl bg-emerald-500 text-white font-bold text-lg transition-all cursor-default";
            c1.btn.disabled = true;
            c2.btn.disabled = true;
            appState.session.stars += 20;
            localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
            const starEl = document.getElementById('star-val');
            if (starEl) starEl.innerText = appState.session.stars;
        } else {
            // Eşleşmedi
            setTimeout(() => {
                c1.btn.className = "p-5 rounded-2xl bg-slate-100 hover:bg-amber-100 border-2 border-slate-200 text-center font-bold text-lg text-slate-800 transition-all";
                c2.btn.className = "p-5 rounded-2xl bg-slate-100 hover:bg-amber-100 border-2 border-slate-200 text-center font-bold text-lg text-slate-800 transition-all";
            }, 600);
        }
        appState.selectedCards = [];
    }
}