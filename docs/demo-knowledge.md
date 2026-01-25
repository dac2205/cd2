# Knowledge Item: Component Design Patterns

> **Type**: Knowledge Document  
> **Category**: UI Development  
> **Last Updated**: 2026-01-25

## Overview

Tài liệu này chứa các design patterns và best practices cho việc tạo components trong hệ thống. Knowledge này được sử dụng bởi skills và workflows khi cần tạo hoặc modify UI components.

## Khi Nào Knowledge Được Load

Knowledge item này được load khi:
1. **Workflow** cần hiểu project structure
2. **Skill** cần reference design patterns
3. **Rule** cần validate component structure
4. **Agent** cần context về existing codebase

## Component Structure Pattern

### File Organization
```
components/
├── ui/              # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Card.tsx
├── auth/            # Authentication components
│   └── UserMenu.tsx
└── analytics/       # Analytics components
    └── MixpanelScript.tsx
```

### Component Template
```tsx
// Standard component structure
interface ComponentNameProps {
  // Props with proper TypeScript types
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function ComponentName({
  title,
  description,
  children
}: ComponentNameProps) {
  return (
    <div className="card-wood">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
```

## Design System Tokens

### Color System
```css
/* Primary Colors */
--primary: 8 60% 49%;           /* Conan Red Soft */
--secondary: 33 50% 56%;        /* Honey Oak */
--accent: 35 55% 65%;           /* Guitar Amber */

/* Semantic Colors */
--background: 45 50% 96%;       /* Paper White */
--foreground: 25 25% 24%;       /* Ink Brown */
--border: 33 20% 85%;           /* Fog Grey */
```

### Usage Pattern
```tsx
// ✅ Correct: Use CSS variables
<div style={{ backgroundColor: "hsl(var(--primary))" }}>

// ✅ Correct: With opacity
<div style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}>

// ❌ Wrong: Hardcoded colors
<div style={{ backgroundColor: "#e74c3c" }}>
```

## Layout Patterns

### Container Pattern
```tsx
// Always wrap content in container for centering
<div className="container">
  <h1>Page Title</h1>
  <p>Content here</p>
</div>
```

### Grid Layouts
```tsx
// 3-column fixed grid
<div style={{ 
  display: "grid", 
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "1.5rem"
}}>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

### Flexbox Centering
```tsx
// Horizontal + Vertical center
<div style={{ 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center",
  minHeight: "100vh"
}}>
  <div>Centered Content</div>
</div>
```

## Animation Patterns

### Slide-in Animation
```tsx
<div className="animate-slide-in">
  Content with slide-in effect
</div>
```

### Fade-in Animation
```tsx
<div className="animate-fade-in">
  Content with fade-in effect
</div>
```

## Common Components

### Card Component
```tsx
<div className="card-wood" style={{ padding: "1.5rem" }}>
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### Button Patterns
```tsx
// Primary button
<button style={{
  padding: "0.75rem 1.5rem",
  backgroundColor: "hsl(var(--primary))",
  color: "hsl(var(--primary-foreground))",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
}}>
  Primary Action
</button>

// Secondary button
<button style={{
  padding: "0.75rem 1.5rem",
  backgroundColor: "transparent",
  color: "hsl(var(--foreground))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  cursor: "pointer"
}}>
  Secondary Action
</button>
```

## Responsive Design

### Breakpoints
```
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1400px // Extra large
```

### Mobile-First Approach
```tsx
// Start with mobile, add larger screens
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive width
</div>
```

## How Skills Use This Knowledge

### Example: UI Engineering Specialist Skill

1. **Reads** this knowledge document
2. **Understands** component patterns
3. **Applies** design system tokens
4. **Follows** layout patterns
5. **Generates** code matching these standards

### Example: Component Generator Skill

1. **Loads** component template
2. **Uses** color system tokens
3. **Applies** layout patterns
4. **Ensures** responsive design
5. **Creates** component file

## How Rules Reference This Knowledge

### Naming Convention Rule
- Checks component names against patterns in this doc
- Validates file organization structure

### Design System Rule
- Verifies color usage matches token system
- Ensures CSS variables are used correctly

### Code Quality Rule
- Validates TypeScript typing matches templates
- Checks component structure follows patterns

## Updates and Maintenance

This knowledge document is updated when:
- New design patterns are established
- Component templates change
- Design system tokens are modified
- Best practices evolve

**Version History:**
- v1.0 (2026-01-25): Initial creation with core patterns
