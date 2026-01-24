---
description: Enforce system fonts and ban Google Fonts.
globs: ["app/globals.css", "app/layout.tsx"]
---

# Font Usage Rules

1.  **No Extneral Fonts**:
    *   Do NOT import Google Fonts (e.g., Inter, Roboto) in `globals.css` or `layout.tsx`.
    *   Performance and clean UI are the priority.

2.  **System Strings**:
    *   Use the standard system font stack for `--font-sans` and `--font-serif`.
    *   `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', ...`
