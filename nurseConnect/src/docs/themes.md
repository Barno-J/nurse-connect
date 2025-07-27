# Custom Theming Guide (Light & Dark) — Tailwind + CSS Variables

This project uses a **custom global theming system** with **CSS variables** and **TailwindCSS** to handle light and dark modes in a consistent and scalable way.

---

## What’s Inside?

### Files Involved:
- `index.css` — defines the theme colors using CSS variables (`:root` for light, `.dark` for dark).
- Your JSX/React code — applies the custom classes like `bg-primary`, `text-primary`, `icon-accent`, etc.

---

## Theme Structure Overview

We define two color sets:

| Mode       | Defined In      | Selector        |
|------------|------------------|-----------------|
| Light Mode | `:root`          | default         |
| Dark Mode  | `.dark` class    | `<html class="dark">` |

We then use **CSS custom properties** (aka variables) to represent theme values.

---

##  How It Works

When the app loads, it checks the theme mode (light/dark) and applies a class `dark` on the `<html>` element if dark mode is active.

This triggers the `.dark { ... }` variables.

You don’t use hex codes directly anymore — instead, apply **theme-aware classes** like:

```jsx
<div className="bg-primary text-primary shadow-theme">...</div>
```

## Applying Themes
Base Styles: The theme automatically applies to the body element

```css
body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
}
```

## Using variables

```css
.custom-element {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
}
```

## Utility Classes
 - Ready-to-use classes for common styling:
 | Class             | Purpose                       |
|-------------------|-------------------------------|
| `.bg-primary`     | Primary background color      |
| `.bg-secondary`   | Secondary background color    |
| `.text-primary`   | Primary text color            |
| `.text-accent`    | Accent text color             |
| `.border-primary` | Primary border color          |
| `.shadow-theme`   | Theme-appropriate shadow      |

- Example

```html
<div class="bg-primary text-primary shadow-theme">
  This uses theme colors
</div>
```
## Buttons

```html
<!-- Primary button -->
<button class="button-primary">Submit</button>

<!-- Secondary button -->
<button class="button-secondary">Cancel</button>
```

## Icons

```html
<!-- Primary icon -->
<svg class="icon-primary">...</svg>

<!-- Accent icon -->
<svg class="icon-accent">...</svg>
```
## Dark Mode Implementation
- Add the dark class to any parent element to activate dark mode:

```html
<body class="dark">
  <!-- Dark theme will apply to all children -->
</body>
```

-The system uses this selector:

```css
@custom-variant dark (&:where(.dark, .dark *));
```
## Automatic switching can be implemented with this JavaScript:

```js
// Toggle dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}
```
