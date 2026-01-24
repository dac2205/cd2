---
description: Unified workflow for UI health checks, repairs, and scaffolding.
---

# UI Maintenance Workflow

## A. Check UI Health
1.  **Directives**: Ensure `app/globals.css` starts with `@import "tailwindcss";`.
2.  **Config**: Verify `postcss.config.mjs` has `@tailwindcss/postcss`.
3.  **Build**: Run `npm run build` to verify CSS compilation.

## B. Re-initialize Tailwind (Emergency)
1.  **Clean**: `rm -rf node_modules package-lock.json postcss.config.mjs tailwind.config.ts`
2.  **Re-install**: `npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer`
3.  **Configure**: Create standard `postcss.config.mjs` and ensure `globals.css` import.

## C. Scaffold New Page
1.  **Create**: `app/[feature]/page.tsx`
2.  **Template**:
    ```tsx
    export default function FeaturePage() {
      return (
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8 text-ink-brown">Title</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Cards */}
          </div>
        </div>
      );
    }
    ```
