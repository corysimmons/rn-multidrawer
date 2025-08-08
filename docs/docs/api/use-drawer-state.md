# useDrawerState

Hook for custom drawer implementations with full control over state and animations.

## Usage

```tsx
import { useDrawerState } from 'react-native-multidrawer';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

function CustomDrawer() {
  const drawer = useDrawerState({ 
    side: 'left',
    snapOpenThreshold: 0.3
  });

  return (
    <GestureDetector gesture={drawer.combinedGestures}>
      <Animated.View style={[
        { position: 'absolute', width: drawer.width, height: drawer.height },
        drawer.animatedStyle
      ]}>
        <Text>Custom Drawer - Open: {drawer.isOpen}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
```

## Parameters

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | **Required** | Edge to slide from |
| `hitboxSize` | `number` | `50` | Edge detection area |
| `snapOpenThreshold` | `number` | `0.3` | When to snap open (0-1) |
| `snapCloseThreshold` | `number` | `0.7` | When to snap closed (0-1) |
| `animationSpeed` | `number` | `0.5` | Animation speed |
| `bounciness` | `number` | `0.3` | Spring bounce |

## Return Value

```tsx
{
  // State
  isOpen: boolean;
  progress: SharedValue<number>;
  animationState: SharedValue<'gesture' | 'spring' | 'static'>;
  
  // Controls  
  open: () => void;
  close: () => void;
  
  // Layout
  width: number;
  height: number;
  zIndex: number;
  animatedStyle: AnimatedStyle;
  
  // Gestures
  combinedGestures: Gesture;
}
```