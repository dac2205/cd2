---
description: Standard workflow for implementing new features or handling complex requests
---

1. **Review Documentation**:
   - Check `docs/` for relevant standards (e.g., `docs/schema/brand-data.md` for data, `docs/architecture` for code).
   - Ensure the new request aligns with existing standards.

2. **Planning**:
   - Create or update `implementation_plan.md` in the brain directory.
   - clearly outline the goal, user review requirements, and proposed changes.
   - Update `task.md` with a breakdown of the work.

3. **User Review**:
   - If the plan involves significant changes or architectural decisions, use `notify_user` to get approval on the `implementation_plan.md`.

4. **Implementation**:
   - Follow the plan step-by-step.
   - Update `task.md` status as you progress.

5. **Verification**:
   - Verify the changes (run tests, scripts, or manual checks).
   - Update `walkthrough.md` with proof of work if applicable.
