#!/usr/bin/env python3
"""Control and Function site QA audit. See PUBLISHING.md.

Run from the repo root: python3 scripts/audit.py
Zero fail and zero warn before a change is done.
"""
import json, re, subprocess, sys, html as H
BASE="https://controlandfunction.com"
PAGES=["/", "/edtech.html", "/cuecs.html", "/healthcare.html", "/iso27001.html",
       "/financial-services.html", "/privacy.html", "/404.html"]
def get(u):
    r=subprocess.run(["curl","-s","-A","Mozilla/5.0","-w","\n@@%{http_code}",BASE+u],capture_output=True)
    out=r.stdout.decode("utf-8","replace")
    b,_,code=out.rpartition("\n@@")
    return b, code.strip()
fail=[]; warn=[]; ok=[]
docs={}
for u in PAGES:
    b,c=get(u); docs[u]=b
    (ok if c=="200" else fail).append(f"{u} HTTP {c}")

for u,s in docs.items():
    if u=="/404.html": continue
    t=re.search(r"<title>(.*?)</title>",s,re.S)
    d=re.search(r'<meta name="description" content="(.*?)"',s,re.S)
    can=re.search(r'<link rel="canonical" href="(.*?)"',s)
    if not t: fail.append(f"{u} NO TITLE")
    elif not (15<=len(t.group(1))<=70): warn.append(f"{u} title {len(t.group(1))} chars: {t.group(1)[:60]}")
    if not d: fail.append(f"{u} NO META DESCRIPTION")
    elif not (110<=len(d.group(1))<=165): warn.append(f"{u} meta desc {len(d.group(1))} chars")
    if not can: fail.append(f"{u} NO CANONICAL")
    else:
        want = BASE+"/" if u=="/" else BASE+u
        if can.group(1)!=want: fail.append(f"{u} canonical mismatch: {can.group(1)}")
    # typography
    body=re.sub(r"<script.*?</script>|<style.*?</style>","",s,flags=re.S)
    txt=H.unescape(re.sub(r"<[^>]+>"," ",body))
    for ch,name in [("—","em dash"),("–","en dash")]:
        if ch in txt: fail.append(f"{u} contains {name}")
    # schema
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>',s,re.S):
        try: json.loads(m.group(1))
        except Exception as e: fail.append(f"{u} INVALID JSON-LD: {e}")
    # images
    for m in re.finditer(r"<img\b[^>]*>",s):
        if 'alt="' not in m.group(0): fail.append(f"{u} img without alt: {m.group(0)[:70]}")
    # lang + viewport
    if 'lang="en"' not in s: fail.append(f"{u} no lang attribute")
    if "viewport" not in s: fail.append(f"{u} no viewport meta")
    # heading order: exactly one h1
    h1=re.findall(r"<h1\b",s)
    if len(h1)!=1: warn.append(f"{u} has {len(h1)} h1 tags")

# internal links resolve
seen=set()
for u,s in docs.items():
    for m in re.finditer(r'href="(/[^"#?]*)"',s):
        t=m.group(1)
        if t in seen: continue
        seen.add(t)
        _,c=get(t)
        if c!="200": fail.append(f"broken internal link {t} (from {u}) HTTP {c}")
# sitemap vs reality
sm,_=get("/sitemap.xml")
locs=set(re.findall(r"<loc>(.*?)</loc>",sm))
live={BASE+("/"if p=="/"else p) for p in PAGES if p!="/404.html"}
for miss in live-locs: warn.append(f"live page not in sitemap: {miss}")
for extra in locs-live: warn.append(f"sitemap lists page not in audit set: {extra}")
rb,_=get("/robots.txt")
if "Sitemap" not in rb: warn.append("robots.txt has no Sitemap line")

# claim wall
BAD=[r"we perform (the )?audit", r"(?<![a-z])our audit\b", r"(?<![a-z])we issue (a |the )?(soc ?2 )?report",
     r"HIPAA certified", r"we certify", r"penetration test(ing)? (we|our)", r"lockheed",
     r"clearance", r"\bCMMC\b", r"we are an audit firm"]
for u,s in docs.items():
    txt=H.unescape(re.sub(r"<[^>]+>"," ",s))
    for pat in BAD:
        for m in re.finditer(pat,txt,re.I):
            ctx=re.sub(r"\s+"," ",txt[max(0,m.start()-90):m.start()+90])
            if "no such thing as being HIPAA certified" in ctx: continue
            fail.append(f"{u} CLAIM WALL /{pat}/: ...{ctx}...")

# pricing consistency
home=docs["/"]
prices=set(re.findall(r"\$[\d,]+(?:\.\d+)?K?", H.unescape(re.sub(r"<[^>]+>"," ",home))))
print("HOME PRICES:", sorted(prices))

print(f"\n{'='*60}\nPASS {len(ok)}  |  FAIL {len(fail)}  |  WARN {len(warn)}\n{'='*60}")
for f in fail: print("FAIL ", f)
for w in warn: print("warn ", w)
