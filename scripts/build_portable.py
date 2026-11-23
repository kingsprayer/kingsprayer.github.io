#!/usr/bin/env python3
"""
Builds Anuj_Sharma_Portfolio_Portable.html — a 100% self-contained single-file
HTML portfolio with inlined CSS, JS, data, and embedded downloadable PDFs
(1-Page Resume + 2-Page CV) so it works offline on any device with zero broken files.
"""

from pathlib import Path
import base64

ROOT = Path(__file__).resolve().parent.parent

index_html = (ROOT / "index.html").read_text(encoding="utf-8")
portfolio_css = (ROOT / "assets" / "portfolio.css").read_text(encoding="utf-8")
data_js = (ROOT / "assets" / "data.js").read_text(encoding="utf-8")
portfolio_js = (ROOT / "assets" / "portfolio.js").read_text(encoding="utf-8")

resume_pdf_b64 = base64.b64encode((ROOT / "Anuj_Sharma_Resume_2026.pdf").read_bytes()).decode("ascii")
cv_pdf_b64 = base64.b64encode((ROOT / "Anuj_Sharma_CV_2026.pdf").read_bytes()).decode("ascii")
cv_md_b64 = base64.b64encode((ROOT / "Anuj_Sharma_CV.md").read_bytes()).decode("ascii")

# Inline CSS
out = index_html.replace(
    '<link rel="stylesheet" href="assets/portfolio.css" />',
    f"<style>\n{portfolio_css}\n</style>",
)

# Helper script that intercepts PDF/Resume/CV links in standalone offline mode
portable_shim = f"""
<script>
(function() {{
  const EMBEDDED_FILES = {{
    "Anuj_Sharma_Resume_2026.pdf": {{ mime: "application/pdf", b64: "{resume_pdf_b64}" }},
    "Anuj_Sharma_CV_2026.pdf": {{ mime: "application/pdf", b64: "{cv_pdf_b64}" }},
    "Anuj_Sharma_CV.md": {{ mime: "text/markdown;charset=utf-8", b64: "{cv_md_b64}" }}
  }};
  function toBlobUrl(name) {{
    const entry = EMBEDDED_FILES[name];
    if (!entry) return null;
    const raw = atob(entry.b64);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes], {{ type: entry.mime }}));
  }}
  document.addEventListener("DOMContentLoaded", function() {{
    const urls = {{}};
    Object.keys(EMBEDDED_FILES).forEach((k) => {{ urls[k] = toBlobUrl(k); }});
    document.querySelectorAll("a[href]").forEach((a) => {{
      const href = a.getAttribute("href");
      if (urls[href]) {{
        a.setAttribute("href", urls[href]);
        a.setAttribute("download", href);
      }} else if (href === "resume.html") {{
        a.setAttribute("href", urls["Anuj_Sharma_Resume_2026.pdf"]);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }} else if (href === "cv.html") {{
        a.setAttribute("href", urls["Anuj_Sharma_CV_2026.pdf"]);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }}
    }});
  }});
}})();
</script>
"""

# Inline data.js + portfolio.js + offline blob shim
out = out.replace(
    '  <script src="assets/data.js"></script>\n  <script src="assets/portfolio.js"></script>',
    f"  <script>\n{data_js}\n  </script>\n  <script>\n{portfolio_js}\n  </script>\n{portable_shim}",
)

target = ROOT / "Anuj_Sharma_Portfolio_Portable.html"
target.write_text(out, encoding="utf-8")
print(f"Generated portable bundle: {target} ({target.stat().st_size / 1024:.1f} KB)")
