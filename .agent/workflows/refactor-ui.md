---
description: Refactor a component or page to match the Detective Wood & Acoustic Theme
---

# Refactor UI to Detective Theme

This workflow helps you update existing components to use the new Design System (Detective Wood & Acoustic Theme).

## Inputs
- **FilePath**: The absolute path to the file to refactor.

## Steps

1.  **Analyze Current Styles**
    - Read the file and identify hardcoded colors (hex codes), standard Tailwind colors (e.g., `bg-white`, `text-black`, `bg-red-500`), and arbitrary font sizes.

2.  **Apply Semantic Tokens**
    - Replace Generic Colors with Theme Tokens (Defined in `globals.css` / `design-system.md`):
        - `bg-white` -> `bg-[var(--background)]` or `bg-[var(--card)]`
        - `text-black` / `text-gray-900` -> `text-[var(--foreground)]`
        - `text-gray-500` -> `text-[var(--secondary)]`
        - `bg-red-500` / Primary Action -> `bg-[var(--primary)]` + `text-[var(--primary-foreground)]`
        - Yellow/Amber accents -> `text-[var(--accent)]` or `border-[var(--accent)]`
        - Borders -> `border-[var(--border)]`

3.  **Update Typography**
    - Ensure fonts are using variables:
        - Headings: `font-serif` (if meant to be Crimson Pro) or `font-sans` (Inter).
        - Body: `font-sans`.
    - Check for "Detective" typography style (e.g., Serif for quotes/titles, Sans for UI).

4.  **Verify Tailwind v4 Compatibility**
    - Ensure no `@apply` is used in CSS modules unless necessary.
    - Use dynamic classes if needed: `className={cn("...", className)}`.

5.  **Check Output**
    - Visual check: Does it look like "Paper and Ink"?
    - Warm tones, no stark blacks (#000) or pure whites (#fff).
