# Assembles guide.html from template + generated assets
import json, re, sys
B = sys.argv[1]
SI = sys.argv[2]
t = open(f"{B}/template.html").read()
claw = json.load(open(f"{B}/assets/claw.json"))
qr = json.load(open(f"{B}/assets/qr.json"))
bmw = re.search(r'd="([^"]+)"', open(f"{SI}/icons/bmw.svg").read()).group(1)
fonts = open(f"{B}/fonts/local.css").read()

scratch = "".join(f'<path transform="translate({i*36} 0)" d="{d}"/>' for i, d in enumerate(claw["scratch"]))
small = claw["claw"].replace('class="claw"', 'class="claw" style="height:6.5mm;width:auto"')
tiny = claw["claw"].replace('class="claw"', 'class="claw" style="height:4.2mm;width:auto"')
warn = '<svg viewBox="0 0 24 24" style="height:4.2mm"><path d="M12 2 L23 21 H1 Z" fill="#FF3B2F"/><rect x="11" y="8" width="2" height="7" fill="#090909"/><rect x="11" y="16.6" width="2" height="2" fill="#090909"/></svg>'
star = '<svg viewBox="0 0 24 24" style="height:4.2mm"><path d="M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6 5.6 21.1 7 14l-5.3-5 7.2-.9z" fill="#FFC21A"/></svg>'

def can(h):
    w = h * 0.42
    inner = claw["claw"].replace('<svg class="claw"', f'<svg x="{w*0.2:.1f}" y="{h*0.2:.1f}" width="{w*0.6:.1f}" height="{h*0.36:.1f}"')
    return f'''<svg width="{w*1.05:.1f}mm" height="{h*1.04:.1f}mm" viewBox="-2 -4 {w+4:.1f} {h+8:.1f}" style="filter:drop-shadow(0 0 4mm rgba(149,214,0,.35))">
<defs><linearGradient id="cb{h}" x1="0" x2="1"><stop offset="0" stop-color="#050505"/><stop offset=".22" stop-color="#2a2a2a"/><stop offset=".32" stop-color="#0c0c0c"/><stop offset=".8" stop-color="#151515"/><stop offset="1" stop-color="#040404"/></linearGradient>
<linearGradient id="ct{h}" x1="0" x2="1"><stop offset="0" stop-color="#6b6b6b"/><stop offset=".3" stop-color="#d8d8d8"/><stop offset=".6" stop-color="#8a8a8a"/><stop offset="1" stop-color="#4a4a4a"/></linearGradient></defs>
<path d="M{w*0.08:.1f} {h*0.06:.1f} Q0 {h*0.09:.1f} 0 {h*0.13:.1f} V{h*0.93:.1f} Q0 {h:.1f} {w*0.12:.1f} {h:.1f} H{w*0.88:.1f} Q{w:.1f} {h:.1f} {w:.1f} {h*0.93:.1f} V{h*0.13:.1f} Q{w:.1f} {h*0.09:.1f} {w*0.92:.1f} {h*0.06:.1f} Z" fill="url(#cb{h})"/>
<rect x="{w*0.08:.1f}" y="0" width="{w*0.84:.1f}" height="{h*0.065:.1f}" rx="{w*0.05:.1f}" fill="url(#ct{h})"/>
{inner}
<text x="{w/2:.1f}" y="{h*0.68:.1f}" text-anchor="middle" style="font-family:Anton;font-size:{w*0.17:.1f}px;fill:#ffffff;letter-spacing:.5px">MONSCHDA</text>
<text x="{w/2:.1f}" y="{h*0.75:.1f}" text-anchor="middle" style="font-family:'Barlow Condensed';font-weight:700;font-size:{w*0.085:.1f}px;fill:#95D600;letter-spacing:2px">ENERGY</text>
<rect x="0" y="{h*0.86:.1f}" width="{w:.1f}" height="{h*0.012:.1f}" fill="#95D600" opacity=".8"/>
</svg>'''

rep = {"{{CLAW}}": claw["claw"], "{{CLAW_SMALL}}": small, "{{CLAW_TINY}}": tiny, "{{SCRATCH}}": scratch,
       "{{BMW}}": bmw, "{{WARN}}": warn, "{{STAR}}": star, "{{CAN}}": can(78), "{{CAN_TALL}}": can(96)}
for k, v in qr.items():
    rep["{{QR_%s}}" % k] = v
for k, v in rep.items():
    t = t.replace(k, v)
t = t.replace('<link rel="stylesheet" href="fonts/local.css">', "<style>" + fonts + "</style>")
left = re.findall(r"\{\{[A-Za-z_]+\}\}", t)
assert not left, left
open(f"{B}/guide.html", "w").write(t)
print("built", len(t))
