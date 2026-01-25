# Tailwind CSS v4 Configuration Guide

> **Knowledge Document**: Best practices và cấu hình chuẩn cho Tailwind CSS v4 trong Next.js projects

## Table of Contents
- [Version Requirements](#version-requirements)
- [Installation & Setup](#installation--setup)
- [Configuration Files](#configuration-files)
- [CSS Architecture](#css-architecture)
- [Common Issues & Solutions](#common-issues--solutions)
- [Best Practices](#best-practices)

---

## Version Requirements

### Package Versions (Working Configuration)
```json
{
  "dependencies": {
    "next": "^16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "tailwind-merge": "^3.4.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "autoprefixer": "^10.4.23",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.18",
    "typescript": "^5"
  }
}
```

### Critical Dependencies
- **Tailwind CSS v4**: `^4.1.18`
- **PostCSS Plugin**: `@tailwindcss/postcss` `^4.1.18` (REQUIRED for v4)
- **Autoprefixer**: `^10.4.23`
- **PostCSS**: `^8.5.6`

---

## Installation & Setup

### Step 1: Install Dependencies
```bash
npm install -D tailwindcss@latest @tailwindcss/postcss@latest autoprefixer@latest postcss@latest
npm install tailwind-merge tailwindcss-animate
```

### Step 2: PostCSS Configuration
Create `postcss.config.mjs`:

```javascript
const config = {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
    },
};

export default config;
```

**⚠️ CRITICAL**: 
- Use `@tailwindcss/postcss` NOT `tailwindcss` in plugins
- This is the **key difference** in Tailwind v4
- File extension: `.mjs` for ES modules

### Step 3: Tailwind Config
Create `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            // Your theme extensions here
        },
    },
    plugins: [],
};

export default config;
```

### Step 4: Global CSS
In `app/globals.css`:

```css
@import "tailwindcss";

:root {
  /* Your CSS variables */
}

/* Your global styles */
```

**⚠️ IMPORTANT**: Use `@import "tailwindcss"` NOT the old `@tailwind` directives in v4.

---

## Configuration Files

### 1. PostCSS Config (`postcss.config.mjs`)

**✅ CORRECT (Tailwind v4)**:
```javascript
const config = {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
    },
};
export default config;
```

**❌ WRONG (Tailwind v3 style)**:
```javascript
module.exports = {
    plugins: {
        tailwindcss: {},  // ❌ Wrong for v4
        autoprefixer: {},
    },
};
```

### 2. Tailwind Config (`tailwind.config.ts`)

**Theme Extension Pattern**:
```typescript
theme: {
    extend: {
        colors: {
            // Use CSS variables for dynamic theming
            border: "hsl(var(--border))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))",
            },
        },
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        fontFamily: {
            sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
            serif: ["var(--font-serif)", "ui-serif", "Georgia"],
        },
    },
}
```

### 3. Global CSS (`app/globals.css`)

**Structure**:
```css
@import "tailwindcss";

:root {
  /* Semantic Color Tokens */
  --background: 45 50% 96%;
  --foreground: 25 25% 24%;
  --primary: 8 60% 49%;
  --primary-foreground: 45 50% 96%;
  
  /* Layout */
  --radius: 0.5rem;
  
  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: var(--font-sans);
}
```

**Key Points**:
- Use `@import "tailwindcss"` at the top
- Define CSS variables in `:root`
- Use HSL format without `hsl()` wrapper in variables
- Apply `hsl()` when using: `hsl(var(--background))`

---

## CSS Architecture

### Color System with CSS Variables

**1. Define in globals.css**:
```css
:root {
  --background: 45 50% 96%;     /* H S L values only */
  --foreground: 25 25% 24%;
  --primary: 8 60% 49%;
}
```

**2. Reference in tailwind.config.ts**:
```typescript
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: "hsl(var(--primary))",
}
```

**3. Use in components**:
```tsx
// Tailwind classes
<div className="bg-background text-foreground">

// Inline styles
<div style={{ backgroundColor: "hsl(var(--background))" }}>

// With opacity
<div className="bg-primary/50">
<div style={{ backgroundColor: "hsl(var(--primary) / 0.5)" }}>
```

### Utility Classes Pattern

**globals.css**:
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.card-wood {
  background: hsl(var(--paper-white));
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

.text-subtext {
  color: hsl(var(--ink-brown) / 0.7);
}
```

### Animation System

**tailwind.config.ts**:
```typescript
extend: {
  keyframes: {
    "slide-in": {
      "0%": { transform: "translateX(-20px)", opacity: "0" },
      "100%": { transform: "translateX(0)", opacity: "1" },
    },
    "fade-in": {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
  },
  animation: {
    "slide-in": "slide-in 0.5s ease-out",
    "fade-in": "fade-in 0.5s ease-out",
  },
}
```

**Usage**:
```tsx
<div className="animate-slide-in">
```

---

## Centering & Layout Issues

### Common Problem: Elements Not Centered

**Symptoms**: All content appears left-aligned instead of centered on the page.

![Example of left-aligned content](file:///Users/dac/.gemini/antigravity/brain/1efde8e2-3c7d-42c8-aa30-d1acaf0fae35/uploaded_media_1769348314403.png)

### Root Causes & Solutions

#### 1. Missing Container Class

**Problem**: No max-width container wrapping content

**❌ Wrong**:
```tsx
<div>
  <h1>My Content</h1>
  <p>This will span full width</p>
</div>
```

**✅ Correct**:
```tsx
<div className="container">
  <h1>My Content</h1>
  <p>This is centered with max-width</p>
</div>
```

**Container Configuration** (tailwind.config.ts):
```typescript
theme: {
  container: {
    center: true,        // Auto margin centering
    padding: "2rem",     // Horizontal padding
    screens: {
      "2xl": "1400px",   // Max width on largest screens
    },
  },
}
```

**Container CSS** (globals.css):
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 2rem;
  }
}
```

#### 2. Body/HTML Not Full Width

**Problem**: Body element has default margins or doesn't span full width

**Solution** (globals.css):
```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  min-height: 100vh;
}

body {
  margin: 0;
  padding: 0;
}
```

#### 3. Layout Structure Issues

**Problem**: No proper layout wrapper

**✅ Correct Layout Structure** (app/layout.tsx):
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}>
        <Navbar />
        <main style={{ flex: 1, padding: '2rem 0' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

**Key Points**:
- `display: flex` + `flexDirection: column` for vertical layout
- `minHeight: 100vh` ensures full viewport height
- `flex: 1` on main pushes footer to bottom
- Padding on main, not body

### Centering Patterns

#### Pattern 1: Container + Centered Content

```tsx
<div className="container">
  <div style={{ textAlign: "center", marginBottom: "3rem" }}>
    <h1>Centered Title</h1>
    <p>Centered paragraph</p>
  </div>
</div>
```

#### Pattern 2: Flexbox Centering

**Horizontal Center**:
```tsx
<div style={{ display: "flex", justifyContent: "center" }}>
  <div>Centered content</div>
</div>
```

**Vertical + Horizontal Center**:
```tsx
<div style={{ 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center",
  minHeight: "100vh" 
}}>
  <div>Perfectly centered</div>
</div>
```

**Tailwind Classes**:
```tsx
<div className="flex justify-center items-center min-h-screen">
  <div>Perfectly centered</div>
</div>
```

#### Pattern 3: Grid Centering

```tsx
<div style={{ 
  display: "grid", 
  placeItems: "center",
  minHeight: "100vh" 
}}>
  <div>Centered with grid</div>
</div>
```

**Tailwind Classes**:
```tsx
<div className="grid place-items-center min-h-screen">
  <div>Centered with grid</div>
</div>
```

#### Pattern 4: Auto Margins

```tsx
<div style={{ 
  maxWidth: "700px", 
  margin: "0 auto",
  padding: "0 1rem"
}}>
  <p>Centered block with max-width</p>
</div>
```

**Tailwind Classes**:
```tsx
<div className="max-w-2xl mx-auto px-4">
  <p>Centered block with max-width</p>
</div>
```

### Responsive Centering

```tsx
<div className="container">
  {/* Mobile: Full width, Desktop: Centered with max-width */}
  <div className="w-full md:max-w-4xl md:mx-auto">
    <h1>Responsive Content</h1>
  </div>
</div>
```

### Common Layout Patterns

#### Full-Width Header + Centered Content

```tsx
{/* Navbar - Full Width */}
<nav style={{ 
  borderBottom: '1px solid hsl(var(--border))',
  padding: '0.75rem 0'
}}>
  <div className="container" style={{ 
    display: 'flex', 
    justifyContent: 'space-between' 
  }}>
    <div>Logo</div>
    <div>Menu</div>
  </div>
</nav>

{/* Main Content - Centered */}
<main style={{ padding: '2rem 0' }}>
  <div className="container">
    <h1>Page Title</h1>
    <p>Content here</p>
  </div>
</main>
```

#### Card Grid Layout

```tsx
<div className="container">
  <div style={{ 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    padding: "2rem 0"
  }}>
    <div className="card">Card 1</div>
    <div className="card">Card 2</div>
    <div className="card">Card 3</div>
  </div>
</div>
```

**Tailwind Classes**:
```tsx
<div className="container">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
    <div className="card">Card 1</div>
    <div className="card">Card 2</div>
    <div className="card">Card 3</div>
  </div>
</div>
```

#### Fixed 3-Column Layout

```tsx
<div className="container">
  <div style={{ 
    display: "grid", 
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "1.5rem"
  }}>
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>
```

**Tailwind Classes**:
```tsx
<div className="container">
  <div className="grid grid-cols-3 gap-6">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>
```

### Debugging Centering Issues

**Step 1: Check Container**
```tsx
// Add visible border to debug
<div className="container" style={{ border: "2px solid red" }}>
  Content
</div>
```

**Step 2: Verify Container CSS**
```css
/* In globals.css or browser DevTools */
.container {
  max-width: 1280px;  /* Should be set */
  margin: 0 auto;     /* Should be auto */
  padding: 0 1rem;    /* Should have padding */
}
```

**Step 3: Check Parent Elements**
```tsx
// Ensure parents don't restrict width
<div style={{ width: "100%" }}>  {/* ✅ Good */}
  <div className="container">
    Content
  </div>
</div>

<div style={{ width: "500px" }}>  {/* ❌ Bad - restricts container */}
  <div className="container">
    Content
  </div>
</div>
```

**Step 4: Inspect with DevTools**
- Check computed styles for `margin`, `max-width`, `width`
- Verify no conflicting CSS overriding container styles
- Check for `position: absolute` or `float` breaking layout

### Quick Fixes Checklist

When content is not centered:

- [ ] Wrap content in `<div className="container">`
- [ ] Verify container config in tailwind.config.ts
- [ ] Check `.container` CSS in globals.css
- [ ] Ensure body has no default margins: `margin: 0`
- [ ] Verify parent elements are full width
- [ ] Check for conflicting inline styles
- [ ] Use browser DevTools to inspect computed styles
- [ ] Test with visible borders for debugging

### Example: Complete Centered Page

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <div className="container">
      {/* Hero Section - Centered */}
      <div style={{ 
        textAlign: "center", 
        padding: "4rem 0" 
      }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Welcome
        </h1>
        <p style={{ 
          maxWidth: "700px", 
          margin: "0 auto",
          fontSize: "1.25rem" 
        }}>
          This content is perfectly centered
        </p>
      </div>

      {/* Grid Section - Centered Container */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1.5rem",
        marginBottom: "3rem"
      }}>
        <div className="card">Card 1</div>
        <div className="card">Card 2</div>
        <div className="card">Card 3</div>
      </div>

      {/* CTA Section - Centered */}
      <div style={{ 
        textAlign: "center",
        padding: "3rem 0"
      }}>
        <button style={{
          padding: "0.75rem 2rem",
          fontSize: "1rem"
        }}>
          Get Started
        </button>
      </div>
    </div>
  );
}
```

---

## Common Issues & Solutions

### Issue 1: Styles Not Applying

**Symptoms**: Tailwind classes don't work, no styles applied

**Solutions**:
1. ✅ Check PostCSS config uses `@tailwindcss/postcss`
2. ✅ Verify `@import "tailwindcss"` in globals.css
3. ✅ Ensure content paths in tailwind.config.ts are correct
4. ✅ Restart dev server after config changes

### Issue 2: CSS Variables Not Working

**Symptoms**: `hsl(var(--color))` shows as literal string

**Solutions**:
1. ✅ Define variables in `:root` without `hsl()` wrapper
   ```css
   /* ✅ Correct */
   --primary: 8 60% 49%;
   
   /* ❌ Wrong */
   --primary: hsl(8, 60%, 49%);
   ```

2. ✅ Apply `hsl()` when using
   ```css
   color: hsl(var(--primary));
   ```

### Issue 3: Build Errors

**Symptoms**: Build fails with PostCSS or Tailwind errors

**Solutions**:
1. ✅ Ensure version compatibility
2. ✅ Clear `.next` folder: `rm -rf .next`
3. ✅ Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`
4. ✅ Check for conflicting PostCSS plugins

### Issue 4: Dark Mode Not Working

**Solution**:
```typescript
// tailwind.config.ts
darkMode: "class",  // Enable class-based dark mode
```

```tsx
// Toggle dark mode
<html className={isDark ? "dark" : ""}>
```

### Issue 5: Custom Fonts Not Loading

**Solution**:
```typescript
// tailwind.config.ts
fontFamily: {
  sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
}
```

```css
/* globals.css */
:root {
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
}
```

---

## Best Practices

### 1. Use CSS Variables for Theming
```css
:root {
  --primary: 8 60% 49%;
  --secondary: 33 50% 56%;
}

.dark {
  --primary: 10 70% 60%;
  --secondary: 35 55% 65%;
}
```

### 2. Semantic Color Naming
```typescript
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: "hsl(var(--primary))",
  // NOT: red, blue, green
}
```

### 3. Component-Specific Utilities
```css
/* globals.css */
.card-wood {
  @apply bg-background border border-border rounded-xl shadow-md;
}
```

### 4. Responsive Design
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### 5. Use tailwind-merge for Dynamic Classes
```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

### 6. Avoid Inline Arbitrary Values
```tsx
// ❌ Avoid
<div className="w-[347px] h-[892px]">

// ✅ Better
<div className="w-full max-w-sm h-screen">
```

### 7. Organize Imports
```css
/* globals.css */
@import "tailwindcss";

/* Base styles */
:root { }
* { }
body { }

/* Utility classes */
.container { }
.card-wood { }

/* Animations */
@keyframes slide-in { }
```

---

## Migration from v3 to v4

### Key Changes

1. **PostCSS Plugin**:
   ```javascript
   // v3
   plugins: { tailwindcss: {} }
   
   // v4
   plugins: { '@tailwindcss/postcss': {} }
   ```

2. **CSS Import**:
   ```css
   /* v3 */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   /* v4 */
   @import "tailwindcss";
   ```

3. **Package Installation**:
   ```bash
   # v3
   npm install -D tailwindcss
   
   # v4
   npm install -D tailwindcss @tailwindcss/postcss
   ```

---

## Debugging Checklist

When styles don't work:

- [ ] PostCSS config uses `@tailwindcss/postcss`
- [ ] globals.css has `@import "tailwindcss"`
- [ ] CSS variables defined without `hsl()` wrapper
- [ ] Content paths include all component files
- [ ] Dev server restarted after config changes
- [ ] `.next` folder cleared
- [ ] Correct Tailwind v4 packages installed
- [ ] No conflicting PostCSS plugins

---

## Reference Configuration

### Complete Working Setup

**package.json**:
```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "autoprefixer": "^10.4.23",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.18"
  }
}
```

**postcss.config.mjs**:
```javascript
const config = {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
    },
};
export default config;
```

**tailwind.config.ts**:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
            },
        },
    },
    plugins: [],
};
export default config;
```

**app/globals.css**:
```css
@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

---

## Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Next.js with Tailwind](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)
- [PostCSS Configuration](https://postcss.org/)

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-25  
**Tested With**: Tailwind CSS v4.1.18, Next.js 16.1.4
