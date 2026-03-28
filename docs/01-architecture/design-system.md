# Design System: Detective Wood & Acoustic Theme

Reference: `www.conan.school` (v7)

## 1. Core Colors (Semantic Tokens)

The theme uses a warm, acoustic palette inspired by detective novels and wood textures.

| Token | Color Name | HSL Value | Hex Approx | Usage |
|-------|------------|-----------|------------|-------|
| `--background` | Paper White | 45 50% 96% | #FAF7F0 | Main background |
| `--foreground` | Ink Brown | 25 25% 24% | #4C3A2E | Body text |
| `--card` | Paper White | 45 50% 96% | #FAF7F0 | Card background |
| `--popover` | Maple Cream | 38 60% 81% | #EED7B0 | Popovers/Tooltips |
| `--primary` | Conan Red Soft | 8 60% 49% | #C74433 | Primary buttons/links |
| `--primary-foreground` | Paper White | 45 50% 96% | #FAF7F0 | Text on primary |
| `--secondary` | Honey Oak | 33 50% 56% | #C89254 | Secondary elements |
| `--muted` | Maple Cream | 38 60% 81% | #EED7B0 | Muted backgrounds |
| `--accent` | Guitar Amber | 33 62% 45% | #B97A2B | Interactive accents |
| `--destructive` | Conan Red Soft | 8 60% 49% | #C74433 | Error/Destroy |
| `--border` | Fog Grey | 0 0% 91% | #E7E7E7 | Borders (Light) |

### Raw Wood Colors
- **Golden Oak**: `hsl(33 56% 64%)` #D9A86C
- **Honey Oak**: `hsl(33 50% 56%)` #C89254
- **Maple Cream**: `hsl(38 60% 81%)` #EED7B0
- **Guitar Amber**: `hsl(33 62% 45%)` #B97A2B
- **Caramel Walnut**: `hsl(28 42% 43%)` #9C6F41
- **Deep Espresso**: `hsl(0 11% 21%)` #3B2F2F

## 2. Typography

### Functions
- **Headings**: Inter (`--font-family-sans`)
- **Body**: Inter (`--font-family-sans`)
- **Quotes/Accents**: Crimson Pro (`--font-family-serif`) - "Font Detective"

### Weights
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## 3. Shadows & Effects

- **Warm Glow**: `box-shadow: 0 0 20px 5px hsl(var(--guitar-amber) / 0.3)`
- **Glassmorphism**: Backdrop blur 4px, background opacity 0.95.

## 4. Animations

### `fade-in-up`
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### `slide-in`
```css
@keyframes slide-in {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### `warm-glow` (Pulse)
```css
@keyframes warm-glow {
  0%, 100% { box-shadow: 0 0 0 0 hsl(var(--guitar-amber) / 0); }
  50% { box-shadow: 0 0 20px 5px hsl(var(--guitar-amber) / 0.3); }
}
```

## 5. Components

### Navbar
- Check reference styling for `.navbar`, `.navbar-menu-item`.
- Sticky, blur effect.

### Footer
- Background: Deep Espresso.
- Text: Paper White.
- Includes "Checkerboard Grid" pattern.

### Checkboard Grid
- Background image using repeating linear gradients to create a grid texture.
