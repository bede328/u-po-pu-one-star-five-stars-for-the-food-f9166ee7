// One Star, Five Stars for the Food — make.fun bounty entry.
//
// Writes a single sentence (166 characters): a one-star review of planet
// Earth by an alien tourist who still slips in a real compliment about
// the food. The sentence is written to /output/entry.txt as UTF-8 text
// with no trailing newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "One star: your people pay to watch strangers eat on glowing rectangles while the air tries to drown me, but the street noodles rewired my taste buds and my loyalties.";

const OUT_PATH = "/output/entry.txt";

// Guards: one sentence, 1-200 characters (code points), not whitespace-only,
// and a single line (no embedded line breaks).
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");

// Read back and verify the round-trip is byte-identical.
const back = readFileSync(OUT_PATH, "utf8");
if (back !== LINE) {
  throw new Error("round-trip verification failed: entry.txt differs from LINE");
}

console.log(`wrote ${OUT_PATH}: ${chars.length} characters, verified round-trip`);
