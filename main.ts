import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The gift shop sells tiny replicas of the planet. I bought three. 5 stars.";

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!/[1-5] stars?\.?$/.test(ENTRY)) {
    throw new Error("entry must close with a star rating, like a real review");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR
    ? join(process.env.MAKEFUN_OUTPUT_DIR, "output")
    : "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");
  const roundTrip = readFileSync(target, "utf8");
  if (roundTrip !== ENTRY) {
    throw new Error("round-trip check failed: entry.txt differs from ENTRY");
  }
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
