with open("base.pdf", "ab") as pdf, open("archive.zip", "rb") as pkg:
    pdf.write(b"\n===PYPI_BUNDLE===\n")
    pdf.write(pkg.read())