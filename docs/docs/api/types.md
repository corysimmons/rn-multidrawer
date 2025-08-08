---
sidebar_position: 4
---

# Types

This page documents all TypeScript types exported by React Native MultiDrawer.

## Core Types

### `DrawerSide`

```tsx
type DrawerSide = 'top' | 'right' | 'bottom' | 'left';
```

Specifies which edge of the screen a drawer slides from.

### `DrawerLayout`

```tsx
type DrawerLayout = 
  | 'fullscreen'           // All drawers cover full screen dimensions (default)
  | 'sidebar-layout'       // Left/Right full height, Top/Bottom fit remaining width  
  | 'header-footer-layout' // Top/Bottom full width, Left/Right fit remaining height
  | 'corner-aware';        // All drawers respect each other's corners
```

Layout configuration that determines how drawers are positioned relative to each other.

## Component Props

### `DrawerProviderProps`

```tsx
interface DrawerProviderProps {
  children: React.ReactNode;
  options?: DrawerOptions;
}
```

Props for the `DrawerProvider` component.

### `DrawerOptions`

```tsx
interface DrawerOptions {
  layout?: DrawerLayout;
}
```

Configuration options for the drawer system.

### `DrawerProps`

```tsx
interface DrawerProps {
  side: DrawerSide;
  hitboxSize?: number;
  snapOpenThreshold?: number;
  snapCloseThreshold?: number;
  animationSpeed?: number;
  bounciness?: number;
  children: React.ReactNode | ((props: DrawerRenderProps) => React.ReactNode);
  style?: ViewStyle;
  className?: string; // Web only
}
```

Props for the `Drawer` component.

### `DrawerRenderProps`

```tsx
interface DrawerRenderProps {
  animatedStyle: AnimatedStyle;
  isOpen: boolean;
  progress: SharedValue<number>;
  animationState: SharedValue<'gesture' | 'spring' | 'static'>;
  width: number;
  height: number;
  open: () => void;
  close: () => void;
}
```

Props passed to render prop functions in the `Drawer` component.

## Configuration Types

### `DrawerConfig`

```tsx
interface DrawerConfig {
  hitboxSize: number;
  snapOpenThreshold: number;
  snapCloseThreshold: number;
  animationSpeed: number;
  bounciness: number;
}
```

Complete drawer configuration object. Used internally and in the `useDrawerState` hook.

**Default values:**
- `hitboxSize: 15`
- `snapOpenThreshold: 0.5`
- `snapCloseThreshold: 0.5` 
- `animationSpeed: 0.8`
- `bounciness: 0.1`

## Context Types

### `DrawerContextValue`

```tsx
interface DrawerContextValue {
  // State management
  activeDrawer: DrawerSide | null;
  setActiveDrawer: (side: DrawerSide | null) => void;
  isDrawerOpen: (side: DrawerSide) => boolean;
  openDrawer: (side: DrawerSide) => void;
  openDrawerAnimated: (side: DrawerSide) => void;
  closeDrawer: (side: DrawerSide) => void;
  closeDrawerAnimated: (side: DrawerSide) => void;
  
  // Layout and positioning
  layout: DrawerLayout;
  getDrawerZIndex: (side: DrawerSide) => number;
  updateDrawerBounds: (side: DrawerSide, bounds: DrawerBounds) => void;
  measuredDrawerBounds: Record<DrawerSide, DrawerBounds | null>;
  
  // Animation values (React Native Reanimated SharedValues)
  translationX: SharedValue<number>;
  translationY: SharedValue<number>;
  targetProgress: Record<DrawerSide, SharedValue<number>>;
  currentProgress: Record<DrawerSide, SharedValue<number>>;
  animationState: Record<DrawerSide, SharedValue<'gesture' | 'spring' | 'static'>>;
  
  // Animation control
  snapToPosition: (side: DrawerSide, progress: number) => void;
  
  // Platform-specific utilities
  setGlobalUserSelectNone: () => void;      // Web only
  removeGlobalUserSelectNone: () => void;   // Web only
}
```

The complete context value provided by `DrawerProvider`. Most of these are internal APIs.

### `DrawerBounds`

```tsx
interface DrawerBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}
```

Drawer position and dimensions.

## Hook Return Types

### `DrawerState` (from `useDrawerState`)

```tsx
interface DrawerState {
  // State
  progress: SharedValue<number>;
  isOpen: boolean;
  animationState: SharedValue<'gesture' | 'spring' | 'static'>;
  
  // Controls
  open: () => void;
  close: () => void;
  snapToPosition: (targetProgress: number) => void;
  
  // Dimensions
  width: number;
  height: number;
}
```

Return type of the `useDrawerState` hook.

## Animation State Types

### `AnimationState`

```tsx
type AnimationState = 'gesture' | 'spring' | 'static';
```

- `'gesture'` - User is actively dragging the drawer
- `'spring'` - Spring animation is currently running
- `'static'` - Drawer is at rest, no animation active

## Usage Examples

### Type-safe Drawer Configuration

```tsx
import { DrawerConfig, DrawerSide } from 'react-native-multidrawer';

const drawerConfig: Partial<DrawerConfig> = {
  hitboxSize: 30,
  snapOpenThreshold: 0.3,
  animationSpeed: 1.2,
};

const drawerSide: DrawerSide = 'left';
```

### Type-safe Render Props

```tsx
import { DrawerRenderProps } from 'react-native-multidrawer';

const renderDrawerContent = ({ progress, isOpen, close }: DrawerRenderProps) => (
  <View style={{ opacity: progress.value }}>
    <Text>{isOpen ? 'Open' : 'Closed'}</Text>
    <TouchableOpacity onPress={close}>
      <Text>Close</Text>
    </TouchableOpacity>
  </View>
);

<Drawer side="left">
  {renderDrawerContent}
</Drawer>
```

### Type-safe Layout Configuration

```tsx
import { DrawerLayout, DrawerOptions } from 'react-native-multidrawer';

const layoutOptions: DrawerOptions = {
  layout: 'sidebar-layout' as DrawerLayout,
};

<DrawerProvider options={layoutOptions}>
  {/* Drawers */}
</DrawerProvider>
```

## Generic Constraints

When working with custom hooks or components that extend the drawer system, you can use these types as constraints:

```tsx
import { DrawerSide } from 'react-native-multidrawer';

function useCustomDrawer<T extends DrawerSide>(side: T) {
  // Custom hook implementation
}

// Usage with type safety
const leftDrawer = useCustomDrawer('left'); // T is inferred as 'left'
```

## See Also

- [DrawerProvider API](./drawer-provider) - Provider component documentation
- [Drawer API](./drawer) - Drawer component documentation  
- [useDrawerState API](./use-drawer-state) - Hook documentation