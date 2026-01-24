# Quiz Creation Rules

These rules govern the creation and structure of brand quizzes in the Conan School system.

## 1. Structure
- **Rounds**: Every quiz session MUST follow this sequence:
    - **Round 1**: 5 Questions. (Focus: Warm up)
    - **Round 2**: 5 Questions. (Focus: Deepening)
    - **Round 3**: 10 Questions. (Focus: Mastery)
    - **Total**: 20 unique questions per session.

## 2. Content & Generation
- **Source**: `jtbd.json` -> `quiz.json`.
- **Constraint**: 
    - **Length**: Questions should be concise (Target: 12-15 words).
    - **Quantity**: Exactly 20 high-quality questions.
- **Fields**: 
    - `id`: unique string.
    - `question`: The text content.
    - `options`: Array of 3 strings ["Functional Job", "Emotional Job", "Social Job"].
    - `correctAnswer`: Index (0, 1, or 2).
    - `explanation`: Specific text explaining why it is that job type.

## 3. Storage
- **Location**: `data/brands/{brand_slug}/quiz.json`.
- **Format**: JSON Array of exactly 20 objects.

## 4. Display Rules (UI)
- **Selection Screen**: 
    - User must see a specific "Start Challenge" screen (Selection State).
    - Do NOT auto-start the quiz on page load.
- **Randomization**:
    - **Questions**: Randomized order on every session start/restart.
    - **Options**: Randomized per question (e.g., "Functional Job" isn't always option #1).
- **Authentication**:
    - **User Name**: Display the user's real name (from Google Auth) on success/failure screens.
- **Visuals**:
    - **Confirm Button**: High contrast (Black/White).
    - **Labels**: Use clear "Vòng X/Y", "Câu X/Y".
    - **Clean Interface**: Do NOT show Timer or "Guest User".
- **Round Summary**:
    - **Messaging**: Always POSITIVE ("Chúc mừng [Name] đã đạt [XX]%").
    - **Color**: Use Primary/Green colors (Never Red/Failure for the main status).
    - **Progression Logic**:
        - **< 100%**: Soft Fail. Message: "Tuy nhiên, bạn cần đạt 100%...". Action: "Làm lại từ đầu".
        - **100%**: PASS. fireworks + "Next Round".
    - **Detailed Review**: 
        - Label: "Xem kết quả chi tiết".
        - Content: Show ALL questions, with "Bạn chọn" (if wrong) and "Đáp án đúng".bs.
