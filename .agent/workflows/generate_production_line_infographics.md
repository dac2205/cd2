---
description: Workflow for generating production line infographics for factory comparisons
---

# Generate Production Line Infographics

This workflow guides you through generating professional infographics for factory production lines.

## Prerequisites

- Factory data with all 6 core components defined
- Understanding of factory's production workflow
- Access to AI image generation tool

## Infographic Prompt Template

Use this template for generating infographics:

```
Create a detailed horizontal production line infographic for "{Factory Name}" showing the complete {workflow description}.

Layout: Left-to-right flow with 6 connected stages, each with icons and descriptions:

1. **INPUT FEED** (icon: {icon description})
   - "{component description}"
   - Vietnamese: "{vietnamese label}"

2. **STATIONS/WORKSTEPS** (icon: {icon description})
   - "{component description}"
   - Vietnamese: "{vietnamese label}"

3. **TRANSFORMATION LOGIC** (icon: {icon description})
   - "{component description}"
   - Vietnamese: "{vietnamese label}"

4. **QUALITY GATES** (icon: {icon description})
   - "{component description}"
   - Vietnamese: "{vietnamese label}"

5. **THROUGHPUT & BOTTLENECK** (icon: {icon description})
   - "{component description}"
   - Vietnamese: "{vietnamese label}"

6. **OUTPUT** (icon: {icon description})
   - "{component description}"
   - Vietnamese: "{vietnamese label}"

Style: {aesthetic description} with {color name} primary color ({hex code}), clean sans-serif fonts, clear arrows connecting stages, professional business infographic style. White/light gray background. Include both English (primary, bold) and Vietnamese (secondary, lighter) labels for each stage.
```

## Steps

### 1. Prepare Factory Data

Ensure you have complete data for all 6 components:
- Input Feed
- Stations/Worksteps
- Transformation Logic
- Quality Gates
- Throughput & Bottleneck
- Output

### 2. Define Visual Style

Choose appropriate style for the factory type:

**Conan Content Factory**:
- Color: Orange/Red (#E74C3C)
- Aesthetic: Modern tech, digital
- Icons: Database, AI, gears, checkpoints, speedometer, rocket

**VinFast Auto Factory**:
- Color: Brown/Bronze (#A67C52)
- Aesthetic: Industrial, automotive
- Icons: Warehouse, assembly line, blueprints, inspection, robot arm, car

**Thanh Niên Newspaper**:
- Color: Warm Brown/Sepia (#8B7355)
- Aesthetic: Classic journalism, editorial
- Icons: Notepad, typewriter, rulebook, editor, clock, newspaper

### 3. Generate Infographic

Use the `generate_image` tool with the completed prompt:

```typescript
generate_image({
  ImageName: "{factory}_production_line",
  Prompt: "..." // Use template above
})
```

### 4. Review Generated Image

Check that the infographic includes:
- ✅ All 6 stages clearly visible
- ✅ Left-to-right flow with arrows
- ✅ Both English and Vietnamese labels
- ✅ Appropriate icons for each stage
- ✅ Correct color scheme
- ✅ Professional, clean design
- ✅ Readable text at normal size

### 5. Copy to Public Folder

```bash
cp /path/to/artifact/{factory}_production_line_{timestamp}.png \
   public/infographics/{factory}_production_line.png
```

### 6. Verify in Application

Add to infographics array and test:

```typescript
{
  key: '{factoryKey}',
  title: '{Factory Name} Production Line',
  titleVi: 'Dây chuyền sản xuất của {Factory Name}',
  image: '/infographics/{factory}_production_line.png'
}
```

## Factory-Specific Examples

### Conan Content Factory

```
Create a detailed horizontal production line infographic for "Conan Content Factory" showing the complete AI content workflow.

Layout: Left-to-right flow with 6 connected stages, each with icons and descriptions:

1. **INPUT FEED** (icon: database/funnel)
   - "Insight, raw thought, transcript, data, prompt block"
   - Vietnamese: "Đầu vào"

2. **STATIONS/WORKSTEPS** (icon: assembly line/conveyor)
   - "Idea gen → Structuring → Writing → Formatting → Platform adaptation"
   - Vietnamese: "Công đoạn"

3. **TRANSFORMATION LOGIC** (icon: gears/rules)
   - "Prompt logic, framework viết, brand voice, angle rules"
   - Vietnamese: "Logic biến đổi"

4. **QUALITY GATES** (icon: checkpoint/shield)
   - "Editorial rubric, tone check, logic check, hallucination check"
   - Vietnamese: "Cổng kiểm soát"

5. **THROUGHPUT & BOTTLENECK** (icon: speedometer/funnel)
   - "Prompt yếu / human review nghẽn → scale chết"
   - Vietnamese: "Tốc độ & Điểm nghẽn"

6. **OUTPUT** (icon: rocket/publish)
   - "Content publish-ready (post, reel, carousel, thread…)"
   - Vietnamese: "Đầu ra"

Style: Modern tech aesthetic with orange/red primary color (#E74C3C), clean sans-serif fonts, clear arrows connecting stages, professional business infographic style. White/light gray background. Include both English (primary, bold) and Vietnamese (secondary, lighter) labels for each stage.
```

### VinFast Auto Factory

```
Create a detailed horizontal production line infographic for "VinFast Auto Factory" showing the complete automotive manufacturing workflow.

Layout: Left-to-right flow with 6 connected stages, each with icons and descriptions:

1. **INPUT FEED** (icon: warehouse/parts)
   - "Linh kiện, module, pin, khung"
   - Vietnamese: "Đầu vào"

2. **STATIONS/WORKSTEPS** (icon: assembly line/factory)
   - "Body → Paint → Assembly → Final check"
   - Vietnamese: "Công đoạn"

3. **TRANSFORMATION LOGIC** (icon: blueprint/technical specs)
   - "SOP kỹ thuật, torque, tiêu chuẩn an toàn"
   - Vietnamese: "Logic biến đổi"

4. **QUALITY GATES** (icon: inspection/quality badge)
   - "QC giữa line, test cuối"
   - Vietnamese: "Cổng kiểm soát"

5. **THROUGHPUT & BOTTLENECK** (icon: robot arm/warning)
   - "Robot chậm → cả line chậm"
   - Vietnamese: "Tốc độ & Điểm nghẽn"

6. **OUTPUT** (icon: car/delivery)
   - "Xe đạt chuẩn xuất xưởng"
   - Vietnamese: "Đầu ra"

Style: Industrial/automotive aesthetic with brown/bronze color (#A67C52), clean sans-serif fonts, clear arrows connecting stages, professional business infographic style. White/light gray background. Include both English (primary, bold) and Vietnamese (secondary, lighter) labels for each stage.
```

### Thanh Niên Newspaper

```
Create a detailed horizontal production line infographic for "Thanh Niên Newspaper" showing the complete journalism/publishing workflow.

Layout: Left-to-right flow with 6 connected stages, each with icons and descriptions:

1. **INPUT FEED** (icon: notepad/camera)
   - "Tin thô, nguồn tin, phóng sự, ảnh"
   - Vietnamese: "Đầu vào"

2. **STATIONS/WORKSTEPS** (icon: typewriter/editorial desk)
   - "Phóng viên → Biên tập → Trình bày → In ấn"
   - Vietnamese: "Công đoạn"

3. **TRANSFORMATION LOGIC** (icon: journalism ethics/rulebook)
   - "Quy chuẩn báo chí, fact-check, headline rules"
   - Vietnamese: "Logic biến đổi"

4. **QUALITY GATES** (icon: editor/magnifying glass)
   - "Tổng biên tập duyệt, pháp lý"
   - Vietnamese: "Cổng kiểm soát"

5. **THROUGHPUT & BOTTLENECK** (icon: clock/deadline)
   - "Biên tập nghẽn → báo ra trễ"
   - Vietnamese: "Tốc độ & Điểm nghẽn"

6. **OUTPUT** (icon: newspaper/distribution)
   - "Số báo phát hành"
   - Vietnamese: "Đầu ra"

Style: Classic journalism aesthetic with warm brown/sepia color (#8B7355), clean sans-serif fonts, clear arrows connecting stages, professional business infographic style. White/light gray background. Include both English (primary, bold) and Vietnamese (secondary, lighter) labels for each stage.
```

## Quality Checklist

Before finalizing, verify:
- [ ] All 6 stages are present and labeled
- [ ] Flow direction is clear (left-to-right)
- [ ] Icons are appropriate and recognizable
- [ ] Both English and Vietnamese text visible
- [ ] Color scheme matches factory type
- [ ] Professional, clean aesthetic
- [ ] Text is readable at thumbnail size
- [ ] Arrows/connectors are clear
- [ ] Background is light/neutral
- [ ] No spelling errors

## Output

- High-quality infographic image
- Saved in `/public/infographics/`
- Ready for use in comparison pages
