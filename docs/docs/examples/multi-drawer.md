---
sidebar_position: 2
---

# Multi-Drawer Example

This example demonstrates how to use multiple drawers from different edges, creating a comprehensive interface with navigation, notifications, filters, and quick actions.

## Preview

A complete interface with:
- Left drawer: Navigation menu
- Right drawer: Settings panel  
- Top drawer: Notifications
- Bottom drawer: Quick actions

## Complete Code

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { DrawerProvider, Drawer } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider options={{ layout: 'fullscreen' }}>
      {/* Left Navigation Drawer */}
      <Drawer side="left" hitboxSize={20}>
        {({ close }) => <NavigationDrawer onClose={close} />}
      </Drawer>

      {/* Right Settings Drawer */}
      <Drawer side="right" hitboxSize={20}>
        {({ close }) => <SettingsDrawer onClose={close} />}
      </Drawer>

      {/* Top Notifications Drawer */}
      <Drawer side="top" snapOpenThreshold={0.3}>
        {({ close, progress }) => (
          <NotificationsDrawer onClose={close} progress={progress} />
        )}
      </Drawer>

      {/* Bottom Actions Drawer */}
      <Drawer side="bottom" snapOpenThreshold={0.2}>
        {({ close, progress }) => (
          <ActionsDrawer onClose={close} progress={progress} />
        )}
      </Drawer>

      {/* Main Content */}
      <MainContent />
    </DrawerProvider>
  );
}

// Left Navigation Drawer
function NavigationDrawer({ onClose }: { onClose: () => void }) {
  const menuItems = [
    { title: 'Dashboard', icon: '📊' },
    { title: 'Projects', icon: '📁' },
    { title: 'Tasks', icon: '✅' },
    { title: 'Calendar', icon: '📅' },
    { title: 'Reports', icon: '📈' },
  ];

  return (
    <SafeAreaView style={[styles.drawer, styles.leftDrawer]}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Menu</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              console.log(`Navigate to ${item.title}`);
              onClose();
            }}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Right Settings Drawer
function SettingsDrawer({ onClose }: { onClose: () => void }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <SafeAreaView style={[styles.drawer, styles.rightDrawer]}>
      <View style={styles.drawerHeader}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.drawerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#3498db' }}
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#3498db' }}
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Sound Effects</Text>
          <Switch
            value={soundEffects}
            onValueChange={setSoundEffects}
            trackColor={{ false: '#767577', true: '#3498db' }}
          />
        </View>
        
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Account Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Privacy Policy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Terms of Service</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Top Notifications Drawer
function NotificationsDrawer({ onClose, progress }: any) {
  const notifications = [
    { id: 1, title: 'New message', time: '2m ago', type: 'message' },
    { id: 2, title: 'Task completed', time: '5m ago', type: 'task' },
    { id: 3, title: 'Meeting reminder', time: '10m ago', type: 'calendar' },
    { id: 4, title: 'System update', time: '1h ago', type: 'system' },
  ];

  return (
    <View style={[
      styles.drawer, 
      styles.topDrawer,
      { opacity: progress * 0.95 + 0.05 }
    ]}>
      <SafeAreaView>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Notifications</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.notificationsContainer}>
          {notifications.map((notification) => (
            <TouchableOpacity key={notification.id} style={styles.notificationItem}>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// Bottom Actions Drawer
function ActionsDrawer({ onClose, progress }: any) {
  const actions = [
    { title: 'New Task', icon: '➕', color: '#3498db' },
    { title: 'Quick Note', icon: '📝', color: '#2ecc71' },
    { title: 'Take Photo', icon: '📷', color: '#e74c3c' },
    { title: 'Voice Memo', icon: '🎤', color: '#f39c12' },
  ];

  return (
    <View style={[
      styles.drawer, 
      styles.bottomDrawer,
      { 
        transform: [{ translateY: (1 - progress) * 20 }],
        opacity: progress * 0.95 + 0.05 
      }
    ]}>
      <SafeAreaView>
        <View style={styles.actionsHeader}>
          <View style={styles.pullIndicator} />
          <Text style={styles.actionsTitle}>Quick Actions</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionButton, { backgroundColor: action.color }]}
              onPress={() => {
                console.log(`Action: ${action.title}`);
                onClose();
              }}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

// Main Content
function MainContent() {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.title}>Multi-Drawer App</Text>
        <Text style={styles.subtitle}>Swipe from any edge!</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>Try These Gestures:</Text>
          <Text style={styles.instruction}>← Swipe from left for navigation</Text>
          <Text style={styles.instruction}>→ Swipe from right for settings</Text>
          <Text style={styles.instruction}>↓ Swipe from top for notifications</Text>
          <Text style={styles.instruction}>↑ Swipe from bottom for quick actions</Text>
        </View>
        
        <View style={styles.contentCard}>
          <Text style={styles.cardTitle}>Welcome!</Text>
          <Text style={styles.cardText}>
            This example demonstrates how multiple drawers can work together 
            to create a comprehensive user interface. Each drawer serves a 
            different purpose and can be accessed independently.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Main layout
  main: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  
  // Drawer base styles
  drawer: {
    flex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
  
  // Left drawer (navigation)
  leftDrawer: {
    backgroundColor: '#2c3e50',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  },
  
  // Right drawer (settings)
  rightDrawer: {
    backgroundColor: '#34495e',
  },
  settingsContainer: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingLabel: {
    color: 'white',
    fontSize: 16,
  },
  settingButton: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
  
  // Top drawer (notifications)
  topDrawer: {
    backgroundColor: '#27ae60',
    maxHeight: 300,
  },
  notificationsContainer: {
    flex: 1,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  notificationTime: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  
  // Bottom drawer (actions)
  bottomDrawer: {
    backgroundColor: '#8e44ad',
    maxHeight: 200,
  },
  actionsHeader: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  pullIndicator: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 12,
  },
  actionsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 70,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Content cards
  instructionCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  instruction: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 6,
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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

### 1. Four Independent Drawers
Each drawer serves a specific purpose and can be opened independently.

### 2. Different Snap Thresholds
- Top drawer: Opens with just 30% drag (notifications are quick to check)
- Bottom drawer: Opens with 20% drag (quick actions should be easily accessible)

### 3. Progress-Based Animations
Top and bottom drawers use the progress value for smooth opacity and transform effects.

### 4. Collision Prevention
The DrawerProvider automatically prevents multiple drawers from being open simultaneously.

### 5. Contextual Content
Each drawer contains relevant content for its position and purpose.

## Usage Patterns

### Navigation (Left)
Traditional app navigation with menu items and user actions.

### Settings (Right) 
Configuration options with toggles and preference controls.

### Notifications (Top)
Quick access to recent alerts and messages.

### Quick Actions (Bottom)
Fast access to common tasks and creation actions.

## Customization Tips

### Different Layouts
Try different layout configurations:

```tsx
<DrawerProvider options={{ layout: 'sidebar-layout' }}>
  {/* Left/right drawers full height, top/bottom fit remaining width */}
</DrawerProvider>
```

### Conditional Drawers
Show/hide drawers based on app state:

```tsx
{user.isLoggedIn && (
  <Drawer side="left">
    {/* Navigation only for logged-in users */}
  </Drawer>
)}
```

### Coordinated Actions
Make drawers work together:

```tsx
const handleNavigate = (screen: string) => {
  // Close all other drawers when navigating
  settingsClose();
  notificationsClose();
  actionsClose();
  navigate(screen);
};
```

## Performance Optimization

1. **Lazy loading**: Load drawer content only when first opened
2. **Memoization**: Use React.memo for drawer components
3. **Virtualization**: Use FlatList for long lists in drawers
4. **Debouncing**: Debounce rapid gesture events

## Next Steps

- [Custom Layouts](./custom-layouts) - Advanced layout configurations
- [Layouts Guide](../guides/layouts) - Detailed layout system documentation
- [Advanced Usage](../guides/advanced-usage) - Performance and customization techniques