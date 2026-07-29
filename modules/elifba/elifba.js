/**
 * Mahsusa Kur'an - Tam Elifba Modül Motoru
 * 28 Harf, İnteraktif Mahreç SVGs, Web Speech API & Web Audio API
 */

const ELIFBA_DATA = [
    { id: 1, char: "ا", name: "Elif", mahrec: "Boğazın en alt kısmından çıkan düz sestir.", type: "ince", icon: "🌱", audio: "elif.mp3" },
    { id: 2, char: "ب", name: "Be", mahrec: "Dudaklar birbirine hafifçe değdirilerek çıkarılır.", type: "ince", icon: "🎈", audio: "be.mp3" },
    { id: 3, char: "ت", name: "Te", mahrec: "Dil ucu, üst ön dişlerin iç kısımlarına dokundurulur.", type: "ince", icon: "🍎", audio: "te.mp3" },
    { id: 4, char: "ث", name: "Se", mahrec: "Dil ucu, üst ön dişlerin arasından hafifçe çıkarılır (Peltek).", type: "ince", icon: "⭐", audio: "se.mp3" },
    { id: 5, char: "ج", name: "Cim", mahrec: "Dilin ortası, üst damağa oturtularak çıkarılır.", type: "orta", icon: "🐪", audio: "cim.mp3" },
    { id: 6, char: "ح", name: "Ha", mahrec: "Boğazın ortasından tatlı bir nefesle çıkar (Keskin).", type: "keskin", icon: "🌸", audio: "ha.mp3" },
    { id: 7, char: "خ", name: "Hı", mahrec: "Boğazın ağza en yakın kısmından hırıltılı çıkarılır.", type: "kalin", icon: "🍃", audio: "hi.mp3" },
    { id: 8, char: "د", name: "Dal", mahrec: "Dil ucu, üst ön dişlerin köklerine dokundurulur.", type: "ince", icon: "🐬", audio: "dal.mp3" },
    { id: 9, char: "ذ", name: "Zel", mahrec: "Dil ucu dişlerin arasından çıkarılır (Yumuşak Peltek).", type: "ince", icon: "🔔", audio: "zel.mp3" },
    { id: 10, char: "ر", name: "Ra", mahrec: "Dil ucunun arkası üst ön diş etlerine değdirilir.", type: "kalin", icon: "🚀", audio: "ra.mp3" },
    { id: 11, char: "ز", name: "Ze", mahrec: "Dil ucu alt ön dişlerin iç yüzüne değdirilerek çıkar (Keskin).", type: "ince", icon: "🐝", audio: "ze.mp3" },
    { id: 12, char: "س", name: "Sin", mahrec: "Dil ucu alt dişlere değerek ıslık sesiyle çıkar.", type: "ince", icon: "☀️", audio: "sin.mp3" },
    { id: 13, char: "ش", name: "Şın", mahrec: "Dil ortası üst damağa yükseltilir, ses ağza yayılır.", type: "ince", icon: "🌊", audio: "sin2.mp3" },
    { id: 14, char: "ص", name: "Sad", mahrec: "Dil arkası yükseltilerek dolgun ve kalın çıkarılır.", type: "kalin", icon: "🏰", audio: "sad.mp3" },
    { id: 15, char: "ض", name: "Dat", mahrec: "Dilin yan tarafı üst azı dişlere değdirilerek çıkarılır.", type: "kalin", icon: "🦁", audio: "dat.mp3" },
    { id: 16, char: "ط", name: "Tı", mahrec: "Dil ucu üst diş köklerine basılarak kuvvetli çıkarılır.", type: "kalin", icon: "👑", audio: "ti.mp3" },
    { id: 17, char: "ظ", name: "Zı", mahrec: "Dil ucu üst dişlerden hafif taşırılarak kalın peltek çıkarılır.", type: "kalin", icon: "🛡️", audio: "zi.mp3" },
    { id: 18, char: "ع", name: "Ayn", mahrec: "Boğazın tam ortası sıkılarak çıkarılır.", type: "orta", icon: "👁️", audio: "ayn.mp3" },
    { id: 19, char: "غ", name: "Gayn", mahrec: "Boğazın üst kısmından yumuşak hırıltı ile çıkarılır.", type: "kalin", icon: "☁️", audio: "gayn.mp3" },
    { id: 20, char: "ف", name: "Fe", mahrec: "Üst ön dişler alt dudağın iç kısmına dokundurulur.", type: "ince", icon: "🦋", audio: "fe.mp3" },
    { id: 21, char: "ق", name: "Kaf", mahrec: "Dil kökü ile dil etrafındaki üst damaktan çıkarılır.", type: "kalin", icon: "🎈", audio: "kaf.mp3" },
    { id: 22, char: "ك", name: "Kef", mahrec: "Dil kökünün biraz önünden daha ince olarak çıkarılır.", type: "ince", icon: "🔑", audio: "kef.mp3" },
    { id: 23, char: "ل", name: "Lam", mahrec: "Dil ucu ve yanları üst ön damakla buluşur.", type: "ince", icon: "🌙", audio: "lam.mp3" },
    { id: 24, char: "م", name: "Mim", mahrec: "Dudakların iç kısımları birbirine kapatılarak çıkarılır.", type: "ince", icon: "🍏", audio: "mim.mp3" },
    { id: 25, char: "ن", name: "Nun", mahrec: "Dil ucu üst damak etlerine dokundurulur (Geniz sesi).", type: "ince", icon: "🎨", audio: "nun.mp3" },
    { id: 26, char: "و", name: "Vav", mahrec: "Dudaklar ileriye doğru yuvarlatılarak çıkarılır.", type: "ince", icon: "🍇", audio: "vav.mp3" },
    { id: 27, char: "هـ", name: "He", mahrec: "Göğse yakın boğaz dibinden rahatça çıkarılır.", type: "ince", icon: "🏡", audio: "he.mp3" },
    { id: 28, char: "ي", name: "Ye", mahrec: "Dil ortası kabartılarak üst damağa yaklaştırılır.", type: "ince", icon: "💎", audio: "ye.mp3" }
];

let appState = {
    session: null,
    activeTab: 'harfler',
    activeMode: 'adult'
};

document.addEventListener('DOMContentLoaded', () => {
    appState.session = getOrInitSession();
    appState.activeMode = appState.session.mode || 'adult';
    updateSessionBadge();
    renderAppLayout();
});

function updateSessionBadge() {
    const statusText = document.getElementById('user-status-text');
    if (statusText) {
        statusText.innerHTML = appState.session.isGuest 
            ? `Misafir Oturumu (${appState.session.userId})`
            : `Kayıtlı Kullanıcı`;
    }
}

// HARF SESİ OYNATMA VE FALLBACK ENGINE
function playHarfAudio(audioFile, charName) {
    const audioPath = `assets/audio/${audioFile}`;
    const audio = new Audio(audioPath);
    
    // Kart Vurgulama Efekti
    const card = document.querySelector(`[data-char="${charName}"]`);
    if (card) {
        card.classList.add('ring-4', appState.activeMode === 'child' ? 'ring-pink-400' : 'ring-emerald-400', 'scale-105');
        setTimeout(() => card.classList.remove('ring-4', 'ring-pink-400', 'ring-emerald-400', 'scale-105'), 700);
    }

    audio.play().catch(() => {
        // MP3 Yoksa Tarayıcı Ses Sentezleyicisini Devreye Sok
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(charName);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    });

    recordProgress(charName);
}

// TERTEMİZ DAHİLİ ZİL / BAŞARI SESİ (WEB AUDIO API - MP3 GEREKTİRMEZ)
function playSynthesizedChime() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Arpej)
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.08);
            osc.stop(ctx.currentTime + i * 0.08 + 0.3);
        });
    } catch(e) { console.log(e); }
}

function recordProgress(charName) {
    if (!appState.session.completedLessons.includes(charName)) {
        appState.session.completedLessons.push(charName);
        appState.session.stars += 5;
        localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
        
        if (appState.activeMode === 'child') {
            playSynthesizedChime();
            renderStarCounter();
        }
    }
}

function toggleMode(mode) {
    appState.activeMode = mode;
    appState.session.mode = mode;
    localStorage.setItem(ELIFBA_CONFIG.SESSION.STORAGE_KEY, JSON.stringify(appState.session));
    renderAppLayout();
}

function switchTab(tab) {
    appState.activeTab = tab;
    renderAppLayout();
}

function renderAppLayout() {
    const root = document.getElementById('elifba-app-root');
    const isChild = appState.activeMode === 'child';

    root.innerHTML = `
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 rounded-2xl ${isChild ? 'bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-2 border-pink-500/40 shadow-lg shadow-pink-950/50' : 'bg-slate-900 border border-emerald-800/40'}">
            
            <div class="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <button onclick="toggleMode('adult')" class="px-4 py-2 rounded-lg text-xs font-bold transition-all ${!isChild ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">
                    <i class="fa-solid fa-user me-1.5"></i> Yetişkin Modu
                </button>
                <button onclick="toggleMode('child')" class="px-4 py-2 rounded-lg text-xs font-bold transition-all ${isChild ? 'bg-pink-500 text-white shadow shadow-pink-500/40' : 'text-slate-400 hover:text-white'}">
                    <i class="fa-solid fa-child-rearing me-1.5"></i> Çocuk Modu (Oyunlu)
                </button>
            </div>

            <div class="flex items-center gap-2 text-xs font-semibold">
                <button onclick="switchTab('harfler')" class="px-4 py-2 rounded-lg ${appState.activeTab === 'harfler' ? (isChild ? 'bg-pink-600 text-white' : 'bg-emerald-700 text-white') : 'bg-slate-950 text-slate-400'}">Harfler (${ELIFBA_DATA.length})</button>
                <button onclick="switchTab('harekeler')" class="px-4 py-2 rounded-lg ${appState.activeTab === 'harekeler' ? (isChild ? 'bg-pink-600 text-white' : 'bg-emerald-700 text-white') : 'bg-slate-950 text-slate-400'}">Harekeler</button>
                <button onclick="switchTab('mahrec')" class="px-4 py-2 rounded-lg ${appState.activeTab === 'mahrec' ? (isChild ? 'bg-pink-600 text-white' : 'bg-emerald-700 text-white') : 'bg-slate-950 text-slate-400'}">Mahreç Rehberi</button>
            </div>

            ${isChild ? `
                <div id="star-counter" class="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-sm">
                    ⭐ <span>${appState.session.stars} Yıldız</span>
                </div>
            ` : ''}
        </div>

        <div id="tab-content-area">
            ${appState.activeTab === 'harfler' ? renderHarflerGrid(isChild) : (appState.activeTab === 'harekeler' ? renderHarekelerGrid(isChild) : renderMahrecGrid())}
        </div>
    `;
}

function renderHarflerGrid(isChild) {
    return `
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3.5">
            ${ELIFBA_DATA.map(item => {
                const isCompleted = appState.session.completedLessons.includes(item.name);
                if (isChild) {
                    return `
                        <div data-char="${item.name}" onclick="playHarfAudio('${item.audio}', '${item.name}')" 
                             class="p-4 rounded-3xl bg-slate-900 border-2 ${isCompleted ? 'border-amber-400 shadow-md shadow-amber-500/20' : 'border-pink-500/30'} hover:border-pink-400 cursor-pointer transition-all hover:-translate-y-1 text-center group relative overflow-hidden">
                            ${isCompleted ? '<span class="absolute top-2 right-2 text-xs">⭐</span>' : ''}
                            <div class="text-xs absolute top-2 left-2">${item.icon}</div>
                            <div class="arabic-text text-5xl text-pink-400 my-2 group-hover:scale-110 transition-transform">${item.char}</div>
                            <div class="text-white font-bold text-xs">${item.name}</div>
                        </div>
                    `;
                } else {
                    return `
                        <div data-char="${item.name}" onclick="playHarfAudio('${item.audio}', '${item.name}')" 
                             class="p-3.5 rounded-xl bg-slate-900/90 border ${isCompleted ? 'border-emerald-500/60' : 'border-emerald-800/40'} hover:border-emerald-400 cursor-pointer transition-all text-center group hover:bg-emerald-950/30">
                            <div class="arabic-text text-4xl text-emerald-400 mb-1 group-hover:scale-105 transition-transform">${item.char}</div>
                            <div class="text-white font-semibold text-xs">${item.name}</div>
                            <div class="text-[10px] text-slate-400 mt-1 line-clamp-1">${item.mahrec}</div>
                        </div>
                    `;
                }
            }).join('')}
        </div>
    `;
}

function renderHarekelerGrid(isChild) {
    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div class="arabic-text text-5xl text-emerald-400 text-center">َ</div>
                <h3 class="text-lg font-bold text-white">Üstün (Fatha)</h3>
                <p class="text-xs text-slate-400 leading-relaxed">Harflerin üzerine konur. İnce harfleri "e", kalın harfleri "a" sesi ile okutur.</p>
                <div class="arabic-text text-2xl text-amber-300 bg-slate-950 p-3 rounded-xl text-center">بَ - دَ - رَ</div>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div class="arabic-text text-5xl text-emerald-400 text-center">ِ</div>
                <h3 class="text-lg font-bold text-white">Esre (Kasra)</h3>
                <p class="text-xs text-slate-400 leading-relaxed">Harflerin altına konur. İnce harfleri "i", kalın harfleri "ı-i" arası sesle okutur.</p>
                <div class="arabic-text text-2xl text-amber-300 bg-slate-950 p-3 rounded-xl text-center">بِ - دِ - رِ</div>
            </div>
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div class="arabic-text text-5xl text-emerald-400 text-center">ُ</div>
                <h3 class="text-lg font-bold text-white">Ötre (Damma)</h3>
                <p class="text-xs text-slate-400 leading-relaxed">Harflerin üzerine konur. İnce harfleri "ü", kalın harfleri "u" sesi ile okutur.</p>
                <div class="arabic-text text-2xl text-amber-300 bg-slate-950 p-3 rounded-xl text-center">بُ - دُ - رُ</div>
            </div>
        </div>
    `;
}

function renderMahrecGrid() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Boğaz Harfleri -->
            <div class="p-6 rounded-2xl bg-slate-900 border border-emerald-800/40 space-y-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl">
                    🗣️
                </div>
                <h3 class="text-lg font-bold text-white">1. Boğaz Bölgeleri</h3>
                <p class="text-xs text-slate-400 leading-relaxed">Boğazın alt, orta ve üst kısımlarından çıkan seslerdir.</p>
                <div class="p-3 bg-slate-950 rounded-xl flex items-center justify-between text-xs text-emerald-400 font-bold arabic-text text-lg">
                    <span>ء - هـ</span>
                    <span>ع - ح</span>
                    <span>غ - خ</span>
                </div>
            </div>

            <!-- Dil Harfleri -->
            <div class="p-6 rounded-2xl bg-slate-900 border border-emerald-800/40 space-y-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl">
                    👅
                </div>
                <h3 class="text-lg font-bold text-white">2. Dil & Damak Bölgeleri</h3>
                <p class="text-xs text-slate-400 leading-relaxed">Dilin kökü, ortası ve ucunun damak/dişlerle teması.</p>
                <div class="p-3 bg-slate-950 rounded-xl flex items-center justify-between text-xs text-emerald-400 font-bold arabic-text text-lg">
                    <span>ق - ك</span>
                    <span>ج - ش - ي</span>
                    <span>ط - د - ت</span>
                </div>
            </div>

            <!-- Dudak Harfleri -->
            <div class="p-6 rounded-2xl bg-slate-900 border border-emerald-800/40 space-y-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl">
                    👄
                </div>
                <h3 class="text-lg font-bold text-white">3. Dudak Bölgeleri</h3>
                <p class="text-xs text-slate-400 leading-relaxed">Dudakların birleşmesi, yuvarlanması veya diş teması.</p>
                <div class="p-3 bg-slate-950 rounded-xl flex items-center justify-between text-xs text-emerald-400 font-bold arabic-text text-lg">
                    <span>ف</span>
                    <span>ب</span>
                    <span>م</span>
                    <span>و</span>
                </div>
            </div>
        </div>
    `;
}

function renderStarCounter() {
    const el = document.getElementById('star-counter');
    if (el) {
        el.innerHTML = `⭐ <span>${appState.session.stars} Yıldız</span>`;
        el.classList.add('scale-125');
        setTimeout(() => el.classList.remove('scale-125'), 300);
    }
}