# Contributing to react-native-multidrawer

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/react-native-multidrawer.git
   cd react-native-multidrawer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install example app dependencies**
   ```bash
   npm run example:install
   ```

4. **Start the example app**
   ```bash
   npm run example:ios
   # or
   npm run example:android
   ```

## Project Structure

```
react-native-multidrawer/
├── src/                    # Library source code
│   ├── index.ts           # Main exports
│   ├── Drawer.tsx         # Individual drawer component
│   ├── DrawerProvider.tsx # Global provider and state management
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
├── example/               # Demo app
├── __tests__/            # Test files
├── docs/                 # Additional documentation
└── lib/                  # Built library (generated)
```

## Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit files in the `src/` directory
   - The example app will automatically reflect your changes

3. **Test your changes**
   ```bash
   npm test
   npm run typecheck
   npm run lint
   ```

4. **Build the library**
   ```bash
   npm run build
   ```

### Code Standards

- **TypeScript**: All code must be written in TypeScript with proper types
- **ESLint**: Follow the existing ESLint configuration
- **Reanimated**: Use worklets for performance-critical code
- **Comments**: Add JSDoc comments for public APIs
- **Tests**: Write tests for new functionality

### Animation System Guidelines

This library uses a sophisticated state-based animation system. When contributing:

1. **Respect the state machine**: `gesture` → `spring` → `static`
2. **Use worklets**: Mark functions that run on UI thread with `'worklet'`
3. **Avoid conflicts**: Only one system should control animations at a time
4. **Performance first**: Prefer UI thread execution for gesture handling

### Testing

Run the test suite:
```bash
npm test
```

For watch mode during development:
```bash
npm test -- --watch
```

### Example App

The example app is crucial for testing changes:
```bash
# iOS
npm run example:ios

# Android  
npm run example:android

# Web
npm run example:web
```

## Submitting Changes

### Pull Request Process

1. **Update documentation** if you've made API changes
2. **Add tests** for new functionality
3. **Update CHANGELOG.md** with your changes
4. **Ensure all tests pass**
5. **Create a pull request** with a clear description

### Pull Request Template

Please include:
- **What**: What changes were made?
- **Why**: Why were these changes necessary?
- **How**: How do the changes work?
- **Testing**: How were the changes tested?
- **Breaking**: Are there any breaking changes?

### Commit Messages

Use conventional commits:
```
feat: add new gesture customization options
fix: resolve animation conflict issue
docs: update API documentation
test: add tests for edge cases
```

## Types of Contributions

### Bug Fixes
- Fix animation issues
- Resolve gesture conflicts
- Performance improvements
- Cross-platform compatibility

### New Features
- Additional gesture types
- Animation presets
- Accessibility improvements
- Developer experience enhancements

### Documentation
- API documentation
- Usage examples
- Performance guides
- Migration guides

### Testing
- Unit tests
- Integration tests
- Performance tests
- Platform-specific tests

## Code Review

All submissions go through code review. Reviewers will check for:
- **Functionality**: Does it work as intended?
- **Performance**: Does it maintain 60fps animations?
- **Compatibility**: Does it work across platforms?
- **Code quality**: Is it well-structured and documented?
- **Tests**: Are there adequate tests?

## Getting Help

- **Questions**: Open a [Discussion](https://github.com/yourusername/react-native-multidrawer/discussions)
- **Bugs**: Create an [Issue](https://github.com/yourusername/react-native-multidrawer/issues)
- **Feature Requests**: Use [Feature Request template](https://github.com/yourusername/react-native-multidrawer/issues/new?template=feature_request.md)

## Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Credited in the CHANGELOG

Thank you for contributing to make this library better! 🎉