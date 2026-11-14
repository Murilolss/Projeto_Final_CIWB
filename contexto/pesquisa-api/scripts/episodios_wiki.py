"""Baixa o wikitext das páginas dos 62 episódios de Breaking Bad (Fandom)."""
import json, sys, urllib.parse, urllib.request

API = "https://breakingbad.fandom.com/api.php"
episodes_json, out = sys.argv[1], sys.argv[2]
eps = [e for e in json.load(open(episodes_json, encoding="utf-8")) if e["production"] == "Breaking Bad"]


def get(params):
    url = API + "?" + urllib.parse.urlencode({**params, "format": "json", "formatversion": 2})
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return json.load(urllib.request.urlopen(req, timeout=60))


saida, faltando = {}, []
for i in range(0, len(eps), 10):
    lote = eps[i:i + 10]
    d = get({"action": "query", "prop": "revisions", "rvprop": "content", "rvslots": "main",
             "redirects": 1, "titles": "|".join(e["title"] for e in lote)})
    conv = {}
    for k in ("normalized", "redirects"):
        for r in d["query"].get(k, []):
            conv[r["from"]] = r["to"]
    paginas = {p["title"]: p for p in d["query"]["pages"]}
    for e in lote:
        t = conv.get(e["title"], e["title"])
        t = conv.get(t, t)
        p = paginas.get(t)
        cod = f"{e['episode'] // 100}x{e['episode'] % 100:02d}"
        if not p or p.get("missing"):
            faltando.append(e["title"])
            continue
        saida[cod] = {"title": e["title"], "pagina": p["title"],
                      "wikitext": p["revisions"][0]["slots"]["main"]["content"]}

json.dump(saida, open(out, "w", encoding="utf-8"), ensure_ascii=False)
print(len(saida), "episódios | faltando:", faltando)
