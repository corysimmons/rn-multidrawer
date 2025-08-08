import { Dimensions } from 'react-native';
import { DrawerSide, DrawerLayout } from './types';

// Get current screen dimensions dynamically
const getCurrentDimensions = () => Dimensions.get('window');

export const isWithinHitbox = (
  x: number,
  y: number,
  side: DrawerSide,
  hitboxSize: number
): boolean => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = getCurrentDimensions();
  
  // Optimized direct return without intermediate variable
  switch (side) {
    case 'left':
      return x <= hitboxSize;
    case 'right':
      return x >= SCREEN_WIDTH - hitboxSize;
    case 'top':
      return y <= hitboxSize;
    case 'bottom':
      return y >= SCREEN_HEIGHT - hitboxSize;
    default:
      return false;
  }
};

// Pre-calculate constant for better performance - use visible drawer size for consistent gesture distance
const DRAWER_VISIBLE_SIZE = 240;
const DRAWER_SIZE_INVERSE = 1 / DRAWER_VISIBLE_SIZE; // Avoids division in hot path

export const calculateProgress = (
  translation: { x: number; y: number },
  side: DrawerSide
): number => {
  // Direct calculation and return for better performance
  let rawProgress = 0;
  
  switch (side) {
    case 'left':
      rawProgress = Math.max(0, translation.x) * DRAWER_SIZE_INVERSE;
      break;
    case 'right':
      rawProgress = Math.max(0, -translation.x) * DRAWER_SIZE_INVERSE;
      break;
    case 'top':
      rawProgress = Math.max(0, translation.y) * DRAWER_SIZE_INVERSE;
      break;
    case 'bottom':
      rawProgress = Math.max(0, -translation.y) * DRAWER_SIZE_INVERSE;
      break;
  }
  
  return Math.min(1, rawProgress);
};

const DRAWER_THICKNESS = 240; // Visible drawer size
const DRAWER_OVERSIZED = 480; // Total drawer size (visible + padding)

const calculateLayoutDimensions = (layout: DrawerLayout, screenWidth: number, screenHeight: number) => {
  switch (layout) {
    case 'fullscreen':
      return {
        left: { width: DRAWER_OVERSIZED, height: screenHeight },
        right: { width: DRAWER_OVERSIZED, height: screenHeight },
        top: { width: screenWidth, height: DRAWER_OVERSIZED },
        bottom: { width: screenWidth, height: DRAWER_OVERSIZED }
      };
      
    case 'sidebar-layout':
      // Sidebar layout: Left/Right get full height, Top/Bottom fit remaining width
      const topBottomWidth = screenWidth - (DRAWER_THICKNESS * 2);
      return {
        left: { width: DRAWER_OVERSIZED, height: screenHeight },
        right: { width: DRAWER_OVERSIZED, height: screenHeight },
        top: { width: topBottomWidth, height: DRAWER_OVERSIZED },
        bottom: { width: topBottomWidth, height: DRAWER_OVERSIZED }
      };
      
    case 'header-footer-layout':
      // Header/Footer layout: Top/Bottom get full width, Left/Right fit remaining height
      const leftRightHeight = screenHeight - (DRAWER_THICKNESS * 2);
      return {
        left: { width: DRAWER_OVERSIZED, height: leftRightHeight },
        right: { width: DRAWER_OVERSIZED, height: leftRightHeight },
        top: { width: screenWidth, height: DRAWER_OVERSIZED },
        bottom: { width: screenWidth, height: DRAWER_OVERSIZED }
      };
      
    case 'corner-aware':
      // All drawers respect each other's corners
      return {
        left: { width: DRAWER_OVERSIZED, height: screenHeight - (DRAWER_THICKNESS * 2) },
        right: { width: DRAWER_OVERSIZED, height: screenHeight - (DRAWER_THICKNESS * 2) },
        top: { width: screenWidth - (DRAWER_THICKNESS * 2), height: DRAWER_OVERSIZED },
        bottom: { width: screenWidth - (DRAWER_THICKNESS * 2), height: DRAWER_OVERSIZED }
      };
      
    default:
      // Fallback to fullscreen
      return {
        left: { width: DRAWER_OVERSIZED, height: screenHeight },
        right: { width: DRAWER_OVERSIZED, height: screenHeight },
        top: { width: screenWidth, height: DRAWER_OVERSIZED },
        bottom: { width: screenWidth, height: DRAWER_OVERSIZED }
      };
  }
};

export const getDrawerDimensions = (side: DrawerSide, layout: DrawerLayout = 'fullscreen') => {
  const { width: screenWidth, height: screenHeight } = getCurrentDimensions();
  const layoutDimensions = calculateLayoutDimensions(layout, screenWidth, screenHeight);
  return layoutDimensions[side];
};

export const getDrawerStaticPosition = (side: DrawerSide, layout: DrawerLayout = 'fullscreen') => {
  const { width: screenWidth, height: screenHeight } = getCurrentDimensions();
  const dimensions = getDrawerDimensions(side, layout);
  
  // Calculate layout-specific positioning
  switch (layout) {
    case 'sidebar-layout':
      // Left/Right get full height, Top/Bottom positioned between them
      switch (side) {
        case 'left':
          return { left: 0, top: 0 };
        case 'right':
          return { right: 0, top: 0 };
        case 'top':
          // Position after left drawer (240px from left edge)
          return { top: 0, left: DRAWER_THICKNESS };
        case 'bottom':
          // Position after left drawer (240px from left edge)
          return { bottom: 0, left: DRAWER_THICKNESS };
      }
    
    case 'header-footer-layout':
      // Top/Bottom get full width, Left/Right positioned between them
      switch (side) {
        case 'left':
          // Position after top drawer (240px from top edge)
          return { left: 0, top: DRAWER_THICKNESS };
        case 'right':
          // Position after top drawer (240px from top edge)  
          return { right: 0, top: DRAWER_THICKNESS };
        case 'top':
          return { top: 0, left: 0 };
        case 'bottom':
          return { bottom: 0, left: 0 };
      }
      
    case 'corner-aware':
      // All drawers positioned to avoid overlapping corners
      switch (side) {
        case 'left':
          return { left: 0, top: DRAWER_THICKNESS };
        case 'right':
          return { right: 0, top: DRAWER_THICKNESS };
        case 'top':
          return { top: 0, left: DRAWER_THICKNESS };
        case 'bottom':
          return { bottom: 0, left: DRAWER_THICKNESS };
      }
      
    default:
      // Default centering logic for other layouts
      switch (side) {
        case 'left':
          const leftTopOffset = dimensions.height < screenHeight 
            ? (screenHeight - dimensions.height) / 2 
            : 0;
          return { left: 0, top: leftTopOffset };
        case 'right':
          const rightTopOffset = dimensions.height < screenHeight 
            ? (screenHeight - dimensions.height) / 2 
            : 0;
          return { right: 0, top: rightTopOffset };
        case 'top':
          const topLeftOffset = dimensions.width < screenWidth 
            ? (screenWidth - dimensions.width) / 2 
            : 0;
          return { top: 0, left: topLeftOffset };
        case 'bottom':
          const bottomLeftOffset = dimensions.width < screenWidth 
            ? (screenWidth - dimensions.width) / 2 
            : 0;
          return { bottom: 0, left: bottomLeftOffset };
      }
  }
  
  return { left: 0, top: 0 };
};

export const getDrawerPosition = (side: DrawerSide, progress: number) => {
  const { width, height } = getDrawerDimensions(side);
  
  switch (side) {
    case 'left':
      return {
        left: -width + (width * progress),
        top: 0,
      };
    case 'right':
      return {
        right: -width + (width * progress),
        top: 0,
      };
    case 'top':
      return {
        top: -height + (height * progress),
        left: 0,
      };
    case 'bottom':
      return {
        bottom: -height + (height * progress),
        left: 0,
      };
    default:
      return { left: 0, top: 0 };
  }
};