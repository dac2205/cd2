---
description: Workflow for creating a new factory comparison page
---

# Create Factory Comparison Page

This workflow guides you through creating a new comparison page for the factory comparison system.

## Prerequisites

- Understand the 6 core components of production lines
- Have factory data ready (all 6 components defined)
- Review PRD and System Design documents

## Steps

### 1. Define Factory Data

Create the data structure for all factories being compared:

```typescript
const factoryData = {
  conanFactory: {
    name: "🤖 Conan Content Factory",
    color: "hsl(var(--primary))",
    components: {
      componentKey1: {
        nameEn: "English Name",
        nameVi: "Vietnamese Name",
        description: "Detailed description"
      },
      // ... all 6 components
    }
  },
  // ... other factories
};
```

### 2. Define Component Labels

Create bilingual labels for the components being compared:

```typescript
const componentLabels = [
  { key: 'componentKey1', labelEn: 'English Label', labelVi: 'Vietnamese Label' },
  // ... all components
];
```

### 3. Create Page File

Create the page at `app/theory/{page-name}/page.tsx`:

```typescript
'use client';

import { useState } from "react";

export default function ComparisonPage() {
  const [selectedFactories, setSelectedFactories] = useState<string[]>([...]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  
  // Include toggle and helper functions from System Design
  
  return (
    // Include standard page structure from System Design
  );
}
```

### 4. Add Navigation Link

Update `app/theory/page.tsx` to add the new page to the topics array:

```typescript
{
  title: "Page Title",
  description: "Page description in Vietnamese",
  href: "/theory/{page-name}",
  color: "hsl(var(--primary))"
}
```

### 5. Generate Infographics

For each factory, generate production line infographics:

```bash
# Use generate_image tool with the infographic prompt template
# Save generated images to artifacts
```

### 6. Copy Infographics to Public

```bash
cp /path/to/artifact/image.png public/infographics/{factory}_{type}.png
```

### 7. Update Infographics Array

Add infographic references to the page:

```typescript
const infographics = [
  {
    key: 'factoryKey',
    title: 'English Title',
    titleVi: 'Vietnamese Title',
    image: '/infographics/{factory}_{type}.png'
  },
  // ... all factories
];
```

### 8. Test the Page

// turbo
```bash
npm run dev
```

Navigate to `http://localhost:3002/theory/{page-name}` and verify:
- Page loads correctly
- Factory selection works
- Infographics display
- Modal enlarge works
- Table shows all data
- Bilingual content renders

### 9. Create Walkthrough

Document what was created, including:
- Page purpose and features
- Infographics generated
- Key insights taught
- Verification screenshots

## Common Issues

### Infographics not showing
- Verify files are in `/public/infographics/`
- Check image paths in infographics array
- Ensure filenames match exactly

### Modal not working
- Verify `modalImage` state is defined
- Check onClick handlers are set
- Ensure modal JSX is included at end of component

### Table data missing
- Verify all factories have all required components
- Check component keys match between data and labels
- Ensure getSelectedFactoryData() is working

## Output

- New comparison page at `/theory/{page-name}`
- 3 infographic images in `/public/infographics/`
- Navigation link in theory landing page
- Walkthrough documentation
