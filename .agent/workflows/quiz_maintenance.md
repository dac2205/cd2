---
description: Workflow for maintaining and regenerating brand quizzes.
---

# Quiz Maintenance Workflow

This workflow is used to update the content of brand quizzes whenever the underlying JTBD data changes, or when global quiz rules (length, quantity) are updated.

## 1. Verify Source Data
Ensure `jtbd.json` exists for the target brand(s) in `data/brands/{brand}/jtbd.json`.

## 2. Run Regeneration
Use the `quiz_creator` skill to regenerate the quizzes. This script applies all current rules (20 questions, length constraints, shuffling).

```bash
// turbo
node .agent/skills/quiz_creator/scripts/generate.js
```

## 3. Verification
Check the generated `quiz/` folder in `data/brands/{brand}/` for:
- **Files**: `quiz_1.json`, `quiz_2.json`, etc.
- **Quantity**: Exactly 20 questions per file.
- **Structure**: Valid JSON array.
- **Content**: Questions appear relevant and concise (~12-15 words).

## 4. UI Validation (Optional)
If UI components were modified, verify:
- **Selection Screen** appears first.
- **Randomization** works on restart.
- **Progress Labels** show "Vòng X/3" and "Câu X/5" (or 10).
- **Auth Name** appears on summary.
