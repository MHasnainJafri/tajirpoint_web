# Releasing

Nothing deploys or runs CI on an ordinary push. A release happens only when the
number in the `RELEASE` file (repo root) changes on main.

To cut a release:
1. Merge the tested work into `main`.
2. Change `RELEASE` to the next number. Format: `YYYY.MM.DD-N`, for example
   `2026.10.14-1`, where N counts releases on that day.
3. Commit "release: <number>" and push `main`.

That push runs CI on GitHub, and Vercel builds production only because the number changed
(`scripts/vercel-should-build.sh`, set as the Ignored Build Step in `vercel.json`).
Vercel never builds preview branches.

Any workflow can also be started by hand with "Run workflow" in the GitHub
Actions tab. Pushes that do not touch `RELEASE` (fixes, docs, work in progress
merged early) are stored on `main` but go live only with the next release number.
