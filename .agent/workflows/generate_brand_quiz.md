---
description: Generate or update brand quizzes based on JTBD data.
---

# Generate Brand Quizzes

This workflow uses the **Quiz Creator** skill to generate `quiz.json` files for all brands.

1.  **Review Rules** (Optional but recommended)
    Read `.agent/rules/quiz_rules.md` to understand the quiz structure requirements.

2.  **Generate Content**
    Execute the Quiz Creator's generation script.
    // turbo
    ```bash
    node .agent/skills/quiz_creator/scripts/generate.js
    ```

3.  **Verify Output**
    Check that `quiz.json` files have been created in `data/brands/{brand}/`.
    Example:
    ```bash
    ls -l data/brands/aurora-english/quiz.json
    ```

4.  **Completion**
    The quizzes are now ready for use by the frontend application.
