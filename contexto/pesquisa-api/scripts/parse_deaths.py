"""Extrai as mortes de Breaking Bad do wikitext de 'List of Character Deaths' (Fandom)."""
import json, re, sys

src, out = sys.argv[1], sys.argv[2]
txt = open(src, encoding="utf-8").read()
ini = txt.index("==Breaking Bad==")
fim = txt.index("==El Camino==")
bb = txt[ini:fim]


def limpar(s):
    s = re.sub(r"\[\[File:[^\]]*\]\]", "", s)
    s = re.sub(r"\{\{crossref\|[^}]*\}\}", "", s, flags=re.I)
    s = re.sub(r"\{\{Sh\|([^}]*)\}\}", r"\1", s)
    s = re.sub(r"\[\[(?:[^|\]]*\|)?([^\]]*)\]\]", r"\1", s)
    s = re.sub(r"'''?", "", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = re.sub(r"^\s*style=\"[^\"]*\"\s*\|", "", s)
    return re.sub(r"\s+", " ", s).strip()


def links(s):
    return [m.split("|")[0].strip() for m in re.findall(r"\[\[([^\]]+)\]\]", s) if not m.startswith("File:")]


mortes = []
temporada = None
for bloco in re.split(r"(===[^=\n]+===)", bb):
    m = re.match(r"===\[\[Season (\w+) \(Breaking Bad\)", bloco)
    if m:
        temporada = m.group(1)
        continue
    if not temporada:
        continue
    for linha in bloco.split("\n|-")[1:]:
        cels = [c for c in re.split(r"\n\|", "\n" + linha.strip()) if c.strip()]
        cels = [c.strip() for c in cels]
        if len(cels) < 6 or cels[0].startswith("!"):
            continue
        num, pers, causa, arma, resp, ultimas = cels[:6]
        img = re.findall(r"\[\[File:([^|\]]+)", pers)
        ep = re.findall(r"\{\{crossref\|([^}]*)\}\}", causa, flags=re.I)
        mortes.append({
            "n": num,
            "temporada": temporada,
            "personagem": limpar(pers),
            "personagem_link": (links(pers) or [None])[0],
            "imagem_wiki": img[0].strip() if img else None,
            "causa": limpar(causa),
            "episodio_ref": ep[0] if ep else None,
            "arma": limpar(arma),
            "responsavel": limpar(resp),
            "responsavel_links": links(resp),
            "ultimas_palavras": limpar(ultimas.rstrip("|}").strip()),
        })

json.dump(mortes, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(mortes), "linhas")
