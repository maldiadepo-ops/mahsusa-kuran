// Mahsusa Kur'an — Günün Ayeti robotu
// Bu script GitHub Actions tarafından her gün otomatik çalıştırılır.
// Ne yapar: bugünün tarihine göre sabit (deterministik) bir sure/ayet seçer,
// metnini alquran.cloud API'sinden çeker ve data/gunun-ayeti.json dosyasına yazar.
// Böylece o gün siteyi ziyaret eden HERKES aynı ayeti görür, ertesi gün değişir.

import { writeFile } from "fs/promises";

const surahAyahCounts = [
  0, 7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 111, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
];
const sureIsimleriTR = [
  "", "Fâtiha", "Bakara", "Âl-i İmrân", "Nisâ", "Mâide", "En'âm", "A'râf", "Enfâl", "Tevbe", "Yûnus", "Hûd", "Yûsuf", "Ra'd", "İbrâhîm", "Hicr", "Nahl", "İsrâ", "Kehf", "Meryem", "Tâhâ", "Enbiyâ", "Hac", "Mü'minûn", "Nûr", "Furkân", "Şuarâ", "Neml", "Kasas", "Ankebût", "Rûm", "Lokmân", "Secde", "Ahzâb", "Sebe'", "Fâtır", "Yâsîn", "Sâffât", "Sâd", "Zümer", "Mü'min", "Fussilet", "Şûrâ", "Zuhruf", "Duhân", "Câsiye", "Ahkâf", "Muhammed", "Fetih", "Hucurât", "Kâf", "Zâriyât", "Tûr", "Necm", "Kamer", "Rahmân", "Vâkı'a", "Hadîd", "Mücâdele", "Haşr", "Mümtehine", "Saf", "Cuma", "Münâfikûn", "Tegâbün", "Talâk", "Tahrîm", "Mülk", "Kalem", "Hakka", "Meâric", "Nûh", "Cin", "Müzzemmil", "Müddessir", "Kıyâmet", "İnsân", "Mürselât", "Nebe'", "Nâzi'ât", "Abese", "Tekvîr", "İnfitâr", "Mutaffifîn", "Inşikâk", "Bürûc", "Târık", "A'lâ", "Gâşiye", "Fecr", "Beled", "Şems", "Leyl", "Duhâ", "İnşirâh", "Tîn", "Alak", "Kadr", "Beyyine", "Zilzâl", "Âdiyât", "Kâri'a", "Tekâsür", "Asr", "Hümeze", "Fîl", "Kureyş", "Mâ'ûn", "Kevser", "Kâfirûn", "Nasr", "Tebbet", "İhlâs", "Felak", "Nâs"
];

function bugununGunSayisi() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24)); // yılın kaçıncı günü
}

async function main() {
  const gunSayisi = bugununGunSayisi();
  const sureNo = (gunSayisi % 114) + 1;
  const ayetNo = (gunSayisi % surahAyahCounts[sureNo]) + 1;

  const [arRes, mealRes] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/ayah/${sureNo}:${ayetNo}/quran-uthmani`),
    fetch(`https://api.alquran.cloud/v1/ayah/${sureNo}:${ayetNo}/tr.diyanet`)
  ]);
  const arJson = await arRes.json();
  const mealJson = await mealRes.json();

  const data = {
    tarih: new Date().toISOString().slice(0, 10),
    sure_no: sureNo,
    ayet_no: ayetNo,
    sure_adi: sureIsimleriTR[sureNo],
    arapca: arJson.data ? arJson.data.text : "",
    meal: mealJson.data ? mealJson.data.text : ""
  };

  await writeFile(new URL("../data/gunun-ayeti.json", import.meta.url), JSON.stringify(data, null, 2));
  console.log("Günün ayeti güncellendi:", data.sure_adi, sureNo, ":", ayetNo);
}

main().catch(err => {
  console.error("Günün ayeti güncellenemedi:", err);
  process.exit(1);
});
