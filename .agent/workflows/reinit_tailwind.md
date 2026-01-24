---
description: Re-install Tailwind CS (v4) from scratch if broken.
---

# Re-initialize Tailwind Workflow

1.  **Clean State**:
    *   Delete node_modules: `rm -rf node_modules package-lock.json`
    *   Delete config: `rm -f postcss.config.mjs tailwind.config.ts`

2.  **Install Dependencies**:
    // turbo
    *   Run: `npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer`

3.  **Create Config**:
    *   Create `postcss.config.mjs` with the standard @tailwindcss/postcss plugin structure.
    *   Ensure `app/globals.css` has `@import "tailwindcss";`.
