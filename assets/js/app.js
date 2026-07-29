/* --- app.js dosyasının en altı veya uygun bir yeri --- */

// İnteraktif Zikirmatik Sayacı
let zikirSayaci = 0;
let hedefZikir = 100;

function esmaSec(name, hedef) {
    zikirSayaci = 0;
    hedefZikir = hedef || 100;
    const display = document.getElementById('aktif-zikir-adi');
    const countDisplay = document.getElementById('zikir-sayisi');
    if (display) display.innerText = name;
    if (countDisplay) countDisplay.innerText = zikirSayaci + " / " + hedefZikir;
}

function zikirArttir() {
    zikirSayaci++;
    const countDisplay = document.getElementById('zikir-sayisi');
    if (countDisplay) {
        countDisplay.innerText = zikirSayaci + " / " + hedefZikir;
        if (zikirSayaci >= hedefZikir) {
            countDisplay.style.color = "#4cc9f0";
        }
    }
}