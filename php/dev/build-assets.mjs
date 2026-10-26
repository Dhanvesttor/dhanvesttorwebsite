// Copies fonts and icons into php/public and makes small WebP versions of the brand images.
// Run from the repo root after `npm run build` (the fonts come from the Next.js build): npm run php:assets
import sharp from "sharp";
import { copyFileSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const OUT = "php/public";
mkdirSync(`${OUT}/assets/fonts`, { recursive: true });
mkdirSync(`${OUT}/brand`, { recursive: true });

// Fonts: map the hashed files in the Next build to readable names using the @font-face rules in its CSS.
const css = readdirSync(".next/static/chunks").filter((f) => f.endsWith(".css")).map((f) => readFileSync(`.next/static/chunks/${f}`, "utf8")).join("");
const faces = [...css.matchAll(/@font-face\{font-family:([^;]+);font-style:(\w+);[^}]*?src:url\(\.\.\/media\/([^)]+)\)[^}]*?unicode-range:([^;}]+)/g)];
for (const [, family, style, file, range] of faces) {
  const subset = range.startsWith("U+??") ? "latin" : range.startsWith("U+100-2BA") ? "latin-ext" : null;
  if (!subset) continue; // skip Cyrillic and Vietnamese; the site is English
  const name = `${family.includes("Fraunces") ? "fraunces" : "hanken"}${style === "italic" ? "-italic" : ""}-${subset}.woff2`;
  copyFileSync(`.next/static/media/${file}`, `${OUT}/assets/fonts/${name}`);
  console.log(`font  ${name}`);
}

// Brand images at 1x/2x/3x of their displayed width (see brand_img() in app/lib/layout.php).
const brand = { logo: [120, 240, 360], mark: [36, 72, 108], wordmark: [180, 360, 540] };
for (const [name, widths] of Object.entries(brand)) {
  for (const w of widths) {
    const out = `${OUT}/brand/${name}-${w}.webp`;
    await sharp(`public/brand/${name}.png`).resize({ width: w }).webp({ quality: 90, effort: 6 }).toFile(out);
    console.log(`image ${out}`);
  }
  copyFileSync(`public/brand/${name}.png`, `${OUT}/brand/${name}.png`); // originals for structured data and press use
}
for (const f of ["og-default.png"]) copyFileSync(`public/${f}`, `${OUT}/${f}`);
for (const f of ["icon.png", "apple-icon.png"]) copyFileSync(`src/app/${f}`, `${OUT}/${f}`);
for (const f of ["icon.png", "apple-icon.png"]) {
  const m = await sharp(`${OUT}/${f}`).metadata();
  console.log(`icon  ${f} ${m.width}x${m.height}`);
}
console.log(path.resolve(OUT));
