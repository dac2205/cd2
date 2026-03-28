---
description: Scaffold a new page in the Customer Decode 2 project
---

# Scaffold New Page

This workflow helps you create a new page in the `app` directory, ensuring it follows the "Detective Wood & Acoustic" theme structure.

## Inputs
- **Path**: The route path (e.g., `practice/speaking` or `dashboard/overview`).
- **Title**: The display title of the page.
- **Description**: (Optional) Meta description.

## Steps

1.  **Resolve Path**
    - Determine the full directory path: `app/<input_path>`.
    - Create the directory if it doesn't exist.

2.  **Create `page.tsx`**
    - Create `page.tsx` in the target directory.
    - Use the following template:

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "<Title> | Customer Decode",
  description: "<Description>",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--primary)] mb-4">
            <Title>
          </h1>
          <p className="text-lg text-[var(--secondary)] max-w-2xl mx-auto">
            <Description>
          </p>
        </header>

        {/* Content Section */}
        <section className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-8 shadow-sm relative overflow-hidden">
             {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--primary)] opacity-80" />
            
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <p>Start building your content here...</p>
            </div>
        </section>
      </div>
    </main>
  );
}
```

3.  **Verify**
    - Ensure the file is created.
    - Run the dev server and check if the route loads (if currently running).
