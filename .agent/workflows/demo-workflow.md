---
description: Demo workflow minh họa cách workflows tương tác với skills, rules, và knowledge
---

# Demo Workflow: Feature Implementation

Workflow này minh họa cách một feature được implement thông qua sự phối hợp của workflows, skills, rules, và knowledge.

## Bước 1: Xác Thực và Kiểm Tra

Trước khi bắt đầu, workflow sẽ:
- Kiểm tra user authentication (Rule)
- Load project context từ knowledge base (Knowledge)
- Verify permissions và constraints (Rule)

## Bước 2: Phân Tích Yêu Cầu

Workflow phân tích request của user:
- Đọc existing codebase patterns (Knowledge)
- Identify loại feature (UI, Backend, Data, etc.)
- Determine skill cần thiết

## Bước 3: Gọi Skill Phù Hợp

Dựa trên loại feature, workflow sẽ invoke skill tương ứng:

**Nếu là UI feature:**
- Invoke "UI Engineering Specialist" skill
- Skill sẽ load Tailwind v4 configuration (Knowledge)
- Apply design system rules (Rule)

**Nếu là Auth feature:**
- Invoke "Authentication Specialist" skill
- Load Supabase auth patterns (Knowledge)
- Apply security policies (Rule)

## Bước 4: Thực Thi

Skill được invoke sẽ:
1. Read relevant knowledge documents
2. Follow applicable rules
3. Generate code hoặc perform actions
4. Có thể gọi sub-workflows nếu cần

## Bước 5: Validation

Sau khi hoàn thành:
- Run validation rules
- Check code quality standards (Rule)
- Verify against knowledge base best practices

## Bước 6: Completion

- Return results to user
- Update knowledge base nếu có patterns mới
- Log execution for future reference

---

## Ví Dụ Execution Flow

```
User Request: "Create a new purchase journey page"
    ↓
Workflow: /feature-implementation
    ↓
Rule Check: Authentication ✓
    ↓
Knowledge Load: Project structure, existing pages
    ↓
Skill Invoke: UI Engineering Specialist
    ↓
    Knowledge Load: Tailwind v4 config
    ↓
    Rule Apply: Detective Wood design system
    ↓
    Sub-workflow: Component creation
        ↓
        Skill: Code generator
        ↓
        Rule: Naming conventions
    ↓
Validation: Code quality check
    ↓
Completion: Page created successfully
```

## Turbo Mode

// turbo-all

Workflow này có thể auto-run tất cả các commands an toàn.
