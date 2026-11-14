"""Conta em quais temporadas de Breaking Bad cada personagem aparece (categorias da Fandom)."""
import json, sys, urllib.parse, urllib.request

API = "https://breakingbad.fandom.com/api.php"
out = sys.argv[1]


def get(params):
    url = API + "?" + urllib.parse.urlencode({**params, "format": "json"})
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return json.load(urllib.request.urlopen(req, timeout=30))


pers = {}
for t in ["1", "2", "3", "4", "5A", "5B"]:
    cont = {}
    while True:
        d = get({"action": "query", "list": "categorymembers", "cmlimit": 500, "cmnamespace": 0,
                 "cmtitle": f"Category:Season {t} Characters (Breaking Bad)", **cont})
        for c in d["query"]["categorymembers"]:
            pers.setdefault(c["title"], []).append(t)
        if "continue" not in d:
            break
        cont = d["continue"]

json.dump(pers, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(pers), "personagens")
ranking = sorted(pers.items(), key=lambda kv: -len(kv[1]))
for n in (6, 5, 4, 3, 2):
    nomes = [k for k, v in ranking if len(v) == n]
    print(f"\n[{n} temporadas] {len(nomes)}: " + "; ".join(nomes))
