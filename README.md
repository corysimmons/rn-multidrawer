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

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { DrawerProvider, Drawer } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Swipe from any edge!</Text>
      </View>
      
      {/* Simple drawer */}
      <Drawer side="left">
        <View style={{ flex: 1, padding: 20, backgroundColor: 'lightblue' }}>
          <Text>Left Drawer</Text>
        </View>
      </Drawer>
      
      {/* Drawer with render props */}
      <Drawer side="right">
        {({ isOpen, close, progress }) => (
          <View style={{ flex: 1, padding: 20, opacity: progress.value }}>
            <Text>Right Drawer - Progress: {Math.round(progress.value * 100)}%</Text>
            <Text onPress={close}>Close</Text>
          </View>
        )}
      </Drawer>
    </DrawerProvider>
  );
}
```

## API

### `DrawerProvider`
Wrap your app with this provider.

### `Drawer`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | **Required** | Edge to slide from |
| `hitboxSize` | `number` | `50` | Edge detection area size |
| `snapOpenThreshold` | `number` | `0.3` | When to snap open (0-1) |
| `snapCloseThreshold` | `number` | `0.7` | When to snap closed (0-1) |
| `animationSpeed` | `number` | `0.5` | Animation speed |
| `bounciness` | `number` | `0.3` | Spring bounce amount |
| `children` | `ReactNode \| (props) => ReactNode` | **Required** | Content or render function |

**Render props**: `{ isOpen, progress, open, close, animatedStyle, width, height, animationState }`

### `useDrawer()`
```tsx
const { openDrawer, closeDrawer, isDrawerOpen } = useDrawer();
```

## License

MIT