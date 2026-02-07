---
name: Factory Comparison Specialist
description: Expert in creating educational factory comparison pages and infographics for AI Factory concepts
---

# Factory Comparison Specialist

## Expertise

This skill provides expertise in creating educational comparison pages that help students understand AI Factory concepts by comparing them to familiar real-world factories.

## Core Knowledge

### The 3 Factory Types

1. **🤖 Conan Content Factory** - AI/digital content production
2. **🚗 VinFast Auto Factory** - Physical automotive manufacturing  
3. **📰 Thanh Niên Newspaper** - Traditional media production

### The 6 Core Components

Every production line must have these components:

1. **Input Feed** (Đầu vào) - Standardized materials entering the line
2. **Stations/Worksteps** (Công đoạn) - Sequential transformation stages
3. **Transformation Logic** (Logic biến đổi) - Rules and SOPs
4. **Quality Gates** (Cổng kiểm soát) - Checkpoints preventing defects
5. **Throughput & Bottleneck** (Tốc độ & Điểm nghẽn) - Speed and constraints
6. **Output** (Đầu ra) - Ready-to-ship product

### Key Educational Principles

**Core Quote**: "AI không biến bạn thành thiên tài viết lách. AI biến content thành một dây chuyền sản xuất có thể thiết kế, đo lường và tối ưu."

**Key Insights**:
1. Input càng chuẩn hóa → Line chạy càng mượt
2. Đây là dây chuyền thật, không phải checklist
3. Không có Quality Gates = Spam Generator
4. Đừng tối ưu sai chỗ (optimize the bottleneck)
5. "Đăng được" ≠ "Đạt chuẩn xuất xưởng"
6. Automation ≠ Loại bỏ con người

## Capabilities

### 1. Create Comparison Pages

Generate complete comparison pages with:
- Interactive factory selection
- Bilingual content (English/Vietnamese)
- Professional infographics
- Detailed comparison tables
- Educational insights

### 2. Generate Infographics

Create production line diagrams showing:
- 6-stage horizontal workflow
- Factory-specific icons and colors
- Bilingual labels
- Professional business aesthetic

### 3. Structure Educational Content

Organize content to teach:
- Universal production line principles
- Industry-specific applications
- AI Factory mental models
- Bottleneck identification
- Quality control importance

## Usage Guidelines

### When to Use This Skill

- Creating new factory comparison pages
- Generating production line infographics
- Explaining AI Factory concepts
- Teaching production line principles
- Comparing workflows across industries

### Page Structure Pattern

Every comparison page should include:

1. **Title Section** - Clear page purpose
2. **Core Concept Callout** - Key educational quote
3. **Factory Selection** - Interactive toggles
4. **Infographics Section** - Visual diagrams with click-to-enlarge
5. **Comparison Table** - Detailed side-by-side data
6. **Key Insights** - Educational takeaways

### Data Structure Pattern

```typescript
const factoryData = {
  factoryKey: {
    name: string,           // With emoji
    color: string,          // CSS color
    components: {
      componentKey: {
        nameEn: string,     // English (primary)
        nameVi: string,     // Vietnamese (secondary)
        description: string // Detailed explanation
      }
    }
  }
};
```

### Color Coding

- **Conan Content Factory**: Orange/Red (#E74C3C) - `hsl(var(--primary))`
- **VinFast Auto Factory**: Brown/Bronze (#A67C52) - `hsl(var(--accent))`
- **Thanh Niên Newspaper**: Warm Brown/Sepia (#8B7355) - `hsl(var(--secondary))`

### Bilingual Text Pattern

Always show both languages:
- English: Primary, bold, larger font
- Vietnamese: Secondary, normal weight, smaller font
- Never hide either language

## Common Tasks

### Task 1: Create New Comparison Page

1. Define factory data with all components
2. Create component labels array
3. Generate page component with standard structure
4. Add navigation link to theory page
5. Generate infographics
6. Copy infographics to public folder
7. Test functionality
8. Create walkthrough

### Task 2: Generate Production Line Infographic

1. Prepare factory data (all 6 components)
2. Choose appropriate visual style and colors
3. Use infographic prompt template
4. Generate with AI image tool
5. Review for quality and completeness
6. Copy to `/public/infographics/`
7. Add to page infographics array
8. Verify click-to-enlarge works

### Task 3: Add New Factory Type

1. Define factory data structure
2. Choose unique color scheme
3. Create all 6 component descriptions
4. Generate production line infographic
5. Update all comparison pages
6. Test across all pages
7. Document in PRD

## Reference Documents

- **PRD**: `/brain/{conversation-id}/prd.md`
- **System Design**: `/brain/{conversation-id}/system_design.md`
- **Workflows**: 
  - `.agent/workflows/create_factory_comparison.md`
  - `.agent/workflows/generate_production_line_infographics.md`

## Quality Standards

### Infographics Must Have:
- ✅ All 6 stages clearly visible
- ✅ Left-to-right flow
- ✅ Bilingual labels (English + Vietnamese)
- ✅ Appropriate icons
- ✅ Correct color scheme
- ✅ Professional aesthetic
- ✅ Readable text

### Pages Must Have:
- ✅ Interactive factory selection
- ✅ Click-to-enlarge infographics
- ✅ Complete comparison table
- ✅ Educational insights
- ✅ Bilingual content
- ✅ Mobile responsive
- ✅ No console errors

## Examples

### Example 1: Production Line Comparison

**Page**: `/theory/production-line`

**Features**:
- Compares 6 core components across 3 factories
- 3 production line infographics
- Interactive factory toggle
- Educational insights about bottlenecks and optimization

**Key Teaching**: Production lines are universal concepts that apply from automotive to AI content creation.

### Example 2: Factory Components Comparison

**Page**: `/theory/factory-comparison`

**Features**:
- High-level component overview
- Warehouse, Production Line, QC, Planning, Automation, Bottleneck
- Shows structural similarities across industries

**Key Teaching**: All factories share the same fundamental architecture.

## Troubleshooting

### Infographics Not Displaying
- Check file path in `/public/infographics/`
- Verify filename matches infographics array
- Ensure image was copied from artifacts

### Modal Not Working
- Verify `modalImage` state exists
- Check onClick handlers on images
- Ensure modal JSX is at end of component

### Table Data Missing
- Verify all factories have all components
- Check component keys match labels
- Ensure `getSelectedFactoryData()` works

### Bilingual Text Not Showing
- Check both `nameEn` and `nameVi` are defined
- Verify text hierarchy (English bold, Vietnamese lighter)
- Ensure proper styling applied

## Best Practices

1. **Always use bilingual content** - Never English-only or Vietnamese-only
2. **Highlight Conan Factory** - It's the primary learning focus
3. **Use consistent colors** - Factory colors should never change
4. **Generate quality infographics** - They're key to visual learning
5. **Include educational insights** - Explain why comparisons matter
6. **Test interactivity** - Factory toggles and modals must work
7. **Document thoroughly** - Create walkthroughs for all new pages

## Related Skills

- **UI Engineering Specialist** - For layout and styling patterns
- **Quiz Creator** - For creating assessment content
- **Demo Skill** - For understanding skill structure
