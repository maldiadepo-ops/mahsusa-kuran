import { readFile } from "fs/promises";

const fileUrl = new URL("../data/gunun-ayeti.json", import.meta.url);
const source = await readFile(fileUrl, "utf8");
const errors = [];

let data;
try {
  data = JSON.parse(source);
} catch (error) {
  console.error("data/gunun-ayeti.json geçerli JSON değil:", error.message);
  process.exit(1);
}

const requiredKeys = ["tarih", "sure_no", "ayet_no", "sure_adi", "arapca", "meal"];
const actualKeys = Object.keys(data);
if (actualKeys.join(",") !== requiredKeys.join(",")) {
  errors.push(`Alanlar beklenen sırada ve eksiksiz olmalı: ${requiredKeys.join(", ")}`);
}

if (typeof data.tarih !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.tarih)) {
  errors.push("tarih YYYY-AA-GG biçiminde olmalı.");
} else {
  const parsedDate = new Date(`${data.tarih}T00:00:00Z`);
  if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== data.tarih) {
    errors.push("tarih gerçek bir takvim tarihi olmalı.");
  }
}

if (!Number.isInteger(data.sure_no) || data.sure_no < 1 || data.sure_no > 114) {
  errors.push("sure_no 1 ile 114 arasında bir tam sayı olmalı.");
}

if (!Number.isInteger(data.ayet_no) || data.ayet_no < 1) {
  errors.push("ayet_no pozitif bir tam sayı olmalı.");
}

for (const field of ["sure_adi", "arapca", "meal"]) {
  if (typeof data[field] !== "string" || data[field].trim() === "") {
    errors.push(`${field} boş olmayan bir metin olmalı.`);
  }
}

const canonicalSource = `${JSON.stringify(data, null, 2)}\n`;
if (source !== canonicalSource) {
  errors.push("Dosya iki boşlukla biçimlendirilmeli ve tek satır sonuyla bitmeli.");
}

if (errors.length > 0) {
  console.error("Günün ayeti doğrulaması başarısız:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Günün ayeti verisi geçerli:", data.tarih, `${data.sure_no}:${data.ayet_no}`);
