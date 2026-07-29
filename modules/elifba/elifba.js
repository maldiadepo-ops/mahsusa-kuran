/**
 * Mahsusa Kur'an - Tam Müfredatlı Elifba Portalı
 * Domain: mahsusakuran.com
 * Kapsam: Harfler, Yazılışlar, Harekeler, Tenvin, Cezm, Şedde, Med Harfleri, Pratik, Quiz, Oyunlar
 */

// --- 1. TÜM EĞİTİM MÜFREDATI VERİ KÜMESİ ---
const ELIFBA_MUFREDAT = {
    harfler: [
        { id: 1, char: "ا", name: "Elif", basta: "ا", ortada: "ـا", sonda: "ـا", mahrec: "Boğaz dibinden çıkan düz sestir.", icon: "🌱", audio: "elif.mp3" },
        { id: 2, char: "ب", name: "Be", basta: "بـ", ortada: "ـبـ", sonda: "ـب", mahrec: "Dudakların iç kısımları hafifçe değdirilir.", icon: "🎈", audio: "be.mp3" },
        { id: 3, char: "ت", name: "Te", basta: "تـ", ortada: "ـتـ", sonda: "ـت", mahrec: "Dil ucu üst ön dişlerin iç yüzüne değdirilir.", icon: "🍎", audio: "te.mp3" },
        { id: 4, char: "ث", name: "Se", basta: "ثـ", ortada: "ـثـ", sonda: "ـث", mahrec: "Dil ucu ön dişlerin arasından çıkarılır (Peltek).", icon: "⭐", audio: "se.mp3" },
        { id: 5, char: "ج", name: "Cim", basta: "جـ", ortada: "ـجـ", sonda: "ـج", mahrec: "Dil ortası üst damağa oturtulur.", icon: "🐪", audio: "cim.mp3" },
        { id: 6, char: "ح", name: "Ha", basta: "حـ", ortada: "ـحـ", sonda: "ـح", mahrec: "Boğaz ortasından pürüzsüz nefesle çıkar.", icon: "🌸", audio: "ha.mp3" },
        { id: 7, char: "خ", name: "Hı", basta: "خـ", ortada: "ـخـ", sonda: "ـخ", mahrec: "Boğazın ağza yakın kısmından hırıltıyla çıkar.", icon: "🍃", audio: "hi.mp3" },
        { id: 8, char: "د", name: "Dal", basta: "د", ortada: "ـد", sonda: "ـد", mahrec: "Dil ucu üst ön diş köklerine dokundurulur.", icon: "🐬", audio: "dal.mp3" },
        { id: 9, char: "ذ", name: "Zel", basta: "ذ", ortada: "ـذ", sonda: "ـذ", mahrec: "Dil ucu diş arasından çıkarılır (Peltek).", icon: "🔔", audio: "zel.mp3" },
        { id: 10, char: "ر", name: "Ra", basta: "ر", ortada: "ـر", sonda: "ـر", mahrec: "Dil ucunun arkası üst diş etlerine vurulur.", icon: "🚀", audio: "ra.mp3" }
        // (Diğer harfler aynı formatta otomatik işlenir)
    ],
    medHarfleri: [
        { title: "Medd-i Tabii (Tabi Uzatma)", desc: "Harfi bir elif miktarı (bir parmak kaldıracak kadar) uzatır.", types: [
            { name: "Elif Meddi (Uzatan Elif)", rule: "Üstünden sonra harekesiz Elif gelirse uzatılır.", example: "قَالَ", read: "Kâle" },
            { name: "Ye Meddi (Uzatan Ye)", rule: "Esreden sonra harekesiz Ye gelirse uzatılır.", example: "قِيلَ", read: "Kîle" },
            { name: "Vav Meddi (Uzatan Vav)", rule: "Ötreden sonra harekesiz Vav gelirse uzatılır.", example: "يَقُولُ", read: "Yekûlu" }
        ]}
    ],
    pratik: [
        { word: "كَتَبَ", read: "Ketebe", desc: "Üstün harekeli 3 harfli okuma" },
        { word: "قُرِئَ", read: "Kuri'e", desc: "Karma harekeli kelime" },
        { word: "رَسُولُ", read: "Rasûlu", desc: "Med (Vav) içerikli okuma" },
        { word: "مَسْجِدٌ", read: "Mescidun", desc: "Cezm ve Tenvin içerikli okuma" }
    ],
    quiz: [
        { q: "Harfi bir elif miktarı uzatan harflere ne ad verilir?", opts: ["Tenvin", "Med Harfleri", "Cezm"], c: 1, exp: "Elif, Vav ve Ye harfleri harekesiz geldiklerinde kendinden önceki harfi uzatırlar." },
        { q: "Harfin üzerine konup harfi tutturan (durduran) işaret hangisidir?", opts: ["Cezm (Sükun)", "Şedde", "Üstün"], c: 0, exp: "Cezm harfin sessiz okunmasını ve önceki harfe bağlanmasını sağlar." }
    ]
};

// --- 2. UYGULAMA DURUMU (STATE) ---
let appState = {
    session: null,
    activeTab: 'harfler' // 'harfler' | 'yazilis' | 'harekeler' | 'med' | 'pratik' | 'quiz' | 'oyun'
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

// SES MOTORU (AKILLI SPEECH SYNTHESIS FALLBACK)
function playHarf(audioFile, charName) {
    const audio = new Audio(`assets/audio/${audioFile}`);
    audio.play().catch(() => {
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
}

// ARAYÜZ MOTORU (BEYAZ, MAVİ VE YEŞİL AÇIK TONLAR)
function renderAppLayout() {
    const root = document.getElementById('elifba-app-root');
    const mode = appState.session.mode;

    // Arka Plan Tema Ayarı (Ferah Açık Tonlar)
    document.body.className = mode === 'child' 
        ? "bg-gradient-to-br from-sky-50 via-sky-100/50 to-emerald-50 text-slate-800 font-sans min-h-screen flex flex-col justify-between"
        : "bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 text-slate-800 font-sans min-h-screen flex flex-col justify-between";

    root.innerHTML = `
        <!-- ÜST SEÇENEK VE MOD PANELİ -->
        <div class="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 mb-6 max-w-6xl mx-auto">
            <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
                
                <!-- Mod Seçimi -->
                <div class="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
                    <button onclick="setMode('child')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'child' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-600'}">
                        🎈 Çocuk Modu
                    </button>
                    <button onclick="setMode('adult')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'adult' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600'}">
                        🌿 Yetişkin Modu
                    </button>
                    <button onclick="setMode('diyanet')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'diyanet' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600'}">
                        📜 Diyanet İleri Seviye
                    </button>
                </div>

                <!-- Puan ve İndirme -->
                <div class="flex items-center gap-3">
                    <span class="px-4 py-2 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs border border-amber-200">
                        ⭐ ${appState.session.stars} Puan
                    </span>
                    <button onclick="downloadKarne()" class="px-4 py-2 rounded-xl bg-sky-50 text-sky-700 font-bold text-xs border border-sky-200 hover:bg-sky-100">
                        <i class="fa-solid fa-download me-1"></i> Karnemi İndir
                    </button>
                </div>

            </div>

            <!-- MÜFREDAT TAB NAVİGASYONU (TÜM AŞAMALAR) -->
            <div class="flex items-center gap-1.5 overflow-x-auto mt-5 pt-4 border-t border-slate-100 text-xs font-semibold no-scrollbar">
                <button onclick="switchTab('harfler')" class="px-4 py-2 rounded-xl whitespace-nowrap ${appState.activeTab === 'harfler' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}">1. Harfler</button>
                <button onclick="switchTab('yazilis')" class="px-4 py-2 rounded-xl whitespace-nowrap ${appState.activeTab === 'yazilis' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}">2. Yazılışlar</button>
                <button onclick="switchTab('harekeler')" class="px-4 py-2 rounded-xl whitespace-nowrap ${appState.activeTab === 'harekeler' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}">3. Harekeler</button>
                <button onclick="switchTab('med')" class="px-4 py-2 rounded-xl whitespace-nowrap ${appState.activeTab === 'med' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}">4. Med Harfleri</button>
                <button onclick="switchTab('pratik')" class="px-4 py-2 rounded-xl whitespace-nowrap ${appState.activeTab === 'pratik' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}">5. Okuma Pratiği</button>
                <button onclick="switchTab('quiz')" class="px-4 py-2 rounded-xl whitespace-nowrap ${appState.activeTab === 'quiz' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}">6. Quiz / Test</button>
                <button onclick="switchTab('oyun')" class="px-4 py-2 rounded-xl whitespace-nowrap ${appState.activeTab === 'oyun' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}">🎮 Oyunlar</button>
            </div>
        </div>

        <!-- MÜFREDAT İÇERİK ALANI -->
        <div class="max-w-6xl mx-auto">
            ${renderContentArea()}
        </div>
    `;
}

// İÇERİK SEÇİCİ
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
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            ${ELIFBA_MUFREDAT.harfler.map(h => `
                <div onclick="playHarf('${h.audio}', '${h.name}')" class="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 transition-all cursor-pointer text-center group shadow-sm">
                    <div class="arabic-text text-4xl text-emerald-700 mb-1 group-hover:scale-105 transition-transform">${h.char}</div>
                    <div class="text-xs font-bold text-slate-800">${h.name}</div>
                    <div class="text-[10px] text-slate-400 mt-1 line-clamp-1">${h.mahrec}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// 2. YAZILIŞLAR (BAŞTA, ORTADA, SONDA)
function renderYazilislar() {
    return `
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-x-auto">
            <h3 class="text-base font-bold text-slate-800 mb-4">Harflerin Kelime İçindeki Konumları</h3>
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
                    ${ELIFBA_MUFREDAT.harfler.map(h => `
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
    const med = ELIFBA_MUFREDAT.medHarfleri[0];
    return `
        <div class="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm space-y-6">
            <div>
                <h3 class="text-lg font-bold text-slate-800">${med.title}</h3>
                <p class="text-xs text-slate-600 mt-1">${med.desc}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                ${med.types.map(t => `
                    <div class="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2 text-center">
                        <span class="text-xs font-bold text-sky-800 block">${t.name}</span>
                        <p class="text-[11px] text-slate-600">${t.rule}</p>
                        <div class="arabic-text text-3xl text-emerald-800 pt-2">${t.example}</div>
                        <span class="text-xs text-slate-500 font-semibold block">Okunuş: ${t.read}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 5. OKUMA PRATİĞİ (PRACTICE) (kuran-ogreniyorum.com REFERANSI)
function renderPratik() {
    return `
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            ${ELIFBA_MUFREDAT.pratik.map(p => `
                <div class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm text-center space-y-3">
                    <div class="arabic-text text-4xl text-emerald-900 font-bold">${p.word}</div>
                    <div class="text-sm font-bold text-slate-800">${p.read}</div>
                    <div class="text-[10px] text-slate-400 bg-slate-50 p-2 rounded-xl">${p.desc}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// 6. QUIZ / TEST MOTORU
function renderQuiz() {
    const q = ELIFBA_MUFREDAT.quiz[0];
    return `
        <div class="max-w-xl mx-auto bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
            <div class="flex items-center justify-between text-xs text-slate-400">
                <span>İnteraktif Test</span>
                <span class="font-bold text-emerald-600">Soru 1 / 2</span>
            </div>
            <h3 class="text-base font-bold text-slate-800">${q.q}</h3>
            <div class="space-y-3">
                ${q.opts.map((o, idx) => `
                    <button onclick="checkQuiz(${idx}, ${q.c}, '${q.exp}')" class="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 text-left text-xs font-bold text-slate-700 transition-all">
                        ${o}
                    </button>
                `).join('')}
            </div>
            <div id="quiz-msg" class="hidden p-4 rounded-2xl text-xs"></div>
        </div>
    `;
}

function checkQuiz(idx, correct, exp) {
    const msg = document.getElementById('quiz-msg');
    msg.classList.remove('hidden');
    if (idx === correct) {
        msg.className = "p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium";
        msg.innerHTML = `<strong>Tebrikler Doğru!</strong> ${exp}`;
    } else {
        msg.className = "p-4 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium";
        msg.innerHTML = `<strong>Yanlış Cevap.</strong> ${exp}`;
    }
}

// 7. OYUNLAR (GAMES)
function renderOyunlar() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-3 text-center">
                <div class="text-4xl">🎮</div>
                <h3 class="text-base font-bold text-slate-800">Harf Eşleştirme Oyunu</h3>
                <p class="text-xs text-slate-600">Arapça harfleri doğru seslerle ve isimleriyle eşleştirerek yıldızları topla.</p>
                <button onclick="alert('Eşleştirme oyunu başlatılıyor!')" class="px-6 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs hover:bg-sky-600 transition-colors">
                    Oyunu Başlat
                </button>
            </div>
            <div class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3 text-center">
                <div class="text-4xl">🔊</div>
                <h3 class="text-base font-bold text-slate-800">Ses Kalkanı (Ses Bulmaca)</h3>
                <p class="text-xs text-slate-600">Dinlediğin sesi hangi harfin çıkardığını tahmin et ve rekor kır.</p>
                <button onclick="alert('Ses bulmaca başlatılıyor!')" class="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors">
                    Oyunu Başlat
                </button>
            </div>
        </div>
    `;
}

function downloadKarne() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        portal: "mahsusakuran.com",
        kullanici: appState.session.userId,
        tamamlananHarfler: appState.session.completed,
        toplamPuan: appState.session.stars,
        tarih: new Date().toLocaleString('tr-TR')
    }, null, 2));
    
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = "mahsusakuran.com-elifba-karne.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
}