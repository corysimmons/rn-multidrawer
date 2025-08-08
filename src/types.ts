export type DrawerSide = 'top' | 'right' | 'bottom' | 'left';

export type DrawerLayout = 
  | 'fullscreen'         // All drawers cover full screen dimensions (default)
  | 'sidebar-layout'     // Left/Right full height, Top/Bottom fit remaining width
  | 'header-footer-layout' // Top/Bottom full width, Left/Right fit remaining height
  | 'corner-aware'       // All drawers respect each other's corners

export interface DrawerOptions {
  layout?: DrawerLayout;
}

export interface DrawerRenderProps {
  animatedStyle: any;
  isOpen: boolean;
  progress: any;
  animationState: any;
  width: number;
  height: number;
  open: () => void;
  close: () => void;
}

export interface DrawerProps {
  side: DrawerSide;
  hitboxSize?: number;
  snapOpenThreshold?: number;
  snapCloseThreshold?: number;
  animationSpeed?: number;
  bounciness?: number;
  children: React.ReactNode | ((props: DrawerRenderProps) => React.ReactNode);
  style?: any; // ViewStyle but keeping it loose for flexibility
  className?: string;
}

export interface DrawerProviderProps {
  children: React.ReactNode;
  options?: DrawerOptions;
}

export interface DrawerConfig {
  hitboxSize: number;
  snapOpenThreshold: number;
  snapCloseThreshold: number;
  animationSpeed: number;
  bounciness: number;
}

export interface DrawerContextValue {
  activeDrawer: DrawerSide | null;
  setActiveDrawer: (side: DrawerSide | null) => void;
  isDrawerOpen: (side: DrawerSide) => boolean;
  openDrawer: (side: DrawerSide) => void;
  openDrawerAnimated: (side: DrawerSide) => void;
  closeDrawer: (side: DrawerSide) => void;
  closeDrawerAnimated: (side: DrawerSide) => void;
  getDrawerZIndex: (side: DrawerSide) => number;
  layout: DrawerLayout;
  updateDrawerBounds: (side: DrawerSide, bounds: { x: number; y: number; width: number; height: number }) => void;
  measuredDrawerBounds: Record<DrawerSide, { x: number; y: number; width: number; height: number } | null>;
  // Global text selection control functions (web only)
  setGlobalUserSelectNone: () => void;
  removeGlobalUserSelectNone: () => void;
  // Shared values for gesture translations
  translationX: any; // SharedValue<number>
  translationY: any; // SharedValue<number>
  // Shared values for target progress (for snapping animations)
  targetProgress: Record<DrawerSide, any>; // SharedValue<number> for each side
  currentProgress: Record<DrawerSide, any>; // SharedValue<number> for each side
  // Animation state tracking ('gesture' | 'spring' | 'static')
  animationState: Record<DrawerSide, any>; // SharedValue<'gesture' | 'spring' | 'static'> for each side
  // Snap to position function
  snapToPosition: (side: DrawerSide, progress: number) => void;
}

export interface DrawerState {
  isOpen: boolean;
  progress: number;
}