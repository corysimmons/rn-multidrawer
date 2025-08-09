import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, withSpring, runOnJS, runOnUI } from 'react-native-reanimated';

import { DrawerSide, DrawerContextValue, DrawerProviderProps, DrawerConfig } from './types';
import { isWithinHitbox, calculateProgress } from './utils';

const DrawerContext = createContext<DrawerContextValue | null>(null);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

// Global registry for drawer configs
const drawerConfigs: Record<DrawerSide, DrawerConfig | null> = {
  top: null,
  right: null,
  bottom: null,
  left: null,
};

export const registerDrawer = (side: DrawerSide, config: DrawerConfig) => {
  drawerConfigs[side] = config;
};

export const unregisterDrawer = (side: DrawerSide) => {
  drawerConfigs[side] = null;
};

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children, options }) => {
  const layout = options?.layout || 'fullscreen';
  const [activeDrawer, setActiveDrawer] = useState<DrawerSide | null>(null);
  const [drawerStates, setDrawerStates] = useState<Record<DrawerSide, { isOpen: boolean }>>({
    top: { isOpen: false },
    right: { isOpen: false },
    bottom: { isOpen: false },
    left: { isOpen: false },
  });
  const [drawerOpenOrder, setDrawerOpenOrder] = useState<DrawerSide[]>([]);
  const [, forceUpdate] = useState(0); // Force update trigger for dimension changes
  const [measuredDrawerBounds, setMeasuredDrawerBounds] = useState<Record<DrawerSide, { x: number; y: number; width: number; height: number } | null>>({
    top: null,
    right: null,
    bottom: null,
    left: null
  });

  // Shared values for gesture translations
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  
  // Shared values for target progress (for snapping animations)
  const targetProgressTop = useSharedValue(0);
  const targetProgressRight = useSharedValue(0);
  const targetProgressBottom = useSharedValue(0);
  const targetProgressLeft = useSharedValue(0);
  const targetProgress = useMemo(() => ({
    top: targetProgressTop,
    right: targetProgressRight,
    bottom: targetProgressBottom,
    left: targetProgressLeft,
  }), [targetProgressTop, targetProgressRight, targetProgressBottom, targetProgressLeft]);

  // Shared values for current animated progress (smoother transitions)
  const currentProgressTop = useSharedValue(0);
  const currentProgressRight = useSharedValue(0);
  const currentProgressBottom = useSharedValue(0);
  const currentProgressLeft = useSharedValue(0);
  const currentProgress = useMemo(() => ({
    top: currentProgressTop,
    right: currentProgressRight,
    bottom: currentProgressBottom,
    left: currentProgressLeft,
  }), [currentProgressTop, currentProgressRight, currentProgressBottom, currentProgressLeft]);

  // Animation state tracking for each drawer ('gesture' | 'spring' | 'static')
  const animationStateTop = useSharedValue<'gesture' | 'spring' | 'static'>('static');
  const animationStateRight = useSharedValue<'gesture' | 'spring' | 'static'>('static');
  const animationStateBottom = useSharedValue<'gesture' | 'spring' | 'static'>('static');
  const animationStateLeft = useSharedValue<'gesture' | 'spring' | 'static'>('static');
  const animationState = useMemo(() => ({
    top: animationStateTop,
    right: animationStateRight,
    bottom: animationStateBottom,
    left: animationStateLeft,
  }), [animationStateTop, animationStateRight, animationStateBottom, animationStateLeft]);

  // Listen for window dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      // Force re-render when dimensions change to update drawer sizes
      forceUpdate(prev => prev + 1);
    });

    return () => subscription?.remove();
  }, []);


  const findActiveDrawer = (x: number, y: number): DrawerSide | null => {
    for (const [side, config] of Object.entries(drawerConfigs)) {
      if (config && isWithinHitbox(x, y, side as DrawerSide, config.hitboxSize)) {
        return side as DrawerSide;
      }
    }
    return null;
  };



  const isDrawerOpen = useCallback((side: DrawerSide) => drawerStates[side].isOpen, [drawerStates]);

  const openDrawer = useCallback((side: DrawerSide) => {
    setDrawerStates(prev => ({
      ...prev,
      [side]: { isOpen: true },
    }));
    
    // Update z-index order - move this drawer to the front
    setDrawerOpenOrder(prev => {
      const newOrder = prev.filter(drawer => drawer !== side);
      return [...newOrder, side]; // Most recent at the end (highest z-index)
    });
  }, []);

  const closeDrawer = useCallback((side: DrawerSide) => {
    // Keep drawer in z-index order during closing animation
    // Only remove from order after animation completes
    setDrawerStates(prev => ({
      ...prev,
      [side]: { isOpen: false },
    }));
  }, []);

  // Helper function to remove drawer from z-index order (called from worklet)
  const removeFromZIndexOrder = useCallback((side: DrawerSide) => {
    setDrawerOpenOrder(prev => prev.filter(drawer => drawer !== side));
  }, []);

  // Helper functions to control global text selection (web only)
  const setGlobalUserSelectNone = useCallback(() => {
    if (typeof document !== 'undefined') {
      // Remove any existing style
      const existingStyle = document.getElementById('rn-multidrawer-no-select');
      if (existingStyle) existingStyle.remove();

      // Create new style element with simple universal selector
      const style = document.createElement('style');
      style.id = 'rn-multidrawer-no-select';
      
      // Simple approach: block ALL text selection during drag
      style.textContent = `
        * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
        }
        
        html, body {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
        }
      `;
      
      document.head.appendChild(style);
      
      // Also set it programmatically as backup
      document.body.style.setProperty('-webkit-user-select', 'none', 'important');
      document.body.style.setProperty('user-select', 'none', 'important');
      
    }
  }, []);

  const removeGlobalUserSelectNone = useCallback(() => {
    if (typeof document !== 'undefined') {
      const style = document.getElementById('rn-multidrawer-no-select');
      if (style) {
        style.remove();
      }
      
      // Remove programmatic styles
      document.body.style.removeProperty('-webkit-user-select');
      document.body.style.removeProperty('user-select');
      
    }
  }, []);

  const updateDrawerBounds = useCallback((side: DrawerSide, bounds: { x: number; y: number; width: number; height: number }) => {
    setMeasuredDrawerBounds(prev => ({
      ...prev,
      [side]: bounds
    }));
  }, []);

  const getDrawerZIndex = useCallback((side: DrawerSide): number => {
    const baseZIndex = 1000; // High base z-index for drawers
    const orderIndex = drawerOpenOrder.indexOf(side);
    
    if (orderIndex === -1) {
      // Drawer is not open, return lower z-index
      return baseZIndex;
    }
    
    // Most recent drawer gets highest z-index
    return baseZIndex + orderIndex + 1;
  }, [drawerOpenOrder]);

  const snapToPosition = useCallback((side: DrawerSide, progress: number) => {
    const config = drawerConfigs[side];
    if (!config) return;

    const { snapOpenThreshold, animationSpeed, bounciness } = config;
    
    let targetProgressValue = progress;
    if (progress > snapOpenThreshold) {
      targetProgressValue = 1;
    } else {
      targetProgressValue = 0;
    }
    
    // Update drawer state immediately (React context)
    if (targetProgressValue === 1) {
      openDrawer(side);
    } else if (targetProgressValue === 0) {
      closeDrawer(side);
    }

    // Queue shared value updates to run on UI thread
    const animationWorklet = () => {
      'worklet';
      
      // Get individual SharedValues to avoid Record object shareable issues
      const currentProgressSharedValue = side === 'top' ? currentProgressTop :
                                       side === 'right' ? currentProgressRight :
                                       side === 'bottom' ? currentProgressBottom :
                                       currentProgressLeft;
      
      const targetProgressSharedValue = side === 'top' ? targetProgressTop :
                                      side === 'right' ? targetProgressRight :
                                      side === 'bottom' ? targetProgressBottom :
                                      targetProgressLeft;
      
      const animationStateSharedValue = side === 'top' ? animationStateTop :
                                      side === 'right' ? animationStateRight :
                                      side === 'bottom' ? animationStateBottom :
                                      animationStateLeft;

      // Set animation state to 'spring' - this gives spring animation exclusive control
      animationStateSharedValue.value = 'spring';
      
      const springConfig = {
        damping: 20 - (bounciness * 10),
        mass: 1,
        stiffness: 100 + (animationSpeed * 100),
      };
      
      // Animate to target progress with exclusive control during spring phase
      currentProgressSharedValue.value = withSpring(targetProgressValue, springConfig, (finished) => {
        'worklet';
        if (finished) {
          // Spring animation completed - switch to static mode
          animationStateSharedValue.value = 'static';
          
          // If drawer was closed (progress 0), remove from z-index order after animation
          if (targetProgressValue === 0) {
            // Use runOnJS to call React state update from worklet
            runOnJS(removeFromZIndexOrder)(side);
          }
        }
      });
      
      // Also update target progress for consistency
      targetProgressSharedValue.value = targetProgressValue;
    };

    // Execute the worklet on the UI thread
    runOnUI(animationWorklet)();

    return targetProgressValue;
  }, [
    currentProgressTop, currentProgressRight, currentProgressBottom, currentProgressLeft,
    targetProgressTop, targetProgressRight, targetProgressBottom, targetProgressLeft,
    animationStateTop, animationStateRight, animationStateBottom, animationStateLeft,
    removeFromZIndexOrder, openDrawer, closeDrawer
  ]);

  const openDrawerAnimated = useCallback((side: DrawerSide) => {
    // Trigger the same animation system used by gestures
    snapToPosition(side, 1); // Animate to open position (1 progress)
  }, [snapToPosition]);

  const closeDrawerAnimated = useCallback((side: DrawerSide) => {
    // Trigger the same animation system used by gestures
    snapToPosition(side, 0); // Animate to closed position (0 progress)
  }, [snapToPosition]);

  const panGesture = Gesture.Pan()
    .shouldCancelWhenOutside(false)
    .maxPointers(1)
    .hitSlop(0)
    .minDistance(5)
    .onTouchesDown((event, stateManager) => {
      const startX = event.allTouches[0].x;
      const startY = event.allTouches[0].y;
      
      const drawer = findActiveDrawer(startX, startY);
      if (!drawer || activeDrawer) {
        stateManager.fail();
      }
    })
    .onFinalize((event, success) => {
      // Always re-enable text selection when gesture finishes, regardless of success
      if (!success) {
        runOnJS(removeGlobalUserSelectNone)();
      }
    })
    .onStart((event) => {
      'worklet';
      const startX = event.x;
      const startY = event.y;
      
      const drawer = findActiveDrawer(startX, startY);
      if (drawer && !activeDrawer) {
        runOnJS(setActiveDrawer)(drawer);
        
        // Set global user-select none during drag (web only)
        runOnJS(setGlobalUserSelectNone)();
        
        // Bring drawer to front immediately when starting drag
        runOnJS(openDrawer)(drawer);
        
        // Set animation state to 'gesture' - gesture has control
        const animationStateSharedValue = drawer === 'top' ? animationStateTop :
                                        drawer === 'right' ? animationStateRight :
                                        drawer === 'bottom' ? animationStateBottom :
                                        animationStateLeft;
        animationStateSharedValue.value = 'gesture';
        
        // Reset all close gesture translations when starting a new main gesture
        // This prevents interference with the spring animation
        translationX.value = 0;
        translationY.value = 0;
      }
    })
    .onUpdate((event) => {
      'worklet';
      if (activeDrawer) {
        // Update shared values directly for maximum performance
        translationX.value = event.translationX;
        translationY.value = event.translationY;
        
        // Update currentProgress during gesture for smooth animations
        const currentProgressSharedValue = activeDrawer === 'top' ? currentProgressTop :
                                         activeDrawer === 'right' ? currentProgressRight :
                                         activeDrawer === 'bottom' ? currentProgressBottom :
                                         currentProgressLeft;
        
        const gestureProgress = calculateProgress(
          { x: event.translationX, y: event.translationY },
          activeDrawer
        );
        currentProgressSharedValue.value = Math.max(0, Math.min(1, gestureProgress));
      }
    })
    .onEnd((event) => {
      'worklet';
      if (activeDrawer) {
        // Remove global user-select none when drag ends (web only)
        runOnJS(removeGlobalUserSelectNone)();
        
        // Calculate final progress
        const finalProgress = calculateProgress(
          { x: event.translationX, y: event.translationY },
          activeDrawer
        );
        
        // Snap to position
        snapToPosition(activeDrawer, finalProgress);
        
        // Set active drawer to null for spring animation mode
        runOnJS(setActiveDrawer)(null);
        
        // Reset translations using animation callback instead of setTimeout
        translationX.value = withSpring(0, { duration: 100 });
        translationY.value = withSpring(0, { duration: 100 });
      }
    });

  // Global event listeners to prevent text selection immediately on touch/mouse down
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const preventSelectionStart = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
      
      if (clientX !== undefined && clientY !== undefined) {
        const drawer = findActiveDrawer(clientX, clientY);
        if (drawer && !activeDrawer) {
          // Prevent text selection immediately
          e.preventDefault();
          setGlobalUserSelectNone();
        }
      }
    };

    const cleanupSelection = () => {
      // Clean up text selection blocking if no active drawer
      if (!activeDrawer) {
        removeGlobalUserSelectNone();
      }
    };

    document.addEventListener('mousedown', preventSelectionStart, { passive: false });
    document.addEventListener('touchstart', preventSelectionStart, { passive: false });
    document.addEventListener('mouseup', cleanupSelection);
    document.addEventListener('touchend', cleanupSelection);

    return () => {
      document.removeEventListener('mousedown', preventSelectionStart);
      document.removeEventListener('touchstart', preventSelectionStart);
      document.removeEventListener('mouseup', cleanupSelection);
      document.removeEventListener('touchend', cleanupSelection);
    };
  }, [activeDrawer, setGlobalUserSelectNone, removeGlobalUserSelectNone]);

  const contextValue: DrawerContextValue = useMemo(() => ({
    activeDrawer,
    setActiveDrawer,
    isDrawerOpen,
    openDrawer,
    openDrawerAnimated,
    closeDrawer,
    closeDrawerAnimated,
    getDrawerZIndex,
    layout,
    updateDrawerBounds,
    measuredDrawerBounds,
    setGlobalUserSelectNone,
    removeGlobalUserSelectNone,
    translationX,
    translationY,
    targetProgress,
    currentProgress,
    animationState,
    snapToPosition,
  }), [
    activeDrawer, 
    isDrawerOpen, 
    openDrawer, 
    openDrawerAnimated,
    closeDrawer, 
    closeDrawerAnimated,
    getDrawerZIndex, 
    layout,
    updateDrawerBounds,
    measuredDrawerBounds,
    setGlobalUserSelectNone,
    removeGlobalUserSelectNone,
    translationX, 
    translationY, 
    targetProgress, 
    currentProgress, 
    animationState, 
    snapToPosition
  ]);

  return (
    <DrawerContext.Provider value={contextValue}>
      <GestureDetector gesture={panGesture}>
        <View style={styles.container}>
          {children}
        </View>
      </GestureDetector>
    </DrawerContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});