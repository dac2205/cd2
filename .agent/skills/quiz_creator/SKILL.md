---
name: Quiz Creator
description: Expert in generating brand authentication quizzes based on JTBD configuration.
---

# Quiz Creator Skill

This skill is responsible for generating, validating, and updating the brand quizzes used for the "Functional vs Emotional vs Social" job distinction exercise.

## Capabilities

1.  **Generate Quizzes**: Automatically scans `data/brands/{brand}/jtbd.json` and generates multiple quizzes (e.g., `quiz_1.json`, `quiz_2.json`) in the `quiz/` subfolder.
2.  **Validation**: Ensures generated quizzes meet the 3-round structure requirements.
3.  **Maintenance**: Re-runs generation when source data changes.

## Instructions

### Generating Quizzes
To generate quizzes for all brands, run the generation script located in this skill's `scripts` directory.

```bash
node .agent/skills/quiz_creator/scripts/generate.js
```

### Rules Compliance
This skill adheres to the rules defined in `.agent/rules/quiz_rules.md`.
- **Source**: `brand.json` and `jtbd.json`
- **Output**: `quiz/quiz_X.json`
- **Format**: JSON Array of exactly 20 objects.
- **Content**: Must be story-driven (references brand specifics).

## Troubleshooting
- If `quiz.json` is empty, check if `jtbd.json` exists and has valid `functional`, `emotional`, or `social` arrays.
- Ensure the `generate.js` script has write permissions to `data/brands`.
