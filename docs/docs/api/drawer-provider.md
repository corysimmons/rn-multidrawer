# DrawerProvider

Root provider component that manages drawer state and gestures.

## Usage

```tsx
import { DrawerProvider } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider>
      {/* Your app content and drawers */}
    </DrawerProvider>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | App content and drawers |
| `options` | `{ layout?: DrawerLayout }` | Configuration options |

## Layout Options

- `fullscreen` (default) - All drawers cover full screen
- `sidebar-layout` - Left/right full height, top/bottom fit remaining width
- `header-footer-layout` - Top/bottom full width, left/right fit remaining height
- `corner-aware` - All drawers respect each other's corners

## useDrawer Hook

Access drawer functions:

```tsx
const { openDrawer, closeDrawer, isDrawerOpen } = useDrawer();
```