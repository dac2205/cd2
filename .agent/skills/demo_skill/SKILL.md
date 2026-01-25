---
name: Demo Skill
description: Minh họa cách một skill hoạt động và tương tác với knowledge và rules
---

# Demo Skill: Component Generator

## Mục Đích

Skill này minh họa cách một specialized skill:
- Sử dụng knowledge từ knowledge base
- Tuân theo rules được định nghĩa
- Thực hiện tasks cụ thể
- Có thể được gọi bởi workflows

## Khi Nào Skill Được Gọi

Skill này được invoke khi:
1. Workflow phát hiện cần tạo component mới
2. User request liên quan đến UI components
3. Sub-workflow cần generate boilerplate code

## Knowledge Dependencies

Skill này cần access các knowledge items:

### 1. Project Structure Knowledge
- File organization patterns
- Directory conventions
- Import/export standards

### 2. Design System Knowledge
- Color tokens và CSS variables
- Component styling patterns
- Responsive design breakpoints

### 3. Code Standards Knowledge
- TypeScript conventions
- React best practices
- Naming conventions

## Rules to Follow

Skill phải tuân theo các rules:

### 1. Naming Convention Rule
```
Component names: PascalCase
File names: kebab-case.tsx
CSS classes: kebab-case
```

### 2. Design System Rule
```
- Use CSS variables: hsl(var(--color))
- Follow Detective Wood theme
- Use .card-wood, .container classes
```

### 3. Code Quality Rule
```
- TypeScript strict mode
- Proper prop typing
- No any types
```

## Execution Flow

```
1. Skill Invoked by Workflow
    ↓
2. Load Required Knowledge
   - Read project structure
   - Load design system docs
   - Check code standards
    ↓
3. Validate Against Rules
   - Check naming conventions
   - Verify design system compliance
   - Ensure code quality standards
    ↓
4. Generate Component
   - Create file with proper name
   - Apply design system styles
   - Follow TypeScript conventions
    ↓
5. Return Result
   - Component created
   - Path to new file
   - Any warnings or notes
```

## Example Usage

**Input:**
```
Create a new card component for displaying brand information
```

**Skill Execution:**
1. Load Knowledge: Design system, existing card patterns
2. Apply Rules: Naming conventions, styling standards
3. Generate: `components/ui/brand-card.tsx`
4. Output: Component with proper types, styles, and structure

**Generated Component:**
```tsx
interface BrandCardProps {
  name: string;
  description: string;
}

export function BrandCard({ name, description }: BrandCardProps) {
  return (
    <div className="card-wood" style={{ padding: "1.5rem" }}>
      <h3 style={{ color: "hsl(var(--primary))" }}>{name}</h3>
      <p style={{ color: "hsl(var(--ink-brown) / 0.8)" }}>{description}</p>
    </div>
  );
}
```

## Integration with Other Components

### Called By
- Workflows (feature-implementation, ui_maintenance)
- Other skills (UI Engineering Specialist)

### Calls
- Knowledge items (design system docs)
- Rules validators (naming, styling)
- May invoke sub-skills if needed

## Error Handling

If rules are violated:
1. Skill reports violation
2. Suggests correction
3. May auto-fix if safe
4. Returns to workflow for decision

## Success Criteria

Skill execution is successful when:
- ✅ All knowledge loaded correctly
- ✅ All rules validated
- ✅ Component generated
- ✅ File created in correct location
- ✅ No TypeScript errors
