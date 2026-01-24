---
description: Diagnose and fix common UI breakage issues.
---

# Check UI Health Workflow

1.  **Directives Check**:
    *   Open `app/globals.css`.
    *   Ensure the first line is `@import "tailwindcss";`.
    // turbo
    *   If missing, run: `sed -i '' '1s/^/@import "tailwindcss";\n/' app/globals.css`

2.  **Config Check**:
    *   Verify `postcss.config.mjs` exists.
    *   Open `package.json` and check for `tailwindcss`, `postcss`, `@tailwindcss/postcss`.

3.  **Build Validation**:
    *   Run `npm run build` to confirm CSS compilation works.
