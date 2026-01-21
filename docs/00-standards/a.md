# 📚 TIÊU CHUẨN THIẾT KẾ BÀI HỌC TƯƠNG TÁC CAO
## Tensai Interactive Learning Standard v1.0

> *Tài liệu tổng hợp đầy đủ nhất - Có thể tái sử dụng cho dự án khác*

---

## 🎯 MỤC LỤC

1. [Triết Lý Cốt Lõi](#1-triết-lý-cốt-lõi)
2. [Cấu Trúc Bài Học](#2-cấu-trúc-bài-học)
3. [Các Loại Câu Hỏi Tương Tác](#3-các-loại-câu-hỏi-tương-tác)
4. [Giới Hạn Cognitive Load](#4-giới-hạn-cognitive-load)
5. [Tiêu Chuẩn Nội Dung](#5-tiêu-chuẩn-nội-dung)
6. [Tiêu Chuẩn Sư Phạm](#6-tiêu-chuẩn-sư-phạm)
7. [Quy Trình Sản Xuất](#7-quy-trình-sản-xuất)
8. [Validation Checklist](#8-validation-checklist)
9. [Anti-Patterns](#9-anti-patterns)

---

## 1. TRIẾT LÝ CỐT LÕI

### 1.1 Nguyên Tắc Nền Tảng

| # | Nguyên Tắc | Mô Tả |
|---|------------|-------|
| 1 | **Interaction-First** | Học bằng thực hành (≥85% interaction ratio) |
| 2 | **Mobile-First No-Scroll** | Tối ưu cho thiết bị di động, không cuộn trang |
| 3 | **Cognitive Friction** | Duy trì ma sát nhận thức - KHÔNG gợi ý đáp án |
| 4 | **Inquiry-Based** | Dẫn dắt người học tự khám phá thay vì dump info |
| 5 | **Language Purity** | 100% tiếng Việt thuần khiết |

### 1.2 Mô Hình ASK

Mỗi bài học phải bao phủ đủ 3 phase:

```
┌─────────────┬─────────────┬─────────────┐
│  ATTITUDE   │  KNOWLEDGE  │    SKILL    │
│  (Thái độ)  │ (Kiến thức) │  (Kỹ năng)  │
├─────────────┼─────────────┼─────────────┤
│ Hook + Why  │  Concepts   │  Practice   │
│ Identity    │  Definitions│  Application│
│ Commitment  │  Understanding│ Transfer  │
└─────────────┴─────────────┴─────────────┘
```

### 1.3 Bloom's Taxonomy

| Level | Tên | Mô Tả | Bắt Buộc |
|-------|-----|-------|----------|
| L1 | Remember | Nhớ lại thông tin | ≥2 screens |
| L2 | Understand | Hiểu và giải thích | ≥2 screens |
| L3 | Apply | Áp dụng vào tình huống mới | **≥2 screens** |

> ⚠️ **QUAN TRỌNG**: Mỗi bài học PHẢi có ≥2 câu hỏi Bloom Level 3

---

## 2. CẤU TRÚC BÀI HỌC

### 2.1 Theory Lesson - Pattern 10+3

**Tổng quan**: 10 tương tác xen kẽ + 3 bài recap cuối

```
INFO → EXERCISE → EXERCISE → INFO → EXERCISE → EXERCISE → ...
                                                          ↓
                           RECAP BLOCK (3 exercises) ← ← ←
```

#### Thông Số Kỹ Thuật

| Yếu tố | Tiêu chuẩn |
|--------|------------|
| **Tổng screens** | 13-16 |
| **Tương tác tối thiểu** | 13 |
| **Content screens** | 3-4 (tối đa) |
| **Recap exercises** | **Chính xác 3** |
| **Interaction ratio** | ≥70% |

#### Cấu Trúc Chi Tiết

```yaml
Block 1 (Concept A):
  - s1: content (Hook + Introduce A) → max 50 words
  - s2: multiple_choice (Easy)
  - s3: true_false hoặc fill_blank (Easy-Medium)

Block 2 (Concept B):
  - s4: content (Introduce B) → max 50 words
  - s5: multiple_choice (Medium)
  - s6: scenario_branching (Medium, Bloom L3)
  - s7: multiple_choice hoặc true_false (Medium)

Block 3 (Concept C - Optional):
  - s8: content (Deepen A+B) → max 50 words
  - s9: multiple_choice (Medium)
  - s10: scenario_branching (Medium-Hard, Bloom L3)

Recap Block (BẮT BUỘC):
  - s11: multiple_choice - Recall concept chính
  - s12: scenario_branching - Kết hợp A+B (Hard, Bloom L3)
  - s13: reflection hoặc true_false - Tổng hợp insight
```

### 2.2 Practice Lesson - Pattern 30+

**Tổng quan**: 30+ bài tập với độ khó tăng dần

#### Thông Số Kỹ Thuật

| Yếu tố | Tiêu chuẩn |
|--------|------------|
| **Tổng exercises** | ≥30 |
| **Content screens** | 2 (mở + kết) |
| **Phase 1 - Dễ** | 8-10 bài (success rate 90%+) |
| **Phase 2 - Trung bình** | 10-12 bài (success rate 70-85%) |
| **Phase 3 - Khó** | 8-10 bài (success rate 60-75%) |

#### Phase 1: Khởi Động (Dễ)

| Yếu tố | Tiêu chuẩn |
|--------|------------|
| **Số lượng** | 8-10 bài |
| **Type distribution** | MCQ 60%, T/F 40% |
| **Đặc điểm** | Câu hỏi trực tiếp, đáp án sai rõ ràng |
| **Bloom Level** | L1-L2 |

**Pattern câu hỏi**:
- "X thuộc loại nào?"
- "Định nghĩa của Y là gì?"
- "Đúng hay sai: [tuyên bố từ bài học]"

#### Phase 2: Củng Cố (Trung bình)

| Yếu tố | Tiêu chuẩn |
|--------|------------|
| **Số lượng** | 10-12 bài |
| **Type distribution** | MCQ 50%, Scenario 30%, Matching 20% |
| **Đặc điểm** | Tình huống thực, cần suy nghĩ |
| **Bloom Level** | L2-L3 |

**5 Bối Cảnh BẮT BUỘC**:
1. **Nhà sáng lập khởi nghiệp** - "Lan vừa nghỉ việc để mở công ty..."
2. **Nhân viên công ty lớn** - "Minh làm quản lý ở FPT được 5 năm..."
3. **Chuyên gia tự do** - "Hùng làm tư vấn độc lập..."
4. **Người sáng tạo nội dung** - "Linh có kênh YouTube 50k followers..."
5. **Người chuyển ngành** - "Tuấn muốn chuyển từ tài chính sang công nghệ..."

#### Phase 3: Thử Thách (Khó)

| Yếu tố | Tiêu chuẩn |
|--------|------------|
| **Số lượng** | 8-10 bài |
| **Type distribution** | Scenario 50%, MCQ 30%, Reflection 20% |
| **Đặc điểm** | Nhiều biến số, cần tổng hợp nhiều concept |
| **Bloom Level** | L3-L4 |

**Yêu cầu Scenario**:
- Ít nhất 3 biến số cần xem xét
- Mỗi lựa chọn có hậu quả rõ ràng
- Không có đáp án hoàn hảo

### 2.3 Complex Theory - Micro-Progression

Áp dụng cho concept có ≥4 bước hoặc ≥3 pillars:

```
Component A → Checkpoint → Component B → Checkpoint + Connection → ... → Final Recap
```

---

## 3. CÁC LOẠI CÂU HỎI TƯƠNG TÁC

### 3.1 Primary Types (Có component riêng)

| Type | Component | Required Fields |
|------|-----------|-----------------|
| `content` | ContentReveal | id, type, title, content |
| `multiple_choice` | MultipleChoice | id, type, question, options, correctAnswer |
| `true_false` | TrueFalse | id, type, question, correctAnswer |
| `reflection` | Reflection | id, type, question, prompts |
| `fill_blank` | FillBlank | id, type, question, correctAnswer |

### 3.2 Alias Types (Render bằng component khác)

| Type | Renders As | Required Fields |
|------|------------|-----------------|
| `scenario` | MultipleChoice | id, type, scenario, question, options, correctAnswer |
| `matching` | ContentReveal | id, type, question, pairs |
| `ordering` | ContentReveal | id, type, question, items, correctOrder |

### 3.3 Simulation Types

| Type | Component | Use Case |
|------|-----------|----------|
| `linear_flow` | LinearFlow | Quy trình tuần tự |
| `comparison_flow` | ComparisonFlow | So sánh 2 khái niệm |
| `scenario_branching` | ScenarioBranching | Quyết định với hậu quả |

### 3.4 Screen Type Distribution (Theory Lesson)

| Type | Count | Purpose |
|------|-------|---------|
| Content | 3-4 | Info chunks |
| Multiple Choice | 4-6 | Core practice |
| Scenario | 2-3 | Application (Bloom L3) |
| True/False | 1-2 | Misconception |
| Reflection | 0-1 | Personal connection |

### 3.5 ⛔ KHÔNG SỬ DỤNG

- `overview` → Dùng `content` thay thế
- `theory` → Dùng `content` thay thế
- `practice` → Không dùng làm screen type

---

## 4. GIỚI HẠN COGNITIVE LOAD

### 4.1 Word Count Per Screen

| Screen Type | Limit | Item Limit | Notes |
|-------------|-------|------------|-------|
| **Content** | 55 words | 2 items | Bao gồm cả bullets |
| **MCQ** | 25 words | 4 options | Option text < 15 words |
| **Reflection** | 20 words | - | Khuyến khích suy nghĩ |

### 4.2 Per-Lesson Limits

| Metric | Maximum |
|--------|---------|
| New concepts per screen | 1 |
| New concepts per lesson | 3 |
| Consecutive theory screens | 2 |
| Words per screen | 150 (tuyệt đối) |
| Avg words per screen | 100 |

### 4.3 🚫 Critical Violations (Blocking Gate)

1. **Item Bloat**: >4 items trong một màn hình content (Chuẩn: 2)
2. **Wall of Text**: >75 từ trong một khối nội dung (Chuẩn: 55)
3. **Consecutive Content**: >2 màn hình content liên tiếp

---

## 5. TIÊU CHUẨN NỘI DUNG

### 5.1 Language Rules

| Rule | Requirement |
|------|-------------|
| **Ngôn ngữ** | 100% tiếng Việt |
| **Exception** | Proper nouns, thuật ngữ không dịch được |
| **Code-switching** | 0 instances allowed |

### 5.2 Lesson Title Standard

| Yếu tố | Tiêu chuẩn |
|--------|------------|
| **Format** | Phải là CÂU HỎI (kết thúc bằng `?` hoặc bắt đầu bằng từ nghi vấn) |
| **Độ dài** | Tối đa 25 ký tự |
| **Ngôn ngữ** | 100% tiếng Việt |

**Ví dụ tốt**: "Ethos là gì?", "Tại sao cần xây uy tín?"

### 5.3 Concreteness Rule

TUYỆT ĐỐI tránh:
- ❌ "Tình huống A và B"
- ❌ "Người X làm việc Y"
- ❌ Ví dụ trừu tượng, generic

PHẢI dùng:
- ✅ Tên người cụ thể: "Anh Minh", "Chị Lan"
- ✅ Bối cảnh cụ thể: "văn phòng FPT", "quán cafe Highland"
- ✅ Số liệu cụ thể: 47, 83, 94.3% (số lẻ)

### 5.4 Feedback Rules

| Loại | Yêu Cầu | Word Limit |
|------|---------|------------|
| **Đúng** | Khẳng định + **Từ khóa in đậm** + Lý do ngắn | ≤30 từ |
| **Sai** | Giải ảo hiểu lầm + Đáp án đúng + Tại sao | ≤30 từ |

**Tránh**: "Sai rồi, hãy thử lại" (sáo rỗng)

### 5.5 Mandatory Elements

| Element | Requirement |
|---------|-------------|
| **Reframe** | Bài lý thuyết PHẢI có ≥1 câu hỏi/nội dung tái cấu trúc tư duy |
| **Big Idea** | Kết thúc module PHẢI có câu tuyên bố khẳng định đơn giản, dễ nhớ |
| **Hook** | Mở đầu bằng câu hỏi gây tò mò hoặc thách thức |

---

## 6. TIÊU CHUẨN SƯ PHẠM

### 6.1 Inquiry-Based Learning Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. KEY QUESTION                                             │
│    Câu hỏi gây tò mò, thách thức nhận thức cũ              │
│    VD: "Tại sao người giỏi nhất thường không được thăng    │
│    tiến?"                                                   │
├─────────────────────────────────────────────────────────────┤
│ 2. EXPLORATION                                              │
│    Đưa người học vào tình huống thực tế để dự đoán        │
├─────────────────────────────────────────────────────────────┤
│ 3. DISCOVERY                                                │
│    Reveal kết quả bất ngờ để người học tự nhận ra insight  │
│    VD: "Hoá ra sếp không có thời gian verify năng lực..."  │
├─────────────────────────────────────────────────────────────┤
│ 4. BIG IDEA                                                 │
│    Chốt lại thành nguyên lý ngắn gọn, autoridad            │
│    VD: "Cảm nhận = Thực tế"                                 │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Pedagogical Rules

| Rule | Mô Tả |
|------|-------|
| **No Info-Dumping** | Không liệt kê định nghĩa ngay đầu. Để người học cần thông tin trước khi cung cấp |
| **Tension First** | Luôn tạo mâu thuẫn/tò mò TRƯỚC khi đưa kiến thức |
| **Cognitive Friction** | TUYỆT ĐỐI không tô đậm đáp án hoặc gợi ý lộ liễu |
| **Meaningful Failure** | Feedback sai phải giải thích TẠI SAO sai, giải ảo hiểu lầm |

### 6.3 No Bold Answers Rule

⚠️ **CRITICAL**: 
- KHÔNG tô đậm đáp án đúng trong câu hỏi
- KHÔNG in nghiêng hoặc highlight gợi ý
- Người học PHẢI thực sự đọc và nghĩ để tìm câu trả lời

### 6.4 Interleaving Pattern

```
❌ TRÁNH:
Content → Content → Content → Exercise → Exercise → Exercise

✅ NÊN:
Content → Exercise → Exercise → Content → Exercise → Exercise
```

---

## 7. QUY TRÌNH SẢN XUẤT

### 7.1 4-Phase Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│ PHASE 1: STRATEGY (Content Strategist)                      │
│ Input: Lesson topic, course context                         │
│ Output: Core concepts, outcomes, misconceptions             │
│ Gate 1: <3 concepts per lesson, measurable verbs            │
├─────────────────────────────────────────────────────────────┤
│ PHASE 2: STRUCTURE (Interaction Designer)                   │
│ Action: Apply 10+3 or 30+ pattern                          │
│ Gate 2: Interaction ratio ≥70%, screen type distribution   │
├─────────────────────────────────────────────────────────────┤
│ PHASE 3: CONTENT (Content Writer)                           │
│ Action: Write atomic screens per cognitive load standards   │
│ Gate 3: No bold answers, concrete examples, reframes       │
├─────────────────────────────────────────────────────────────┤
│ PHASE 4: QUALITY (Quality Inspector)                        │
│ Actions:                                                    │
│ - Language Purity scan (0 English)                         │
│ - Format validation (schema compatibility)                  │
│ - QAS enforcement (no duplicate answer in question)        │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Quality Gates

| Gate | Tool | Target |
|------|------|--------|
| Format Validation | `validate-lesson.js` | Schema compatibility |
| QAS Check | `validate-lesson.js` | Duplicate answer detection |
| Language Purity | grep/Search | Banned English keywords |

---

## 8. VALIDATION CHECKLIST

### 8.1 Theory Lesson (10+3)

```
Structure:
- [ ] Total screens ≥13
- [ ] Content screens ≤4
- [ ] No 2 consecutive content screens
- [ ] Pattern: info→ex→ex repeats
- [ ] Exactly 3 recap at end

Types:
- [ ] MCQ ≥50% of exercises
- [ ] At least 2 scenario_branching (Bloom L3)

Content:
- [ ] All exercises have **bold** in explanation
- [ ] 100% Vietnamese
- [ ] Word count per screen ≤55 (content)
```

### 8.2 Practice Lesson (30+)

```
Structure:
- [ ] Tổng bài tập ≥30
- [ ] Phase Dễ: 8-10 bài
- [ ] Phase Trung bình: 10-12 bài
- [ ] Phase Khó: 8-10 bài
- [ ] Content screens: 2 (mở + kết)

Types:
- [ ] Trắc nghiệm ≥50% tổng bài tập
- [ ] Tình huống ≥5 bài
- [ ] Suy ngẫm ≥2 bài

Contexts:
- [ ] Có ít nhất 5 bối cảnh khác nhau
- [ ] Đủ 5 bối cảnh bắt buộc

Progression:
- [ ] Độ khó tăng dần rõ ràng
- [ ] Không có bài khó ở giai đoạn dễ

Feedback:
- [ ] Mọi đáp án sai có giải thích
- [ ] **Từ khoá in đậm** trong phản hồi
- [ ] Phản hồi bài khó có phân tích đánh đổi

Language:
- [ ] 100% tiếng Việt
```

### 8.3 Universal Checks

```
ASK Coverage:
- [ ] Attitude screens ≥2
- [ ] Knowledge screens ≥2
- [ ] Skill screens ≥2

Bloom Levels:
- [ ] Level 3 screens ≥2
- [ ] Screens require reasoning (not just recall)

Cognitive Load:
- [ ] Max concepts per screen: 1
- [ ] Max concepts per lesson: 3
- [ ] Max consecutive theory: 2
- [ ] Max words per screen: 150

Schema:
- [ ] All screen types in supported list
- [ ] All required fields present
- [ ] No duplicate answer text in questions (QAS)
```

---

## 9. ANTI-PATTERNS

### 9.1 Structure Anti-Patterns

| ❌ Tránh | ✅ Thay thế |
|----------|-------------|
| Content → Content → Content | Content → Exercise → Exercise |
| 5+ exercises rồi mới content | Xen kẽ: Info → 2-3 Ex → Info |
| Không có recap cuối | Luôn có 3 recap exercises |
| Cùng loại câu hỏi 3x liên tiếp | Đa dạng types trong block |

### 9.2 Content Anti-Patterns

| ❌ Tránh | ✅ Thay thế |
|----------|-------------|
| "Người A làm việc B" | "Anh Minh làm quản lý ở FPT" |
| Số tròn: 50%, 100 | Số lẻ: 47%, 94.3, 127 |
| **Đáp án đúng** in đậm | Không highlight đáp án |
| Wall of text >75 từ | Max 55 từ, chia nhỏ |
| Info-dump ngay đầu | Tension first, then info |

### 9.3 Feedback Anti-Patterns

| ❌ Tránh | ✅ Thay thế |
|----------|-------------|
| "Sai rồi, thử lại" | "Chưa đúng. **X** mới đúng vì [lý do]" |
| Feedback >50 từ | Max 30 từ, tinh gọn |
| Không giải thích tại sao sai | Giải ảo hiểu lầm cụ thể |

---

## 📎 PHỤ LỤC

### A. Component Schema Reference

```yaml
multiple_choice:
  required_props:
    - title (string)
    - question (string)
    - options (array):
        - id (string/number)
        - text (string)
        - isCorrect (boolean)
        - feedback (string) - Optional but recommended

scenario_branching:
  required_props:
    - title (string)
    - question (string)
    - context (string) - Optional
    - correctIndex (number) - 0-based
    - explanation (string)
    - options (array):
        - text (string)
        - outcome (string) - Feedback for this choice

comparison_flow:
  required_props:
    - title (string)
    - left: { label, color, items[] }
    - right: { label, color, items[] }
    - result (string) - Big Idea conclusion
```

### B. Lesson ID Format

```
Pattern: {CAT}-{NUMBER}-{LESSON}
Example: PB-001-01, FOOD-101-03, AI-002-15
```

### C. Course Metadata Schema

| Property | Requirement | Description |
|----------|-------------|-------------|
| `id` | Mandatory | Format: {cat}-{number} |
| `title` | Mandatory | Max 50 ký tự |
| `valueProposition` | Mandatory | Focus vào Transformation |
| `difficultyLevel` | Mandatory | 1-5 (Fish icons) |
| `category` | Mandatory | AI, Content, Business... |

---

## 🔄 VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-21 | Initial comprehensive standard |

---

*Standardized for Industrial-Scale Interactive Learning Production*
*© Tensai Learning Factory v5.53.0*
