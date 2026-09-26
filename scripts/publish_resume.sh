#!/bin/sh
# Commit and push the redacted resume. Run via: npm run update-resume
set -e
cd "$(dirname "$0")/.."
git add public/Sohum-Goel-Resume.pdf
if git diff --cached --quiet -- public/Sohum-Goel-Resume.pdf; then
  echo "Resume unchanged; nothing to publish."
  exit 0
fi
git commit -m "Update resume" -- public/Sohum-Goel-Resume.pdf
git push
echo "Pushed. The site redeploys in about a minute."
