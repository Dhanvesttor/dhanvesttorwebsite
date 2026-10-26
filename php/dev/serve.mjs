// Starts the PHP site locally: node php/dev/serve.mjs [port]  (default 8080)
// Uses PHP_BIN if set, otherwise `php` on PATH, otherwise the winget install location.
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const port = process.argv[2] ?? process.env.PORT ?? "8080";
const wingetPhp = path.join(process.env.LOCALAPPDATA ?? "", "Microsoft/WinGet/Packages/PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe/php.exe");
const php = process.env.PHP_BIN ?? (spawnSync("php", ["-v"]).status === 0 ? "php" : existsSync(wingetPhp) ? wingetPhp : "php");
const extDir = php === "php"
  ? spawnSync("php", ["-r", "echo PHP_EXTENSION_DIR;"]).stdout?.toString()
  : path.join(path.dirname(php), "ext");

const root = path.resolve(import.meta.dirname, "..");
const args = ["-c", path.join(root, "dev/php.ini"), "-d", `extension_dir=${extDir}`, "-S", `localhost:${port}`, "-t", path.join(root, "public"), path.join(root, "dev/router.php")];
console.log(`PHP site on http://localhost:${port}`);
spawn(php, args, { stdio: "inherit", env: { ...process.env, DV_ENV: process.env.DV_ENV ?? "development" } }).on("exit", (c) => process.exit(c ?? 0));
