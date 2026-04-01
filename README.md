# ghostPack

A minimal proof of concept for embedding a ZIP archive inside a PDF file and extracting it later.

## Repository layout

- `import/import.py`
  - Opens `base.pdf` in append-binary mode.
  - Writes the marker `\n===PYPI_BUNDLE===\n` followed by the contents of `archive.zip`.
  - The original `base.pdf` is extended in-place with the ZIP payload.

- `extract/extract.py`
  - Opens `result.pdf` and searches for the marker `===PYPI_BUNDLE===\n`.
  - Extracts everything after the marker into `extracted.zip`.

## How to use

1. Put a valid PDF file named `base.pdf` in the `import/` folder.
2. Put a ZIP file named `archive.zip` in the `import/` folder.
3. Run:

   ```bash
   cd import
   python import.py
   ```

4. Copy or move the generated `base.pdf` into the `extract/` folder and rename it to `result.pdf`.
5. Run:

   ```bash
   cd ../extract
   python extract.py
   ```

6. The extracted archive will be written as `extracted.zip` in the `extract/` folder.

## Important details

- `import.py` does not create a separate output file; it appends the ZIP archive to the existing `base.pdf`.
- `extract.py` only works if the marker exists in `result.pdf`.
- There is no PDF validation or ZIP integrity check.

## Notes

- This project is intended as a simple demo, not production-ready ZIP packaging software.
- Use a copy of your PDF if you want to preserve the original file before embedding data.
