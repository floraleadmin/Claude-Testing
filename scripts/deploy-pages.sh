#!/usr/bin/env bash
# Builds the site and publishes it to the gh-pages branch, which GitHub Pages
# serves at https://floraleadmin.github.io/Claude-Testing/.
# The branch holds only the built files and is replaced on every deploy.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO="${1:-$(git -C "$ROOT" remote get-url origin)}"
OUT="$(mktemp -d)"
cd "$ROOT"
npm run build
cp -r dist/. "$OUT/"
# Serve the files as they are, without Jekyll.
touch "$OUT/.nojekyll"
cd "$OUT"
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C "$ROOT" config user.name)" -c user.email="$(git -C "$ROOT" config user.email)" \
  commit -qm "Website aus $(git -C "$ROOT" rev-parse --short HEAD)"
git push -f "$REPO" gh-pages
echo "Veröffentlicht auf gh-pages: $REPO"
