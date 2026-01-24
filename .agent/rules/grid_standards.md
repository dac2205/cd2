---
description: Standards for implementing responsive grids.
globs: ["**/*.tsx"]
---

# Responsive Grid Rules

1.  **The "3 Cards" Standard**:
    *   Any list of cards (Brands, Courses, etc.) MUST display 3 columns on medium devices and up.
    *   **Snippet**: `grid grid-cols-1 md:grid-cols-3 gap-6`

2.  **Card Anatomy**:
    *   Cards should always use `h-full` to ensure equal height in the grid.
    *   Images in cards should use `aspect-video` or `aspect-square` to prevent layout shifts.
