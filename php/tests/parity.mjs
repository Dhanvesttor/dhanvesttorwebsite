// Compares every page of the PHP site with the Next.js site, and checks every internal link on the PHP site.
//   node php/tests/parity.mjs [nextBase] [phpBase]   (defaults: http://localhost:3100 http://localhost:8080)
// Exit code 1 if anything differs.
const NEXT = process.argv[2] ?? "http://localhost:3100";
const PHP = process.argv[3] ?? "http://localhost:8080";

const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
/** Removes elements carrying the `hidden` attribute (closed tabs, error messages), respecting nesting. */
function dropHidden(html) {
  const open = /<(\w+)\b[^>]*?\shidden(?:=""|(?=[\s>/]))[^>]*>/gi;
  let m;
  while ((m = open.exec(html))) {
    const tag = m[1].toLowerCase();
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi");
    re.lastIndex = m.index + m[0].length;
    let depth = 1, end = -1, t;
    while ((t = re.exec(html))) { depth += t[1] ? -1 : 1; if (!depth) { end = re.lastIndex; break; } }
    if (end < 0) break;
    html = html.slice(0, m.index) + html.slice(end);
    open.lastIndex = m.index;
  }
  return html;
}
// React separates adjacent text with <!-- --> markers; drop them so "a<!-- -->, b" reads "a, b" like plain HTML.
const text = (html) => decode(dropHidden(html.replace(/<!--[\s\S]*?-->/g, "")).replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<noscript[\s\S]*?<\/noscript>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const first = (html, re) => { const m = html.match(re); return m ? decode(m[1]).replace(/\s+/g, " ").trim() : null; };

function facts(html) {
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/i)?.[1] ?? "";
  return {
    title: first(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: first(html, /<meta name="description" content="([^"]*)"/i),
    canonical: first(html, /<link rel="canonical" href="([^"]*)"/i),
    h1: (() => { const m = html.replace(/<!--[\s\S]*?-->/g, "").match(/<h1[^>]*>([\s\S]*?)<\/h1>/i); return m ? text(m[1]) : null; })(),
    words: text(main).split(" "),
  };
}

/** Share of words in `a` that appear, in order, in `b` (longest common subsequence / length). */
function similarity(a, b) {
  if (!a.length && !b.length) return 1;
  let prev = new Uint16Array(b.length + 1), cur = new Uint16Array(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
    [prev, cur] = [cur, prev];
  }
  return prev[b.length] / Math.max(a.length, b.length);
}

async function get(base, path) {
  const res = await fetch(base + path, { redirect: "manual" });
  return { status: res.status, html: res.status === 200 || res.status === 404 ? await res.text() : "", location: res.headers.get("location") };
}

const sitemap = await (await fetch(`${NEXT}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>https:\/\/dhanvesttor\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
paths.push("/thank-you", "/thank-you?for=apply", "/insights/tag/markets", "/insights/tag/women-%26-money", "/no-such-page", "/insights/no-such-post", "/calculators/no-such-calc", "/about/team/nobody");

let problems = 0;
const report = (path, msg) => { problems++; console.log(`✗ ${path}  ${msg}`); };
const sims = [];
for (const path of paths) {
  const [n, p] = await Promise.all([get(NEXT, path), get(PHP, path)]);
  if (n.status !== p.status) { report(path, `status next=${n.status} php=${p.status}`); continue; }
  if (n.status !== 200) continue;
  const a = facts(n.html), b = facts(p.html);
  for (const k of ["title", "description", "canonical", "h1"]) if (a[k] !== b[k]) report(path, `${k}\n    next: ${a[k]}\n    php:  ${b[k]}`);
  const sim = similarity(a.words, b.words);
  sims.push([sim, path]);
  if (sim < 0.97) {
    let i = 0; while (i < a.words.length && a.words[i] === b.words[i]) i++;
    report(path, `body text ${(sim * 100).toFixed(1)}% similar; first difference near:\n    next: …${a.words.slice(Math.max(0, i - 4), i + 12).join(" ")}\n    php:  …${b.words.slice(Math.max(0, i - 4), i + 12).join(" ")}`);
  }
}
sims.sort((x, y) => x[0] - y[0]);
console.log(`\nCompared ${paths.length} URLs. Lowest body-text similarity: ${sims.slice(0, 5).map(([s, p]) => `${p} ${(s * 100).toFixed(1)}%`).join(", ")}`);

// Every internal link on every PHP page must work.
const links = new Set();
for (const path of paths) {
  const { html } = await get(PHP, path);
  for (const m of html.matchAll(/href="(\/[^"#]*)/g)) links.add(decode(m[1]));
}
let broken = 0;
for (const href of links) {
  const r = await get(PHP, href);
  if (r.status < 400) continue;
  const n = await get(NEXT, href);
  if (n.status >= 400) console.log(`! ${href}  missing on both sites (${r.status}); not a conversion issue`);
  else { broken++; report(href, `internal link returns ${r.status}`); }
}
console.log(`Checked ${links.size} internal links, ${broken} broken.`);
console.log(problems ? `\n${problems} problem(s)` : "\nNo differences.");
process.exit(problems ? 1 : 0);
