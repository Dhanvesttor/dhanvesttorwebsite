// Turns src/content/*.ts into PHP arrays in php/app/content/, so the PHP site shows exactly the same text.
// Run from the repo root: node php/dev/export-content.mjs
// While both sites exist, edit the TypeScript file and re-run this; once Next.js is retired, edit the PHP files directly.
import ts from "typescript";
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import path from "node:path";

const SRC = "src/content";
const OUT = "php/app/content";
mkdirSync(OUT, { recursive: true });

const str = (s) => `'${s.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
const isList = (v) => Array.isArray(v);

function toPhp(v, depth = 0) {
  const pad = "  ".repeat(depth + 1), end = "  ".repeat(depth);
  if (v === null || v === undefined) return "null";
  if (typeof v === "string") return str(v);
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : String(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  if (isList(v)) {
    if (!v.length) return "[]";
    const inline = v.every((x) => typeof x !== "object" || x === null) && JSON.stringify(v).length < 100;
    if (inline) return `[${v.map((x) => toPhp(x, depth + 1)).join(", ")}]`;
    return `[\n${v.map((x) => pad + toPhp(x, depth + 1)).join(",\n")},\n${end}]`;
  }
  const entries = Object.entries(v).filter(([, x]) => x !== undefined);
  if (!entries.length) return "[]";
  return `[\n${entries.map(([k, x]) => `${pad}${str(k)} => ${toPhp(x, depth + 1)}`).join(",\n")},\n${end}]`;
}

for (const file of readdirSync(SRC).filter((f) => f.endsWith(".ts"))) {
  const name = file.replace(/\.ts$/, "");
  const js = ts.transpileModule(readFileSync(path.join(SRC, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
  const data = Object.fromEntries(Object.entries(mod).filter(([, v]) => typeof v !== "function"));
  writeFileSync(
    path.join(OUT, `${name}.php`),
    `<?php\n// Generated from src/content/${file} by php/dev/export-content.mjs. Edit the source and re-run.\nreturn ${toPhp(data)};\n`,
  );
  console.log(`${file} -> ${OUT}/${name}.php (${Object.keys(data).join(", ")})`);
}
