import pymupdf

doc = pymupdf.open("Document Demanda.pdf")
page = doc[0]

cropstart = page.search_for("perfil integrante")

cropend = page.search_for("NC")

rx0 = cropstart[0].x0
ry0 = cropstart[0].y0

rx1 = cropend[9].x1
ry1 = cropend[9].y1

cr = pymupdf.Rect(rx0, ry0, rx1, ry1)

print(cr)

texto = page.get_text(clip=cr)

text = page.get_text("words", clip=cr)

print(texto)

for rect in text:
    x0, y0, x1, y1 = rect[:4]
    page.add_redact_annot(pymupdf.Rect(x0, y0, x1, y1), fill=(1, 1, 1))
    page.apply_redactions(images=0)
    baseline = pymupdf.Point(x0, y1 - 2.2)
    page.insert_text(baseline, "Teste")
doc.save("NovoPDF.pdf")
