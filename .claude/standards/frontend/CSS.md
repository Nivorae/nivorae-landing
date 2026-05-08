## CSS best practices

- **Consistent Methodology**: Apply and stick to the project's consistent CSS methodology (Tailwind, BEM, utility classes, CSS modules, etc.) across the entire project
- **Avoid Overriding Framework Styles**: Work with your framework's patterns rather than fighting against them with excessive overrides
- **Maintain Design System**: Establish and document design tokens (colors, spacing, typography) for consistency
- **Minimize Custom CSS**: Leverage framework utilities and components to reduce custom CSS maintenance burden
- **Performance Considerations**: Optimize for production with CSS purging/tree-shaking to remove unused styles
- **Use Semantic Tokens**: Always use theme tokens (`text-foreground`, `bg-primary`, `border-sidebar-border`) instead of hardcoded color scales (`text-slate-400`, `bg-teal-500`). This ensures consistent theming and dark mode support. See `src/styles/globals.css` for available tokens and `tailwind.config.js` for Tailwind mappings.

## CSS var() Usage Rules

CSS variables (`var(--*)`) only work in actual CSS contexts, not in JavaScript strings. Using `var()` in JS strings will fail silently at runtime.

### Correct Usage

```tsx
// ✅ Tailwind token (defined in tailwind.config.js)
<div className="w-sidebar" />

// ✅ CSS file
.sidebar { width: var(--sidebar-width); }

// ✅ Tailwind arbitrary value with static pixel value
<div className="w-[250px]" />
```

### Incorrect Usage (Will Break)

```tsx
// ❌ Inline style with var() in string - FAILS AT RUNTIME
<div style={{ width: 'var(--sidebar-width)' }} />

// ❌ Tailwind arbitrary value with var() - FAILS AT RUNTIME
<div className="w-[var(--sidebar-width)]" />

// ❌ Template literal with var() - FAILS AT RUNTIME
<div style={{ width: `var(--sidebar-width)` }} />
```

### Why This Matters

When you write `style={{ width: 'var(--sidebar-width)' }}`, React sets the inline style to the literal string `"var(--sidebar-width)"` - the CSS variable is never resolved. This causes layout breaks because the browser receives an invalid width value.

### Recommended Alternatives

1. **Define Tailwind tokens** in `tailwind.config.js` that map to CSS variables
2. **Use CSS classes** that reference the variables in actual CSS
3. **Use static values** for Tailwind arbitrary classes (`w-[250px]` not `w-[var(--x)]`)
