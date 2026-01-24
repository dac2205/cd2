# Tailwind CSS v4 & UI Standardization Guide

## 1. Critical Architecture Files (Danger Zones)
These files constitute the "backbone" of the UI. Errors here will cause system-wide failures.

| File | Role | Critical Risk |
|------|------|---------------|
| `app/layout.tsx` | App Shell (HTML/Body) | Broken structure, blank pages |
| `app/globals.css` | Global Styles & Tailwind | Missing styles, broken layouts |
| `postcss.config.mjs` | CSS Compilation | Build errors, uncompiled Tailwind |
| `tailwind.config.ts` | Theme Configuration | Missing design tokens (colors, spacing) |

---

## 2. Tailwind CSS v4 Reference

### Correct Import Syntax (`app/globals.css`)
Tailwind v4 replaces the old `@tailwind` directives with a single CSS import.
**DO:**
```css
@import "tailwindcss";
```
**DON'T:**
```css
/* Old v3 syntax - Will not work fully or causes warnings */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### PostCSS Configuration (`postcss.config.mjs`)
Tailwind v4 requires the standalone PostCSS plugin.
```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // REQUIRED for v4
    autoprefixer: {},
  },
};
export default config;
```

### Dependencies
Ensure these are installed:
- `tailwindcss` (v4+)
- `@tailwindcss/postcss`
- `postcss`
- `autoprefixer`

---

## 3. UI Best Practices

### Responsive Grids (The "3 Cards" Rule)
Always design mobile-first, but be explicit about medium/large screens.
To ensure a compact 3-column layout that doesn't look "huge" on laptops:

```jsx
// Recommended for lists of cards
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Content */}
</div>
```
- `grid-cols-1`: 1 column on Mobile.
- `md:grid-cols-3`: 3 columns on Tablet/Laptop and larger.

### Typography (System Fonts)
For maximum performance and a clean, modern look, prefer system fonts over heavy Google Fonts import.

**`app/globals.css` Variables:**
```css
:root {
  /* System Sans-Serif Stack */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  
  /* System Serif Stack (if needed) */
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
}
```

---

## 4. UI Safety Checklist
Before committing UI changes, verify:
1.  **Directives**: Does `app/globals.css` start with `@import "tailwindcss";`?
2.  **Build**: Run `npm run build` to catch PostCSS/Tailwind config errors.
3.  **Responsiveness**: Check the layout on Mobile (Window width < 640px) and Laptop (Window width ~1024px).
4.  **Content Overflow**: Do cards break if the title is very long? (Use `truncate` or `line-clamp-2`).
