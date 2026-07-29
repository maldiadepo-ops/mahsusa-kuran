/**
 * Mahsusa Kur'an - Elifba Etkileşim & Tema Motoru
 * Referanslar: kuran-ogreniyorum.com (Çocuk), elifba.online (Yetişkin), kuran.diyanet.gov.tr (Diyanet İleri Seviye)
 */

const ELIFBA_DATA = [
    { id: 1, char: "ا", name: "Elif", mahrec: "Boğaz dibinden çıkan düz ve ince sestir.", type: "ince", icon: "🌱", audio: "elif.mp3" },
    { id: 2, char: "ب", name: "Be", mahrec: "Dudakların iç kısımları hafifçe birleştirilerek çıkarılır.", type: "ince", icon: "🎈", audio: "be.mp3" },
    { id: 3, char: "ت", name: "Te", mahrec: "Dil ucu üst ön dişlerin iç yüzüne değdirilir.", type: "ince", icon: "🍎", audio: "te.mp3" },
    { id: 4, char: "ث", name: "Se", mahrec: "Dil ucu ön dişlerin arasından hafifçe çıkarılır (Peltek).", type: "ince", icon: "⭐", audio: "se.mp3" },
    { id: 5, char: "ج", name: "Cim", mahrec: "Dil ortası üst damağa oturtularak çıkarılır.", type: "orta", icon: "🐪", audio: "cim.mp3" },
    { id: 6, char: "ح", name: "Ha", mahrec: "Boğaz ortasından pürüzsüz ve tatlı bir nefesle çıkar.", type: "keskin", icon: "🌸", audio: "ha.mp3" },
    { id: 7, char: "خ", name: "Hı", mahrec: "Boğazın ağza yakın kısmından yumuşak hırıltıyla çıkar.", type: "kalin", icon: "🍃", audio: "hi.mp3" },
    { id: 8, char: "د", name: "Dal", mahrec: "Dil ucu üst ön diş köklerine dokundurulur.", type: "ince", icon: "🐬", audio: "dal.mp3" },
    { id: 9, char: "ذ", name: "Zel", mahrec: "Dil ucu diş arasından çıkarılarak yumuşak okunur.", type: "ince", icon: "🔔", audio: "zel.mp3" },
    { id: 10, char: "ر", name: "Ra", mahrec: "Dil ucunun arkası üst diş etlerine vurulur.", type: "kalin", icon: "🚀", audio: "ra.mp3" },
    { id: 11, char: "ز", name: "Ze", mahrec: "Dil ucu alt ön dişlere değdirilir (Keskin ses).", type: "ince", icon: "🐝", audio: "ze.mp3" },
    { id: 12, char: "س", name: "Sin", mahrec: "Dil ucu alt dişlerde tutularak yumuşak ıslık sesi çıkarılır.", type: "ince", icon: "☀️", audio: "sin.mp3" },
    { id: 13, char: "ش", name: "Şın", mahrec: "Dil ortası kabartılır, ses ağız içine yayılır.", type: "ince", icon: "🌊", audio: "sin2.mp3" },
    { id: 14, char: "ص", name: "Sad", mahrec: "Dil arkası yükseltilerek tok ve kalın ses verilir.", type: "kalin", icon: "🏰", audio: "sad.mp3" },
    { id: 15, char: "ض", name: "Dat", mahrec: "Dilin yan tarafı üst azı dişlerine basılır.", type: "kalin", icon: "🦁", audio: "dat.mp3" },
    { id: 16, char: "ط", name: "Tı", mahrec: "Dil ucu üst diş köklerine kuvvetlice bastırılır.", type: "kalin", icon: "👑", audio: "ti.mp3" },
    { id: 17, char: "ظ", name: "Zı", mahrec: "Dil ucu dişlerden hafif taşırılarak kalın peltek söylenir.", type: "kalin", icon: "🛡️", audio: "zi.mp3" },
    { id: 18, char: "ع", name: "Ayn", mahrec: "Boğaz ortası hafifçe sıkılarak genizden çıkarılır.", type: "orta", icon: "👁️", audio: "ayn.mp3" },
    { id: 19, char: "غ", name: "Gayn", mahrec: "Boğazın üst kısmından tok ve yumuşak çıkar.", type: "kalin", icon: "☁️", audio: "gayn.mp3" },
    { id: 20, char: "ف", name: "Fe", mahrec: "Üst ön dişler alt dudağın ıslak yerine dokundurulur.", type: "ince", icon: "🦋", audio: "fe.mp3" },
    { id: 21, char: "ق", name: "Kaf", mahrec: "Dil kökü ile yumuşak damak buluşur.", type: "kalin", icon: "🎈", audio: "kaf.mp3" },
    { id: 22, char: "ك", name: "Kef", mahrec: "Dil kökünün biraz önü sert damağa dokundurulur.", type: "ince", icon: "🔑", audio: "kef.mp3" },
    { id: 23, char: "ل", name: "Lam", mahrec: "Dil ucunun geniş yüzeyi üst ön damağa dayanır.", type: "ince", icon: "🌙", audio: "lam.mp3" },
    { id: 24, char: "م", name: "Mim", mahrec: "Dudaklar kapatılarak geniz sesiyle çıkarılır.", type: "ince", icon: "🍏", audio: "mim.mp3" },
    { id: 25, char: "ن", name: "Nun", mahrec: "Dil ucu üst diş etlerine değdirilir.", type: "ince", icon: "🎨", audio: "nun.mp3" },
    { id: 26, char: "و", name: "Vav", mahrec: "Dudaklar büzülüp ileriye doğru yuvarlatılır.", type: "ince", icon: "🍇", audio: "vav.mp3" },
    { id: 27, char: "هـ", name: "He", mahrec: "Göğse yakın boğaz dibinden pürüzsüz çıkar.", type: "ince", icon: "🏡", audio: "he.mp3" },
    { id: 28, char: "ي", name: "Ye", mahrec: "Dil ortası damağa yaklaştırılarak çıkarılır.", type: "ince", icon: "💎", audio: "ye.mp3" }
];

let appState = {
    session: null,
    activeTab: 'harfler'
};

document.addEventListener('DOMContentLoaded', () => {
    appState.session = getOrInitSession();
    renderAppLayout();
});

// MOD DEĞİŞİMİ VE DİNAMİK TEMA ENJEKSİYONU
function setMode(mode) {
    appState.session.mode = mode;
    localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
    renderAppLayout();
}

function switchTab(tab) {
    appState.activeTab = tab;
    renderAppLayout();
}

// HARF SESİ OYNATICI VE AKILLI FALLBACK
function playHarf(audioFile, charName) {
    const audio = new Audio(`assets/audio/${audioFile}`);
    
    audio.play().catch(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const msg = new SpeechSynthesisUtterance(charName);
            msg.lang = 'ar-SA';
            msg.rate = 0.85;
            window.speechSynthesis.speak(msg);
        }
    });

    if (!appState.session.completed.includes(charName)) {
        appState.session.completed.push(charName);
        appState.session.stars += 10;
        localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
        playChimeSound();
    }
    renderAppLayout();
}

// BAŞARI MELODİSİ (WEB AUDIO API)
function playChimeSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.07);
            osc.stop(ctx.currentTime + i * 0.07 + 0.25);
        });
    } catch(e){}
}

// İLERLEME VE KARNE İNDİRME (mahsusakuran.com Damgalı)
function downloadProgress() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        portal: "mahsusakuran.com",
        kullanici: appState.session.userId,
        tamamlananHarfSayisi: appState.session.completed.length,
        toplamYildiz: appState.session.stars,
        tamamlananHarfler: appState.session.completed,
        tarih: new Date().toLocaleString('tr-TR')
    }, null, 2));
    
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `mahsusakuran.com-elifba-karne.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
}

// ARAYÜZ VE DİNAMİK TEMA MOTORU
function renderAppLayout() {
    const root = document.getElementById('elifba-app-root');
    const mode = appState.session.mode; // 'child' | 'adult' | 'diyanet'
    const body = document.body;

    // Arka Plan ve Tema Yönetimi (Açık Beyaz, Mavi, Yeşil Tonları)
    if (mode === 'child') {
        body.className = "bg-gradient-to-br from-sky-50 via-sky-100/60 to-emerald-50 text-slate-800 font-sans min-h-screen flex flex-col justify-between";
    } else if (mode === 'adult') {
        body.className = "bg-gradient-to-br from-slate-50 via-emerald-50/40 to-slate-100 text-slate-800 font-sans min-h-screen flex flex-col justify-between";
    } else { // diyanet
        body.className = "bg-gradient-to-b from-emerald-50/80 via-white to-sky-50 text-slate-800 font-sans min-h-screen flex flex-col justify-between";
    }

    root.innerHTML = `
        <!-- MOD SEÇİCİ VE ÜST KONTROL PANELİ -->
        <div class="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 mb-8 max-w-6xl mx-auto">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                
                <!-- Referans Bazlı Mod Butonları -->
                <div class="flex flex-wrap items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
                    <button onclick="setMode('child')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'child' ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' : 'text-slate-600 hover:text-slate-900'}">
                        🎈 Çocuk Modu <span class="text-[10px] opacity-80 block font-normal">(kuran-ogreniyorum.com)</span>
                    </button>
                    <button onclick="setMode('adult')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'adult' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:text-slate-900'}">
                        🌿 Yetişkin Modu <span class="text-[10px] opacity-80 block font-normal">(elifba.online)</span>
                    </button>
                    <button onclick="setMode('diyanet')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'diyanet' ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20' : 'text-slate-600 hover:text-slate-900'}">
                        📜 İleri Seviye <span class="text-[10px] opacity-80 block font-normal">(Diyanet Müfredatı)</span>
                    </button>
                </div>

                <!-- İlerleme & İndirme İkonları -->
                <div class="flex items-center gap-3">
                    <div class="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs flex items-center gap-1.5 shadow-sm">
                        ⭐ <span>${appState.session.stars} Puan</span>
                    </div>
                    <button onclick="downloadProgress()" title="Karnemi mahsusakuran.com formatında indir" class="px-4 py-2 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm">
                        <i class="fa-solid fa-download"></i> Karnemi İndir
                    </button>
                </div>

            </div>

            <!-- Tab Butonları -->
            <div class="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 text-xs sm:text-sm font-semibold">
                <button onclick="switchTab('harfler')" class="px-5 py-2 rounded-xl transition-all ${appState.activeTab === 'harfler' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">Harfler (${ELIFBA_DATA.length})</button>
                <button onclick="switchTab('harekeler')" class="px-5 py-2 rounded-xl transition-all ${appState.activeTab === 'harekeler' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">Harekeler</button>
                <button onclick="switchTab('mahrec')" class="px-5 py-2 rounded-xl transition-all ${appState.activeTab === 'mahrec' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">Mahreç Kılavuzu</button>
            </div>
        </div>

        <!-- İÇERİK ALANI -->
        <div class="max-w-6xl mx-auto">
            ${appState.activeTab === 'harfler' ? renderHarfler(mode) : (appState.activeTab === 'harekeler' ? renderHarekeler(mode) : renderMahrec(mode))}
        </div>
    `;
}

// HARF KARTLARI (MOD BAZLI RENK VE ŞEKİL)
function renderHarfler(mode) {
    return `
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            ${ELIFBA_DATA.map(item => {
                const isDone = appState.session.completed.includes(item.name);
                
                if (mode === 'child') {
                    // ÇOCUK TEMA KARTI
                    return `
                        <div onclick="playHarf('${item.audio}', '${item.name}')" class="p-4 rounded-3xl bg-white border-2 ${isDone ? 'border-amber-400 shadow-md shadow-amber-200' : 'border-sky-200 hover:border-sky-400'} hover:-translate-y-1 transition-all cursor-pointer text-center relative group shadow-sm">
                            <span class="absolute top-2 left-3 text-sm">${item.icon}</span>
                            ${isDone ? '<span class="absolute top-2 right-3 text-xs">⭐</span>' : ''}
                            <div class="arabic-text text-5xl text-sky-600 my-2 group-hover:scale-110 transition-transform">${item.char}</div>
                            <div class="text-xs font-bold text-slate-700">${item.name}</div>
                        </div>
                    `;
                } else if (mode === 'adult') {
                    // YETİŞKİN TEMA KARTI (Sade Beyaz-Yeşil)
                    return `
                        <div onclick="playHarf('${item.audio}', '${item.name}')" class="p-4 rounded-2xl bg-white border ${isDone ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-emerald-400'} transition-all cursor-pointer text-center group shadow-sm hover:shadow-md">
                            <div class="arabic-text text-4xl text-emerald-700 mb-1 group-hover:scale-105 transition-transform">${item.char}</div>
                            <div class="text-xs font-semibold text-slate-800">${item.name}</div>
                            <div class="text-[10px] text-slate-500 mt-1 line-clamp-1">${item.mahrec}</div>
                        </div>
                    `;
                } else {
                    // DİYANET İLERİ SEVİYE KARTI
                    return `
                        <div onclick="playHarf('${item.audio}', '${item.name}')" class="p-4 rounded-2xl bg-white border-l-4 ${isDone ? 'border-l-emerald-600 bg-emerald-50/20' : 'border-l-slate-400'} border-slate-200 transition-all cursor-pointer group shadow-sm hover:shadow-md flex flex-col justify-between">
                            <div class="flex items-center justify-between">
                                <span class="text-[10px] font-bold text-slate-400">No: ${item.id}</span>
                                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold uppercase">${item.type}</span>
                            </div>
                            <div class="arabic-text text-4xl text-emerald-900 text-center my-2">${item.char}</div>
                            <div class="text-center">
                                <span class="text-xs font-bold text-slate-800 block">${item.name}</span>
                            </div>
                        </div>
                    `;
                }
            }).join('')}
        </div>
    `;
}

function renderHarekeler(mode) {
    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3">
                <div class="arabic-text text-5xl text-emerald-600 text-center">َ</div>
                <h3 class="text-base font-bold text-slate-800">Üstün (Fatha)</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Harfin üzerine çizilir. İnce harfleri "e", kalın harfleri "a" sesiyle okutur.</p>
                <div class="arabic-text text-2xl text-emerald-700 bg-emerald-50/50 p-3 rounded-2xl text-center border border-emerald-100">بَ - دَ - رَ</div>
            </div>
            <div class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3">
                <div class="arabic-text text-5xl text-emerald-600 text-center">ِ</div>
                <h3 class="text-base font-bold text-slate-800">Esre (Kasra)</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Harfin altına çizilir. İnce harfleri "i", kalın harfleri "ı-i" arası sesle okutur.</p>
                <div class="arabic-text text-2xl text-emerald-700 bg-emerald-50/50 p-3 rounded-2xl text-center border border-emerald-100">بِ - دِ - رِ</div>
            </div>
            <div class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3">
                <div class="arabic-text text-5xl text-emerald-600 text-center">ُ</div>
                <h3 class="text-base font-bold text-slate-800">Ötre (Damma)</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Harfin üzerine konur. İnce harfleri "ü", kalın harfleri "u" sesiyle okutur.</p>
                <div class="arabic-text text-2xl text-emerald-700 bg-emerald-50/50 p-3 rounded-2xl text-center border border-emerald-100">بُ - دُ - رُ</div>
            </div>
        </div>
    `;
}

function renderMahrec(mode) {
    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-3">
                <div class="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">🗣️</div>
                <h3 class="text-base font-bold text-slate-800">Boğaz Mahreçleri</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Boğaz dibi, ortası ve ağza yakın kısmından çıkan sesler.</p>
                <div class="p-3 bg-sky-50/60 rounded-xl text-center arabic-text text-xl text-sky-800">ء - هـ | ع - ح | غ - خ</div>
            </div>
            <div class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">👅</div>
                <h3 class="text-base font-bold text-slate-800">Dil & Damak Mahreçleri</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Dil kökü, ortası ve ucunun damak/diş teması.</p>
                <div class="p-3 bg-emerald-50/60 rounded-xl text-center arabic-text text-xl text-emerald-800">ق - ك | ج - ش - ي | ط - د - ت</div>
            </div>
            <div class="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">👄</div>
                <h3 class="text-base font-bold text-slate-800">Dudak Mahreçleri</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Dudakların birleşmesi, büzülmesi veya diş teması.</p>
                <div class="p-3 bg-emerald-50/60 rounded-xl text-center arabic-text text-xl text-emerald-800">ف | ب | م | و</div>
            </div>
        </div>
    `;
}