// =================================================================
// MAHSUSA KUR'AN - ASENKRON VERİ MOTORU (data-loader.js)
// =================================================================

let SURE_LISTESI = [];
let KOK_VERI_TABANI = [];
let KONU_LISTESI = [];

function verileriYukleVeSenkronizeEt() {
  // 114 SURENİN TAM LİSTESİ
  SURE_LISTESI = [
    "Fatiha", "Bakara", "Ali İmran", "Nisa", "Maide", "En'am", "A'raf", "Enfal", "Tevbe", "Yunus",
    "Hud", "Yusuf", "Ra'd", "İbrahim", "Hicr", "Nahl", "İsra", "Kehf", "Meryem", "Taha",
    "Enbiya", "Hac", "Mü'minun", "Nur", "Furkan", "Şuara", "Neml", "Kasas", "Ankebut", "Rum",
    "Lokman", "Secde", "Ahzab", "Sebe'", "Fatır", "Yasin", "Saffat", "Sad", "Zümer", "Mü'min",
    "Fussilet", "Şura", "Zuhruf", "Duhan", "Casiye", "Ahkaf", "Muhammed", "Fetih", "Hucurat", "Kaf",
    "Zariyat", "Tur", "Necm", "Kamer", "Rahman", "Vakıa", "Hadid", "Mücadele", "Haşr", "Mümtehine",
    "Saf", "Cuma", "Münafikun", "Teğabun", "Talak", "Tahrim", "Mülk", "Kalem", "Hakka", "Mearic",
    "Nuh", "Cin", "Müzzemmil", "Müddessir", "Kıyamet", "İnsan", "Mürselat", "Nebe'", "Naziat", "Abese",
    "Tekvir", "İnfitar", "Mutaffifin", "İnşikak", "Büruc", "Tarık", "A'la", "Gaşiye", "Fecr", "Beled",
    "Şems", "Leyl", "Duha", "İnşirah", "Tin", "Alak", "Kadir", "Beyyine", "Zilzal", "Adiyat",
    "Karia", "Tekasür", "Asr", "Hümeze", "Fil", "Kureyş", "Maun", "Kevser", "Kafirun", "Nasr",
    "Tebbet", "İhlas", "Felak", "Nas"
  ];

  // acikkuran.com Birebir Kök Listesi
  KOK_VERI_TABANI = [
    { kok: 'R-H-M', tanim: 'Merhamet etmek, şefkat göstermek.', sureNo: 1 },
    { kok: 'S-B-R', tanim: 'Direnç göstermek, sabretmek.', sureNo: 2 },
    { kok: 'H-L-K', tanim: 'Yaratmak, yoktan var etmek.', sureNo: 4 }
  ];

  // acikkuran.com Birebir Konu Listesi (Görsel 75)
  KONU_LISTESI = [
    { baslik: 'İnanç ve Tevhid', sureNo: 1 },
    { baslik: 'Peygamber Kıssaları', sureNo: 2 },
    { baslik: 'Ahlak ve İbadet', sureNo: 4 },
    { baslik: 'Ahiret ve Kıyamet', sureNo: 89 }
  ];

  if (typeof sistemArayuzunuBaslat === 'function') {
    sistemArayuzunuBaslat();
  }
}

document.addEventListener('DOMContentLoaded', verileriYukleVeSenkronizeEt);