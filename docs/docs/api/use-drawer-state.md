---
sidebar_position: 3
---

# useDrawerState

The `useDrawerState` hook provides direct access to drawer state and controls for building custom drawer implementations. This is the most flexible API but requires more manual setup.

## Import

```tsx
import { useDrawerState } from 'react-native-multidrawer';
```

## Basic Usage

```tsx
import React from 'react';
import { DrawerProvider, useDrawerState } from 'react-native-multidrawer';
import { View, Text, TouchableOpacity } from 'react-native';

function CustomDrawerContent() {
  const { progress, isOpen, open, close } = useDrawerState('left');
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Progress: {progress.toFixed(2)}</Text>
      <Text>Is Open: {isOpen ? 'Yes' : 'No'}</Text>
      <TouchableOpacity onPress={isOpen ? close : open}>
        <Text>{isOpen ? 'Close' : 'Open'} Drawer</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <DrawerProvider>
      <CustomDrawerContent />
    </DrawerProvider>
  );
}
```

## Parameters

### `side` *required*

- **Type:** `'top' | 'right' | 'bottom' | 'left'`

The drawer side to get state for.

### `config` *(optional)*

- **Type:** `Partial<DrawerConfig>`

Configuration options for the drawer behavior.

```tsx
interface DrawerConfig {
  hitboxSize: number;          // Default: 15
  snapOpenThreshold: number;   // Default: 0.5
  snapCloseThreshold: number;  // Default: 0.5
  animationSpeed: number;      // Default: 0.8
  bounciness: number;         // Default: 0.1
}
```

## Return Value

The hook returns an object with the following properties:

### State Values

#### `progress`
- **Type:** `SharedValue<number>`
- **Range:** `0` to `1`

The current animation progress. `0` means fully closed, `1` means fully open.

```tsx
const { progress } = useDrawerState('left');

// Use in animated styles
const animatedStyle = useAnimatedStyle(() => ({
  opacity: progress.value,
}));
```

#### `isOpen`
- **Type:** `boolean`

Whether the drawer is currently fully open.

#### `animationState`
- **Type:** `SharedValue<'gesture' | 'spring' | 'static'>`

Current animation state:
- `'gesture'` - User is actively dragging
- `'spring'` - Spring animation is running  
- `'static'` - Drawer is at rest

### Control Functions

#### `open()`
- **Type:** `() => void`

Programmatically open the drawer with animation.

#### `close()`
- **Type:** `() => void`

Programmatically close the drawer with animation.

#### `snapToPosition(targetProgress)`
- **Type:** `(targetProgress: number) => void`

Animate to a specific progress position.

```tsx
const { snapToPosition } = useDrawerState('left');

// Open drawer halfway
snapToPosition(0.5);
```

### Dimension Values

#### `width` / `height`
- **Type:** `number`

The calculated dimensions of the drawer based on screen size and layout configuration.

## Advanced Usage Examples

### Custom Animated Component

```tsx
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

function CustomAnimatedDrawer() {
  const { progress, isOpen, close, width, height } = useDrawerState('left');
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -(width * (1 - progress.value)) },
      { scale: 0.8 + progress.value * 0.2 },
    ],
    opacity: progress.value,
  }));
  
  return (
    <Animated.View style={[
      { 
        position: 'absolute',
        left: 0,
        top: 0,
        width,
        height,
        backgroundColor: 'blue',
      }, 
      animatedStyle
    ]}>
      <TouchableOpacity onPress={close}>
        <Text>Close</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
```

### Progress-Based Interactions

```tsx
function ProgressBasedDrawer() {
  const { progress, animationState } = useDrawerState('bottom');
  
  const handleScroll = useCallback(() => {
    // Only allow scrolling when drawer is fully open and static
    return progress.value === 1 && animationState.value === 'static';
  }, []);
  
  return (
    <ScrollView scrollEnabled={handleScroll()}>
      {/* Scrollable content */}
    </ScrollView>
  );
}
```

### Multiple Drawers Coordination

```tsx
function CoordinatedDrawers() {
  const leftDrawer = useDrawerState('left');
  const rightDrawer = useDrawerState('right');
  
  const openLeft = () => {
    // Close right drawer before opening left
    if (rightDrawer.isOpen) {
      rightDrawer.close();
    }
    leftDrawer.open();
  };
  
  return (
    <View>
      <TouchableOpacity onPress={openLeft}>
        <Text>Open Left (Close Right)</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Custom Gesture Handling

```tsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

function CustomGestureDrawer() {
  const { progress, snapToPosition, width } = useDrawerState('right');
  
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Calculate progress from gesture
      const newProgress = Math.max(0, Math.min(1, 
        (-event.translationX) / width
      ));
      progress.value = newProgress;
    })
    .onEnd((event) => {
      // Snap to open or closed based on velocity and position
      const shouldOpen = event.velocityX < -500 || progress.value > 0.5;
      snapToPosition(shouldOpen ? 1 : 0);
    });
    
  return (
    <GestureDetector gesture={panGesture}>
      <View style={{ flex: 1 }}>
        {/* Your custom gesture area */}
      </View>
    </GestureDetector>
  );
}
```

## Performance Considerations

1. **Shared Values**: Access `progress` and `animationState` directly in worklets for optimal performance.

2. **Avoid Frequent Re-renders**: Use `useAnimatedStyle` instead of regular state for animations.

3. **Configuration Stability**: Pass stable config objects to avoid unnecessary re-registrations.

4. **Memory Management**: The hook automatically handles cleanup when components unmount.

## Integration with Drawer Component

You can use `useDrawerState` alongside `Drawer` components. They share the same state:

```tsx
function App() {
  return (
    <DrawerProvider>
      {/* Standard drawer component */}
      <Drawer side="left">
        {() => <Text>Standard Drawer</Text>}
      </Drawer>
      
      {/* Custom implementation using the same state */}
      <CustomDrawerController />
    </DrawerProvider>
  );
}

function CustomDrawerController() {
  const { isOpen, close } = useDrawerState('left'); // Same state as Drawer above
  
  return (
    <View>
      <Text>Left drawer is {isOpen ? 'open' : 'closed'}</Text>
      <TouchableOpacity onPress={close}>
        <Text>Close Left Drawer</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## See Also

- [DrawerProvider](./drawer-provider) - Provider setup and context
- [Drawer](./drawer) - High-level drawer component
- [Advanced Usage Guide](../guides/advanced-usage) - Custom animations and performance tips