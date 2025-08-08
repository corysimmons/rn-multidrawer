import React, { useCallback } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { LayoutChangeEvent } from 'react-native';
import { useDrawerState, UseDrawerStateProps } from './useDrawerState';
import { useDrawer } from './DrawerProvider';
import { getDrawerStaticPosition } from './utils';

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

export interface DrawerProps extends UseDrawerStateProps {
  children: React.ReactNode | ((props: DrawerRenderProps) => React.ReactNode);
  style?: any;
  className?: string;
}

/**
 * Drawer - A flexible drawer component using render props pattern
 * Provides all the drawer logic and state without any UI assumptions
 */
const DrawerComponent: React.FC<DrawerProps> = ({ 
  children, 
  style,
  className,
  ...drawerProps 
}) => {
  const { layout, updateDrawerBounds } = useDrawer();
  const drawerState = useDrawerState(drawerProps);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    updateDrawerBounds(drawerProps.side, { x, y, width, height });
  }, [updateDrawerBounds, drawerProps.side]);

  const renderProps: DrawerRenderProps = {
    animatedStyle: drawerState.animatedStyle,
    isOpen: drawerState.isOpen,
    progress: drawerState.progress,
    animationState: drawerState.animationState,
    width: drawerState.width,
    height: drawerState.height,
    open: drawerState.open,
    close: drawerState.close,
  };

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(renderProps);
    }
    return children;
  };

  // Web-specific className handling (only if className was provided)
  const webProps = typeof document !== 'undefined' && className ? { className } : {};

  return (
    <GestureDetector gesture={drawerState.combinedGestures}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: drawerState.width,
            height: drawerState.height,
            zIndex: drawerState.zIndex,
            ...getDrawerStaticPosition(drawerProps.side, layout),
          },
          drawerState.animatedStyle,
          style,
        ]}
        onLayout={handleLayout}
        {...webProps}
      >
        {renderChildren()}
      </Animated.View>
    </GestureDetector>
  );
};

DrawerComponent.displayName = 'Drawer';

export const Drawer = React.memo(DrawerComponent);

