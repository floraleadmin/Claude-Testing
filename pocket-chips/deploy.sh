#!/usr/bin/env bash
# Veröffentlicht Pocket Chips im Unterordner pocket-chips/ des gh-pages-Branches
# (https://floraleadmin.github.io/Claude-Testing/pocket-chips/).
# Alles andere auf gh-pages bleibt unverändert.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(git -C "$ROOT" rev-parse --show-toplevel)"
SHA="$(git -C "$REPO_DIR" rev-parse HEAD)"
SHORT="${SHA:0:7}"
WT="$(mktemp -d)"
git -C "$REPO_DIR" fetch -q origin gh-pages
git -C "$REPO_DIR" worktree add -q --detach "$WT" origin/gh-pages
trap 'git -C "$REPO_DIR" worktree remove --force "$WT"' EXIT
rm -rf "$WT/pocket-chips"
mkdir -p "$WT/pocket-chips/vendor"
for f in index.html app.js engine.js sync.js style.css icon.svg apple-touch-icon.png icon-192.png icon-512.png manifest.webmanifest; do
  cp "$ROOT/$f" "$WT/pocket-chips/$f"
done
cp "$ROOT"/vendor/* "$WT/pocket-chips/vendor/"
# Cache-Busting: GitHub Pages cacht 10 Minuten.
sed -i "s/?v=1\"/?v=$SHORT\"/g" "$WT/pocket-chips/index.html"
printf '{"sha":"%s"}\n' "$SHA" > "$WT/pocket-chips/version.json"
cd "$WT"
git add -A pocket-chips
if git diff --cached --quiet; then
  echo "Keine Änderungen"
  exit 0
fi
git commit -qm "Pocket Chips aus $SHORT"
git push -q origin HEAD:gh-pages
echo "Veröffentlicht: https://floraleadmin.github.io/Claude-Testing/pocket-chips/ ($SHORT)"
