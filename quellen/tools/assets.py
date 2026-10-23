# Generates claw logo SVG, grunge texture PNG and QR SVGs for the guide
import random, json, sys, os, segno, io
from PIL import Image, ImageFilter
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)

def claw(x0, w, ytop, ybot, seed, bend=0.0):
    r = random.Random(seed)
    n = 26
    left, right = [], []
    for i in range(n + 1):
        t = i / n
        y = ytop + (ybot - ytop) * t
        # width tapers to a point at the bottom, wobbles irregularly
        width = w * (1 - t ** 2.2) * (0.85 + 0.3 * r.random())
        cx = x0 + w / 2 + bend * (t ** 2) * w + r.uniform(-0.6, 0.6)
        jl = r.uniform(-1.2, 1.2) if 0.05 < t < 0.9 else 0
        jr = r.uniform(-1.2, 1.2) if 0.05 < t < 0.9 else 0
        left.append((cx - width / 2 + jl, y))
        right.append((cx + width / 2 + jr, y))
    # jagged top edge (torn)
    top = []
    teeth = 5
    for k in range(teeth + 1):
        tx = left[0][0] + (right[0][0] - left[0][0]) * k / teeth
        ty = ytop - (r.uniform(4, 11) if k % 2 == 0 else r.uniform(-2, 2))
        top.append((tx, ty))
    pts = top + right[1:] + list(reversed(left[1:]))
    return "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts) + " Z"

def logo(fill="#95D600"):
    p = [claw(6, 20, 10, 118, 11, -0.15), claw(40, 20, 16, 92, 23, 0.0), claw(74, 20, 10, 118, 37, 0.15)]
    return '<svg class="claw" viewBox="0 -4 100 126" xmlns="http://www.w3.org/2000/svg">' + "".join(
        f'<path d="{d}" fill="{fill}"/>' for d in p) + "</svg>"

json.dump({"claw": logo(), "claw_white": logo("#ffffff"),
           "scratch": [claw(0, 16, 6, 300, s, 0.4) for s in (101, 102, 103)]},
          open(f"{OUT}/claw.json", "w"))

# grunge texture: speckle noise, transparent background
r = random.Random(5)
W, H = 900, 1270
img = Image.new("LA", (W, H), (0, 0))
px = img.load()
for _ in range(26000):
    x, y = r.randrange(W), r.randrange(H)
    px[x, y] = (255, r.randrange(10, 45))
img = img.filter(ImageFilter.GaussianBlur(0.6))
img.save(f"{OUT}/grain.png")

links = json.load(open(sys.argv[2]))
qrs = {}
for k, url in links.items():
    q = segno.make(url, error="m")
    buf = io.BytesIO()
    q.save(buf, kind="svg", dark="#0a0a0a", light="#ffffff", border=2, xmldecl=False, svgns=True, svgclass="qr", omitsize=True)
    qrs[k] = buf.getvalue().decode()
json.dump(qrs, open(f"{OUT}/qr.json", "w"))
print("ok")
