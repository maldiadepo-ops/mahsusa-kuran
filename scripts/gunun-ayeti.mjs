// Mahsusa Kur'an — Günün Ayeti robotu
// GitHub Actions tarafından her gün otomatik çalıştırılır.

import { writeFile } from "fs/promises";

const ISTANBUL_TIME_ZONE = "Europe/Istanbul";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const surahAyahCounts = [
  0, 7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 111, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
];

const sureIsimleriTR = [
  "", "Fâtiha", "Bakara", "Âl-i İmrân", "Nisâ", "Mâide", "En'âm", "A'râf", "Enfâl", "Tevbe", "Yûnus", "Hûd", "Yûsuf", "Ra'd", "İbrâhîm", "Hicr", "Nahl", "İsrâ", "Kehf", "Meryem", "Tâhâ", "Enbiyâ", "Hac", "Mü'minûn", "Nûr", "Furkân", "Şuarâ", "Neml", "Kasas", "Ankebût", "Rûm", "Lokmân", "Secde", "Ahzâb", "Sebe'", "Fâtır", "Yâsîn", "Sâffât", "Sâd", "Zümer", "Mü'min", "Fussilet", "Şûrâ", "Zuhruf", "Duhân", "Câsiye", "Ahkâf", "Muhammed", "Fetih", "Hucurât", "Kâf", "Zâriyât", "Tûr", "Necm", "Kamer", "Rahmân", "Vâkı'a", "Hadîd", "Mücâdele", "Haşr", "Mümtehine", "Saf", "Cuma", "Münâfikûn", "Tegâbün", "Talâk", "Tahrîm", "Mülk", "Kalem", "Hakka", "Meâric", "Nûh", "Cin", "Müzzemmil", "Müddessir", "Kıyâmet", "İnsân", "Mürselât", "Nebe'", "Nâzi'ât", "Abese", "Tekvîr", "İnfitâr", "Mutaffifîn", "Inşikâk", "Bürûc", "Târık", "A'lâ", "Gâşiye", "Fecr", "Beled", "Şems", "Leyl", "Duhâ", "İnşirâh", "Tîn", "Alak", "Kadr", "Beyyine", "Zilzâl", "Âdiyât", "Kâri'a", "Tekâsür", "Asr", "Hümeze", "Fîl", "Kureyş", "Mâ'ûn", "Kevser", "Kâfirûn", "Nasr", "Tebbet", "İhlâs", "Felak", "Nâs"
];

function istanbulTarihParcalari(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: ISTANBUL_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(now);
  const part = type => parts.find(item => item.type === type)?.value;
  const year = Number(part("year"));
  const month = Number(part("month"));
  const day = Number(part("day"));

  if (![year, month, day].every(Number.isInteger)) {
    throw new Error("İstanbul tarihi hesaplanamadı.");
  }

  return {
    year,
    month,
    day,
    tarih: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  };
}

function yilinGunu({ year, month, day }) {
  return Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / ONE_DAY_MS);
}

async function ayetMetniniAl(url, alanAdi) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error(`${alanAdi} isteği başarısız oldu: HTTP ${response.status}`);
  }

  const payload = await response.json();
  const text = payload?.data?.text;
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error(`${alanAdi} yanıtında ayet metni bulunamadı.`);
  }

  return text.trim();
}

async function main() {
  const tarihParcalari = istanbulTarihParcalari();
  const gunSayisi = yilinGunu(tarihParcalari);
  const sureNo = (gunSayisi % 114) + 1;
  const ayetNo = (gunSayisi % surahAyahCounts[sureNo]) + 1;

  const [arapca, meal] = await Promise.all([
    ayetMetniniAl(`https://api.alquran.cloud/v1/ayah/${sureNo}:${ayetNo}/quran-uthmani`, "Arapça ayet"),
    ayetMetniniAl(`https://api.alquran.cloud/v1/ayah/${sureNo}:${ayetNo}/tr.diyanet`, "Türkçe meal")
  ]);

  const data = {
    tarih: tarihParcalari.tarih,
    sure_no: sureNo,
    ayet_no: ayetNo,
    sure_adi: sureIsimleriTR[sureNo],
    arapca,
    meal
  };

  await writeFile(
    new URL("../data/gunun-ayeti.json", import.meta.url),
    `${JSON.stringify(data, null, 2)}\n`,
    "utf8"
  );
  console.log("Günün ayeti güncellendi:", data.tarih, data.sure_adi, sureNo, ":", ayetNo);
}

main().catch(error => {
  console.error("Günün ayeti güncellenemedi:", error);
  process.exit(1);
});
