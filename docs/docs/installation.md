---
sidebar_position: 2
---

# Installation

This guide will walk you through installing React Native MultiDrawer and its required dependencies.

## Prerequisites

React Native MultiDrawer requires the following peer dependencies to be installed in your project:

- React Native >= 0.72.0
- React >= 18.0.0
- React Native Reanimated >= 3.15.0
- React Native Gesture Handler >= 2.20.0

## Install the Package

Install the main package using npm or yarn:

```bash npm2yarn
npm install react-native-multidrawer
```

## Install Peer Dependencies

If you don't already have the required peer dependencies, install them:

```bash npm2yarn
npm install react-native-reanimated react-native-gesture-handler
```

## Platform Setup

### React Native Reanimated

Follow the [React Native Reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation) for your platform.

For most React Native projects, you'll need to add the Reanimated plugin to your `babel.config.js`:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // This must be the last plugin
  ],
};
```

### React Native Gesture Handler

Follow the [React Native Gesture Handler installation guide](https://docs.swmansion.com/react-native-gesture-handler/docs/installation) for your platform.

#### iOS

For iOS, you'll need to run:

```bash
cd ios && pod install
```

#### Android

For Android, update your `MainActivity.java` (or `MainActivity.kt`):

```java
package com.example.myapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {
  // ... other code

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      return new RNGestureHandlerEnabledRootView(this.getContext());
    }
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }
}
```

## Expo Projects

If you're using Expo, install the packages using:

```bash
npx expo install react-native-reanimated react-native-gesture-handler
```

Make sure you're using Expo SDK 49 or later for the best compatibility.

## Verification

To verify the installation worked correctly, you can create a simple test:

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import { DrawerProvider } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>MultiDrawer is ready!</Text>
      </View>
    </DrawerProvider>
  );
}
```

If this renders without errors, you're ready to start building with React Native MultiDrawer!

## Troubleshooting

If you encounter issues during installation, check out our [troubleshooting guide](guides/troubleshooting) or file an issue on [GitHub](https://github.com/yourusername/react-native-multidrawer/issues).

## Next Steps

Now that you have React Native MultiDrawer installed, check out the [Getting Started guide](getting-started) to build your first drawer.