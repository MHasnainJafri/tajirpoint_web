#!/usr/bin/env bash
# =============================================================================
# Builds the marketing site for another brand (white-label), from the same
# code tajirpoint.com ships on Vercel:
#
#   bash scripts/build-brand-site.sh scripts/brands/<brand>-site.env
#
# - Reads ONLY the env file given here: a .env / .env.local / .env.production
#   in the repo would be read by `next build` too (our GA, verification and
#   social settings), so the script stops if one is present.
# - The brand's files (BRAND_ASSETS_DIR) are copied into public/brands/<brand>/
#   (git-ignored), where they stay for the deploy; a failed build removes them.
# - After `next build` it fails if what visitors get (pre-rendered pages, the
#   browser JavaScript and CSS, public/ files) still names TajirPoint, our
#   hosts, our operator or our WhatsApp number. See check_output below.
#
# The TajirPoint build is still plain `pnpm build` (Vercel); this script is for
# the others. Deploying the output (Next standalone behind nginx on the
# brand's server) is a separate step.
# =============================================================================
set -euo pipefail

ENV_FILE="${1:-}"
die() { echo "build-brand-site: $*" >&2; exit 1; }

[[ -n "$ENV_FILE" && -f "$ENV_FILE" ]] || die "usage: $0 scripts/brands/<brand>-site.env"
ENV_FILE="$(cd "$(dirname "$ENV_FILE")" && pwd)/$(basename "$ENV_FILE")"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

for f in .env .env.local .env.production .env.production.local; do
  [[ -f "$f" ]] && die "$f would be read by next build (TajirPoint settings); move it aside first"
done

if grep -nE '^[A-Z_]+=.*<[^>]+>' "$ENV_FILE"; then die "replace every <...> in $ENV_FILE first"; fi

set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a

[[ -n "${NEXT_PUBLIC_BRAND_NAME:-}" ]] || die "NEXT_PUBLIC_BRAND_NAME is required"
for var in NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_APP_URL NEXT_PUBLIC_API_URL; do
  [[ "${!var:-}" == https://* ]] || die "$var must be an absolute https URL"
done
case "$NEXT_PUBLIC_SITE_URL $NEXT_PUBLIC_APP_URL $NEXT_PUBLIC_API_URL ${NEXT_PUBLIC_MEDIA_HOST:-} ${NEXT_PUBLIC_BRAND_EMAIL:-}" in
  *tajirpoint*) die "this env file points at TajirPoint's own hosts; a brand build needs its own" ;;
esac

SLUG="$(basename "$ENV_FILE" .env)"; SLUG="${SLUG%-site}"
ASSETS_OUT="public/brands/$SLUG"
cleanup() { [[ -n "${BRAND_ASSETS_DIR:-}" ]] && rm -rf "$ASSETS_OUT"; return 0; }
trap cleanup ERR
if [[ -n "${BRAND_ASSETS_DIR:-}" ]]; then
  [[ -d "$BRAND_ASSETS_DIR" ]] || die "BRAND_ASSETS_DIR $BRAND_ASSETS_DIR does not exist"
  rm -rf "$ASSETS_OUT"; mkdir -p "$ASSETS_OUT"
  # Files only (no sub-folders such as old-stand-in/), and no notes.
  find "$BRAND_ASSETS_DIR" -maxdepth 1 -type f ! -name '*.md' -exec cp {} "$ASSETS_OUT"/ \;
fi
for var in NEXT_PUBLIC_BRAND_LOGO NEXT_PUBLIC_BRAND_LOGO_ON_DARK NEXT_PUBLIC_BRAND_FAVICON NEXT_PUBLIC_BRAND_ICON; do
  val="${!var:-}"
  if [[ "$val" == /* && ! -f "public$val" ]]; then die "$var=$val is not a file under public/ (BRAND_ASSETS_DIR?)"; fi
done

NODE_ENV=production pnpm build

# --- What visitors get must not name us -------------------------------------
# Our name in any spelling, our hosts, our operator and our WhatsApp number.
# The webhook headers the backend really sends (X-Tajir-Signature...) are API
# facts, not branding, and are not matched.
PATTERN='tajirpoint|tajir[ -]point|tajirpos|anssol|amalaxis|\+?92 ?344 ?6800893|923446800893'

# public/ files of ours that no page of a brand build links to: they are not
# checked here, and the deploy step must leave them out.
PUBLIC_NOT_SHIPPED=(
  "public/brand"
  "public/favicon.svg" "public/favicon.ico" "public/apple-touch-icon.png"
  "public/images/PHOTO-CREDITS.json"
)

check_output() {
  local hits
  hits="$(
    {
      # Pre-rendered pages and route outputs (HTML, RSC payloads, sitemap,
      # robots, llms.txt, manifest), not the code the server runs.
      find .next/server/app -type f \( -name '*.html' -o -name '*.rsc' -o -name '*.body' -o -name '*.meta' -o -name '*.segment.rsc' \) -print0
      # Everything the browser downloads.
      find .next/static -type f \( -name '*.js' -o -name '*.css' -o -name '*.json' -o -name '*.txt' \) -print0
      # public/, apart from the files listed above and the media READMEs.
      local prune=()
      for p in "${PUBLIC_NOT_SHIPPED[@]}"; do prune+=(-path "$p" -prune -o); done
      find public "${prune[@]}" -type f ! -name 'README.md' -print0
    } | xargs -0 grep -IliE "$PATTERN" 2>/dev/null || true
  )"
  if [[ -n "$hits" ]]; then
    echo "$hits" | head -30 >&2
    echo "--- first matches:" >&2
    echo "$hits" | head -5 | tr '\n' '\0' | xargs -0 grep -IohiE ".{0,60}($PATTERN).{0,60}" 2>/dev/null | head -10 >&2 || true
    cleanup
    die "the $NEXT_PUBLIC_BRAND_NAME build still names TajirPoint in $(echo "$hits" | wc -l | tr -d ' ') file(s) (above)"
  fi
}
check_output

echo "build-brand-site: .next/ ready for $NEXT_PUBLIC_BRAND_NAME ($NEXT_PUBLIC_SITE_URL); no TajirPoint names or hosts in the output"
echo "build-brand-site: deploy without: ${PUBLIC_NOT_SHIPPED[*]} public/media/**/README.md"
