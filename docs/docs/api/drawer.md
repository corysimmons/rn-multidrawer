# Drawer

Multi-directional drawer component with gesture handling.

## Usage

```tsx
import { DrawerProvider, Drawer } from 'react-native-multidrawer';

// Simple drawer
<Drawer side="left">
  <View style={{ flex: 1, padding: 20 }}>
    <Text>Drawer content</Text>
  </View>
</Drawer>

// Render props for custom behavior
<Drawer side="left">
  {({ progress, isOpen, close }) => (
    <View style={{ flex: 1, opacity: progress.value }}>
      <Text>Custom drawer</Text>
      <Text onPress={close}>Close</Text>
    </View>
  )}
</Drawer>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | **Required** | Edge to slide from |
| `hitboxSize` | `number` | `50` | Edge detection area |
| `snapOpenThreshold` | `number` | `0.3` | When to snap open (0-1) |
| `snapCloseThreshold` | `number` | `0.7` | When to snap closed (0-1) |
| `animationSpeed` | `number` | `0.5` | Animation speed |
| `bounciness` | `number` | `0.3` | Spring bounce |
| `style` | `ViewStyle` | - | Container styles |
| `className` | `string` | - | Web CSS class |
| `children` | `ReactNode \| (props) => ReactNode` | **Required** | Content |

## Render Props

When `children` is a function, it receives:
- `isOpen: boolean`
- `progress: SharedValue<number>` 
- `open: () => void`
- `close: () => void`
- `animatedStyle: AnimatedStyle`
- `width: number`
- `height: number`
- `animationState: SharedValue<'gesture' \| 'spring' \| 'static'>`