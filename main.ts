import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "yes";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (
  WORD.length < 1 ||
  WORD.length > 77 ||
  WORD.trim().length === 0 ||
  /\s/.test(WORD) ||
  WORD.includes("\n")
) {
  console.error("entry fails the 1-77 character gate");
  process.exit(1);
}

// The entry is one word; ties break on bytes, lower better.
if (Buffer.byteLength(WORD, "utf8") !== 3) {
  console.error("entry is not the expected 3 bytes");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, WORD, "utf8");

// Read-back check: what landed on disk must be byte-identical to WORD.
const back = readFileSync(target, "utf8");
if (back !== WORD) {
  console.error("read-back mismatch");
  process.exit(1);
}
