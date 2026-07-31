// =================================================================
// MAHSUSA KUR'AN - MERKEZİ VERİ DEPOSU (data.js)
// =================================================================

// 1. 114 SURE LİSTESİ (TAM SERİ)
const SURE_LISTESI = [
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

// 2. AYET VERİ DEPOSU
const AYET_VERI_TABANI = [
  { 
    id: 1, 
    sureNo: 1, 
    sureAdi: 'Fatiha', 
    ayetNo: 1, 
    cüz: 1, 
    sayfa: 1, 
    latin: 'Bismillahir rahmanir rahim.', 
    meal: 'Rahman ve Rahim olan Allah\'ın adıyla.', 
    arapca: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 
    tefsir: 'Besmele, her hayırlı işin başlangıcıdır. Allah\'ın merhametini simgeler.' 
  },
  { 
    id: 2, 
    sureNo: 1, 
    sureAdi: 'Fatiha', 
    ayetNo: 2, 
    cüz: 1, 
    sayfa: 1, 
    latin: 'Elhamdu lillahi rabbil alemin.', 
    meal: 'Övgü, alemlerin Rabbi olan Allah\'adır.', 
    arapca: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', 
    tefsir: 'Alemlerin Rabbi olan Allah\'a hamd etmek kulluğun gereğidir.' 
  },
  { 
    id: 3, 
    sureNo: 2, 
    sureAdi: 'Bakara', 
    ayetNo: 51, 
    cüz: 1, 
    sayfa: 8, 
    latin: 'Ve iz vaadna musa erbaine leyleten summettehaztumul icle min ba\'dihi ve entum zalimun.', 
    meal: 'Musa\'yla kırk gece için sözleşmiştik. Ancak siz onun ardından kendinize zulmederek buzağıya hizmet ettiniz.', 
    arapca: 'وَإِذْ وَاعَدْنَا مُوسَىٰ أَرْبَعِينَ لَيْلَةً ثُمَّ اتَّخَذْتُمُ الْعِجْلَ مِن بَعْدِهِ وَأَنتُمْ ظَالِمُونَ', 
    tefsir: 'İsrailoğulları\'nın Hz. Musa Tur Dağı\'ndayken düştüğü hatayı anlatır.' 
  },
  { 
    id: 4, 
    sureNo: 4, 
    sureAdi: 'Nisa', 
    ayetNo: 1, 
    cüz: 4, 
    sayfa: 77, 
    latin: 'Ya eyyuhan nasutteku rabbekumullezı halakakum min nefsin vahidetin...', 
    meal: 'Ey insanlar! Sizi tek bir nefisten yaratan Rabbinize karşı takvalı olun.', 
    arapca: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ', 
    tefsir: 'İnsanlığın birliği ve akrabalık hakları vurgulanmaktadır.' 
  },
  { 
    id: 5, 
    sureNo: 5, 
    sureAdi: 'Maide', 
    ayetNo: 34, 
    cüz: 6, 
    sayfa: 113, 
    latin: 'Illellezıne tabu min kabli en takdiru aleyhim...', 
    meal: 'Ancak onlar üzerinde bir karara varmanızdan önce tevbe edenler hariç. İyi bilin ki Allah, Çok Bağışlayıcı’dır.', 
    arapca: 'إِلَّا الَّذِينَ تَابُوا مِن قَبْلِ أَن تَقْدِرُوا عَلَيْهِمْ', 
    tefsir: 'Tevbe kapısının samimi kullara her zaman açık olduğu bildirilir.' 
  }
];

// 3. KÖK FİHRİSTİ VERİSİ
const KOK_VERI_TABANI = [
  { kok: 'R-H-M', tanim: 'Merhamet etmek, şefkat göstermek.', ayetler: [1, 2, 5] },
  { kok: 'S-B-R', tanim: 'Direnç göstermek, sabretmek.', ayetler: [3] },
  { kok: 'H-L-K', tanim: 'Yaratmak, yoktan var etmek.', ayetler: [4] }
];