/* Mahsusa Kur'an — Ana sayfa arama merkezi mantığı (v55)
   AçıkKuran'ın arayüz mantığından ilham alınmıştır: tek arama kutusu, üç mod
   (Cüz/Sayfa, Sure, Harf/Kök), anlık sonuç listesi. Her bilginin kaynağı
   sonuçların altında belirtilir (kütüphaneci mantığı — link değil, atıf). */

const KAYNAK_MEAL = "Kaynak: Diyanet İşleri Başkanlığı Meali (api.alquran.cloud)";
const KAYNAK_YEREL = "Kaynak: Yerel fihrist — örnek veri, genişletilecek";

// Varsayılan (arama yapılmadan önce) gösterilen örnek ayetler
const ornekAyetler = [
  { sure: 5, ayet: 34, sureAdi: "Mâide", meal: "Ancak onlar üzerinde bir karara varmanızdan önce tevbe edenler hariç. İyi bilin ki Allah, çok bağışlayıcıdır, rahmeti kesintisizdir." },
  { sure: 10, ayet: 24, sureAdi: "Yûnus", meal: "Dünya hayatı, gökten indirdiğimiz yağmurla hayat bulup yeşeren, insanların ve hayvanların yararlandıkları yeryüzü bitkileri gibidir." }
];

// Basit yerel kelime fihristi (kuran.js'teki ile aynı mantık, ileride tek kaynağa taşınabilir)
const hubLocalIndex = {
  "musa": [
    { sure: 2, ayet: 51, meal: "Hani Musa ile kırk gece için sözleşmiştik; sonra siz onun arkasından buzağıyı ilâh edindiniz." },
    { sure: 2, ayet: 53, meal: "Hani Musa'ya kitabını ve furkan'ı verdik ki doğru yola eresiniz." }
  ],
  "sabır": [
    { sure: 2, ayet: 45, meal: "Sabır ve namazla Allah'tan yardım isteyin." },
    { sure: 2, ayet: 153, meal: "Ey iman edenler! Sabır ve namazla yardım dileyin. Şüphesiz Allah sabredenlerle beraberdir." }
  ],
  "cennet": [
    { sure: 2, ayet: 25, meal: "İnanıp salih ameller işleyenlere, altından ırmaklar akan cennetleri müjdele..." }
  ],
  "namaz": [
    { sure: 2, ayet: 43, meal: "Namazı kılın, zekat verin, rükû edenlerle birlikte rükû edin." }
  ]
};

// Örnek kök verisi (image 10'daki "Ra-Ha-Mim" mantığı — küçük ölçekte)
const hubKokIndex = {
  "رحم": {
    baslik: "Ra-Ha-Mim",
    anlam: "Merhamet etmek, şefkat göstermek, acıyarak korumak.",
    kayitlar: [
      { loc: "Fâtiha 1:3", ar: "الرَّحْمَٰنِ", tr: "r-rahmâni", mn: "Rahman" },
      { loc: "Fâtiha 1:3", ar: "الرَّحِيمِ", tr: "r-rahîmi", mn: "Rahim" },
      { loc: "Bakara 2:37", ar: "الرَّحِيمُ", tr: "r-rahîmu", mn: "çok esirgeyendir" }
    ]
  }
};

const resultsEl = document.getElementById('hubResults');
const modePanelEl = document.getElementById('modePanel');
const searchInput = document.getElementById('hubSearchInput');

function renderDefault() {
  resultsEl.innerHTML = `<div class="hub-empty">Yükleniyor…</div>`;
  fetch('data/gunun-ayeti.json')
    .then(r => r.json())
    .then(d => {
      const gununAyetiHtml = `
        <div class="hub-result" onclick="location.href='modules/kuran/index.html?sure=${d.sure_no}&ayet=${d.ayet_no}'">
          <span class="pin">🌙</span>
          <div>
            <div class="rt">Bugünün Ayeti — ${d.sure_adi} sûresi ${d.ayet_no}. ayet</div>
            <div class="rm">${d.meal}</div>
            <div class="rs">${KAYNAK_MEAL} · her gece otomatik güncellenir</div>
          </div>
        </div>`;
      const digerleriHtml = ornekAyetler.map(a => `
        <div class="hub-result" onclick="location.href='modules/kuran/index.html?sure=${a.sure}&ayet=${a.ayet}'">
          <span class="pin">📌</span>
          <div>
            <div class="rt">${a.sureAdi} sûresi ${a.ayet}. ayet</div>
            <div class="rm">${a.meal}</div>
            <div class="rs">${KAYNAK_MEAL}</div>
          </div>
        </div>
      `).join('');
      resultsEl.innerHTML = gununAyetiHtml + digerleriHtml;
    })
    .catch(() => {
      resultsEl.innerHTML = ornekAyetler.map(a => `
        <div class="hub-result" onclick="location.href='modules/kuran/index.html?sure=${a.sure}&ayet=${a.ayet}'">
          <span class="pin">📌</span>
          <div>
            <div class="rt">${a.sureAdi} sûresi ${a.ayet}. ayet</div>
            <div class="rm">${a.meal}</div>
            <div class="rs">${KAYNAK_MEAL}</div>
          </div>
        </div>
      `).join('');
    });
}
renderDefault();

function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

searchInput.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) { renderDefault(); return; }
  if (typeof mLogActivity === 'function') mLogActivity();

  const hits = hubLocalIndex[q];
  if (!hits) {
    resultsEl.innerHTML = `<div class="hub-empty">"${q}" için yerel fihristte sonuç yok. Genişletilmiş arama için Kur'an Oku modülünü deneyebilirsin.</div>`;
    return;
  }
  resultsEl.innerHTML = `
    <div class="hub-hint-row">🔎 "${q}" ile aranan tüm sonuçlar (${hits.length})</div>
    ${hits.map(h => `
      <div class="hub-result" onclick="location.href='modules/kuran/index.html?sure=${h.sure}&ayet=${h.ayet}'">
        <span class="pin">📌</span>
        <div>
          <div class="rt">${sureIsimleriTR[h.sure]} sûresi ${h.ayet}. ayet</div>
          <div class="rm">${highlight(h.meal, q)}</div>
          <div class="rs">${KAYNAK_YEREL}</div>
        </div>
      </div>
    `).join('')}
  `;
});

/* ---------- Mod butonları (Cüz/Sayfa · Sure · Harf/Kök) ---------- */
document.querySelectorAll('.hub-mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    const wasActive = btn.classList.contains('active');
    document.querySelectorAll('.hub-mode-btn').forEach(b => b.classList.remove('active'));
    if (wasActive) { modePanelEl.classList.remove('open'); modePanelEl.innerHTML = ''; return; }
    btn.classList.add('active');
    modePanelEl.classList.add('open');

    if (mode === 'sure') {
      modePanelEl.innerHTML = `<select id="sureSelect"><option value="">Sure seç…</option>${
        sureIsimleriTR.map((n, i) => i === 0 ? '' : `<option value="${i}">${i}. ${n}</option>`).join('')
      }</select>`;
      document.getElementById('sureSelect').addEventListener('change', (e) => {
        if (e.target.value) location.href = `modules/kuran/index.html?sure=${e.target.value}&ayet=1`;
      });
    }

    if (mode === 'cuzsayfa') {
      modePanelEl.innerHTML = `
        <select id="cuzSelect"><option value="">Cüz seç…</option>${Array.from({length:30},(_,i)=>`<option value="${i+1}">${i+1}. cüz</option>`).join('')}</select>
        <select id="sayfaSelect"><option value="">Sayfa seç…</option>${Array.from({length:604},(_,i)=>`<option value="${i+1}">${i+1}. sayfa</option>`).join('')}</select>
      `;
      document.getElementById('cuzSelect').addEventListener('change', async (e) => {
        if (!e.target.value) return;
        resultsEl.innerHTML = `<div class="hub-empty">Yükleniyor…</div>`;
        const r = await fetch(`https://api.alquran.cloud/v1/juz/${e.target.value}/quran-uthmani`);
        const j = await r.json();
        const ilk = j.data.ayahs[0];
        location.href = `modules/kuran/index.html?sure=${ilk.surah.number}&ayet=${ilk.numberInSurah}`;
      });
      document.getElementById('sayfaSelect').addEventListener('change', async (e) => {
        if (!e.target.value) return;
        resultsEl.innerHTML = `<div class="hub-empty">Yükleniyor…</div>`;
        const r = await fetch(`https://api.alquran.cloud/v1/page/${e.target.value}/quran-uthmani`);
        const j = await r.json();
        const ilk = j.data.ayahs[0];
        location.href = `modules/kuran/index.html?sure=${ilk.surah.number}&ayet=${ilk.numberInSurah}`;
      });
    }

    if (mode === 'harfkok') {
      modePanelEl.innerHTML = `
        <select id="harfSelect"><option value="">Harf seç…</option>${
          ['ا،Elif','ب،Bâ','ت،Tâ','ث،Sâ','ج،Cîm','ح،Hâ'].map(x => { const [g,n]=x.split('،'); return `<option value="${g}">${g} — ${n}</option>`; }).join('')
        }</select>
        <select id="kokSelect"><option value="">Kök seç… (örnek)</option><option value="رحم">ر-ح-م (Rahmet)</option></select>
      `;
      document.getElementById('harfSelect').addEventListener('change', (e) => {
        if (e.target.value) location.href = 'modules/elifba/index.html';
      });
      document.getElementById('kokSelect').addEventListener('change', (e) => {
        const kok = hubKokIndex[e.target.value];
        if (!kok) return;
        resultsEl.innerHTML = `
          <div class="kok-def"><h4>${kok.baslik}</h4><p>${kok.anlam}</p><div class="rs" style="margin-top:6px;">${KAYNAK_YEREL}</div></div>
          ${kok.kayitlar.map(k => `
            <div class="kok-row"><span class="loc">${k.loc}</span><span class="ar">${k.ar}</span><span class="tr">${k.tr}</span><span class="mn">${k.mn}</span></div>
          `).join('')}
        `;
      });
    }
  });
});

/* ---------- Hesap modalı: Ayarlar / Profil / Geçmiş ---------- */
const accountModal = document.getElementById('accountModal');
const accountTabBody = document.getElementById('accountTabBody');

document.getElementById('btnProfilIcon').addEventListener('click', () => {
  accountModal.style.display = 'flex';
  renderAccountTab('ayarlar');
});
document.getElementById('accountModalClose').addEventListener('click', () => accountModal.style.display = 'none');

document.querySelectorAll('.hub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.hub-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderAccountTab(tab.dataset.tab);
  });
});

function renderAccountTab(tab) {
  if (tab === 'ayarlar') {
    const prefs = JSON.parse(localStorage.getItem('mahsusa_prefs') || '{}');
    accountTabBody.innerHTML = `
      <div class="hub-field">
        <label>Meal Kaynağı</label>
        <select id="prefYazar">
          <option value="tr.diyanet" ${prefs.yazar==='tr.diyanet'?'selected':''}>Diyanet İşleri</option>
          <option value="tr.yazir" ${prefs.yazar==='tr.yazir'?'selected':''}>Elmalılı Hamdi Yazır</option>
        </select>
      </div>
      <div class="hub-toggle-row"><span>Dipnot Göster</span><div class="hub-switch ${prefs.dipnot?'on':''}" id="swDipnot"></div></div>
      <div class="hub-toggle-row"><span>Arapça Gizle</span><div class="hub-switch ${prefs.arapcaGizle?'on':''}" id="swArapca"></div></div>
      <div class="hub-toggle-row"><span>Okunuş Gizle</span><div class="hub-switch ${prefs.okunusGizle?'on':''}" id="swOkunus"></div></div>
      <div class="hub-toggle-row"><span>Çeviri Gizle</span><div class="hub-switch ${prefs.ceviriGizle?'on':''}" id="swCeviri"></div></div>
      <div class="rs" style="margin-top:12px;">Bu tercihler yalnızca bu tarayıcıda saklanır (localStorage), sunucuya gönderilmez.</div>
    `;
    const save = () => {
      const p = {
        yazar: document.getElementById('prefYazar').value,
        dipnot: document.getElementById('swDipnot').classList.contains('on'),
        arapcaGizle: document.getElementById('swArapca').classList.contains('on'),
        okunusGizle: document.getElementById('swOkunus').classList.contains('on'),
        ceviriGizle: document.getElementById('swCeviri').classList.contains('on'),
      };
      localStorage.setItem('mahsusa_prefs', JSON.stringify(p));
    };
    document.getElementById('prefYazar').addEventListener('change', save);
    ['swDipnot','swArapca','swOkunus','swCeviri'].forEach(id => {
      document.getElementById(id).addEventListener('click', (e) => { e.target.classList.toggle('on'); save(); });
    });
  }

  if (tab === 'profil') {
    const saved = JSON.parse(localStorage.getItem('mahsusa_user_full') || '{}');
    accountTabBody.innerHTML = `
      <div class="hub-field"><label>İsim</label><input id="pIsim" value="${saved.ad || ''}" placeholder="Adınız Soyadınız"></div>
      <div class="hub-field"><label>Şehir</label><input id="pSehir" value="${saved.sehir || ''}" placeholder="Şehir"></div>
      <div class="hub-field"><label>Doğum Tarihi</label><input id="pDogum" type="date" value="${saved.dogum || ''}"></div>
      <button class="btn btn-green" style="width:100%;" id="pKaydet">Kaydet</button>
    `;
    document.getElementById('pKaydet').addEventListener('click', () => {
      const data = { ad: document.getElementById('pIsim').value, sehir: document.getElementById('pSehir').value, dogum: document.getElementById('pDogum').value, mail: saved.mail || '', lang: saved.lang || 'tr.diyanet' };
      localStorage.setItem('mahsusa_user_full', JSON.stringify(data));
      alert('Profil kaydedildi.');
    });
  }

  if (tab === 'gecmis') {
    const lastRead = localStorage.getItem('mahsusa_last_read') || 'Henüz kayıt yok';
    const log = JSON.parse(localStorage.getItem('mahsusa_activity') || '{}');
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push(log[key] || 0);
    }
    const max = Math.max(1, ...days);
    accountTabBody.innerHTML = `
      <div class="hub-hist-quote">Son okunan: <strong>${lastRead}</strong></div>
      <div style="font-size:.78rem; color:var(--ink-dim); margin-bottom:6px;">Son 30 gün — gerçek kullanım (bu tarayıcıya özel)</div>
      <div class="hub-hist-bars">${days.map(v => `<div class="b ${v>0?'active':''}" style="height:${Math.max(6, (v/max)*60)}px;"></div>`).join('')}</div>
    `;
  }
}

/* ---------- Yer İşaretleri modalı ---------- */
const favModal = document.getElementById('favModal');
document.getElementById('btnFavIcon').addEventListener('click', () => {
  favModal.style.display = 'flex';
  const favs = JSON.parse(localStorage.getItem('mahsusa_favs') || '[]');
  const favListBody = document.getElementById('favListBody');
  if (favs.length === 0) {
    favListBody.innerHTML = `<div class="hub-empty">Henüz favorilere eklenmiş ayet yok. Kur'an Oku modülünde ⭐ ile ekleyebilirsin.</div>`;
    return;
  }
  favListBody.innerHTML = favs.map(f => `
    <div class="fav-item" onclick="location.href='modules/kuran/index.html?sure=${f.sure}&ayet=${f.ayet}'" style="cursor:pointer;">
      <div class="ft">⭐ ${f.name} sûresi ${f.sure}:${f.ayet}</div>
      <div>${f.text || ''}</div>
    </div>
  `).join('');
});
document.getElementById('favModalClose').addEventListener('click', () => favModal.style.display = 'none');

/* ---------- Sepia okuma modu (tema toggle) ---------- */
document.getElementById('btnThemeIcon').addEventListener('click', () => {
  const on = document.body.getAttribute('data-reading') === 'sepia';
  document.body.setAttribute('data-reading', on ? '' : 'sepia');
});
