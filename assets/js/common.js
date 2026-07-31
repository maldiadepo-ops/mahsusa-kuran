/* Mahsusa Kur'an — Ortak veri ve yardımcı fonksiyonlar (tüm modüllerde kullanılır) */

/* ============================================================
   ZİYARETÇİ İSTATİSTİKLERİ (GoatCounter) — KURULUM REHBERİ
   1. https://www.goatcounter.com adresinden ücretsiz bir hesap aç
      (site kodu olarak örn. "mahsusakuran" seç).
   2. Sana verilen kod, örn: mahsusakuran.goatcounter.com
   3. Aşağıdaki mNavInject fonksiyonunun İÇİNE değil, index.html'in
      </body> etiketinden hemen önce şu satırı ekle:
      <script data-goatcounter="https://SENIN-KODUN.goatcounter.com/count"
              async src="//gc.zgo.at/count.js"></script>
   4. legal/index.html sayfasındaki Gizlilik bölümüne bu servisin
      adını eklemeyi unutma (KVKK şeffaflığı için).
   Bu adımı ben senin adına yapamam çünkü hesap açmak kimlik/e-posta
   gerektiriyor — ama kodu aldığında yapıştırmana yardım ederim.
   ============================================================ */

const sureIsimleriTR = [
    "", "Fâtiha", "Bakara", "Âl-i İmrân", "Nisâ", "Mâide", "En'âm", "A'râf", "Enfâl", "Tevbe", "Yûnus", "Hûd", "Yûsuf", "Ra'd", "İbrâhîm", "Hicr", "Nahl", "İsrâ", "Kehf", "Meryem", "Tâhâ", "Enbiyâ", "Hac", "Mü'minûn", "Nûr", "Furkân", "Şuarâ", "Neml", "Kasas", "Ankebût", "Rûm", "Lokmân", "Secde", "Ahzâb", "Sebe'", "Fâtır", "Yâsîn", "Sâffât", "Sâd", "Zümer", "Mü'min", "Fussilet", "Şûrâ", "Zuhruf", "Duhân", "Câsiye", "Ahkâf", "Muhammed", "Fetih", "Hucurât", "Kâf", "Zâriyât", "Tûr", "Necm", "Kamer", "Rahmân", "Vâkı'a", "Hadîd", "Mücâdele", "Haşr", "Mümtehine", "Saf", "Cuma", "Münâfikûn", "Tegâbün", "Talâk", "Tahrîm", "Mülk", "Kalem", "Hakka", "Meâric", "Nûh", "Cin", "Müzzemmil", "Müddessir", "Kıyâmet", "İnsân", "Mürselât", "Nebe'", "Nâzi'ât", "Abese", "Tekvîr", "İnfitâr", "Mutaffifîn", "Inşikâk", "Bürûc", "Târık", "A'lâ", "Gâşiye", "Fecr", "Beled", "Şems", "Leyl", "Duhâ", "İnşirâh", "Tîn", "Alak", "Kadr", "Beyyine", "Zilzâl", "Âdiyât", "Kâri'a", "Tekâsür", "Asr", "Hümeze", "Fîl", "Kureyş", "Mâ'ûn", "Kevser", "Kâfirûn", "Nasr", "Tebbet", "İhlâs", "Felak", "Nâs"
];

const surahAyahCounts = [
    0, 7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 111, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
];

function calculateEbjed(text) {
    if (!text) return 66;
    const abjadMap = {
        'ا':1, 'أ':1, 'إ':1, 'آ':1, 'ء':1, 'ى':1, 'ئ':10, 'ؤ':6,
        'ب':2, 'ج':3, 'د':4, 'ه':5, 'و':6, 'ز':7, 'ح':8, 'ط':9,
        'ي':10, 'ك':20, 'ل':30, 'م':40, 'ن':50, 'س':60, 'ع':70,
        'ف':80, 'ص':90, 'ق':100, 'ر':200, 'ش':300, 'ت':400,
        'ث':500, 'خ':600, 'ذ':700, 'ض':800, 'ظ':900, 'غ':1000, 'ة':5
    };
    let total = 0;
    const clean = text.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");
    for (let char of clean) {
        if (abjadMap[char]) total += abjadMap[char];
    }
    if (total === 0) {
        for (let char of text.toUpperCase()) {
            if ("AEİOÖUÜ".includes(char)) total += 12;
            else if ("BCÇDFGĞHJKLMNPRSŞTVYZ".includes(char)) total += 24;
        }
    }
    return total > 0 ? total : 99;
}

/* Ortak üst navigasyon barını sayfaya enjekte eder.
   basePath: bu sayfadan proje köküne göreli yol, örn. "../../" (modül içinden) veya "" (kökten) */
/* Basit, gerçek kullanım kaydı — sahte istatistik üretmemek için.
   Her çağrıldığında bugünün tarihine +1 ekler. Sadece kullanıcının kendi
   tarayıcısında (localStorage) tutulur, sunucuya gönderilmez. */
function mLogActivity() {
    try {
        const key = 'mahsusa_activity';
        const log = JSON.parse(localStorage.getItem(key) || '{}');
        const today = new Date().toISOString().slice(0, 10);
        log[today] = (log[today] || 0) + 1;
        localStorage.setItem(key, JSON.stringify(log));
    } catch (e) { /* localStorage kapalıysa sessizce geç */ }
}

function mNavInject(basePath, activeKey) {
    const items = [
        {key:'ana', label:'Ana Sayfa', href: basePath + 'index.html'},
        {key:'kuran', label:"Kur'an Oku", href: basePath + 'modules/kuran/index.html'},
        {key:'elifba', label:'Elifba', href: basePath + 'modules/elifba/index.html'},
        {key:'peygamberler', label:'Peygamberler', href: basePath + 'modules/peygamberler/index.html'},
        {key:'siyer', label:'Siyer Yarışması', href: basePath + 'modules/siyer/index.html'},
    ];
    const linksHtml = items.map(i =>
        `<a href="${i.href}" class="${i.key === activeKey ? 'active' : ''}">${i.label}</a>`
    ).join('');

    const nav = document.createElement('div');
    nav.className = 'm-nav';
    nav.innerHTML = `
      <div class="m-nav-inner">
        <a class="m-brand" href="${basePath}index.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2 L12 22 M2 12 L22 12" stroke-linecap="round"/><circle cx="12" cy="12" r="9"/></svg>
          Mahsusa Kur'an
        </a>
        <div class="m-nav-links">${linksHtml}</div>
      </div>`;
    document.body.prepend(nav);
}
