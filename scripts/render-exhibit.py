"""Optional asset regeneration: python render-exhibit.py EXHIBIT.pdf OUTPUT_DIR.
Requires PyMuPDF; the generated previews are already bundled in public/.
"""
import sys
from pathlib import Path
import pymupdf

document = pymupdf.open(sys.argv[1])
destination = Path(sys.argv[2])
destination.mkdir(parents=True, exist_ok=True)
for index in range(2):
    document[index].get_pixmap(matrix=pymupdf.Matrix(2, 2)).save(
        destination / f"3981-{index + 1}.png"
    )
