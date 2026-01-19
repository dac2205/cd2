# Design System: Detective Wood & Acoustic Theme

This design system is based on the `conan.school` brand, featuring a "Detective Wood" aesthetic with warm, natural tones and clean typography.

## 1. Color Palette

### Core Colors
- **Paper White** (Background/Cards): `hsl(45 50% 96%)` / `#FAF7F0`
- **Ink Brown** (Text/Foreground): `hsl(25 25% 24%)` / `#4C3A2E`
- **Conan Red Soft** (Primary/Destructive): `hsl(8 60% 49%)` / `#C74433`
- **Honey Oak** (Secondary): `hsl(33 50% 56%)` / `#C89254`
- **Maple Cream** (Muted/Popover): `hsl(38 60% 81%)` / `#EED7B0`
- **Guitar Amber** (Accent/Ring): `hsl(33 62% 45%)` / `#B97A2B`
- **Caramel Walnut** (Borders/Charts): `hsl(28 42% 43%)` / `#9C6F41`
- **Deep Espresso** (Footer Background): `hsl(0 11% 21%)` / `#3B2F2F`
- **Fog Grey** (Borders): `hsl(0 0% 91%)` / `#E7E7E7`
- **Copper Line** (Decor): `hsl(28 43% 46%)` / `#A87444`

### Semantic Usage
- **Background**: Paper White
- **Prose**: Ink Brown (90% opacity for body)
- **Primary Buttons/Highlights**: Conan Red Soft
- **Accents/Hovers**: Guitar Amber
- **Secondary Elements**: Honey Oak
- **Subtle Backgrounds**: Maple Cream

## 2. Typography

### Font Families
- **Sans Serif (Headings/UI)**: `'Inter'`, system-ui, sans-serif
- **Serif (Quotes/Accents)**: `'Crimson Pro'`, Georgia, serif
- **Monospace**: `ui-monospace`, monospace

### Hierarchy
- **H1**: Bold (700), `-0.015em` spacing, 1.2 line height
- **H2**: Semibold (600), `-0.01em` spacing, 1.3 line height
- **H3**: Semibold (600), `-0.005em` spacing, 1.4 line height
- **Body**: Normal (400), 1.5 line height

## 3. UI Components

### Buttons
- Rounded corners (`0.5rem` / `8px`)
- Hover effects with `transform` and slightly reduced opacity or color shift.

### Cards ("Card Wood")
- Background: Paper White
- Border: 1px solid Caramel Walnut (15% opacity)
- Radius: 12px
- Shadow: `0 2px 6px rgba(0,0,0,0.12)`
- Header: Maple Cream background, bottom border

### Navbar
- Background: Background color (95% opacity) with backdrop blur (4px)
- Sticky positioning
- Bottom border: Fog Grey

### Popovers
- Background: Maple Cream
- Text: Ink Brown

### Animations
- **Fade In Up**: `transform: translateY(20px) -> 0`, `opacity: 0 -> 1`
- **Slide In**: `transform: translateX(-20px) -> 0`, `opacity: 0 -> 1`
- **Warm Glow**: Box shadow pulse using Guitar Amber

## 4. Spacing & Layout
- Global border radius: `0.5rem` (8px) usually, `12px` for larger cards.
- Max width containers: `1280px`
