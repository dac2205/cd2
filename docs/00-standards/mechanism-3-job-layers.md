# Standard Mechanism: 3 Job Layers Classification

## Overview
This exercise challenges the user to classify specific Needs or Jobs into one of three categories:
1. **Functional Job**: The practical task the customer wants to accomplish.
2. **Emotional Job**: How the customer wants to feel or avoid feeling.
3. **Social Job**: How the customer wants to be perceived by others.

## Structure
The exercise consists of **3 Rounds** with increasing difficulty and/or volume.

### Round 1: Warm-up
- **Questions**: 5
- **Time Limit**: None (Self-paced)
- **Goal**: Get familiar with the definitions.

### Round 2: Deep Dive
- **Questions**: 10
- **Goal**: Reinforce understanding with more complex examples.

### Round 3: Mastery (Review)
- **Questions**: 15 (Combination of previous rounds or new mixed set)
- **Goal**: Speed and accuracy.

## Data Structure
Each task is defined in a JSON file specific to a Brand.
File Path: `data/brands/[brand_slug]/tasks/[task_id].json`

### JSON Schema
```json
{
  "id": "task-01-3-layers",
  "title": "Phân loại 3 nhóm Jobs",
  "description": "Phân biệt rõ ràng giữa Functional, Emotional và Social Jobs cho thương hiệu [Brand Name].",
  "type": "3-layers",
  "rounds": [
    {
      "round": 1,
      "questions": [
        {
          "id": "q1",
          "question": "Tôi muốn học nhanh để kịp làm dự án.",
          "options": ["Functional Job", "Emotional Job", "Social Job"],
          "correctAnswer": 0,
          "explanation": "Đây là nhu cầu thiết thực về công việc và thời gian (Functional)."
        }
      ]
    }
  ]
}
```

## Rules
1. **Randomization**:
   - The order of questions within a round must be randomized each time.
   - The order of options (Functional, Emotional, Social) must be randomized for each question.
2. **Feedback**:
   - Immediate feedback is shown after selection.
   - Correct/Incorrect status and an explanation are required.
3. **Passing**:
   - Users can proceed to the next round regardless of score (Practice mode), or require a % pass (Assessment mode). For now: Practice mode (allow next).
