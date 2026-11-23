# Anuj Sharma — Portfolio, Edited Resume & Curriculum Vitae

**Live Portfolio:** [https://kingsprayer.github.io/](https://kingsprayer.github.io/)
**1-Page Resume (Web / PDF):** [resume.html](https://kingsprayer.github.io/resume.html) · [Anuj_Sharma_Resume_2026.pdf](https://kingsprayer.github.io/Anuj_Sharma_Resume_2026.pdf)
**Full 2-Page CV (Web / PDF):** [cv.html](https://kingsprayer.github.io/cv.html) · [Anuj_Sharma_CV_2026.pdf](https://kingsprayer.github.io/Anuj_Sharma_CV_2026.pdf)

A cohesive, zero-dependency personal engineering portfolio, grounded 1-page Resume, and comprehensive 2-page Curriculum Vitae (CV) designed under a unified Warm Editorial + Architectural design system.

## Deliverables

| File | Purpose |
| :--- | :--- |
| `index.html` | Interactive Engineering Portfolio (light/dark themes, interactive architecture blueprint, filterable projects & slide-over case studies, skill cross-highlighting, live WCAG & CIE76 ΔE micro-lab, `⌘K` command palette) |
| `resume.html` | Web view + print source for the edited **1-page Resume** (grounded, versatile, zero exaggeration) |
| `Anuj_Sharma_Resume_2026.pdf` | Compiled ATS-friendly vector-text **1-page A4 Resume PDF** |
| `cv.html` | Web view + print source for the comprehensive **2-page Curriculum Vitae** |
| `Anuj_Sharma_CV_2026.pdf` | Compiled ATS-friendly vector-text **2-page A4 Curriculum Vitae PDF** |
| `Anuj_Sharma_CV.md` | Clean plain-text / Markdown CV for GitHub, Notion, or plain-text ATS paste |
| `assets/data.js` | Single source of truth for portfolio projects, experience, skills, labs, and education |
| `scripts/build_pdf.sh` | Rebuilds both `Anuj_Sharma_Resume_2026.pdf` and `Anuj_Sharma_CV_2026.pdf` via headless Chrome |

## Local Preview

```bash
python3 -m http.server 8080
```

Then open:
- Portfolio: `http://localhost:8080/`
- 1-Page Resume: `http://localhost:8080/resume.html`
- Full 2-Page CV: `http://localhost:8080/cv.html`

## Regenerating the PDFs

After editing `resume.html`, `cv.html`, or `assets/cv.css`:

```bash
./scripts/build_pdf.sh
```

## Deploying

This project is static HTML/CSS/JS with zero build step — drag-and-drop the folder to Netlify (uses `netlify.toml`), Vercel, or GitHub Pages.
