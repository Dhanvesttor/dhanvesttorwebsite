import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");
const required = {
  ivory: "#FBF7F0", indigo: "#2E2A6E", raspberry: "#DE4D7A",
  marigold: "#F8C233", terracotta: "#C8876A", sand: "#E9DCC7", ink: "#1D1B3A",
};

describe("brand tokens", () => {
  for (const [name, hex] of Object.entries(required)) {
    it(`defines --color-${name} as ${hex}`, () => {
      expect(css).toMatch(new RegExp(`--color-${name}:\\s*${hex}`, "i"));
    });
  }
  it("declares both font families", () => {
    expect(css).toContain("--font-display");
    expect(css).toContain("--font-sans");
  });
});
