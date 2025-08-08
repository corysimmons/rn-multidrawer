---
sidebar_position: 1
---

# DrawerProvider

The `DrawerProvider` is the root component that manages global drawer state, gesture detection, and animations. All drawer components must be wrapped in a `DrawerProvider`.

## Import

```tsx
import { DrawerProvider } from 'react-native-multidrawer';
```

## Basic Usage

```tsx
import React from 'react';
import { DrawerProvider } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider>
      {/* Your app content and drawers go here */}
    </DrawerProvider>
  );
}
```

## Props

### `children`

- **Type:** `React.ReactNode`
- **Required:** Yes

The children components to render. This should include your main app content and any `Drawer` components.

### `options`

- **Type:** `DrawerOptions`
- **Required:** No

Configuration options for the drawer system.

```tsx
interface DrawerOptions {
  layout?: DrawerLayout;
}
```

#### `options.layout`

- **Type:** `DrawerLayout`
- **Default:** `'fullscreen'`

Controls how drawers are positioned and sized relative to each other.

**Available layouts:**

- `'fullscreen'` - All drawers cover the full screen dimensions (default)
- `'sidebar-layout'` - Left/right drawers are full height, top/bottom drawers fit remaining width
- `'header-footer-layout'` - Top/bottom drawers are full width, left/right drawers fit remaining height  
- `'corner-aware'` - All drawers respect each other's corners and dimensions

## Example with Layout

```tsx
import React from 'react';
import { DrawerProvider, Drawer } from 'react-native-multidrawer';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <DrawerProvider options={{ layout: 'sidebar-layout' }}>
      <Drawer side="left">
        {() => (
          <View style={{ flex: 1, backgroundColor: 'blue' }}>
            <Text>Left Sidebar</Text>
          </View>
        )}
      </Drawer>
      
      <Drawer side="top">
        {() => (
          <View style={{ flex: 1, backgroundColor: 'green' }}>
            <Text>Top Header</Text>
          </View>
        )}
      </Drawer>
      
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>Main Content</Text>
      </View>
    </DrawerProvider>
  );
}
```

## Context Value

The `DrawerProvider` creates a context that provides the following values to child components:

### State Management

- `activeDrawer: DrawerSide | null` - Currently active drawer
- `isDrawerOpen(side: DrawerSide): boolean` - Check if a drawer is open
- `openDrawer(side: DrawerSide): void` - Open a drawer instantly
- `closeDrawer(side: DrawerSide): void` - Close a drawer instantly
- `openDrawerAnimated(side: DrawerSide): void` - Open a drawer with animation
- `closeDrawerAnimated(side: DrawerSide): void` - Close a drawer with animation

### Animation Values

- `currentProgress: Record<DrawerSide, SharedValue<number>>` - Current animation progress (0-1) for each drawer
- `targetProgress: Record<DrawerSide, SharedValue<number>>` - Target animation progress for each drawer
- `animationState: Record<DrawerSide, SharedValue<'gesture' | 'spring' | 'static'>>` - Current animation state

### Gesture Values

- `translationX: SharedValue<number>` - Global horizontal gesture translation
- `translationY: SharedValue<number>` - Global vertical gesture translation

## Important Notes

1. **Single Provider**: Only use one `DrawerProvider` per app. Multiple providers will conflict.

2. **Animation Performance**: All animations run on the UI thread via React Native Reanimated for optimal performance.

3. **Gesture Collision Prevention**: The provider automatically prevents multiple drawers from being active simultaneously.

4. **Platform Support**: The provider handles platform-specific behaviors automatically (e.g., web text selection prevention during gestures).

## See Also

- [Drawer](./drawer) - Individual drawer component API
- [useDrawerState](./use-drawer-state) - Hook for accessing drawer state
- [Layout Guide](../guides/layouts) - Detailed layout configuration guide