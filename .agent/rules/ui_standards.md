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

## 3. Design Principles
*   **Minimalism**: UI should be clean, focused, and free of clutter. "Less is more".
*   **High Contrast**: Primary actions (e.g., "Confirm", "Submit") MUST use high contrast (e.g., Black/White) to be instantly visible.
*   **Strict Progression**: For educational tools (Quizzes), failure states (wrong answers) should block progression to enforce mastery. "Restart" actions should be distinct from "Continue".

## 4. Typography & Colors
*   **System Fonts**: Use native system font stacks. NO Google Fonts.
*   **Color Tokens**:
    *   `--ink`: Main text color (Dark, high contrast).
    *   `--primary`: Brand accent color.
## 5. Lessons Learned (Anti-Patterns)
*   **Invisible Text**: NEVER assume a color variable (like `bg-ink`) is sufficient. ALWAYS check the computed contrast. If unsure, use standard Tailwind utilities (e.g., `bg-black text-white`) for critical buttons.
*   **Animation Jitter**: Avoid applying entrance animations (e.g., `animate-slide-in`) to containers that re-render frequently (like between quiz rounds). Use stable containers and only animate inner content if necessary.
