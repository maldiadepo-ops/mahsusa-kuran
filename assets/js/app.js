document.addEventListener("DOMContentLoaded", async () => {
    console.log("Mahsusa Kuran v54 Başlatıldı: mahsusakuran.com");

    let appData = {};

    try {
        const response = await fetch('assets/data/db.json');
        appData = await response.json();
        console.log("Merkezi veri tabanı (db.json) başarıyla yüklendi.");
    } catch (error) {
        console.warn("Veri tabanı yüklenemedi, çevrimdışı yedek mod aktif.", error);
    }

    // Kopyalama Koruması ve İmza Ekleme
    document.addEventListener("copy", (event) => {
        const selection = window.getSelection();
        const brandedText = selection.toString() + "\n\n[Kaynak: mahsusakuran.com #mahsusakuran]";
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", brandedText);
        }
        event.preventDefault();
    });
});

function switchModule(modulID) {
    document.querySelectorAll('.module-view').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('modul-' + modulID);
    if (target) target.classList.add('active');
}