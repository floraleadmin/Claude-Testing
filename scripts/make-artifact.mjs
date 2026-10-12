// Turns the single-file build into a page body for the claude.ai artifact host.
// The host adds its own doctype, head and body, so the file may only hold
// <title>, the font stylesheet, <style>, the root element and the script.
import { readFileSync, writeFileSync } from 'node:fs';

const src = 'dist-single/index.html';
const out = 'dist-single/taalfiets.html';
const html = readFileSync(src, 'utf8');

function one(re, what) {
  const m = html.match(re);
  if (!m) throw new Error(`make-artifact: ${what} not found in ${src}`);
  return m;
}

const title = one(/<title>([^<]*)<\/title>/, 'title')[1];
const fonts = [...html.matchAll(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com\/[^"]+)"[^>]*>/g)].map((m) => m[1]);
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
const script = one(/<script type="module"[^>]*>([\s\S]*?)<\/script>/, 'module script')[1];

if (!styles.length) throw new Error('make-artifact: no inline styles');
if (/<script[^>]+src=/.test(html)) throw new Error('make-artifact: external script left in the build');
const external = [...html.matchAll(/(?:src|href)="(https?:[^"]+)"/g)].map((m) => m[1]).filter((u) => !/^https:\/\/fonts\.(googleapis|gstatic)\.com(\/|$)/.test(u));
if (external.length) throw new Error(`make-artifact: external resources not allowed: ${external.join(', ')}`);

const page = [
  `<title>${title}</title>`,
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  ...fonts.map((f) => `<link rel="stylesheet" href="${f}">`),
  `<style>${styles.join('\n')}</style>`,
  '<div id="root"></div>',
  `<script type="module">${script}</script>`,
  '',
].join('\n');

if (/<!doctype|<html|<head|<body/i.test(page.slice(0, page.indexOf('<script type="module">')))) {
  throw new Error('make-artifact: document skeleton tags left in the page');
}
writeFileSync(out, page);
console.log(`make-artifact: ${out} (${(page.length / 1024).toFixed(0)} KB)`);
