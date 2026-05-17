# Design System Reference

> AI-optimized design token reference for code generation. For complete token definitions, see `docs/designs/TOKEN-REFERENCE.md`.

---

## Target Viewports

Design mobile-first, then scale up.

| Device           | Width   | Height | Breakpoint |
| ---------------- | ------- | ------ | ---------- |
| Mobile (iOS)     | 375px   | 812px  | default    |
| Mobile (Android) | 360px   | 800px  | default    |
| Tablet           | 640px+  | -      | `sm:`      |
| Desktop          | 1024px+ | -      | `lg:`      |

---

## Grid System

Based on a **4pt grid** for precise alignment.

| Viewport            | Columns | Gutter | Margin | Tailwind                           |
| ------------------- | ------- | ------ | ------ | ---------------------------------- |
| Mobile (<640px)     | 4       | 12px   | 16px   | `grid-cols-4 gap-3 px-4`           |
| Tablet (640-1023px) | 8       | 16px   | 24px   | `sm:grid-cols-8 sm:gap-4 sm:px-6`  |
| Desktop (1024px+)   | 12      | 24px   | 32px   | `lg:grid-cols-12 lg:gap-6 lg:px-8` |

---

## Spacing Tokens

### Semantic Aliases (preferred)

| Alias | Value | Tailwind         | Use Case                   |
| ----- | ----- | ---------------- | -------------------------- |
| xs    | 4px   | `gap-1`, `p-1`   | Base unit, tight spacing   |
| sm    | 8px   | `gap-2`, `p-2`   | Small gaps, inline spacing |
| md    | 12px  | `gap-3`, `p-3`   | Grid gutters (mobile)      |
| lg    | 16px  | `gap-4`, `p-4`   | Default spacing, margins   |
| xl    | 24px  | `gap-6`, `p-6`   | Card padding               |
| 2xl   | 32px  | `gap-8`, `p-8`   | Section padding (sm)       |
| 3xl   | 48px  | `gap-12`, `p-12` | Section padding (md)       |

### Section Padding

| Size  | Value                  | Tailwind                   | Use Case            |
| ----- | ---------------------- | -------------------------- | ------------------- |
| SM    | 32px                   | `py-8` or `py-section-sm`  | Compact sections    |
| MD    | 48px                   | `py-12` or `py-section-md` | Standard sections   |
| LG    | 64px                   | `py-16` or `py-section-lg` | Spacious sections   |
| XL    | 80px                   | `py-20` or `py-section-xl` | Hero sections       |
| Fluid | clamp(32px, 8vw, 80px) | `py-section-fluid`         | Responsive sections |

---

## Typography

### Headlines (Medium Weight, -2% to -1% letter spacing)

| Role | Size            | Line Height | Tailwind                            |
| ---- | --------------- | ----------- | ----------------------------------- |
| H1   | 32px (2rem)     | 40px (1.25) | `text-h1` or `text-3xl font-medium` |
| H2   | 24px (1.5rem)   | 32px (1.33) | `text-h2` or `text-2xl font-medium` |
| H3   | 20px (1.25rem)  | 28px (1.4)  | `text-h3` or `text-xl font-medium`  |
| H4   | 18px (1.125rem) | 26px (1.44) | `text-h4` or `text-lg font-medium`  |

### Display (Hero/Marketing)

| Role       | Size          | Line Height | Tailwind          |
| ---------- | ------------- | ----------- | ----------------- |
| Display XL | 56px (3.5rem) | 64px (1.14) | `text-display-xl` |
| Display LG | 48px (3rem)   | 56px (1.17) | `text-display-lg` |
| Display MD | 40px (2.5rem) | 48px (1.2)  | `text-display-md` |

Fluid variants: `text-fluid-display-xl`, `text-fluid-h1`, etc.

### Body Text (Regular Weight)

| Role    | Size | Line Height | Tailwind                    |
| ------- | ---- | ----------- | --------------------------- |
| Body LG | 18px | 28px (1.56) | `text-body-lg` or `text-lg` |
| Body    | 16px | 24px (1.5)  | `text-body` or `text-base`  |
| Body SM | 14px | 22px (1.57) | `text-body-sm` or `text-sm` |

### Labels & Captions

| Role     | Size | Line Height | Tailwind                     |
| -------- | ---- | ----------- | ---------------------------- |
| Label LG | 14px | 20px (1.43) | `text-label-lg` or `text-sm` |
| Label    | 12px | 16px (1.33) | `text-label` or `text-xs`    |
| Label SM | 11px | 16px (1.45) | `text-label-sm`              |

### Font Weights

| Weight   | Value | Tailwind        |
| -------- | ----- | --------------- |
| Regular  | 400   | `font-normal`   |
| Medium   | 500   | `font-medium`   |
| Semibold | 600   | `font-semibold` |
| Bold     | 700   | `font-bold`     |

---

## Colors

### Palette

Three-color brand system: near-white / near-black / oxblood. All neutrals carry a chroma 0.002–0.008 tint toward hue 15° (the oxblood hue) so they read as ink-on-paper rather than cold screen gray. Colors stored as OKLCH "L C H" channels in CSS vars — no wrapper — so Tailwind opacity modifiers work (`bg-background/50` → `oklch(L C H / 0.5)`).

| Role       | OKLCH (L C H)      | Approx hex | Notes                        |
| ---------- | ------------------ | ---------- | ---------------------------- |
| Near-white | `99.1% 0.003 15`   | ~#fafafa   | Background, card surfaces    |
| Near-black | `4% 0.008 15`      | ~#0a0908   | Foreground, primary text     |
| Oxblood    | `24.8% 0.131 15.3` | #6D001A    | Accent, destructive, warning |
| Light gray | `96.9% 0.002 15`   | ~#F5F5F5   | Secondary, muted surfaces    |
| Mid gray   | `50.1% 0 0`        | ~#737373   | Muted foreground (light)     |
| Dark gray  | `9.7% 0.003 15`    | ~#171717   | Secondary surface (dark)     |

### Semantic Tokens (use these, not raw values)

| Token              | Light (OKLCH)      | Dark (OKLCH)       | Tailwind                             |
| ------------------ | ------------------ | ------------------ | ------------------------------------ |
| Background         | `99.1% 0.003 15`   | `4% 0.008 15`      | `bg-background`                      |
| Foreground         | `4% 0.008 15`      | `99.1% 0.003 15`   | `text-foreground`                    |
| Card / Popover     | `99.1% 0.003 15`   | `4% 0.008 15`      | `bg-card`, `bg-popover`              |
| Primary            | `4% 0.008 15`      | `99.1% 0.003 15`   | `bg-primary`, `text-primary`         |
| Primary Foreground | `99.1% 0.003 15`   | `4% 0.008 15`      | `text-primary-foreground`            |
| Secondary          | `96.9% 0.002 15`   | `9.7% 0.003 15`    | `bg-secondary`                       |
| Muted              | `96.9% 0.002 15`   | `9.7% 0.003 15`    | `bg-muted`                           |
| Muted Foreground   | `50.1% 0 0`        | `68% 0 0`          | `text-muted-foreground`              |
| Accent             | `24.8% 0.131 15.3` | `24.8% 0.131 15.3` | `bg-accent`, `text-accent`           |
| Destructive        | `24.8% 0.131 15.3` | `24.8% 0.131 15.3` | `bg-destructive`, `text-destructive` |
| Warning            | `24.8% 0.131 15.3` | `24.8% 0.131 15.3` | `bg-warning`, `text-warning`         |
| Success            | `4% 0.008 15`      | `99.1% 0.003 15`   | `bg-success`, `text-success`         |
| Border             | `91.8% 0.001 15`   | `17.1% 0.002 15`   | `border-border`                      |
| Ring               | `4% 0.008 15`      | `99.1% 0.003 15`   | focus ring                           |

### Opacity Modifiers

Because vars store bare OKLCH channels, Tailwind opacity modifiers work natively:

```
bg-background/80   → oklch(99.1% 0.003 15 / 0.8)
text-foreground/60 → oklch(4% 0.008 15 / 0.6)
bg-accent/10       → oklch(24.8% 0.131 15.3 / 0.1)
```

---

## Effects

### Border Radius

| Level   | Value  | Tailwind       | Use Case        |
| ------- | ------ | -------------- | --------------- |
| SM      | 2px    | `rounded-sm`   | Subtle rounding |
| Default | 4px    | `rounded`      | Base rounding   |
| MD      | 6px    | `rounded-md`   | Buttons, inputs |
| LG      | 8px    | `rounded-lg`   | Cards           |
| XL      | 12px   | `rounded-xl`   | Modals          |
| 2XL     | 16px   | `rounded-2xl`  | Large cards     |
| Full    | 9999px | `rounded-full` | Pills, avatars  |

### Shadows

| Level | Tailwind    | Use Case         |
| ----- | ----------- | ---------------- |
| XS    | `shadow-xs` | Subtle elevation |
| SM    | `shadow-sm` | Cards, buttons   |
| MD    | `shadow-md` | Dropdowns        |
| LG    | `shadow-lg` | Modals, toasts   |
| XL    | `shadow-xl` | Large overlays   |

### Transitions

| Speed   | Duration | Tailwind       |
| ------- | -------- | -------------- |
| Fast    | 150ms    | `duration-150` |
| Default | 200ms    | `duration-200` |
| Slow    | 300ms    | `duration-300` |

---

## Code Patterns

### Section Layout

```tsx
<section className="py-section-md px-4 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl">{/* content */}</div>
</section>
```

### Card Component

```tsx
<div className="p-6 bg-card rounded-lg shadow-sm border border-border">{/* content */}</div>
```

### Responsive Grid

```tsx
<div className="grid grid-cols-4 gap-3 sm:grid-cols-8 sm:gap-4 lg:grid-cols-12 lg:gap-6">
  {/* grid items */}
</div>
```

### Typography Hierarchy

```tsx
<h1 className="text-h1 font-medium text-foreground">Heading</h1>
<p className="text-body text-muted-foreground">Body text</p>
<span className="text-label text-muted-foreground">Label</span>
```

---

## Quick Mapping Cheatsheet

| Design Spec  | Tailwind Class           |
| ------------ | ------------------------ |
| 4px spacing  | `gap-1`, `p-1`, `m-1`    |
| 8px spacing  | `gap-2`, `p-2`, `m-2`    |
| 12px spacing | `gap-3`, `p-3`, `m-3`    |
| 16px spacing | `gap-4`, `p-4`, `m-4`    |
| 24px spacing | `gap-6`, `p-6`, `m-6`    |
| 32px spacing | `gap-8`, `p-8`, `m-8`    |
| 48px spacing | `gap-12`, `p-12`, `m-12` |
| 16px margin  | `mx-4`, `px-4`           |
| 24px margin  | `mx-6`, `px-6`           |
| 32px margin  | `mx-8`, `px-8`           |
