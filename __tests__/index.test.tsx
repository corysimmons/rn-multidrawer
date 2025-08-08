import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { DrawerProvider, Drawer } from '../src';

describe('react-native-multidrawer', () => {
  it('exports main components', () => {
    expect(DrawerProvider).toBeDefined();
    expect(Drawer).toBeDefined();
  });

  it('renders DrawerProvider with children', () => {
    const { getByText } = render(
      <DrawerProvider>
        <Text>Test Content</Text>
      </DrawerProvider>
    );
    
    expect(getByText('Test Content')).toBeDefined();
  });

  it('renders Drawer component', () => {
    const { getByText } = render(
      <DrawerProvider>
        <Text>Main Content</Text>
        <Drawer side="left">
          <Text>Drawer Content</Text>
        </Drawer>
      </DrawerProvider>
    );
    
    expect(getByText('Main Content')).toBeDefined();
    expect(getByText('Drawer Content')).toBeDefined();
  });

  it('accepts all drawer sides', () => {
    const sides = ['left', 'right', 'top', 'bottom'] as const;
    
    sides.forEach(side => {
      const { getByText } = render(
        <DrawerProvider>
          <Text>Main</Text>
          <Drawer side={side}>
            <Text>{`${side} drawer`}</Text>
          </Drawer>
        </DrawerProvider>
      );
      
      expect(getByText(`${side} drawer`)).toBeDefined();
    });
  });
});