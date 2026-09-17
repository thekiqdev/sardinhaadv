import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("src/assets");
const out = path.join(root, "optimized");
fs.mkdirSync(out, { recursive: true });

async function writeWebp(input, width, filename, quality) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(path.join(out, filename));
}

async function writeJpeg(input, width, filename, quality) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(path.join(out, filename));
}

const hero = path.join(root, "hero-trabalhador.jpg");
for (const w of [640, 960, 1280, 1920]) {
  await writeWebp(hero, w, `hero-trabalhador-${w}.webp`, 74);
}
await writeJpeg(hero, 1280, "hero-trabalhador-fallback.jpg", 76);

const cards = [
  "servico-acidente",
  "servico-doencas-ocupacionais",
  "servico-insalubridade",
  "servico-horas-extras",
  "servico-rescisao",
  "servico-justa-causa",
  "servico-carteira",
  "servico-assedio",
  "servico-comissoes",
];
for (const name of cards) {
  const input = path.join(root, `${name}.jpg`);
  await writeWebp(input, 400, `${name}-400.webp`, 70);
  await writeWebp(input, 800, `${name}-800.webp`, 70);
  await writeJpeg(input, 800, `${name}-fallback.jpg`, 74);
}

const portrait = path.join(root, "escolhida.jpg");
await writeWebp(portrait, 400, "escolhida-400.webp", 76);
await writeWebp(portrait, 800, "escolhida-800.webp", 76);
await writeJpeg(portrait, 800, "escolhida-fallback.jpg", 78);

const drivers = path.join(root, "motoristas.jpg");
await writeWebp(drivers, 800, "motoristas-800.webp", 62);
await writeJpeg(drivers, 800, "motoristas-fallback.jpg", 68);

const logo = path.join(root, "logo-sardinha.png");
const logoMeta = await sharp(logo).metadata();
const logoH = 200;
const logoW = Math.round(((logoMeta.width ?? 1) / (logoMeta.height ?? 1)) * logoH);
await sharp(logo)
  .resize({ height: logoH, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(out, "logo-sardinha.png"));
await sharp(logo)
  .resize({ height: logoH, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(path.join(out, "logo-sardinha.webp"));
fs.writeFileSync(
  path.join(out, "logo-size.json"),
  JSON.stringify({ width: logoW, height: logoH }, null, 2),
);

const faviconSrc = path.resolve("public/favicon.png");
if (fs.existsSync(faviconSrc)) {
  await sharp(faviconSrc)
    .resize(32, 32, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(path.resolve("public/favicon-32.png"));
}

const files = fs.readdirSync(out);
for (const f of files) {
  const st = fs.statSync(path.join(out, f));
  console.log(`${f}\t${Math.round(st.size / 1024)} KB`);
}
console.log("logo css px", logoW, "x", logoH);
