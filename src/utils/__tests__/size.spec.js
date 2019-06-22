// @ts-check
import { dimensionsAreZero } from '../size';

describe('size', () => {
  describe('#dimensionsAreZero', () => {
    it('should check if all the dimensions are zero', () => {
      expect(
        dimensionsAreZero({
          width: 0,
          height: 0,
          lastHeight: 40,
          lastWidth: 40,
        }),
      ).toBe(true);
      expect(
        dimensionsAreZero({
          width: 10,
          height: 0,
          lastHeight: 40,
          lastWidth: 40,
        }),
      ).toBe(false);
    });
  });
});
