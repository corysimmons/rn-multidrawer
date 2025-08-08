# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-06

### Added
- Multi-directional drawer component supporting all four screen edges
- Edge-based gesture detection with configurable hitbox sizes  
- Smooth spring animations powered by React Native Reanimated
- State-based animation system preventing animation conflicts
- Customizable snap thresholds for opening and closing
- Configurable animation speed and bounciness
- TypeScript support with comprehensive type definitions
- Close gesture functionality - drag in opposite direction to close
- Z-index management for multiple open drawers
- Comprehensive test suite
- Example app demonstrating all features
- Full documentation and API reference

### Features
- **Multi-directional**: Support for `top`, `right`, `bottom`, and `left` drawers
- **Edge gestures**: Drag from any screen edge to open drawers
- **Close gestures**: Drag open drawers in opposite direction to close
- **Smooth animations**: 60fps animations with spring physics
- **Highly customizable**: Configure thresholds, speeds, and visual behavior
- **Cross-platform**: Works on iOS, Android, and Web
- **TypeScript**: Full type safety and IntelliSense support
- **Performance**: Optimized with Reanimated worklets for UI thread execution

### Technical Highlights
- State machine-based animation system (`gesture` → `spring` → `static`)
- Worklet-based gesture handling for optimal performance
- Oversized drawer technique for seamless bounce animations
- Conflict-free animation state management
- Comprehensive gesture priority handling

### Dependencies
- React Native >=0.72.0
- react-native-gesture-handler >=2.20.0
- react-native-reanimated >=3.15.0

## [Unreleased]

### Planned
- Animation presets (slow, normal, fast, bouncy, etc.)
- Custom animation curves support
- Accessibility improvements
- Performance optimizations
- Additional gesture customization options