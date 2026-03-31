MARKER = b"===PYPI_BUNDLE===\n"

with open("result.pdf", "rb") as f:
    data = f.read()

idx = data.find(MARKER)
if idx == -1:
    raise Exception("No package found")

archive = data[idx + len(MARKER):]

with open("extracted.zip", "wb") as out:
    out.write(archive)