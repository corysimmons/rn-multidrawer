import { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { DrawerSide } from './types';
import { getDrawerDimensions, calculateProgress } from './utils';
import { useDrawer, registerDrawer, unregisterDrawer } from './DrawerProvider';

export interface UseDrawerStateProps {
  side: DrawerSide;
  hitboxSize?: number;
  snapOpenThreshold?: number;
  snapCloseThreshold?: number;
  animationSpeed?: number;
  bounciness?: number;
}

export interface UseDrawerStateReturn {
  // Animation style for the drawer container
  animatedStyle: any; // Reanimated AnimatedStyleProp
  
  // Gesture handlers
  closeGesture: any; // Reanimated Gesture
  tapGesture: any; // Reanimated Gesture
  combinedGestures: any; // Combined gestures
  
  // State
  isOpen: boolean;
  zIndex: number;
  
  // Dimensions
  width: number;
  height: number;
  
  // Actions (programmatic control)
  open: () => void;
  close: () => void;
  
  // Note: Removed progress and animationState SharedValues to prevent access during render
  // These values should only be accessed within useAnimatedStyle worklets
}

export const useDrawerState = ({
  side,
  hitboxSize = 50,
  snapOpenThreshold = 0.3,
  snapCloseThreshold = 0.7,
  animationSpeed = 0.5,
  bounciness = 0.3,
}: UseDrawerStateProps): UseDrawerStateReturn => {
  const { 
    activeDrawer, 
    translationX, 
    translationY, 
    currentProgress, 
    animationState, 
    isDrawerOpen, 
    snapToPosition, 
    getDrawerZIndex, 
    openDrawer,
    closeDrawerAnimated,
    setGlobalUserSelectNone,
    removeGlobalUserSelectNone,
    layout 
  } = useDrawer();
  
  // Create a shared value to track if this drawer is open (for worklet compatibility)
  const isOpen = useSharedValue(false);
  
  // Local shared values for close gesture
  const closeTranslationX = useSharedValue(0);
  const closeTranslationY = useSharedValue(0);

  // Track dimension changes with layout
  const [dimensions, setDimensions] = useState(() => getDrawerDimensions(side, layout));

  // Update dimensions when window resizes or layout changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setDimensions(getDrawerDimensions(side, layout));
    });

    return () => subscription?.remove();
  }, [side, layout]);

  // Update dimensions when layout changes
  useEffect(() => {
    setDimensions(getDrawerDimensions(side, layout));
  }, [side, layout]);

  const { width, height } = dimensions;

  // Register/unregister this drawer and sync isOpen state
  useEffect(() => {
    registerDrawer(side, { 
      hitboxSize, 
      snapOpenThreshold, 
      snapCloseThreshold, 
      animationSpeed, 
      bounciness 
    });
    return () => unregisterDrawer(side);
  }, [side, hitboxSize, snapOpenThreshold, snapCloseThreshold, animationSpeed, bounciness]);

  // Note: Removed useEffect hooks that were modifying shared values during render
  // These operations are now handled within gesture worklets where appropriate

  // Calculate progress for closing gesture (opposite direction from opening)
  const calculateCloseProgress = (translation: { x: number; y: number }, drawerSide: string): number => {
    // Use the actual visible drawer size (240px) for close calculations, not the oversized dimensions
    const actualDrawerSize = 240;
    
    switch (drawerSide) {
      case 'left':
        // Close by dragging left (negative translation)
        return Math.abs(Math.min(0, translation.x)) / actualDrawerSize;
      case 'right':
        // Close by dragging right (positive translation)
        return Math.max(0, translation.x) / actualDrawerSize;
      case 'top':
        // Close by dragging up (negative translation)
        return Math.abs(Math.min(0, translation.y)) / actualDrawerSize;
      case 'bottom':
        // Close by dragging down (positive translation)
        return Math.max(0, translation.y) / actualDrawerSize;
      default:
        return 0;
    }
  };

  // Close gesture handler for when drawer is open - uses same state system as opening
  const closeGesture = Gesture.Pan()
    .enabled(isDrawerOpen(side))
    .onStart(() => {
      'worklet';
      // Set global user-select none during close gesture (web only)
      runOnJS(setGlobalUserSelectNone)();
      
      // Bring this drawer to front immediately when starting to interact
      runOnJS(openDrawer)(side);
      
      // Set animation state to 'gesture' for close gesture (same as opening)
      const animationStateSharedValue = side === 'top' ? animationState.top :
                                      side === 'right' ? animationState.right :
                                      side === 'bottom' ? animationState.bottom :
                                      animationState.left;
      if (animationStateSharedValue.value === 'static') {
        animationStateSharedValue.value = 'gesture';
        closeTranslationX.value = 0;
        closeTranslationY.value = 0;
      }
    })
    .onUpdate((event) => {
      'worklet';
      // Update close translations during gesture
      const animationStateSharedValue = side === 'top' ? animationState.top :
                                      side === 'right' ? animationState.right :
                                      side === 'bottom' ? animationState.bottom :
                                      animationState.left;
      if (animationStateSharedValue.value === 'gesture') {
        closeTranslationX.value = event.translationX;
        closeTranslationY.value = event.translationY;
        
        // Update currentProgress during close gesture for smooth animations
        const currentProgressSharedValue = side === 'top' ? currentProgress.top :
                                         side === 'right' ? currentProgress.right :
                                         side === 'bottom' ? currentProgress.bottom :
                                         currentProgress.left;
        
        let closeProgress = 0;
        const actualDrawerSize = 240;
        
        if (side === 'left') {
          closeProgress = Math.abs(Math.min(0, event.translationX)) / actualDrawerSize;
        } else if (side === 'right') {
          closeProgress = Math.max(0, event.translationX) / actualDrawerSize;
        } else if (side === 'top') {
          closeProgress = Math.abs(Math.min(0, event.translationY)) / actualDrawerSize;
        } else if (side === 'bottom') {
          closeProgress = Math.max(0, event.translationY) / actualDrawerSize;
        }
        
        // Interpolate from fully open (1) towards closed (0)
        const progress = 1 - Math.min(closeProgress, 1);
        currentProgressSharedValue.value = progress;
      }
    })
    .onEnd((event) => {
      'worklet';
      // Remove global user-select none when close gesture ends (web only)
      runOnJS(removeGlobalUserSelectNone)();
      
      // Process close gesture using the same snap logic as opening
      const animationStateSharedValue = side === 'top' ? animationState.top :
                                      side === 'right' ? animationState.right :
                                      side === 'bottom' ? animationState.bottom :
                                      animationState.left;
      if (animationStateSharedValue.value === 'gesture') {
        const closeProgress = calculateCloseProgress(
          { x: event.translationX, y: event.translationY },
          side
        );
        
        // Use snapToPosition with close logic
        if (closeProgress >= snapCloseThreshold) {
          snapToPosition(side, 0); // Close the drawer (same spring system)
        } else {
          snapToPosition(side, 1); // Keep it open (same spring system)
        }
      }
      
      // Reset close translations
      closeTranslationX.value = 0;
      closeTranslationY.value = 0;
    })
    .onFinalize((event, success) => {
      'worklet';
      // Always re-enable text selection when close gesture finishes, regardless of success
      if (!success) {
        runOnJS(removeGlobalUserSelectNone)();
      }
    });

  // Tap gesture to bring drawer to front on simple clicks
  const tapGesture = Gesture.Tap()
    .enabled(isDrawerOpen(side))
    .onStart(() => {
      'worklet';
      // Bring this drawer to front immediately when tapped
      runOnJS(openDrawer)(side);
    });

  // Combine gestures
  const combinedGestures = Gesture.Race(closeGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    let translateX = 0;
    let translateY = 0;
    let progress = 0;
    
    // Get individual SharedValues to avoid Record object shareable issues
    const currentProgressSharedValue = side === 'top' ? currentProgress.top :
                                     side === 'right' ? currentProgress.right :
                                     side === 'bottom' ? currentProgress.bottom :
                                     currentProgress.left;
    
    const animationStateSharedValue = side === 'top' ? animationState.top :
                                    side === 'right' ? animationState.right :
                                    side === 'bottom' ? animationState.bottom :
                                    animationState.left;
    
    const currentState = animationStateSharedValue.value;
    
    // State-based animation control - only ONE system has authority at a time
    if (currentState === 'gesture') {
      // GESTURE MODE: User is actively dragging this drawer (opening OR closing)
      
      // Check if this is a close gesture (has close translations) or main gesture
      const hasCloseGesture = Math.abs(closeTranslationX.value) > 0.1 || Math.abs(closeTranslationY.value) > 0.1;
      const hasMainGesture = activeDrawer === side && (Math.abs(translationX.value) > 0.1 || Math.abs(translationY.value) > 0.1);
      
      if (hasCloseGesture) {
        // Close gesture - calculate progress from close translations
        let closeProgress = 0;
        const actualDrawerSize = 240;
        
        if (side === 'left') {
          closeProgress = Math.abs(Math.min(0, closeTranslationX.value)) / actualDrawerSize;
        } else if (side === 'right') {
          closeProgress = Math.max(0, closeTranslationX.value) / actualDrawerSize;
        } else if (side === 'top') {
          closeProgress = Math.abs(Math.min(0, closeTranslationY.value)) / actualDrawerSize;
        } else if (side === 'bottom') {
          closeProgress = Math.max(0, closeTranslationY.value) / actualDrawerSize;
        }
        
        // Interpolate from fully open (1) towards closed (0)
        progress = 1 - Math.min(closeProgress, 1);
        
        // Don't write to shared values in animatedStyle - this causes render warnings
        
        // Close gesture progress calculated
        
      } else if (hasMainGesture) {
        // Main opening gesture - calculate progress from main translations
        const gestureProgress = calculateProgress(
          { x: translationX.value, y: translationY.value },
          side
        );
        progress = Math.max(0, Math.min(1, gestureProgress));
        
        // Don't write to shared values in animatedStyle - this causes render warnings
        
        // Main gesture progress calculated
      } else {
        // Gesture state but no active translation - use current progress
        progress = currentProgressSharedValue.value;
      }
      
    } else if (currentState === 'spring') {
      // SPRING MODE: Spring animation has exclusive control
      progress = currentProgressSharedValue.value;
      
      // Spring animation in progress
      
    } else if (currentState === 'static') {
      // STATIC MODE: Use final state, drawer is at rest
      progress = currentProgressSharedValue.value;
    }
    
    // Base positioning based on progress (closed = fully off-screen)
    // For oversized drawers (480px), we want the visible 240px area to behave like a normal 240px drawer
    const visibleSize = 240;
    const totalSize = 480;
    
    // Calculate positioning so that only visibleSize pixels are revealed when fully open
    // When progress = 0: drawer should be completely hidden  
    // When progress = 1: exactly visibleSize pixels should be visible (240px from edge)
    switch (side) {
      case 'left':
        // Start completely hidden (-480px), end with 240px visible (-240px)
        translateX = -totalSize + (visibleSize * progress);
        break;
      case 'right':
        // Start completely hidden (+480px), end with 240px visible (+240px)
        translateX = totalSize - (visibleSize * progress);
        break;
      case 'top':
        // Start completely hidden (-480px), end with 240px visible (-240px)
        translateY = -totalSize + (visibleSize * progress);
        break;
      case 'bottom':
        // Start completely hidden (+480px), end with 240px visible (+240px)
        // Bottom drawer needs to move 240px total, same as other drawers
        translateY = totalSize - (visibleSize * progress);
        break;
    }

    return {
      transform: [
        { translateX },
        { translateY },
      ],
    };
  });

  return {
    animatedStyle,
    closeGesture,
    tapGesture,
    combinedGestures,
    isOpen: isDrawerOpen(side),
    zIndex: getDrawerZIndex(side),
    width,
    height,
    open: () => openDrawer(side),
    close: () => closeDrawerAnimated(side),
    // Note: Removed direct shared value exports to prevent access during render
    // progress and animationState should only be accessed within useAnimatedStyle worklets
  };
};