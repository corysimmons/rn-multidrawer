---
sidebar_position: 1
slug: /
---

# React Native MultiDrawer

**React Native MultiDrawer** is a powerful, customizable multi-directional drawer component library for React Native applications. It provides smooth animations, gesture handling, and support for drawers from all four edges of the screen.

## Features

- ✨ **Multi-directional drawers** - Support for top, right, bottom, and left drawers
- 🎨 **Smooth animations** - Built on React Native Reanimated for 60fps animations
- 👆 **Gesture handling** - Intuitive swipe gestures powered by React Native Gesture Handler
- 🎯 **Flexible layouts** - 15+ layout configurations for different drawer arrangements
- 🔧 **Three API levels** - Choose from render props, hooks, or context-based APIs
- 📱 **Cross-platform** - Works on iOS, Android, and Web
- ⚡ **Performance optimized** - Animations run on UI thread
- 🎪 **Collision prevention** - Smart gesture detection prevents drawer conflicts

## Quick Start

```jsx
import { DrawerProvider, Drawer } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider>
      <Drawer side="left">
        {({ progress }) => (
          <View style={{ flex: 1, backgroundColor: 'blue' }}>
            <Text>Left Drawer Content</Text>
          </View>
        )}
      </Drawer>
      
      {/* Your app content */}
      <View style={{ flex: 1 }}>
        <Text>Main App</Text>
      </View>
    </DrawerProvider>
  );
}
```

## Architecture Overview

The library follows a layered architecture:

1. **DrawerProvider** - Global context for gesture detection and state management
2. **Drawer Components** - Render prop components for flexible UI composition  
3. **useDrawerState Hook** - Low-level hook for custom implementations

## What's Next?

- [**Installation**](installation) - Set up the library in your project
- [**Getting Started**](getting-started) - Build your first drawer
- [**API Reference**](api/drawer-provider) - Detailed API documentation
- [**Examples**](examples/simple-drawer) - Real-world implementation examples
