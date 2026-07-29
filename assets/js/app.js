/* --- MAHSUSA KURAN v54 - KUSURSUZ DİNAMİK MOTOR --- */

let appDatabase = {};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('assets/data/db.json');
        appDatabase = await response.json();
        console.log("Merkezi veritabanı başarıyla yüklendi:", appDatabase);
        
        // Veriler gelir gelmez tüm modül alanlarını doldur
        renderAllModules();
    } catch (error) {
        console.error("Veritabanı yüklenirken hata oluştu:", error);
    }

    // Telif ve Kopyalama Koruması (#mahsusakuran)
    document.addEventListener("copy", (event) => {
        const selection = window.getSelection();
        const brandedText = selection.toString() + "\n\n[Kaynak: mahsusakuran.com #mahsusakuran]";
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", brandedText);
        }
        event.preventDefault();
    });
});

// Modüller arası sekme geçiş fonksiyonu
function switchModule(modulID) {
    document.querySelectorAll('.module-view').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('modul-' + modulID);
    if (target) {
        target.classList.add('active');
    }
}

// Tüm dinamik içerikleri veritabanından çekip HTML elemanlarına basan fonksiyon
function renderAllModules() {
    if (!appDatabase.modules) return;
    const m = appDatabase.modules;

    // 1. Peygamberler Kıssaları
    const kContainer = document.getElementById('dynamic-kissalar');
    if (kContainer && m.kissalar) {
        kContainer.innerHTML = m.kissalar.map(item => `
            <div style="background:#0b132b; padding:15px; border-radius:6px; margin-bottom:12px; border:1px solid #2b3b5e;">
                <h4 style="color:#4cc9f0; margin-bottom:5px;">${item.title}</h4>
                <p style="font-size:0.85rem; color:#8d99ae; margin-bottom:8px;">Kaynak: ${item.source}</p>
                <p style="font-size:0.95rem; line-height:1.6;">${item.content}</p>
            </div>
        `).join('');
    }

    // 2. İslam Ansiklopedisi
    const aContainer = document.getElementById('dynamic-ansiklopedi');
    if (aContainer && m.ansiklopedi) {
        aContainer.innerHTML = m.ansiklopedi.map(item => `
            <div style="background:#0b132b; padding:15px; border-radius:6px; margin-bottom:12px; border:1px solid #2b3b5e;">
                <h4 style="color:#4cc9f0; margin-bottom:5px;">${item.title} (${item.location})</h4>
                <p style="font-size:0.85rem; color:#8d99ae; margin-bottom:8px;">Kaynak: ${item.source}</p>
                <p style="font-size:0.95rem; line-height:1.6;">${item.detail}</p>
            </div>
        `).join('');
    }

    // 3. Esmalar, Zikirler
    const eContainer = document.getElementById('dynamic-esmalar');
    if (eContainer && m.esmalar) {
        eContainer.innerHTML = m.esmalar.map(item => `
            <div style="background:#0b132b; padding:20px; border-radius:6px; margin-bottom:12px; border:1px solid #2b3b5e; text-align:center;">
                <h3 style="color:#4cc9f0; font-size:1.6rem; margin-bottom:8px;">${item.name}</h3>
                <p style="font-size:1.1rem; font-weight:bold; margin-bottom:8px;">${item.meaning}</p>
                <p style="color:#8d99ae; font-size:0.9rem;">Fazilet: ${item.fazilet}</p>
            </div>
        `).join('');
    }

    // 4. Kur'an'da Burçlar
    const bContainer = document.getElementById('dynamic-burclar');
    if (bContainer && m.burclar) {
        bContainer.innerHTML = m.burclar.map(item => `
            <div style="background:#0b132b; padding:15px; border-radius:6px; margin-bottom:12px; border:1px solid #2b3b5e;">
                <h4 style="color:#4cc9f0; margin-bottom:5px;">${item.sure} - ${item.ayet}</h4>
                <p style="font-size:0.95rem; line-height:1.6;">${item.aciklama}</p>
            </div>
        `).join('');
    }
}