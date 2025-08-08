# react-native-multidrawer

A powerful, customizable multi-directional drawer component for React Native with smooth animations and gesture handling.

[![npm version](https://badge.fury.io/js/react-native-multidrawer.svg)](https://badge.fury.io/js/react-native-multidrawer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 **Multi-directional drawers**: Support for top, right, bottom, and left drawers
- 🎯 **Edge-based gestures**: Drag from any screen edge with configurable hitbox sizes
- ⚡ **Smooth animations**: Built with React Native Reanimated for 60fps performance
- 🎨 **Highly customizable**: Configurable snap thresholds, animation speeds, and bounciness
- 📱 **Cross-platform**: Works on iOS, Android, and Web
- 🔧 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🎭 **Advanced animations**: State-based animation system preventing animation conflicts
- ✋ **Intuitive gestures**: Open from edges, close by dragging in opposite direction

## Installation

```bash
npm install react-native-multidrawer
```

**Peer Dependencies:**
```bash
npm install react-native-gesture-handler react-native-reanimated
```

### Additional Setup

Follow the installation guides for the peer dependencies:
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)

## Quick Start

### Option 1: Styled Drawer (Easy Setup)

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { DrawerProvider, Drawer } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider>
      {/* Your main app content */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Swipe from any edge!</Text>
      </View>
      
      {/* Simple styled drawer */}
      <Drawer side="left" snapOpenThreshold={0.3}>
        <View style={{ flex: 1, padding: 20 }}>
          <Text>Left Drawer Content</Text>
        </View>
      </Drawer>
    </DrawerProvider>
  );
}
```

### Option 2: Headless Drawer (Maximum Flexibility)

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerProvider, HeadlessDrawer } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Fully Customizable Drawers!</Text>
      </View>
      
      {/* Headless drawer with render props */}
      <HeadlessDrawer side="left" snapOpenThreshold={0.3}>
        {({ isOpen, open, close, progress, animationState }) => (
          <View style={{
            flex: 1,
            backgroundColor: isOpen ? '#e3f2fd' : '#f5f5f5',
            opacity: 0.3 + 0.7 * progress.value,
            padding: 20,
          }}>
            <Text>Custom Drawer (Progress: {Math.round(progress.value * 100)}%)</Text>
            <Text>State: {animationState.value}</Text>
            
            <TouchableOpacity onPress={open}>
              <Text>Open Programmatically</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={close}>
              <Text>Close Programmatically</Text>
            </TouchableOpacity>
          </View>
        )}
      </HeadlessDrawer>
    </DrawerProvider>
  );
}
```

### Option 3: Hook-Based Approach (Maximum Control)

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { DrawerProvider, useDrawerState } from 'react-native-multidrawer';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

function CustomDrawer() {
  const drawer = useDrawerState({ 
    side: 'left', 
    snapOpenThreshold: 0.3 
  });

  return (
    <GestureDetector gesture={drawer.combinedGestures}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: drawer.width,
            height: drawer.height,
            zIndex: drawer.zIndex,
            left: 0,
            top: 0,
          },
          drawer.animatedStyle,
        ]}
      >
        <View style={{ flex: 1, backgroundColor: '#custom', padding: 20 }}>
          <Text>Completely Custom Implementation</Text>
          <Text>Open: {drawer.isOpen ? 'Yes' : 'No'}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

export default function App() {
  return (
    <DrawerProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hook-based Custom Drawers!</Text>
      </View>
      <CustomDrawer />
    </DrawerProvider>
  );
}
```

## API Reference

### `DrawerProvider`

The provider component that manages global drawer state and gestures.

**Props:**
- `children: React.ReactNode` - Your app content and drawer components

### `Drawer`

Styled drawer component with default styling. Good for quick setup.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | **Required** | Which edge the drawer opens from |
| `hitboxSize` | `number` | `50` | Size of the edge hitbox in pixels |
| `snapOpenThreshold` | `number` | `0.3` | Progress threshold (0-1) to snap open when releasing |
| `snapCloseThreshold` | `number` | `0.7` | Progress threshold (0-1) to snap closed when closing |
| `animationSpeed` | `number` | `0.5` | Animation speed (0-1, higher = faster) |
| `bounciness` | `number` | `0.3` | Spring animation bounciness (0-1, higher = more bouncy) |
| `style` | `ViewStyle` | `undefined` | Additional styling for the drawer |
| `children` | `React.ReactNode` | **Required** | Drawer content |

### `HeadlessDrawer`

Completely unstyled drawer using render props. Maximum customization.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | **Required** | Which edge the drawer opens from |
| `hitboxSize` | `number` | `50` | Size of the edge hitbox in pixels |
| `snapOpenThreshold` | `number` | `0.3` | Progress threshold (0-1) to snap open when releasing |
| `snapCloseThreshold` | `number` | `0.7` | Progress threshold (0-1) to snap closed when closing |
| `animationSpeed` | `number` | `0.5` | Animation speed (0-1, higher = faster) |
| `bounciness` | `number` | `0.3` | Spring animation bounciness (0-1, higher = more bouncy) |
| `children` | `(props) => React.ReactNode` | **Required** | Render function with drawer state |

**Render Props:**
| Prop | Type | Description |
|------|------|-------------|
| `animatedStyle` | `AnimatedStyleProp` | Animated style for transforms |
| `isOpen` | `boolean` | Whether drawer is currently open |
| `progress` | `SharedValue<number>` | Current progress (0-1) |
| `animationState` | `SharedValue<'gesture' \| 'spring' \| 'static'>` | Current animation state |
| `width` | `number` | Drawer width |
| `height` | `number` | Drawer height |
| `open` | `() => void` | Programmatically open drawer |
| `close` | `() => void` | Programmatically close drawer |

### Hooks

#### `useDrawer()`

Access drawer context and control functions.

```tsx
const {
  activeDrawer,
  isDrawerOpen,
  openDrawer,
  closeDrawer,
  getDrawerZIndex
} = useDrawer();
```

## Advanced Usage

### Multiple Drawers with Different Configurations

```tsx
<DrawerProvider>
  <YourMainContent />
  
  {/* Fast, bouncy left drawer */}
  <Drawer 
    side="left" 
    hitboxSize={60}
    snapOpenThreshold={0.25}
    animationSpeed={0.8}
    bounciness={0.6}
  >
    <MenuContent />
  </Drawer>
  
  {/* Slow, smooth right drawer */}
  <Drawer 
    side="right"
    hitboxSize={40}
    snapOpenThreshold={0.4}
    animationSpeed={0.3}
    bounciness={0.1}
  >
    <SettingsContent />
  </Drawer>
  
  {/* Top notification drawer */}
  <Drawer 
    side="top"
    snapCloseThreshold={0.5}
  >
    <NotificationContent />
  </Drawer>
</DrawerProvider>
```

### Programmatic Control

```tsx
function MyComponent() {
  const { openDrawer, closeDrawer, isDrawerOpen } = useDrawer();
  
  const handleMenuPress = () => {
    if (isDrawerOpen('left')) {
      closeDrawer('left');
    } else {
      openDrawer('left');
    }
  };
  
  return (
    <TouchableOpacity onPress={handleMenuPress}>
      <Text>Toggle Menu</Text>
    </TouchableOpacity>
  );
}
```

## Animation System

The library uses a sophisticated state-based animation system:

- **Gesture State**: Drawer follows finger movement in real-time
- **Spring State**: Smooth spring animation to final position
- **Static State**: Drawer at rest, ready for close gestures

This prevents animation conflicts and ensures smooth transitions.

## Performance

- Built with React Native Reanimated for optimal performance
- Animations run on the UI thread at 60fps
- Worklets ensure gesture handling doesn't block the JavaScript thread
- Optimized for both development and production builds

## Troubleshooting

**Drawer not responding to gestures:**
- Ensure `react-native-gesture-handler` is properly installed and linked
- Check that the `DrawerProvider` wraps your entire app content
- Verify no other gesture handlers are conflicting

**Animations not smooth:**
- Confirm `react-native-reanimated` is correctly set up
- Enable Hermes for better performance (recommended)
- Check that you're not running expensive operations during renders

**TypeScript errors:**
- Ensure you're importing types correctly: `import type { DrawerSide } from 'react-native-multidrawer'`
- Update to the latest version for the most recent type definitions

## Examples

Check out the [example app](./example) for a comprehensive demonstration of all features.

To run the example:
```bash
git clone https://github.com/yourusername/react-native-multidrawer.git
cd react-native-multidrawer
npm install
npm run example:install
npm run example:ios  # or example:android
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -am 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT © [Your Name](https://github.com/yourusername)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release notes and version history.

## Support

- 🐛 [Report a bug](https://github.com/yourusername/react-native-multidrawer/issues)
- 💡 [Request a feature](https://github.com/yourusername/react-native-multidrawer/issues)
- 📖 [Read the docs](https://github.com/yourusername/react-native-multidrawer#readme)
- 💬 [Discussions](https://github.com/yourusername/react-native-multidrawer/discussions)