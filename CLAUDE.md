# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

react-native-multidrawer is a React Native library providing multi-directional drawer components with gesture handling and smooth animations. It supports drawers from all four edges (top, right, bottom, left) with advanced animation systems built on React Native Reanimated and Gesture Handler.

## Development Commands

### Building and Testing
- `npm run build` - Compile TypeScript to JavaScript in the `lib/` directory
- `npm run typecheck` - Run TypeScript type checking without emitting files
- `npm run lint` - Run ESLint on the `src/` directory
- `npm run test` - Run Jest tests

### Example App Development
- `npm run dev` - Start the example app (equivalent to `cd example && npm start`)
- `npm run example:install` - Install example app dependencies
- `npm run example:ios` - Run example on iOS simulator
- `npm run example:android` - Run example on Android emulator
- `npm run example:web` - Run example in web browser

## Code Architecture

### Core Components Architecture

The library follows a layered architecture with two main API levels:

1. **Render Props Components** (`Drawer.tsx`) - Flexible components using render props pattern
2. **Hook-based API** (`useDrawerState.ts`) - Maximum control for custom implementations

### State Management System

**DrawerProvider Context** (`DrawerProvider.tsx`):
- Global gesture detection and collision prevention
- Shared animation values across all drawers
- Z-index management for proper layering
- State-based animation control preventing conflicts

**Animation State Machine**:
Each drawer operates in one of three exclusive states:
- `'gesture'` - User is actively dragging (gesture has control)
- `'spring'` - Spring animation is running (spring has exclusive control)
- `'static'` - Drawer at rest, ready for interaction

### Key Shared Values (Reanimated)
- `translationX/Y` - Global gesture translations
- `currentProgress[side]` - Animated progress values (0-1) for each drawer
- `animationState[side]` - Current animation state for each drawer
- `targetProgress[side]` - Target progress for spring animations

### Gesture System

**Global Pan Gesture** (DrawerProvider):
- Edge detection using configurable hitbox sizes
- Collision prevention (only one drawer active at a time)
- Automatic drawer registration/unregistration

**Close Gestures** (useDrawerState):
- Independent gesture handlers for each open drawer
- Opposite-direction dragging to close
- Same state machine as opening gestures

### Layout System

Flexible layout system supporting various drawer arrangements:
- `fullscreen` - All drawers cover full screen (default)
- `vertical-priority` - Left/Right full height, Top/Bottom fit remaining width
- `horizontal-priority` - Top/Bottom full width, Left/Right fit remaining height
- Plus 12+ additional specialized layouts

## Important Implementation Details

### Drawer Dimensions
- Drawers use oversized containers (480px) with visible content area (240px)
- Extra padding prevents edge artifacts during animations
- Layout system calculates appropriate dimensions based on screen size and layout mode

### Animation Performance
- All animations run on UI thread via Reanimated worklets
- State-based control prevents animation conflicts
- Gesture and spring animations have exclusive control periods

### Registration Pattern
Drawers self-register their configuration with the global provider:
```typescript
registerDrawer(side, { hitboxSize, snapOpenThreshold, ... });
// Component unmount:
unregisterDrawer(side);
```

## Common Development Tasks

### Adding New Drawer Features
1. Update types in `types.ts` 
2. Extend `DrawerConfig` interface if needed
3. Modify registration in `useDrawerState.ts`
4. Update gesture logic in `DrawerProvider.tsx`

### Layout System Extensions
1. Add new layout type to `DrawerLayout` union in `types.ts`
2. Implement dimension calculations in `utils.ts` `getDrawerDimensions()`
3. Test with multiple drawer combinations

### Testing
- Jest configuration supports TypeScript and React Native preset
- Test utilities in `__tests__/` directory
- Mock setup in `jest.setup.js` for Reanimated and Gesture Handler

## Dependencies

**Peer Dependencies** (must be installed by consumers):
- `react-native-reanimated` >=3.15.0
- `react-native-gesture-handler` >=2.20.0
- `react` >=18.0.0
- `react-native` >=0.72.0

## Example App

The `example/` directory contains a comprehensive Expo app demonstrating all features:
- Built with Expo Router and TypeScript
- Showcases all three API levels
- Multiple drawer configurations and layouts