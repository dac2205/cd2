---
description: Comprehensive UI standards for Tailwind, Layout, and Fonts.
globs: ["app/globals.css", "app/layout.tsx", "tailwind.config.ts", "**/*.tsx"]
---

# UI & Tailwind Standards

## 1. Safety & Architecture
*   **`app/globals.css`**: MUST start with `@import "tailwindcss";`. Do NOT use old directives.
*   **`app/layout.tsx`**: Do NOT modify the `<body>` flex structure unless fixing sticky footer issues.
*   **Config**: `postcss.config.mjs` MUST use `@tailwindcss/postcss`.

## 2. Responsive Grid System
*   **The "3 Cards" Rule**: Any list of items (brands, courses) MUST be 3 columns on medium screens+.
    *   **Class**: `grid grid-cols-1 md:grid-cols-3 gap-6`
*   **Card Anatomy**: Use `h-full` on cards to equalize height. Images must use `aspect-video` or `aspect-square`.

## 3. Typography
*   **System Fonts Only**:
    *   NO Google Fonts imports.
    *   Use system font stacks for both Sans and Serif to ensure performance and native feel.
