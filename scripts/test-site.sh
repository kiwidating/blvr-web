#!/usr/bin/env bash
set -euo pipefail
"${BUN:-bun}" scripts/test-site.mjs
