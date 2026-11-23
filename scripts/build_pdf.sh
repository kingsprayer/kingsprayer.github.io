#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [[ ! -x "$CHROME_BIN" ]]; then
  echo "Error: Google Chrome not found at $CHROME_BIN" >&2
  exit 1
fi

build_one() {
  local html_file="$1"
  local pdf_file="$2"
  "$CHROME_BIN" \
    --headless=new \
    --disable-gpu \
    --no-sandbox \
    --no-pdf-header-footer \
    --virtual-time-budget=4000 \
    --print-to-pdf="${ROOT_DIR}/${pdf_file}" \
    "file://${ROOT_DIR}/${html_file}"
  echo "Generated: ${ROOT_DIR}/${pdf_file}"
}

build_one "resume.html" "Anuj_Sharma_Resume_2026.pdf"
build_one "cv.html" "Anuj_Sharma_CV_2026.pdf"

ls -lh "${ROOT_DIR}/Anuj_Sharma_Resume_2026.pdf" "${ROOT_DIR}/Anuj_Sharma_CV_2026.pdf"
