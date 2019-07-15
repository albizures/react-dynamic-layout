import React from 'react';
import { dimensionsAreZero } from '../size';

function createRef<T>(value: T): React.RefObject<T> {
  const ref: React.MutableRefObject<T> = React.createRef<T>();
  ref.current = value;
  return ref;
}

describe('size', () => {
  describe('#dimensionsAreZero', () => {
    it('should check if all the dimensions are zero', () => {
      expect(
        dimensionsAreZero({
          width: 0,
          height: 0,
          lastHeightRef: createRef(40),
          lastWidthRef: createRef(40),
        }),
      ).toBe(true);
      expect(
        dimensionsAreZero({
          width: 10,
          height: 0,
          lastHeightRef: createRef(40),
          lastWidthRef: createRef(40),
        }),
      ).toBe(false);
    });
  });
});
