// Main components
export { Drawer } from './Drawer';
export { DrawerProvider, useDrawer } from './DrawerProvider';
export { useDrawerState } from './useDrawerState';

// Types
export type { 
  DrawerSide, 
  DrawerProviderProps, 
  DrawerContextValue, 
  DrawerConfig,
  DrawerState,
  DrawerLayout,
  DrawerOptions,
  DrawerRenderProps 
} from './types';
export type { DrawerProps } from './Drawer';
export type { 
  UseDrawerStateProps, 
  UseDrawerStateReturn 
} from './useDrawerState';

// Utils (for advanced users)
export { getDrawerDimensions, getDrawerStaticPosition, calculateProgress, isWithinHitbox } from './utils';

// Internal functions (not recommended for direct use)
export { registerDrawer, unregisterDrawer } from './DrawerProvider';