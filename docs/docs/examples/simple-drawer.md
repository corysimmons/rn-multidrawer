---
sidebar_position: 1
---

# Simple Drawer

This example shows how to create a basic left-side navigation drawer with menu items.

## Preview

A simple menu drawer that slides in from the left with navigation options and user profile information.

## Complete Code

```tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { DrawerProvider, Drawer } from 'react-native-multidrawer';

// Main app component
export default function App() {
  return (
    <DrawerProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Left navigation drawer */}
      <Drawer side="left" hitboxSize={25}>
        {({ close }) => <NavigationDrawer onClose={close} />}
      </Drawer>
      
      {/* Main app content */}
      <MainContent />
    </DrawerProvider>
  );
}

// Navigation drawer component
function NavigationDrawer({ onClose }: { onClose: () => void }) {
  const menuItems = [
    { id: 1, title: 'Home', icon: '🏠' },
    { id: 2, title: 'Profile', icon: '👤' },
    { id: 3, title: 'Settings', icon: '⚙️' },
    { id: 4, title: 'Help', icon: '❓' },
    { id: 5, title: 'About', icon: 'ℹ️' },
  ];

  const handleMenuPress = (item: any) => {
    console.log(`Navigating to ${item.title}`);
    // Add your navigation logic here
    // navigation.navigate(item.title);
    onClose();
  };

  return (
    <SafeAreaView style={styles.drawer}>
      {/* Header */}
      <View style={styles.drawerHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.logoutButton} onPress={onClose}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Main content component
function MainContent() {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MyApp</Text>
        <Text style={styles.subtitle}>Swipe from the left edge to open menu</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Getting Started</Text>
          <Text style={styles.cardText}>
            This is a simple drawer example. Try swiping from the left edge 
            of the screen to open the navigation menu.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Drawer styles
  drawer: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  drawerHeader: {
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  
  // Menu styles
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#34495e',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
    textAlign: 'center',
  },
  menuTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Footer styles
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#34495e',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Main content styles
  main: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
});
```

## Key Features

### 1. User Profile Header
The drawer includes a user profile section with avatar, name, and email.

### 2. Navigation Menu
Clean menu items with icons and proper touch feedback.

### 3. Gesture Detection
Increased `hitboxSize` to 25px for easier edge detection.

### 4. Auto-Close on Selection
Menu items automatically close the drawer after selection.

### 5. Responsive Design
Uses SafeAreaView and proper spacing for different screen sizes.

## Customization Options

### Change Drawer Width
Drawers automatically size based on screen dimensions and layout, but you can customize the content width:

```tsx
<View style={[styles.drawer, { width: 280 }]}>
  {/* Custom width drawer content */}
</View>
```

### Add Icons
Replace emoji icons with icon libraries:

```tsx
import { Ionicons } from '@expo/vector-icons';

// In menu items:
<Ionicons name="home-outline" size={20} color="white" />
```

### Custom Colors
Modify the color scheme:

```tsx
const colors = {
  primary: '#3498db',
  secondary: '#2c3e50',
  accent: '#e74c3c',
  text: '#ffffff',
  textSecondary: '#bdc3c7',
};
```

### Add Animations
Enhanced animations using render props:

```tsx
<Drawer side="left">
  {({ progress, close }) => (
    <Animated.View 
      style={[
        styles.drawer,
        {
          transform: [{ translateX: (progress - 1) * 50 }],
          opacity: progress * 0.95 + 0.05,
        }
      ]}
    >
      <NavigationDrawer onClose={close} />
    </Animated.View>
  )}
</Drawer>
```

## Integration with Navigation

### React Navigation
```tsx
import { useNavigation } from '@react-navigation/native';

function NavigationDrawer({ onClose }) {
  const navigation = useNavigation();
  
  const handleMenuPress = (screen: string) => {
    navigation.navigate(screen);
    onClose();
  };
  
  // ... rest of component
}
```

### Expo Router
```tsx
import { router } from 'expo-router';

const handleMenuPress = (route: string) => {
  router.push(route);
  onClose();
};
```

## Accessibility

Add accessibility features:

```tsx
<TouchableOpacity
  style={styles.menuItem}
  onPress={() => handleMenuPress(item)}
  accessibilityRole="button"
  accessibilityLabel={`Navigate to ${item.title}`}
  accessibilityHint="Double tap to open this section"
>
  <Text style={styles.menuIcon}>{item.icon}</Text>
  <Text style={styles.menuTitle}>{item.title}</Text>
</TouchableOpacity>
```

## Performance Tips

1. **Memoize menu items** if they don't change frequently
2. **Use FlatList** for long menu lists
3. **Optimize images** in user profile section
4. **Lazy load** heavy drawer content

## Next Steps

- [Multi-Drawer Example](./multi-drawer) - Multiple drawers working together
- [Custom Layouts](./custom-layouts) - Advanced layout configurations
- [Advanced Usage Guide](../guides/advanced-usage) - Performance and customization tips