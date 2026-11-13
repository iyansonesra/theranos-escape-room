#!/bin/sh
# Use a normal Node installation, or this workspace's temporary QA runtime.
set -eu
cd "$(dirname "$0")/.."
runtime_path="$(command -v node || true)"
if [ -z "$runtime_path" ] && [ -x /private/tmp/node-v22.16.0-darwin-arm64/bin/node ]; then
  runtime_path=/private/tmp/node-v22.16.0-darwin-arm64/bin/node
fi
if [ -z "$runtime_path" ]; then
  echo 'Install Node.js 22+, then run npm ci and npm run build.' >&2
  exit 1
fi
if [ ! -f dist/index.html ] || [ ! -f node_modules/vite/bin/vite.js ]; then
  echo 'Run npm ci and npm run build first.' >&2
  exit 1
fi
exec "$runtime_path" node_modules/vite/bin/vite.js preview --host 127.0.0.1
