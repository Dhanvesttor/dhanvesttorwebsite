// Checks the PHP calculators (app/lib/calc.php, used for the first render) show exactly what the
// JavaScript calculators (public/assets/js/calculators.js, used live) show, for thousands of inputs.
//   node php/tests/calc-parity.mjs   (needs PHP_BIN or php on PATH, like dev/serve.mjs)
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { compute } from "../public/assets/js/calculators.js";

const wingetPhp = path.join(process.env.LOCALAPPDATA ?? "", "Microsoft/WinGet/Packages/PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe/php.exe");
const php = process.env.PHP_BIN ?? (spawnSync("php", ["-v"]).status === 0 ? "php" : existsSync(wingetPhp) ? wingetPhp : "php");

let seed = 7;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
const pick = (min, max, step) => Math.round((min + rnd() * (max - min)) / step) * step;

// Same field ranges and steps as the sliders (calc_ui in app/lib/calculators.php).
const fields = {
  sip: { m: [500, 200000, 500], r: [1, 20, 0.5], y: [1, 40, 1] },
  "step-up-sip": { m: [500, 200000, 500], s: [0, 30, 1], r: [1, 20, 0.5], y: [1, 40, 1] },
  lumpsum: { a: [5000, 5e7, 5000], r: [1, 20, 0.5], y: [1, 40, 1] },
  swp: { c: [1e5, 1e8, 1e5], w: [1000, 1e6, 1000], r: [1, 15, 0.5], y: [1, 40, 1] },
  stp: { a: [1e5, 5e7, 5e4], t: [5000, 5e6, 5000], rs: [1, 10, 0.25], rt: [1, 20, 0.5], n: [1, 60, 1] },
  goal: { g: [5e4, 1e8, 5e4], y: [1, 40, 1], i: [0, 12, 0.5], r: [1, 20, 0.5], e: [0, 5e7, 1e4] },
  retirement: { age: [18, 70, 1], ra: [40, 75, 1], le: [70, 100, 1], exp: [1e4, 1e6, 5000], inf: [0, 12, 0.5], pre: [1, 18, 0.5], post: [1, 12, 0.5], ex: [0, 1e8, 5e4] },
  "child-education": { ca: [0, 17, 1], ga: [15, 25, 1], cost: [1e5, 3e7, 5e4], inf: [0, 15, 0.5], r: [1, 18, 0.5], e: [0, 1e7, 1e4] },
  cagr: { s: [1000, 1e8, 1000], e: [1000, 1e8, 1000], y: [1, 40, 0.5] },
  inflation: { a: [1000, 5e7, 1000], r: [1, 15, 0.5], y: [1, 40, 1] },
  "pms-fee": { c: [5e6, 5e8, 5e5], g: [-20, 40, 1], y: [1, 15, 1] },
};

const cases = [];
for (const [slug, f] of Object.entries(fields)) {
  for (let k = 0; k < 300; k++) cases.push({ slug, v: Object.fromEntries(Object.entries(f).map(([key, [a, b, s]]) => [key, pick(a, b, s)])) });
}

const code = `define('PUBLIC_DIR', ''); require 'php/app/lib/calc.php';
$out = []; foreach (json_decode(stream_get_contents(STDIN), true) as $c) { $r = calc_results($c['slug'], $c['v']); unset($r['points'], $r['xPrefix']); $out[] = $r; }
echo json_encode($out, JSON_UNESCAPED_UNICODE);`;
const res = spawnSync(php, ["-r", code], { input: JSON.stringify(cases), maxBuffer: 1 << 26 });
if (res.status !== 0) { console.error(res.stderr.toString() || res.stdout.toString()); process.exit(1); }
const phpOut = JSON.parse(res.stdout.toString());

// PHP's and V8's pow() can differ in the last binary digit, so a value that lands exactly on half a rupee may
// round the other way (₹38,86,361 vs ₹38,86,362). Those ties are counted, not failed: the live script redraws on load.
const digits = (s) => s.replace(/[^\d.]/g, "");
const tie = (a, b) => a.length === b.length && [...a].every((ch, k) => ch === b[k] || /\d/.test(ch)) && Math.abs(Number(digits(a)) - Number(digits(b))) <= (digits(a).includes(".") ? 0.011 : 1);
let bad = 0, ties = 0;
cases.forEach(({ slug, v }, i) => {
  const js = compute[slug](v);
  const want = { headline: js.headline, rows: js.rows, ...(js.labels ? { labels: js.labels } : {}) };
  const got = phpOut[i];
  if (JSON.stringify(want) === JSON.stringify(got)) return;
  const pairs = [[want.headline, got.headline], ...Object.keys(want.rows).map((k) => [want.rows[k], got.rows?.[k] ?? ""])];
  if (JSON.stringify(want.labels) === JSON.stringify(got.labels) && pairs.every(([a, b]) => a === b || tie(a, b))) { ties++; return; }
  if (bad++ < 10) console.log(`✗ ${slug} ${JSON.stringify(v)}\n   js:  ${JSON.stringify(want)}\n   php: ${JSON.stringify(got)}`);
});
console.log(bad ? `${bad} of ${cases.length} cases differ` : `All ${cases.length} cases match (${ties} half-rupee rounding ties)`);
process.exit(bad ? 1 : 0);
