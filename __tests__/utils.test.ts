import { calculateProgress, getDrawerDimensions, isWithinHitbox } from '../src/utils';
import type { DrawerSide } from '../src/types';

// Mock Dimensions
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({
      width: 375,
      height: 812,
    })),
  },
}));

describe('utils', () => {
  describe('calculateProgress', () => {
    it('calculates progress for left drawer', () => {
      const progress = calculateProgress({ x: 120, y: 0 }, 'left');
      expect(progress).toBeCloseTo(0.5); // 120 / 240 = 0.5
    });

    it('calculates progress for right drawer', () => {
      const progress = calculateProgress({ x: -120, y: 0 }, 'right');
      expect(progress).toBeCloseTo(0.5); // abs(-120) / 240 = 0.5
    });

    it('calculates progress for top drawer', () => {
      const progress = calculateProgress({ x: 0, y: 120 }, 'top');
      expect(progress).toBeCloseTo(0.5); // 120 / 240 = 0.5
    });

    it('calculates progress for bottom drawer', () => {
      const progress = calculateProgress({ x: 0, y: -120 }, 'bottom');
      expect(progress).toBeCloseTo(0.5); // abs(-120) / 240 = 0.5
    });

    it('clamps progress between 0 and 1', () => {
      const overProgress = calculateProgress({ x: 500, y: 0 }, 'left');
      const underProgress = calculateProgress({ x: -500, y: 0 }, 'left');
      
      expect(overProgress).toBeLessThanOrEqual(1);
      expect(underProgress).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getDrawerDimensions', () => {
    it('returns correct dimensions for horizontal drawers', () => {
      const leftDimensions = getDrawerDimensions('left');
      const rightDimensions = getDrawerDimensions('right');
      
      expect(leftDimensions).toEqual({ width: 480, height: 812 });
      expect(rightDimensions).toEqual({ width: 480, height: 812 });
    });

    it('returns correct dimensions for vertical drawers', () => {
      const topDimensions = getDrawerDimensions('top');
      const bottomDimensions = getDrawerDimensions('bottom');
      
      expect(topDimensions).toEqual({ width: 375, height: 480 });
      expect(bottomDimensions).toEqual({ width: 375, height: 480 });
    });
  });

  describe('isWithinHitbox', () => {
    const screenWidth = 375;
    const screenHeight = 812;
    const hitboxSize = 50;

    it('detects touch within left edge hitbox', () => {
      expect(isWithinHitbox(25, 400, 'left', hitboxSize)).toBe(true);
      expect(isWithinHitbox(75, 400, 'left', hitboxSize)).toBe(false);
    });

    it('detects touch within right edge hitbox', () => {
      expect(isWithinHitbox(350, 400, 'right', hitboxSize)).toBe(true);
      expect(isWithinHitbox(300, 400, 'right', hitboxSize)).toBe(false);
    });

    it('detects touch within top edge hitbox', () => {
      expect(isWithinHitbox(200, 25, 'top', hitboxSize)).toBe(true);
      expect(isWithinHitbox(200, 75, 'top', hitboxSize)).toBe(false);
    });

    it('detects touch within bottom edge hitbox', () => {
      expect(isWithinHitbox(200, 780, 'bottom', hitboxSize)).toBe(true);
      expect(isWithinHitbox(200, 700, 'bottom', hitboxSize)).toBe(false);
    });
  });
});