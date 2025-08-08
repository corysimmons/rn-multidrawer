---
sidebar_position: 3
---

# Layouts Guide

The layout system in React Native MultiDrawer determines how drawers are positioned and sized relative to each other. This guide covers all available layout options and their use cases.

## Overview

The layout is configured via the `options.layout` prop on `DrawerProvider`:

```tsx
<DrawerProvider options={{ layout: 'fullscreen' }}>
  {/* Your drawers */}
</DrawerProvider>
```

## Available Layouts

### `fullscreen` (Default)

All drawers cover the full screen dimensions. This is the most common layout.

```tsx
<DrawerProvider options={{ layout: 'fullscreen' }}>
  {/* All drawers are full screen size */}
</DrawerProvider>
```

**Characteristics:**
- Left/Right drawers: Full screen height
- Top/Bottom drawers: Full screen width  
- All drawers start from screen edges
- Drawers can overlap when multiple are open

**Best for:** Traditional mobile app layouts, overlays

### `sidebar-layout`

Left and right drawers are full height, while top and bottom drawers fit the remaining width.

```tsx
<DrawerProvider options={{ layout: 'sidebar-layout' }}>
  {/* Left/Right: full height, Top/Bottom: remaining width */}
</DrawerProvider>
```

**Characteristics:**
- Left/Right drawers: Full screen height
- Top/Bottom drawers: Width minus sidebar space
- Creates a traditional desktop-like sidebar layout

**Best for:** Desktop-style applications, admin panels

### `header-footer-layout`

Top and bottom drawers are full width, while left and right drawers fit the remaining height.

```tsx
<DrawerProvider options={{ layout: 'header-footer-layout' }}>
  {/* Top/Bottom: full width, Left/Right: remaining height */}
</DrawerProvider>
```

**Characteristics:**
- Top/Bottom drawers: Full screen width
- Left/Right drawers: Height minus header/footer space  
- Creates a traditional web layout with header and footer

**Best for:** Web-style applications, content management systems

### `corner-aware`

All drawers respect each other's corners and dimensions.

```tsx
<DrawerProvider options={{ layout: 'corner-aware' }}>
  {/* All drawers respect corner boundaries */}
</DrawerProvider>
```

**Characteristics:**
- Drawers don't overlap at corners
- Complex calculations for optimal space usage
- Most sophisticated layout option

**Best for:** Complex interfaces, dashboard applications

## Layout Comparison

| Layout | Left/Right Size | Top/Bottom Size | Overlap | Use Case |
|--------|----------------|-----------------|---------|----------|
| `fullscreen` | Full height | Full width | Yes | Mobile apps |
| `sidebar-layout` | Full height | Remaining width | No | Desktop apps |
| `header-footer-layout` | Remaining height | Full width | No | Web apps |
| `corner-aware` | Calculated | Calculated | No | Dashboards |

## Visual Examples

### Fullscreen Layout

```
┌─────────────────────┐
│ ←     ↓      →     │ ← All drawers full size
│                     │
│    Main Content     │
│                     │
│         ↑           │
└─────────────────────┘
```

### Sidebar Layout

```
┌───┬─────────────┬───┐
│ ← │      ↓      │ → │ ← Left/Right full height
├───┼─────────────┼───┤   Top/Bottom fit width
│   │             │   │
│   │Main Content │   │
│   │             │   │
├───┼─────────────┼───┤
│ ← │      ↑      │ → │
└───┴─────────────┴───┘
```

### Header-Footer Layout

```
┌─────────────────────┐
│ ←     ↓      →     │ ← Top/Bottom full width
├───┬─────────────┬───┤
│ ← │             │ → │ ← Left/Right fit height
│   │Main Content │   │
│ ← │             │ → │
├───┴─────────────┴───┤
│ ←     ↑      →     │
└─────────────────────┘
```

## Dynamic Layout Changes

You can change layouts dynamically, but it requires recreating the DrawerProvider:

```tsx
import React, { useState } from 'react';

function App() {
  const [layout, setLayout] = useState('fullscreen');
  
  return (
    <DrawerProvider 
      key={layout} // Force re-render on layout change
      options={{ layout }}
    >
      <LayoutSelector onLayoutChange={setLayout} />
      {/* Your drawers */}
    </DrawerProvider>
  );
}
```

## Layout-Specific Considerations

### Performance

- `fullscreen`: Fastest, simplest calculations
- `sidebar-layout`: Moderate, simple width adjustments
- `header-footer-layout`: Moderate, simple height adjustments  
- `corner-aware`: Slowest, complex calculations

### Responsiveness

Different layouts work better on different screen sizes:

```tsx
import { Dimensions } from 'react-native';

function getOptimalLayout() {
  const { width, height } = Dimensions.get('window');
  const isTablet = width > 768;
  const isLandscape = width > height;
  
  if (isTablet && isLandscape) {
    return 'sidebar-layout';
  } else if (isTablet) {
    return 'header-footer-layout';
  }
  return 'fullscreen';
}

export default function App() {
  const [layout] = useState(getOptimalLayout());
  
  return (
    <DrawerProvider options={{ layout }}>
      {/* Drawers */}
    </DrawerProvider>
  );
}
```

### Content Considerations

#### Fullscreen Layout
- Drawers can be any size
- Content should handle overlays gracefully
- Good for immersive experiences

#### Sidebar Layout
- Top/bottom drawers have limited width
- Perfect for navigation + header/footer
- Content area is consistent

#### Header-Footer Layout  
- Left/right drawers have limited height
- Great for persistent headers/footers
- Content flows vertically

#### Corner-Aware Layout
- Most complex but most space-efficient
- Good for dense interfaces
- Requires careful content planning

## Best Practices

### Layout Selection

1. **Mobile-first**: Start with `fullscreen`
2. **Desktop apps**: Use `sidebar-layout` 
3. **Web apps**: Use `header-footer-layout`
4. **Dashboards**: Consider `corner-aware`

### Content Design

1. **Test all orientations** with your chosen layout
2. **Consider drawer priorities** - which should dominate space
3. **Plan for small screens** - ensure critical content remains accessible
4. **Use responsive breakpoints** to switch layouts

### Animation Considerations

Different layouts may require different animation timings:

```tsx
// Adjust animation speed based on layout
const getAnimationSpeed = (layout: DrawerLayout) => {
  switch (layout) {
    case 'fullscreen': return 0.8;
    case 'sidebar-layout': return 1.0; // Faster for smaller drawers
    case 'header-footer-layout': return 1.0;
    case 'corner-aware': return 0.6; // Slower for complex layouts
  }
};

<Drawer 
  side="left" 
  animationSpeed={getAnimationSpeed(layout)}
>
  {/* Drawer content */}
</Drawer>
```

## Troubleshooting

### Layout Not Applying
- Ensure `DrawerProvider` is recreated when layout changes
- Check that all drawers are inside the provider
- Verify layout string matches exactly

### Unexpected Sizes
- Remember that layouts affect ALL drawers
- Check screen dimensions on different devices
- Consider safe area insets

### Performance Issues
- `corner-aware` layout is most expensive
- Consider simpler layouts for lower-end devices
- Profile drawer opening animations

## Migration Guide

### From Fullscreen to Other Layouts

When migrating from fullscreen to constrained layouts:

1. **Test drawer content** at smaller sizes
2. **Adjust drawer widths/heights** if hardcoded
3. **Update animations** that depend on full screen size
4. **Review gesture detection** areas

### Layout-Specific Migrations

```tsx
// Before: Fullscreen with fixed drawer width
<View style={{ width: 300 }}>

// After: Sidebar layout - let system control width
<View style={{ flex: 1, maxWidth: 300 }}>
```

## See Also

- [Multi-Drawer Example](../examples/multi-drawer) - Layout examples in practice
- [DrawerProvider API](../api/drawer-provider) - Layout configuration options
- [Advanced Usage](./advanced-usage) - Performance optimization for layouts