"""Baixa infobox + imagem principal dos personagens candidatos (Fandom) e gera JSON bruto."""
import json, re, sys, urllib.parse, urllib.request

API = "https://breakingbad.fandom.com/api.php"
temporadas_json, out = sys.argv[1], sys.argv[2]
temporadas = json.load(open(temporadas_json, encoding="utf-8"))

CANDIDATOS = {
    "principal": ["Walter White", "Skyler White", "Jesse Pinkman", "Hank Schrader", "Marie Schrader",
                  "Walter White Jr.", "Jimmy McGill", "Gustavo Fring", "Mike Ehrmantraut",
                  "Lydia Rodarte-Quayle", "Todd Alquist"],
    "recorrente": ["Steven Gomez", "Badger", "Skinny Pete", "Combo", "Holly White", "Gretchen Schwartz",
                   "Elliott Schwartz", "Carmen Molina", "Ted Beneke", "Adam Pinkman", "Diane Pinkman",
                   "Jake Pinkman", "Andrea Cantillo", "Brock Cantillo", "Jane Margolis", "Donald Margolis",
                   "Wendy", "George Merkert", "Francesca Liddy", "Huell Babineaux", "Patrick Kuby",
                   "Ed Galbraith", "Tuco Salamanca", "Hector Salamanca", "Leonel Salamanca",
                   "Marco Salamanca", "Juan Bolsa", "Eladio Vuente", "Krazy-8", "Emilio Koyama",
                   "No-Doze", "Gonzo", "Tortuga", "Gale Boetticher", "Victor", "Tyrus Kitt", "Chris Mara",
                   "Duane Chow", "Jack Welker", "Kenny", "Declan", "Lawson", "Old Joe", "Bogdan Wolynetz",
                   "Clovis", "Peter Schuler", "Dan Wachsberger", "Drew Sharp", "Spooge", "Tomás Cantillo"],
}
CAMPOS = ["Name", "Full Name", "Portrayed by", "Aliases", "Age", "Birthdate", "Deathdate", "Status",
          "Causeofdeath", "Occupation", "Family", "First Appearance", "Last Appearance"]


def get(params):
    url = API + "?" + urllib.parse.urlencode({**params, "format": "json", "formatversion": 2})
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return json.load(urllib.request.urlopen(req, timeout=60))


def limpar(s):
    s = re.sub(r"\{\{crossref\|[^}]*\}\}", "", s, flags=re.I)
    s = re.sub(r"\{\{ep\|([^}|]*)(?:\|([^}]*))?\}\}", lambda m: m.group(2) or m.group(1), s)
    s = re.sub(r"\{\{[^}]*\}\}", "", s)
    s = re.sub(r"\[\[(?:[^|\]]*\|)?([^\]]*)\]\]", r"\1", s)
    s = re.sub(r"<small>(.*?)</small>", r"(\1)", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = re.sub(r"'''?", "", s)
    s = re.sub(r"\(\s*\(", "(", s).replace("))", ")")
    return re.sub(r"[ \t]+", " ", s).strip()


def campos_infobox(texto):
    """Separa os campos do infobox respeitando {{ }} e [[ ]] aninhados."""
    ini = texto.find("{{Infobox")
    if ini < 0:
        return {}
    i, prof, partes, atual = ini + 2, 1, [], ""
    while i < len(texto) and prof > 0:
        dois = texto[i:i + 2]
        if dois in ("{{", "[["):
            prof += 1; atual += dois; i += 2; continue
        if dois in ("}}", "]]"):
            prof -= 1
            if prof == 0:
                break
            atual += dois; i += 2; continue
        if texto[i] == "|" and prof == 1:
            partes.append(atual); atual = ""
        else:
            atual += texto[i]
        i += 1
    partes.append(atual)
    campos = {}
    for parte in partes[1:]:
        if "=" in parte:
            k, v = parte.split("=", 1)
            campos[k.strip()] = v.strip()
    return campos


def infobox(texto):
    campos = campos_infobox(texto)
    res = {}
    for c in CAMPOS:
        bruto = campos.get(c, "")
        lista = [limpar(x) for x in re.split(r"<br\s*/?>", bruto)]
        lista = [x for x in lista if x]
        res[c] = lista
    return res


todos = [(n, cat) for cat, nomes in CANDIDATOS.items() for n in nomes]
saida, faltando = [], []
for i in range(0, len(todos), 20):
    lote = todos[i:i + 20]
    d = get({"action": "query", "prop": "revisions|pageimages", "rvprop": "content", "rvslots": "main",
             "piprop": "original", "redirects": 1, "titles": "|".join(n for n, _ in lote)})
    redir = {r["from"]: r["to"] for r in d["query"].get("redirects", [])}
    norm = {r["from"]: r["to"] for r in d["query"].get("normalized", [])}
    paginas = {p["title"]: p for p in d["query"]["pages"]}
    for nome, cat in lote:
        t = norm.get(nome, nome)
        t = redir.get(t, t)
        p = paginas.get(t)
        if not p or p.get("missing"):
            faltando.append(nome)
            continue
        texto = p["revisions"][0]["slots"]["main"]["content"]
        saida.append({
            "pagina": p["title"],
            "categoria": cat,
            "temporadas": temporadas.get(p["title"], []),
            "imagem": (p.get("original") or {}).get("source"),
            "url_wiki": "https://breakingbad.fandom.com/wiki/" + p["title"].replace(" ", "_"),
            **infobox(texto),
        })

json.dump(saida, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(saida), "personagens | faltando:", faltando)
