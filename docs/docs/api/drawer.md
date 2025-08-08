---
sidebar_position: 2
---

# Drawer

The `Drawer` component creates a drawer that slides from one edge of the screen. It uses a render prop pattern to provide maximum flexibility for content rendering.

## Import

```tsx
import { Drawer } from 'react-native-multidrawer';
```

## Basic Usage

```tsx
import React from 'react';
import { DrawerProvider, Drawer } from 'react-native-multidrawer';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <DrawerProvider>
      <Drawer side="left">
        {({ progress, isOpen, close }) => (
          <View style={{ flex: 1, backgroundColor: 'blue' }}>
            <Text>Progress: {progress.toFixed(2)}</Text>
            <Text>Is Open: {isOpen ? 'Yes' : 'No'}</Text>
            <TouchableOpacity onPress={close}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Drawer>
    </DrawerProvider>
  );
}
```

## Props

### `side` *required*

- **Type:** `'top' | 'right' | 'bottom' | 'left'`

Specifies which edge of the screen the drawer slides from.

```tsx
<Drawer side="left">
  {/* Drawer content */}
</Drawer>
```

### `children` *required*

- **Type:** `React.ReactNode | ((props: DrawerRenderProps) => React.ReactNode)`

Either static content or a render function that receives drawer state props.

#### Render Function Props (`DrawerRenderProps`)

When using a render function, it receives the following props:

- `animatedStyle: AnimatedStyle` - Pre-configured animated styles for the drawer container
- `isOpen: boolean` - Whether the drawer is fully open
- `progress: SharedValue<number>` - Animation progress from 0 (closed) to 1 (open)
- `animationState: SharedValue<'gesture' | 'spring' | 'static'>` - Current animation state
- `width: number` - Drawer width in pixels
- `height: number` - Drawer height in pixels
- `open: () => void` - Function to programmatically open the drawer
- `close: () => void` - Function to programmatically close the drawer

### `hitboxSize`

- **Type:** `number`
- **Default:** `15`

Size of the edge gesture detection area in pixels. Larger values make it easier to start opening the drawer.

```tsx
<Drawer side="left" hitboxSize={30}>
  {/* Easier to trigger from edge */}
</Drawer>
```

### `snapOpenThreshold`

- **Type:** `number`
- **Default:** `0.5`
- **Range:** `0` to `1`

Progress threshold where the drawer automatically opens when gesture is released. For example, `0.3` means the drawer opens if dragged more than 30% of the way.

```tsx
<Drawer side="left" snapOpenThreshold={0.3}>
  {/* Opens after dragging 30% */}
</Drawer>
```

### `snapCloseThreshold`

- **Type:** `number`
- **Default:** `0.5`
- **Range:** `0` to `1`

Progress threshold where the drawer automatically closes when gesture is released from an open state.

```tsx
<Drawer side="left" snapCloseThreshold={0.7}>
  {/* Closes when dragged less than 70% open */}
</Drawer>
```

### `animationSpeed`

- **Type:** `number`
- **Default:** `0.8`

Speed multiplier for open/close animations. Higher values make animations faster.

```tsx
<Drawer side="left" animationSpeed={1.2}>
  {/* 20% faster animations */}
</Drawer>
```

### `bounciness`

- **Type:** `number`
- **Default:** `0.1`
- **Range:** `0` to `1`

Amount of bounce in the spring animation. `0` is no bounce, `1` is very bouncy.

```tsx
<Drawer side="left" bounciness={0.3}>
  {/* More bouncy animation */}
</Drawer>
```

### `style`

- **Type:** `ViewStyle`
- **Default:** `undefined`

Custom styles applied to the drawer container. Note that position and transform styles are managed internally.

```tsx
<Drawer 
  side="left" 
  style={{ 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    borderRadius: 10 
  }}
>
  {/* Styled drawer */}
</Drawer>
```

### `className` *(Web only)*

- **Type:** `string`
- **Default:** `undefined`

CSS class name for web styling.

## Examples

### Static Content

```tsx
<Drawer side="right">
  <View style={{ flex: 1, backgroundColor: 'red', padding: 20 }}>
    <Text>Static drawer content</Text>
  </View>
</Drawer>
```

### Dynamic Content with Progress

```tsx
<Drawer side="bottom">
  {({ progress, isOpen }) => (
    <View style={{ 
      flex: 1, 
      backgroundColor: `rgba(0,0,255,${progress * 0.8})`,
      transform: [{ scale: 0.8 + progress * 0.2 }]
    }}>
      <Text>Dynamic content based on progress</Text>
      <Text>Drawer is {isOpen ? 'open' : 'opening'}</Text>
    </View>
  )}
</Drawer>
```

### With Custom Animation

```tsx
<Drawer 
  side="top"
  snapOpenThreshold={0.3}
  animationSpeed={1.5}
  bounciness={0.2}
>
  {({ progress, close }) => (
    <View style={{ 
      flex: 1, 
      backgroundColor: 'green',
      opacity: progress 
    }}>
      <Text>Fast, bouncy drawer</Text>
      <TouchableOpacity onPress={close}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  )}
</Drawer>
```

## Performance Tips

1. **Avoid Heavy Computations**: Don't perform expensive calculations in render functions on every frame.

2. **Use Reanimated Values**: Access `progress` and `animationState` directly in worklets for best performance.

3. **Memoize Content**: Use `React.memo` for drawer content that doesn't change often.

4. **Optimize Styles**: Pre-calculate style objects outside render functions when possible.

## See Also

- [DrawerProvider](./drawer-provider) - Provider component setup
- [useDrawerState](./use-drawer-state) - Hook-based API for custom implementations  
- [Advanced Usage Guide](../guides/advanced-usage) - Performance optimization and custom animations