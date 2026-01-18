# Brand Data Standard

This document defines the standard structure for brand data within the `data/brands` directory. All brands must adhere to this structure to ensure compatibility with the system's UI and logic.

## Directory Structure
Each brand must have its own folder: `data/brands/[slug]/`.

## Required Files

### 1. Metadata (`meta.json`)
Defines basic brand information.
```json
{
  "id": "brand-slug",
  "name": "Display Name",
  "owner": "Owner Name"
}
```

### 2. Audience (`audience.md`)
Detailed description of the target audience, segments, and psychographics in Markdown format.

### 3. Jobs to be Done (`jtbd.json`)
Structured JTBD data divided into 4 categories. Each category MUST list 3 distinct jobs. If information is missing, use "Chưa có thông tin" as a placeholder.

```json
{
  "functional": [
    { "id": "f1", "title": "...", "description": "..." },
    { "id": "f2", "title": "...", "description": "..." },
    { "id": "f3", "title": "...", "description": "..." }
  ],
  "emotional": [ ... ], // 3 items
  "social": [ ... ],    // 3 items
  "other": [ ... ]      // 3 items
}
```

### 4. Customer Insights (`insights.json`)
Structured insights for deep-dive analysis.
```json
[
  {
    "id": "unique-id",
    "title": "Insight Title",
    "tension": "The conflict...",
    "core": "The core truth...",
    "hook": "Short catchy hook",
    "angle": "Unique perspective",
    "reframe": "Shift in thinking",
    "promise": "Brand promise",
    "rtb": "Reason to believe",
    "mechanism": "How it works"
  }
]
```

### 5. Quiz (`quiz.json`)
Interactive quiz data.
```json
[
  {
    "id": "q1",
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "explanation": "..."
  }
]
```

### 6. Fallback Content (`jtbd.md`, `insights.md`)
Markdown versions of JTBD and Insights for systems not yet using the JSON structure (legacy compatibility).

## Synchronization Rules
- If a field is missing, **DO NOT** omit it. Use explicit placeholders like `"Chưa có thông tin"` or `"TBD"`.
- Ensure all JSON files are valid and parseable.
