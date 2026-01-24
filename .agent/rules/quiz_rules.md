# Quiz Creation Rules

These rules govern the creation and structure of brand quizzes in the Conan School system.

## 1. Structure
- **Rounds**: Every quiz session MUST follow this sequence:
    - **Round 1**: 5 Questions. (Focus: Warm up)
    - **Round 2**: 10 Questions. (Focus: Deepening)
    - **Round 3**: 15 Questions. (Focus: Mastery)
    - **Total**: 30 unique questions per session.

## 2. Content & Generation
- **Source**: `jtbd.json` -> `quiz/quiz_X.json`.
- **Constraint**: 
    - **Story-Driven**: Questions must reference specific brand details (e.g., ingredients, founders, technology) found in `brand.json` or `jtbd.json`.
    - **Length**: concise (12-15 words).
    - **Quantity**: Exactly 30 questions per quiz file.
    - **Variety**: Generate at least 2 distinct quiz files per brand (`quiz_1.json`, `quiz_2.json`).

## 3. Storage
- **Location**: `data/brands/{brand_slug}/quiz/quiz_{n}.json`.
- **Format**: JSON Array of exactly 30 objects.
- **Forbidden**: Do NOT use `.md` files for data storage. All data must be in `brand.json`, `jtbd.json`, etc.

## 4. Display Rules (UI)
- **Selection Screen**: 
    - User must see a specific "Start Challenge" screen.
    - Display random quiz selection info (e.g., "Random from 2 available quizzes").
- **Logic**:
    - **No Sudden Death**: Wrong answers do NOT end the round immediately. The user completes all questions in the round.
    - **Mastery**: 100% correctness is enforced at the **end** of the round via the Round Summary.
- **Randomization**:
    - **Quiz File**: Select one random `quiz_X.json` at session start.
    - **Questions**: Shuffle the 20 questions from that file.
    - **Options**: Randomize options per question.
- **Authentication**:
    - Display user's real name.
- **Round Summary**:
    - **Messaging**: Always POSITIVE.
    - **Progression**:
        - **< 100%**: Soft Fail (Retry Round).
        - **100%**: PASS (Next Round).
    - **Detailed Review**: 
        - Label: "Xem kết quả chi tiết".
        - Content: Show ALL questions, with "Bạn chọn" (if wrong) and "Đáp án đúng".bs.
