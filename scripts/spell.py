"""Spell check with the Hunspell dictionaries from node_modules (dictionary-nl, dictionary-de).

Reads JSON {"nl": [...], "de": [...], "either": [...]} on stdin and prints
JSON with the tokens each dictionary rejects. "either" passes if Dutch or
German accepts the token. Needs: pip install spylls
"""
import json
import os
import sys

from spylls.hunspell import Dictionary

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NL = Dictionary.from_files(os.path.join(ROOT, 'node_modules', 'dictionary-nl', 'index'))
DE = Dictionary.from_files(os.path.join(ROOT, 'node_modules', 'dictionary-de', 'index'))


def ok(d, token):
    try:
        return d.lookup(token)
    except Exception:  # spylls raises on a few exotic inputs; treat as unknown
        return False


def main():
    data = json.load(sys.stdin)
    out = {
        'nl': [t for t in data.get('nl', []) if not ok(NL, t)],
        'de': [t for t in data.get('de', []) if not ok(DE, t)],
        'either': [t for t in data.get('either', []) if not ok(DE, t) and not ok(NL, t)],
    }
    json.dump(out, sys.stdout, ensure_ascii=False)


if __name__ == '__main__':
    main()
