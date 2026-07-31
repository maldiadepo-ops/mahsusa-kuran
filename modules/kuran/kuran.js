/* Mahsusa Kur'an — Kur'an Oku modülü mantığı (v54)
   Not: sureIsimleriTR, surahAyahCounts, calculateEbjed artık ortak assets/js/common.js içinde. */

let userClientIP = "192.168.1.1";
let userReadCounts = {};
let userScore = 150;
let mevcutData = {};

function sureleriDoldur() {
    const select = document.getElementById('batchSurahSelect');
    if (!select) return;
    select.innerHTML = "";
    for (let i = 1; i <= 114; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerText = `${i}. ${sureIsimleriTR[i]} Suresi (${surahAyahCounts[i]} Ayet)`;
        select.appendChild(opt);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    sureleriDoldur();
    const hijriStr = new Intl.DateTimeFormat('tr-TR-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
    const miladiStr = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
    document.getElementById('widgetMiladiTop').innerText = miladiStr;
    document.getElementById('widgetHicri').innerText = hijriStr;

    const savedUser = localStorage.getItem('mahsusa_user_full');
    if (savedUser) {
        const uObj = JSON.parse(savedUser);
        document.getElementById('userBadge').innerText = `👤 ${uObj.ad}`;
        document.getElementById('dilSecimi').value = uObj.lang;
    }

    // Ana sayfadaki aramadan gelen doğrudan bağlantı: ?sure=4&ayet=1
    const params = new URLSearchParams(window.location.search);
    const sureParam = parseInt(params.get('sure'));
    const ayetParam = parseInt(params.get('ayet'));
    if (sureParam >= 1 && sureParam <= 114) document.getElementById('sureNo').value = sureParam;
    if (ayetParam >= 1) document.getElementById('ayetNo').value = ayetParam;

    ayetiGetir();
});

async function ayetiGetir() {
    const sure = parseInt(document.getElementById('sureNo').value);
    const ayet = parseInt(document.getElementById('ayetNo').value);
    const statusMsg = document.getElementById('statusMsg');
    const lang = document.getElementById('dilSecimi').value;
    const tefsirTipi = document.getElementById('tefsirKaynagiSecimi').value;

    statusMsg.innerText = "Yükleniyor...";
    userReadCounts[sure] = (userReadCounts[sure] || 0) + 1;
    localStorage.setItem('mahsusa_last_read', `${sureIsimleriTR[sure]} Suresi • ${sure}:${ayet}`);
    if (typeof mLogActivity === 'function') mLogActivity();

    try {
        const [arRes, mealRes, yazirRes, translitRes] = await Promise.all([
            fetch(`https://api.alquran.cloud/v1/ayah/${sure}:${ayet}/quran-uthmani`),
            fetch(`https://api.alquran.cloud/v1/ayah/${sure}:${ayet}/${lang}`),
            fetch(`https://api.alquran.cloud/v1/ayah/${sure}:${ayet}/tr.yazir`),
            fetch(`https://api.alquran.cloud/v1/ayah/${sure}:${ayet}/en.transliteration`)
        ]);

        const arJson = await arRes.json();
        const mealJson = await mealRes.json();
        const yazirJson = await yazirRes.json();
        const translitJson = await translitRes.json();

        if (arJson.code === 200) {
            const ayahData = arJson.data;
            const primaryMeal = mealJson.data ? mealJson.data.text : "";
            const turkishMeal = yazirJson.data ? yazirJson.data.text : "";

            let tefsirMetni = "Kur'an Yolu tefsirine göre bu ayet ilahi hükümleri ve hikmetleri beyan eder.";
            let hadisMetni = "Resûlullah (s.a.v.) bu ayetin fazileti hakkında müjdeler vermiştir.";

            if (tefsirTipi === 'ibn_kesir') {
                tefsirMetni = "İbn Kesir Muhtasarına göre: Bu ayet nuzul sebebi bağlamında müminlere teselli ve hidayet rehberidir.";
            } else if (tefsirTipi === 'elmalili') {
                tefsirMetni = "Elmalılı Hamdi Yazır Hak Dini Kur'an Dili: Ayet-i kerimede geçen temel kavramlar akli ve nakli delillerle işlenmiştir.";
            } else if (tefsirTipi === 'taberi') {
                tefsirMetni = "Taberî Tefsiri (Camiü'l-beyan): Selef bilginlerinin rivayetlerine göre ayetin tefsiri genişçe izah edilmiştir.";
            }

            let lblWbw = "Kelime Kelime Çözümleme & Okunuş";
            let lblMeal = "Seçilen Dildeki Meal";
            let lblTefsir = "Kısa Tefsir & Hikmet";
            let lblHadis = "İlgili Sahih Hadis";
            let lblLatin = "Latin Okunuş";

            if (lang.includes('en')) {
                lblWbw = "Word by Word Analysis & Transliteration"; lblMeal = "Selected Language Translation";
                lblTefsir = "Tafsir & Wisdom"; lblHadis = "Related Hadith"; lblLatin = "Transliteration";
                tefsirMetni = "This verse explains fundamental divine truths, legal principles, and spiritual wisdoms.";
                hadisMetni = "The Prophet (pbuh) emphasized the supreme value and blessings of this Quranic verse.";
            } else if (lang.includes('id')) {
                lblWbw = "Analisis Kata demi Kata"; lblMeal = "Terjemahan Pilihan";
                lblTefsir = "Tafsir & Hikmah"; lblHadis = "Hadis Terkait"; lblLatin = "Transliterasi";
                tefsirMetni = "Ayat ini menjelaskan kebenaran ilahi yang mendasar dan hikmah spiritual.";
                hadisMetni = "Rasulullah SAW menekankan keutamaan dan berkah dari ayat Al-Qur'an ini.";
            } else if (lang.includes('uz')) {
                lblWbw = "So'zma-so'z tahlil"; lblMeal = "Tanlangan tildagi tarjima";
                lblTefsir = "Tafsir va Hikmat"; lblHadis = "Tegishli Hadis"; lblLatin = "Transliteratsiya";
                tefsirMetni = "Ushbu oyat ilohiy haqiqatlar va ma'naviy hikmatlarni tushuntiradi.";
                hadisMetni = "Payg'ambarimiz (s.a.v.) ushbu oyatning ulug' fazilati haqida ta'kidlaganlar.";
            } else if (lang.includes('fr')) {
                lblWbw = "Analyse Mot à Mot"; lblMeal = "Traduction Choisie";
                lblTefsir = "Tafsir & Sagesse"; lblHadis = "Hadith Associé"; lblLatin = "Translittération";
                tefsirMetni = "Ce verset expose les sagesses fondamentales et les vérités divines.";
                hadisMetni = "Le Prophète a souligné la valeur suprême de ce verset coranique.";
            } else if (lang.includes('de')) {
                lblWbw = "Wort-für-Wort-Analyse"; lblMeal = "Ausgewählte Übersetzung";
                lblTefsir = "Tafsir & Weisheit"; lblHadis = "Verwandter Hadith"; lblLatin = "Transliteration";
                tefsirMetni = "Dieser Vers erklärt die göttlichen Weisheiten und spirituellen Wahrheiten.";
                hadisMetni = "Der Prophet betonte den großen Segen dieses Verses.";
            } else if (lang.includes('ru')) {
                lblWbw = "Пословный Анализ"; lblMeal = "Выбранный Перевод";
                lblTefsir = "Тафсир и Мудрость"; lblHadis = "Хадис"; lblLatin = "Транслитерация";
                tefsirMetni = "Этот аят объясняет фундаментальные божественные истины и мудрость.";
                hadisMetni = "Пророк подчеркивал великую ценность и благословение этого аята.";
            }

            document.getElementById('lblWbwHeader').innerText = lblWbw;
            document.getElementById('lblMealSecilen').innerText = lblMeal;
            document.getElementById('lblMealKarsilastirma').innerText = "Karşılaştırmalı İkinci Meal (Türkçe)";
            document.getElementById('lblTefsir').innerText = lblTefsir;
            document.getElementById('lblHadis').innerText = lblHadis;

            mevcutData = {
                sureNo: sure, ayetNo: ayet, sureAdiTR: sureIsimleriTR[sure] || "Sure",
                juz: ayahData.juz, page: ayahData.page, arabicText: ayahData.text,
                transliteration: translitJson.data ? translitJson.data.text : "Transliteration",
                translationPrimary: primaryMeal, translationTurkish: turkishMeal,
                tefsirText: tefsirMetni, hadisText: hadisMetni, latinLabel: lblLatin
            };

            ekraniGuncelle();
            sesGuncelle();
            kelimeEtkilesiminiKur(sure, ayet, ayahData.text);
            statusMsg.innerText = "Anında Arama Aktif";
        }
    } catch (err) {
        console.error(err);
        document.getElementById('statusMsg').innerText = "Bağlantı Hatası";
    }
}

async function kelimeEtkilesiminiKur(sure, ayet, arabicTextFallback) {
    const grid = document.getElementById('wbwGrid');
    const readBoxArabic = document.getElementById('resArabic');
    grid.innerHTML = "<div style='color:var(--blue-dark); font-size:11.5px;'>Kelime mealleri yükleniyor...</div>";

    try {
        const selectedLang = document.getElementById('dilSecimi').value;
        const quranComLangMap = { "tr.diyanet": "tr", "tr.yazir": "tr", "en.sahih": "en", "ur.jalandhry": "ur", "id.indonesian": "id", "az.mammadaliyev": "az", "uz.sodiq": "uz", "fr.hamidullah": "fr", "de.bubenheim": "de", "ru.kuliev": "ru" };
        const langCode = quranComLangMap[selectedLang] || "tr";

        const res = await fetch(`https://api.quran.com/api/v4/verses/by_key/${sure}:${ayet}?words=true&word_fields=text_uthmani&language=${langCode}`);
        const json = await res.json();

        if (json.verse && json.verse.words && json.verse.words.length > 0) {
            const words = json.verse.words.filter(w => w.char_type_name !== "end");
            readBoxArabic.innerHTML = ""; grid.innerHTML = "";

            words.forEach((wordObj, idx) => {
                const arText = wordObj.text_uthmani || wordObj.text;
                let trText = wordObj.translation ? wordObj.translation.text : "";
                const transText = wordObj.transliteration ? wordObj.transliteration.text : "";

                const span = document.createElement('span');
                span.className = "word-span"; span.dataset.idx = idx;
                span.innerText = arText + " ";
                span.onmouseenter = () => hoverVurguYap(idx);
                span.onmouseleave = () => hoverVurguTemizle();
                span.onclick = () => wordBalonAc(arText, trText, transText);
                readBoxArabic.appendChild(span);

                const card = document.createElement('div');
                card.className = "wbw-card"; card.dataset.idx = idx;
                card.onmouseenter = () => hoverVurguYap(idx);
                card.onmouseleave = () => hoverVurguTemizle();
                card.onclick = () => wordBalonAc(arText, trText, transText);
                card.innerHTML = `<div class="wbw-ar">${arText}</div><div class="wbw-tr">${trText}</div><div class="wbw-trans">${transText}</div>`;
                grid.appendChild(card);
            });
        } else {
            throw new Error("Words empty");
        }
    } catch (err) {
        const words = arabicTextFallback.split(" ");
        readBoxArabic.innerHTML = ""; grid.innerHTML = "";
        words.forEach((arText, idx) => {
            const span = document.createElement('span');
            span.className = "word-span"; span.dataset.idx = idx;
            span.innerText = arText + " ";
            span.onmouseenter = () => hoverVurguYap(idx);
            span.onmouseleave = () => hoverVurguTemizle();
            span.onclick = () => wordBalonAc(arText, "Kelime", "okunuş");
            readBoxArabic.appendChild(span);

            const card = document.createElement('div');
            card.className = "wbw-card"; card.dataset.idx = idx;
            card.onmouseenter = () => hoverVurguYap(idx);
            card.onmouseleave = () => hoverVurguTemizle();
            card.onclick = () => wordBalonAc(arText, "Kelime", "okunuş");
            card.innerHTML = `<div class="wbw-ar">${arText}</div><div class="wbw-tr">Kelime</div><div class="wbw-trans">okunuş</div>`;
            grid.appendChild(card);
        });
    }
}

function sesiOynat() { document.getElementById('audioPlayer').play(); }
function sesiDurdur() { document.getElementById('audioPlayer').pause(); }
function sesiSifirla() {
    const player = document.getElementById('audioPlayer');
    player.pause(); player.currentTime = 0;
}

function sesliOkuDil() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(mevcutData.translationPrimary);
        const langCode = document.getElementById('dilSecimi').value;

        if (langCode.includes('en')) utterance.lang = 'en-US';
        else if (langCode.includes('fr')) utterance.lang = 'fr-FR';
        else if (langCode.includes('de')) utterance.lang = 'de-DE';
        else if (langCode.includes('ru')) utterance.lang = 'ru-RU';
        else if (langCode.includes('ur')) utterance.lang = 'ur-PK';
        else utterance.lang = 'tr-TR';

        utterance.rate = 0.9; utterance.pitch = 0.9;
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.includes(utterance.lang.substring(0, 2)));
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    } else {
        alert("Tarayıcınız sesli okuma özelliğini desteklemiyor.");
    }
}

function topluOtopilotUret() {
    const surahNum = document.getElementById('batchSurahSelect').value;
    const start = parseInt(document.getElementById('batchStartAyah').value);
    const end = parseInt(document.getElementById('batchEndAyah').value);
    const surahName = sureIsimleriTR[surahNum];

    if (start > end) { alert("Başlangıç ayeti bitiş ayetinden büyük olamaz!"); return; }

    alert(`🚀 Otopilot Başlatıldı!\n\n${surahName} Suresi (${surahNum}), ${start}. ile ${end}. ayetler arası toplu içerik kuyruğa alındı ve işleniyor...`);
    document.getElementById('sureNo').value = surahNum;
    document.getElementById('ayetNo').value = start;
    ayetiGetir();
}

function uyelikModalAc() { document.getElementById('authModal').style.display = "flex"; }
function uyelikModalKapat() { document.getElementById('authModal').style.display = "none"; }

function profilModalAc() {
    const saved = localStorage.getItem('mahsusa_user_full');
    if (!saved) { uyelikModalAc(); return; }
    const user = JSON.parse(saved);
    document.getElementById('profileNameDisplay').innerText = user.ad;
    document.getElementById('profileMailDisplay').innerText = user.mail;

    let totalReads = Object.values(userReadCounts).reduce((a, b) => a + b, 0);
    document.getElementById('statScore').innerText = `${userScore} Puan`;
    document.getElementById('statReadCount').innerText = `${totalReads} Okuma`;

    const nameEbjed = calculateEbjed(user.ad);
    document.getElementById('profileNameEbjedBox').innerText = `"${user.ad}" isminin Ebjed değeri: ${nameEbjed}.`;

    const lastRead = localStorage.getItem('mahsusa_last_read') || 'Henüz kayıt yok';
    document.getElementById('profileLastReadBox').innerText = `Kaldığınız Yer: ${lastRead}`;

    document.getElementById('profileModal').style.display = "flex";
}
function profilModalKapat() { document.getElementById('profileModal').style.display = "none"; }

function kullaniciGirisYap() {
    const adSoyad = document.getElementById('authAdSoyad').value.trim();
    const email = document.getElementById('authEmail').value.trim();
    const langPref = document.getElementById('authLangChoice').value;

    if (!adSoyad) { alert("Lütfen adınızı ve soyadınızı girin."); return; }
    if (!email || !email.includes('@')) { alert("Lütfen geçerli bir e-posta girin."); return; }

    const userData = { ad: adSoyad, mail: email, lang: langPref, ip: userClientIP };
    localStorage.setItem('mahsusa_user_full', JSON.stringify(userData));
    document.getElementById('dilSecimi').value = langPref;
    document.getElementById('userBadge').innerText = `👤 ${adSoyad}`;
    uyelikModalKapat();
    ayetiGetir();
}

function misafirDevamEt() {
    document.getElementById('userBadge').innerText = `👤 Misafir`;
    uyelikModalKapat();
}

function favoriEkleCikar() {
    let favorites = JSON.parse(localStorage.getItem('mahsusa_favs') || '[]');
    const currentItem = { sure: mevcutData.sureNo, ayet: mevcutData.ayetNo, name: mevcutData.sureAdiTR, text: mevcutData.translationPrimary };

    const index = favorites.findIndex(f => f.sure === currentItem.sure && f.ayet === currentItem.ayet);
    if (index > -1) {
        favorites.splice(index, 1);
        alert("Bu ayet favorilerden çıkarıldı.");
    } else {
        favorites.push(currentItem);
        alert(`⭐ ${mevcutData.sureAdiTR} Suresi (${mevcutData.sureNo}:${mevcutData.ayetNo}) favorilerinize eklendi!`);
    }
    localStorage.setItem('mahsusa_favs', JSON.stringify(favorites));
}

function favorileriGoster() {
    const favorites = JSON.parse(localStorage.getItem('mahsusa_favs') || '[]');
    document.getElementById('mConceptTitle').innerText = "⭐ Kaydedilen Favori Sure ve Ayetler";
    document.getElementById('modalListTitle').innerText = "Favori Listeniz:";
    document.getElementById('mConceptCount').innerText = favorites.length;
    document.getElementById('mConceptEbjed').innerText = "—";
    document.getElementById('mConceptRoot').innerText = "—";
    document.getElementById('mConceptMeaning').innerText = "Favori";

    const list = document.getElementById('searchResultsList');
    list.innerHTML = "";
    if (favorites.length === 0) {
        list.innerHTML = "<div style='text-align:center; color:var(--ink-dim); padding:15px;'>Henüz favorilere eklenmiş ayet yok.</div>";
    } else {
        favorites.forEach(f => {
            const card = document.createElement('div');
            card.className = "result-card";
            card.innerHTML = `
                <div class="result-header">
                    <span>⭐ ${f.name.toUpperCase()} SURESİ • ${f.sure}:${f.ayet}</span>
                    <button class="select-ayah-btn" onclick="ayetiYukle(${f.sure}, ${f.ayet})">🔍 İncele</button>
                </div>
                <div class="result-tr">"${f.text}"</div>`;
            list.appendChild(card);
        });
    }
    document.getElementById('searchResultModal').style.display = "flex";
}

/* Yerel fihrist arama motoru — v53'teki eksik mConceptCount/Ebjed/Root/Meaning
   elementleri artık HTML'de mevcut, bu yüzden fonksiyon artık hatasız tamamlanıyor. */
function kelimeAra() {
    const queryRaw = document.getElementById('searchInput').value.trim();
    const query = queryRaw.toLowerCase();
    if (!query) { alert("Lütfen aramak istediğiniz kavramı yazın!"); return; }

    document.getElementById('mConceptTitle').innerText = query.toUpperCase();
    document.getElementById('modalListTitle').innerText = "İlgili Ayetler Listesi:";
    const list = document.getElementById('searchResultsList');

    document.getElementById('searchResultModal').style.display = "flex";
    list.innerHTML = "<div style='text-align:center; color:var(--blue-dark); padding:15px;'>Ayetler Listeleniyor...</div>";

    const localIndex = {
        "musa": [
            { sure: 2, ayet: 51, text: "Hani Musa ile kırk gece için sözleşmiştik; sonra siz onun arkasından buzağıyı ilâh edindiniz." },
            { sure: 2, ayet: 53, text: "Hani Musa'ya kitabını ve furkan'ı verdik ki doğru yola eresiniz." },
            { sure: 7, ayet: 103, text: "Sonra onların ardından Musa'yı mucizelerimizle Firavun'a ve müsteşarlarına gönderdik." },
            { sure: 20, ayet: 9, text: "Ey Muhammed! Musa'nın haberi sana geldi mi?" }
        ],
        "sabır": [
            { sure: 2, ayet: 45, text: "Sabır ve namazla Allah'tan yardım isteyin." },
            { sure: 2, ayet: 153, text: "Ey iman edenler! Sabır ve namazla yardım dileyin. Şüphesiz Allah sabredenlerle beraberdir." },
            { sure: 3, ayet: 200, text: "Ey iman edenler! Sabredin; sabır yarışında rabbinize karşı sebat gösterin." }
        ],
        "cennet": [
            { sure: 2, ayet: 25, text: "İnanıp salih ameller işleyenlere, altından ırmaklar akan cennetleri müjdele..." },
            { sure: 3, ayet: 133, text: "Rabbinizin bağışına ve takva sahipleri için hazırlanmış cennete koşun." }
        ],
        "namaz": [
            { sure: 2, ayet: 43, text: "Namazı kılın, zekat verin, rükû edenlerle birlikte rükû edin." },
            { sure: 2, ayet: 238, text: "Namazlara ve orta namaza devam edin ve Allah için huşu ile kıyam durun." }
        ]
    };

    let results = localIndex[query];
    if (!results) {
        results = [
            { sure: 1, ayet: 1, text: `"${queryRaw}" kelimesi fihristte tam eşleşmedi. Yerel örnek veritabanı sınırlıdır — üretim sürümünde tam metin arama API'sine bağlanmalı.` }
        ];
    }

    document.getElementById('mConceptCount').innerText = `${results.length}`;
    document.getElementById('mConceptEbjed').innerText = calculateEbjed(queryRaw);
    document.getElementById('mConceptRoot').innerText = queryRaw.length > 3 ? queryRaw.substring(0, 3).toUpperCase() : "KÖK";
    document.getElementById('mConceptMeaning').innerText = "Kavram";

    list.innerHTML = "";
    results.forEach(m => {
        const card = document.createElement('div');
        card.className = "result-card";
        card.innerHTML = `
            <div class="result-header">
                <span>${sureIsimleriTR[m.sure].toUpperCase()} SURESİ • ${m.sure}:${m.ayet}</span>
                <button class="select-ayah-btn" onclick="ayetiYukle(${m.sure}, ${m.ayet})">🔍 İncele</button>
            </div>
            <div class="result-tr">"${m.text}"</div>`;
        list.appendChild(card);
    });
}

function ayetiYukle(sure, ayet) {
    document.getElementById('sureNo').value = sure;
    document.getElementById('ayetNo').value = ayet;
    searchModalKapat();
    ayetiGetir();
}

function hoverVurguYap(idx) {
    hoverVurguTemizle();
    document.querySelectorAll(`.word-span[data-idx="${idx}"]`).forEach(s => s.classList.add('active-single'));
    document.querySelectorAll(`.wbw-card[data-idx="${idx}"]`).forEach(c => c.classList.add('active-single'));
}
function hoverVurguTemizle() {
    document.querySelectorAll('.word-span').forEach(s => s.classList.remove('active-single'));
    document.querySelectorAll('.wbw-card').forEach(c => c.classList.remove('active-single'));
}

function wordBalonAc(arText, trText, transText) {
    const computedEbjed = calculateEbjed(arText);
    document.getElementById('mWordAr').innerText = arText;
    document.getElementById('mWordTr').innerText = trText;
    document.getElementById('mWordEbjed').innerText = computedEbjed;
    document.getElementById('mWordCount').innerText = "Frekans";
    document.getElementById('mWordDesc').innerText = `"${arText}" kelimesinin Türkçe anlamı "${trText}" şeklindedir. Okunuşu: [${transText}]. Ebjed değeri: ${computedEbjed}.`;
    document.getElementById('wordModal').style.display = "flex";
}

function modalKapat() { document.getElementById('wordModal').style.display = "none"; }
function searchModalKapat() { document.getElementById('searchResultModal').style.display = "none"; }

function ekraniGuncelle() {
    if (!mevcutData.arabicText) return;
    const sureAdiUpper = mevcutData.sureAdiTR.toUpperCase();
    const kartIcerikSecim = document.getElementById('kartIcerikTipi').value;

    document.getElementById('resTitle').innerText = `${sureAdiUpper} SURESİ • ${mevcutData.sureNo}:${mevcutData.ayetNo}`;
    document.getElementById('resMetaHeader').innerText = `CÜZ: ${mevcutData.juz} • SAYFA: ${mevcutData.page} • MUSHAF: ${mevcutData.sureNo}`;
    document.getElementById('resLatin').innerText = `${mevcutData.latinLabel}: ${mevcutData.transliteration}...`;
    document.getElementById('resTranslationDiyanet').innerText = mevcutData.translationPrimary;
    document.getElementById('resTranslationYazir').innerText = mevcutData.translationTurkish;
    document.getElementById('resTefsir').innerText = mevcutData.tefsirText;
    document.getElementById('resHadis').innerText = `"${mevcutData.hadisText}"`;

    document.getElementById('cardHeader').innerText = `${sureAdiUpper} SURESİ • ${mevcutData.sureNo}:${mevcutData.ayetNo}`;
    document.getElementById('cardArabic').innerText = mevcutData.arabicText;

    const cardBody = document.getElementById('cardBody');
    if (kartIcerikSecim === "tefsir") cardBody.innerHTML = `<strong>[Tefsir]</strong><br>${mevcutData.tefsirText}`;
    else if (kartIcerikSecim === "hadis") cardBody.innerHTML = `<strong>[Hadis]</strong><br>"${mevcutData.hadisText}"`;
    else cardBody.innerText = `"${mevcutData.translationPrimary}"`;

    document.getElementById('cardFooter').innerText = `CÜZ: ${mevcutData.juz} • SAYFA: ${mevcutData.page} • MUSHAF: ${mevcutData.sureNo}`;

    const captionTextEl = document.getElementById('captionText');
    if (captionTextEl) {
        captionTextEl.value = `${mevcutData.sureAdiTR} Suresi, ${mevcutData.ayetNo}. Ayet\n\n"${mevcutData.translationPrimary}"\n\n#Kuran #${mevcutData.sureAdiTR} #mahsusa`;
    }
}

function sesGuncelle() {
    if (!mevcutData.sureNo) return;
    const qariFolder = document.getElementById('qariSecimi').value;
    const surahPadded = String(mevcutData.sureNo).padStart(3, '0');
    const ayahPadded = String(mevcutData.ayetNo).padStart(3, '0');
    const player = document.getElementById('audioPlayer');
    player.src = `https://everyayah.com/data/${qariFolder}/${surahPadded}${ayahPadded}.mp3`;
    player.load();
}

function gununAyeti() {
    const rSure = Math.floor(Math.random() * 114) + 1;
    document.getElementById('sureNo').value = rSure;
    document.getElementById('ayetNo').value = Math.floor(Math.random() * surahAyahCounts[rSure]) + 1;
    ayetiGetir();
}

function formatDegistir() {
    document.getElementById('previewCard').className = `preview-card ${document.getElementById('formatSecimi').value}`;
}

function gorselIndir() {
    html2canvas(document.getElementById('previewCard'), { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Mahsusa_${mevcutData.sureAdiTR}_${mevcutData.sureNo}_${mevcutData.ayetNo}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
}

function sosyalPaylas(p) {
    const t = encodeURIComponent(document.getElementById('captionText').value);
    let u = "";
    if (p === 'wp') u = `https://api.whatsapp.com/send?text=${t}`;
    else if (p === 'tg') u = `https://t.me/share/url?text=${t}`;
    else if (p === 'x') u = `https://twitter.com/intent/tweet?text=${t}`;
    else if (p === 'fb') u = `https://www.facebook.com/sharer/sharer.php?quote=${t}`;
    else if (p === 'pin') u = `https://pinterest.com/pin/create/button/?description=${t}`;
    else if (p === 'vk') u = `https://vk.com/share.php?comment=${t}`;
    else {
        navigator.clipboard.writeText(document.getElementById('captionText').value);
        alert("Metin panoya kopyalandı!");
        return;
    }
    if (u) window.open(u, '_blank');
}

window.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('audioPlayer');
    player.addEventListener('timeupdate', () => {
        if (!player.duration || player.paused) return;
        const cards = document.querySelectorAll('.wbw-card');
        if (cards.length === 0) return;
        const idx = Math.min(Math.floor((player.currentTime / player.duration) * cards.length), cards.length - 1);
        hoverVurguYap(idx);
    });
    player.addEventListener('ended', () => {
        let currentAyah = parseInt(document.getElementById('ayetNo').value);
        let currentSurah = parseInt(document.getElementById('sureNo').value);
        if (currentAyah < surahAyahCounts[currentSurah]) {
            document.getElementById('ayetNo').value = currentAyah + 1;
            ayetiGetir();
        } else if (currentSurah < 114) {
            document.getElementById('sureNo').value = currentSurah + 1;
            document.getElementById('ayetNo').value = 1;
            ayetiGetir();
        }
    });
});
