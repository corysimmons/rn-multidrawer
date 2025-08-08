---
sidebar_position: 3
---

# Getting Started

This guide will walk you through creating your first drawer with React Native MultiDrawer.

## Basic Setup

All drawers must be wrapped in a `DrawerProvider`. This component manages global state and gesture detection:

```jsx
import React from 'react';
import { DrawerProvider } from 'react-native-multidrawer';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <DrawerProvider>
      {/* Your app content goes here */}
      <View style={{ flex: 1 }}>
        <Text>Main App Content</Text>
      </View>
    </DrawerProvider>
  );
}
```

## Adding Your First Drawer

The simplest way to add a drawer is using the `Drawer` component with a render prop:

```jsx
import React from 'react';
import { DrawerProvider, Drawer } from 'react-native-multidrawer';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <DrawerProvider>
      <Drawer side="left">
        {({ progress }) => (
          <View style={styles.drawer}>
            <Text style={styles.drawerText}>Left Drawer</Text>
            <Text>Progress: {progress.toFixed(2)}</Text>
          </View>
        )}
      </Drawer>
      
      <View style={styles.main}>
        <Text>Swipe from the left edge to open the drawer!</Text>
      </View>
    </DrawerProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  drawer: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 20,
    justifyContent: 'center',
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
});
```

## Adding Multiple Drawers

You can easily add drawers from multiple edges:

```jsx
import React from 'react';
import { DrawerProvider, Drawer } from 'react-native-multidrawer';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <DrawerProvider>
      {/* Left drawer */}
      <Drawer side="left">
        {() => (
          <View style={[styles.drawer, { backgroundColor: '#3498db' }]}>
            <Text style={styles.drawerText}>Left Menu</Text>
          </View>
        )}
      </Drawer>
      
      {/* Right drawer */}
      <Drawer side="right">
        {() => (
          <View style={[styles.drawer, { backgroundColor: '#e74c3c' }]}>
            <Text style={styles.drawerText}>Right Panel</Text>
          </View>
        )}
      </Drawer>
      
      {/* Top drawer */}
      <Drawer side="top">
        {() => (
          <View style={[styles.drawer, { backgroundColor: '#2ecc71' }]}>
            <Text style={styles.drawerText}>Top Notifications</Text>
          </View>
        )}
      </Drawer>
      
      {/* Bottom drawer */}
      <Drawer side="bottom">
        {() => (
          <View style={[styles.drawer, { backgroundColor: '#f39c12' }]}>
            <Text style={styles.drawerText}>Bottom Sheet</Text>
          </View>
        )}
      </Drawer>
      
      <View style={styles.main}>
        <Text>Swipe from any edge!</Text>
      </View>
    </DrawerProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  drawer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
```

## Customizing Drawer Behavior

You can customize various aspects of drawer behavior:

```jsx
<Drawer 
  side="left"
  hitboxSize={20}           // Gesture detection area (default: 15)
  snapOpenThreshold={0.5}   // How much to drag before auto-opening (default: 0.5)
  springConfig={{           // Animation spring configuration
    damping: 20,
    stiffness: 300,
  }}
>
  {({ progress, isOpen, close }) => (
    <View style={styles.drawer}>
      <Text>Drawer is {isOpen ? 'open' : 'closed'}</Text>
      <TouchableOpacity onPress={close}>
        <Text>Close Drawer</Text>
      </TouchableOpacity>
    </View>
  )}
</Drawer>
```

## Render Prop Parameters

The render prop function receives several useful parameters:

- `progress` - Animation progress from 0 (closed) to 1 (open)
- `isOpen` - Boolean indicating if the drawer is fully open
- `close` - Function to programmatically close the drawer
- `open` - Function to programmatically open the drawer

## Layout Options

You can control how drawers arrange themselves using the `layout` prop on `DrawerProvider`:

```jsx
<DrawerProvider layout="vertical-priority">
  {/* Left/right drawers will be full height */}
  {/* Top/bottom drawers will fit remaining width */}
</DrawerProvider>
```

Available layouts include:
- `fullscreen` (default) - All drawers cover full screen
- `vertical-priority` - Left/right full height, top/bottom fit width
- `horizontal-priority` - Top/bottom full width, left/right fit height

## Using the Hook API

For maximum control, you can use the `useDrawerState` hook:

```jsx
import React from 'react';
import { DrawerProvider, useDrawerState } from 'react-native-multidrawer';
import { View, Text, TouchableOpacity } from 'react-native';

function MyCustomDrawer() {
  const { progress, isOpen, open, close } = useDrawerState('left');
  
  return (
    <View style={styles.main}>
      <Text>Drawer progress: {progress.toFixed(2)}</Text>
      <TouchableOpacity onPress={isOpen ? close : open}>
        <Text>{isOpen ? 'Close' : 'Open'} Drawer</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <DrawerProvider>
      <MyCustomDrawer />
    </DrawerProvider>
  );
}
```

## Next Steps

Now that you have a basic drawer working, explore these topics:

- [**API Reference**](api/drawer-provider) - Detailed documentation for all components
- [**Layouts Guide**](guides/layouts) - Learn about different drawer arrangements
- [**Advanced Usage**](guides/advanced-usage) - Animation customization and performance tips
- [**Examples**](examples/simple-drawer) - Real-world implementation examples