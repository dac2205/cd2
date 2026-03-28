---
description: Add a new Brand to the system and validate data
---

# Add New Brand

This workflow guides you through adding a new Brand entity to the `customer-decode-2` system, including data creation and validation.

## Inputs
- **Brand Name**: Display name (e.g., "Starbucks").
- **Slug**: URL-safe identifier (e.g., "starbucks").
- **Archetype**: (Optional) Primary archetype (e.g., "The Explorer").

## Steps

1.  **Create Brand Directory**
    - Create folder: `data/brands/<slug>`.

2.  **Create `brand.json`**
    - Create `data/brands/<slug>/brand.json` with this structure:

```json
{
  "id": "<slug>",
  "name": "<Brand Name>",
  "description": "Brief description of <Brand Name>.",
  "archetype": "<Archetype>",
  "vision": "To inspire and nurture the human spirit.",
  "colors": {
    "primary": "#000000",
    "secondary": "#ffffff"
  },
  "quiz": {
     "questions": []
  }
}
```

3.  **Create `jtbd.json` (Job to be Done)**
    - Create `data/brands/<slug>/jtbd.json` (Task data):

```json
{
  "brandId": "<slug>",
  "tasks": [
    {
      "id": "task-01",
      "type": "3-job-layers-classification",
      "title": "Analyze the Job Layers",
      "context": "Context for the task...",
      "questions": []
    }
  ]
}
```

4.  **Validate Data**
    - Run the validation script to ensure schemas are correct:
    ```bash
    npm run validate-brands
    ```
    // turbo

5.  **Verify UI**
    - Check local URL: `http://localhost:3000/brands/<slug>` to see if the detail page renders.
