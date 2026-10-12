#!/usr/bin/env bash
# Builds the site and publishes it to the public repository that GitHub Pages
# serves (default: floraleadmin/taalfiets, branch main). The source code stays
# in this repository; only the built files go there.
set -euo pipefail
REPO="${1:-https://github.com/floraleadmin/taalfiets.git}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$(mktemp -d)"
cd "$ROOT"
npm run build
cp -r dist/. "$OUT/"
touch "$OUT/.nojekyll"
cat > "$OUT/README.md" <<'MD'
# Taalfiets

Niederländisch lernen auf Deutsch – 50 Kapitel von A1 bis zum Einstieg in B1.

**App öffnen:** https://floraleadmin.github.io/taalfiets/

Dieses Repository enthält nur die fertig gebaute Website für GitHub Pages.
Der Fortschritt wird im eigenen Browser gespeichert; in den Einstellungen lässt er sich als Datei sichern.
MD
cd "$OUT"
git init -q -b main
git add -A
git -c user.name="$(git -C "$ROOT" config user.name)" -c user.email="$(git -C "$ROOT" config user.email)" \
  commit -qm "Taalfiets $(git -C "$ROOT" rev-parse --short HEAD)"
git push -f "$REPO" main
echo "Veröffentlicht: $REPO"
