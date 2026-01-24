---
description: Create a new page with the standard grid card layout.
---

# Scaffold Card Page Workflow

1.  **Create Page File**:
    *   Create `app/[feature]/page.tsx`.

2.  **Apply Layout Template**:
    *   Use the standard grid container:
    ```tsx
    export default function FeaturePage() {
      return (
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8 text-ink-brown">Feature Title</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Map cards here */}
          </div>
        </div>
      );
    }
    ```

3.  **Verify**:
    *   Check responsiveness on mobile and desktop.
