# UI Guidelines & Best Practices

## Components

### Popover

**Issue History:**
- Users reported inability to read text inside popovers due to transparency and low contrast against the background.
- Popovers were blending into underlying content.

**Rules:**
1.  **Solid Background:** Always use an opaque background color (e.g., `backgroundColor: 'hsl(var(--paper-white))'` or `white`). NEVER use `transparent` or leave it undefined if the default is transparent.
2.  **Opacity:** Explicitly set `opacity: 1` to ensure no transparency inheritance.
3.  **Z-Index:** Use a high `zIndex` (e.g., `99999`) to ensure the popover floats above all other UI elements, including sticky headers or modals.
4.  **Shadow:** Apply a strong shadow (`boxShadow: '0 10px 30px rgba(0,0,0,0.15)'`) to create visual separation from the background.
5.  **Language:** All content inside Popovers (and the UI in general) must be in **Vietnamese**.

**Reference Implementation:**
See `components/ui/Popover.tsx`.

## Language

- **Default Language:** Vietnamese.
- **Hardcoded Strings:** Avoid English hardcoded strings in components (e.g., "Loading...", "Submit", "Hint"). Translate them directly to Vietnamese.
