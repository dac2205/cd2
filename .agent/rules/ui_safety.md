---
description: Critical UI safety rules to prevent broken layout.
globs: ["app/globals.css", "app/layout.tsx", "tailwind.config.ts"]
---

# UI Safety Standards

1.  **Tailwind 4 Imports**:
    *   `app/globals.css` MUST start with `@import "tailwindcss";`
    *   NEVER use the old `@tailwind base` directives.

2.  **Layout Integrity**:
    *   Do NOT modify the `<body>` flex structure in `app/layout.tsx` without verifying the sticky footer behavior.
    *   Ensure `AuthProvider` wraps the entire content.

3.  **Config Validation**:
    *   Before running build, ensure `postcss.config.mjs` has `@tailwindcss/postcss`.
