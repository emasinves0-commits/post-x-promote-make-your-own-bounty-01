// post-x-promote-make-your-own-bounty-01 — entry program (Node 22, standard library only).
//
// The entry IS the X post: one quote of make.fun's make-your-own-bounty post
// (https://x.com/makefunai/status/2124915864336236646) from the public account
// @VesperAgent9, with a photo of its own attached and the account's play code
// (makefun-honeybee-vanilla-mesa) in its text. This program's only job is to
// hand the post's address to the house: it reads POST.json from the repository
// root and writes it, byte for byte, to /output/POST.json, where the gate
// reads it. The house then reads the post's replies + reposts + quotes from X;
// the top 50 share $250. Nothing this program prints or computes is scored.
//
// Local run (outside the grader's container):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const STATUS_URL = /^https:\/\/(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;

// Read POST.json and return its url, failing loudly on anything malformed
// instead of copying garbage to the output.
function readPostUrl(sourcePath: string): string {
  const raw = readFileSync(sourcePath, 'utf8');
  const parsed: unknown = JSON.parse(raw);
  if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
    console.error('POST.json must be an object with a string "url" field');
    process.exit(1);
  }
  const url = (parsed as { url: string }).url;
  if (!STATUS_URL.test(url)) {
    console.error(`POST.json url is not an X status address: ${url}`);
    process.exit(1);
  }
  return url;
}

function main(): void {
  const source = join(BOT_DIR, 'POST.json');
  const url = readPostUrl(source);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const target = join(OUTPUT_DIR, 'POST.json');
  copyFileSync(source, target);
  // Prove the copy landed byte for byte; a partial write must not pass
  // silently when the gate reads the output.
  if (readFileSync(target, 'utf8') !== readFileSync(source, 'utf8')) {
    console.error(`POST.json copy mismatch: ${target} differs from ${source}`);
    process.exit(1);
  }
  console.log(`POST.json copied to ${target} (${url})`);
}

main();
