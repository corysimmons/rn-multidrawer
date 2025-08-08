---
sidebar_position: 1
---

# Basic Usage

This guide covers the fundamental concepts and common usage patterns for React Native MultiDrawer.

## Provider Setup

All drawer functionality requires wrapping your app in a `DrawerProvider`:

```tsx
import React from 'react';
import { DrawerProvider } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider>
      {/* Your app content */}
    </DrawerProvider>
  );
}
```

The provider manages global state, gesture detection, and animations for all drawers in your app.

## Adding Drawers

### Single Drawer

The most basic drawer setup uses the `Drawer` component with a render prop:

```tsx
import { DrawerProvider, Drawer } from 'react-native-multidrawer';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <DrawerProvider>
      <Drawer side="left">
        {() => (
          <View style={styles.drawer}>
            <Text>Left Drawer Content</Text>
          </View>
        )}
      </Drawer>
      
      <View style={styles.main}>
        <Text>Main Content</Text>
      </View>
    </DrawerProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawer: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 20,
  },
});
```

### Multiple Drawers

You can have up to four drawers (one from each edge):

```tsx
export default function App() {
  return (
    <DrawerProvider>
      <Drawer side="left">
        {() => <View style={[styles.drawer, { backgroundColor: '#3498db' }]} />}
      </Drawer>
      
      <Drawer side="right">
        {() => <View style={[styles.drawer, { backgroundColor: '#e74c3c' }]} />}
      </Drawer>
      
      <Drawer side="top">
        {() => <View style={[styles.drawer, { backgroundColor: '#2ecc71' }]} />}
      </Drawer>
      
      <Drawer side="bottom">
        {() => <View style={[styles.drawer, { backgroundColor: '#f39c12' }]} />}
      </Drawer>
      
      <View style={styles.main}>
        <Text>Swipe from any edge!</Text>
      </View>
    </DrawerProvider>
  );
}
```

## Gesture Interaction

### Opening Drawers

Drawers are opened by swiping from the screen edge:

- **Left drawer**: Swipe right from left edge
- **Right drawer**: Swipe left from right edge  
- **Top drawer**: Swipe down from top edge
- **Bottom drawer**: Swipe up from bottom edge

The gesture detection area size is controlled by the `hitboxSize` prop (default 15px).

### Closing Drawers

Open drawers can be closed by:

1. Swiping in the opposite direction
2. Using the `close` function from render props
3. Programmatically via `useDrawerState` hook

## Render Props

The render prop function provides access to drawer state and controls:

```tsx
<Drawer side="left">
  {({ progress, isOpen, close, open }) => (
    <View style={styles.drawer}>
      <Text>Progress: {progress.toFixed(2)}</Text>
      <Text>Status: {isOpen ? 'Open' : 'Closed'}</Text>
      
      <TouchableOpacity onPress={close}>
        <Text>Close Drawer</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={open}>
        <Text>Open Drawer</Text>
      </TouchableOpacity>
    </View>
  )}
</Drawer>
```

### Available Props

- `progress` - Animation progress (0 = closed, 1 = open)
- `isOpen` - Boolean indicating fully open state
- `close()` - Function to close the drawer
- `open()` - Function to open the drawer
- `width/height` - Drawer dimensions
- `animatedStyle` - Pre-configured animated styles
- `animationState` - Current animation state

## Static Content

For simple drawers that don't need dynamic behavior, you can pass static content:

```tsx
<Drawer side="right">
  <View style={styles.drawer}>
    <Text>Static Content</Text>
    <Text>No render prop needed</Text>
  </View>
</Drawer>
```

## Customizing Behavior

### Gesture Sensitivity

Control how easily drawers open from the edge:

```tsx
<Drawer 
  side="left" 
  hitboxSize={30}  // Larger detection area
>
  {/* Easier to open */}
</Drawer>
```

### Snap Thresholds

Control when drawers auto-open or close:

```tsx
<Drawer 
  side="left"
  snapOpenThreshold={0.3}   // Opens after 30% drag
  snapCloseThreshold={0.7}  // Closes when less than 70% open
>
  {/* More sensitive snapping */}
</Drawer>
```

### Animation Speed

Adjust opening/closing animation speed:

```tsx
<Drawer 
  side="left"
  animationSpeed={1.5}  // 50% faster
  bounciness={0.2}      // More bounce
>
  {/* Faster, bouncier animations */}
</Drawer>
```

## Hook API

For more control, use the `useDrawerState` hook:

```tsx
import { useDrawerState } from 'react-native-multidrawer';

function CustomDrawerControl() {
  const { isOpen, open, close, progress } = useDrawerState('left');
  
  return (
    <View>
      <Text>Left drawer is {isOpen ? 'open' : 'closed'}</Text>
      <Text>Progress: {progress.toFixed(2)}</Text>
      
      <TouchableOpacity onPress={isOpen ? close : open}>
        <Text>{isOpen ? 'Close' : 'Open'} Left Drawer</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <DrawerProvider>
      {/* Standard drawer component */}
      <Drawer side="left">
        {() => <Text>Drawer Content</Text>}
      </Drawer>
      
      {/* Custom control component */}
      <CustomDrawerControl />
    </DrawerProvider>
  );
}
```

## Common Patterns

### Menu Drawer

```tsx
<Drawer side="left" hitboxSize={20}>
  {({ close }) => (
    <ScrollView style={styles.menu}>
      <TouchableOpacity onPress={() => { navigate('Home'); close(); }}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigate('Settings'); close(); }}>
        <Text>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  )}
</Drawer>
```

### Bottom Sheet

```tsx
<Drawer side="bottom" snapOpenThreshold={0.2}>
  {({ progress }) => (
    <View style={[styles.bottomSheet, { 
      opacity: progress,
      transform: [{ scale: 0.9 + progress * 0.1 }]
    }]}>
      <Text>Pull up for more options</Text>
    </View>
  )}
</Drawer>
```

### Notification Panel

```tsx
<Drawer side="top" animationSpeed={0.6}>
  {({ isOpen, close }) => (
    <View style={styles.notifications}>
      <Text>Notifications</Text>
      {isOpen && (
        <TouchableOpacity onPress={close}>
          <Text>Dismiss</Text>
        </TouchableOpacity>
      )}
    </View>
  )}
</Drawer>
```

## Best Practices

1. **Keep drawers lightweight** - Avoid heavy computations in render props
2. **Use stable references** - Memoize event handlers and styles
3. **Handle edge cases** - Consider what happens when multiple gestures occur
4. **Test on devices** - Gesture detection varies between platforms
5. **Respect platform conventions** - Left drawers for menus, bottom for sheets

## Troubleshooting

### Drawer Not Opening
- Check if `DrawerProvider` wraps your app
- Verify `hitboxSize` isn't too small
- Make sure no other gesture handlers conflict

### Poor Performance  
- Avoid heavy operations in render props
- Use `useAnimatedStyle` for custom animations
- Consider static content for simple drawers

### Gesture Conflicts
- Only one drawer can be active at a time (automatic)
- Check for conflicting gesture handlers in parent components
- Adjust `hitboxSize` to avoid unintended triggers

## Next Steps

- [Advanced Usage](./advanced-usage) - Custom animations and performance optimization
- [Layouts Guide](./layouts) - Different drawer arrangement options
- [Examples](../examples/simple-drawer) - Real-world implementation examples