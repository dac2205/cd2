# Brand Data Standard (Tiêu chuẩn Dữ liệu Thương hiệu)

This document serves as the **Single Source of Truth** for the structure and validation of brand data within the system. To ensure scalability for thousands of brands, all data must strictly adhere to this schema.

## 1. Directory Structure

Each brand resides in its own directory: `data/brands/{slug}/`.
The `{slug}` must be URL-friendly (kebab-case), reflecting the brand ID.

### Required Files Checklist
| File | Format | Status | Purpose |
| :--- | :--- | :--- | :--- |
| `meta.json` | JSON | **REQUIRED** | Core identity and ownership. |
| `jtbd.json` | JSON | **REQUIRED** | Jobs To Be Done framework data. |
| `audience.json` | JSON | **REQUIRED** | Structured audience segments. |
| `insights.json` | JSON | **REQUIRED** | Deep customer insights. |
| `quiz.json` | JSON | **REQUIRED** | Brand decoding quiz data. |
| `introduction.md`| Markdown | *Recommended* | Brand overview/story. |

---

## 2. File Specifications

### 2.1. Brand Metadata (`meta.json`)
Defines the brand's identity.

```json
{
  "id": "brand-slug",          // MUST match folder name
  "name": "Display Name",      // e.g., "Dược Sư Vạn Bảo"
  "tagline": "Slogan...",      // Brand slogan
  "owner": "Owner Name",       // e.g., "Huyền Trinh"
  "keywords": ["key1", "key2"] // For SEO and search
}
```

### 2.2. Jobs To Be Done (`jtbd.json`)
**CRITICAL**: This file defines the core value proposition. To ensure consistent UI and user experience, strict quantity limits apply.

#### Structure Rules:
1.  **4 Categories**: `functional`, `emotional`, `social`, `other`.
2.  **Quantity**: EXACTLY **3 Jobs** per category (Total 12 Jobs).
3.  **Completeness**: All fields are required.

#### Schema per Job Item:
```json
{
  "id": "func-1",                                // Unqiue ID within file (e.g., func-1, emo-2)
  "title": "Job Title (Name)",                   // Short, punchy title
  "description": " Detailed job description...", // What is the job?
  "situation": "Specific situation...",          // WHEN does this job arise?
  "context": "Background context...",            // WHY is this job important?
  "triggers": [                                  // WHAT triggers this job? (Array of strings)
    "Trigger 1",
    "Trigger 2",
    "Trigger 3"
  ],
  "desiredOutcome": [                            // WHAT does success look like? (Array of strings)
    "Outcome 1",
    "Outcome 2",
    "Outcome 3"
  ]
}
```

### 2.3. Audience Segments (`audience.json`)
Defines who the brand serves.

#### Structure Rules:
-   Must be an Array `[]`.
-   Must contain at least 1 segment.

#### Schema:
```json
[
  {
    "id": "segment-id",
    "title": "Segment Name",       // e.g., "Solo-Trainer"
    "isPrimary": true,             // Is this the main target?
    "description": "Markdown...",  // Detailed persona description
    "painPoints": [                // Key frustrations
      "Pain point 1",
      "Pain point 2"
    ]
  }
]
```

### 2.4. Insights (`insights.json`)
Deep psychological truths about the customer.

#### Schema:
```json
[
  {
    "id": "insight-id",
    "title": "Insight Name",
    "tension": "The core conflict/tension...",
    "belief": "Underlying belief...",
    "core": "The core insight statement...",
    "hooks": ["Hook 1", "Hook 2"],   // Marketing hooks derived from insight
    "angle": "Unique marketing angle",
    "reframe": "How the brand reframes the problem",
    "promise": "Brand promise addressing the insight",
    "rtb": "Reason to Believe (Proof)",
    "mechanism": "How it works"
  }
]
```

---

## 3. Validation
To ensure system stability with thousands of brands, run the validation script before merging content.

**Command:**
```bash
npm run validate-brands
```

**Validation Checks:**
-   [x] All required files exist.
-   [x] JSON syntax is valid.
-   [x] JTBD has exactly 4 categories with 3 items each.
-   [x] All JTBD items have full data fields (`situation`, `context`, etc.).
-   [x] Audience is an array.
-   [x] Insights have all required fields.
