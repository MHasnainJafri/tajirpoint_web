#!/usr/bin/env bash
# Vercel "Ignored Build Step" (vercel.json ignoreCommand). Exit 1 = build, 0 = skip.
# Production builds only when the RELEASE number changed since the last
# production deployment; preview branches never build. See RELEASING.md.
set -u
if [ "${VERCEL_ENV:-}" != "production" ]; then
  echo "Skip: ${VERCEL_ENV:-unknown} deployment (only releases build)"; exit 0
fi
now=$(head -n1 RELEASE 2>/dev/null | tr -d '[:space:]')
prev_sha=${VERCEL_GIT_PREVIOUS_SHA:-}
if [ -z "$prev_sha" ]; then
  echo "Build: no previous production deployment"; exit 1
fi
git cat-file -e "$prev_sha^{commit}" 2>/dev/null || git fetch -q --depth=200 origin "$prev_sha" 2>/dev/null || true
prev=$(git show "$prev_sha:RELEASE" 2>/dev/null | head -n1 | tr -d '[:space:]')
if [ "$now" != "$prev" ]; then
  echo "Build: RELEASE ${prev:-none} -> ${now:-none}"; exit 1
fi
echo "Skip: RELEASE is still $now"; exit 0
