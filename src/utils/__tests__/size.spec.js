import { getDiff, getPercent } from '../size';

describe('size', () => {
  it('should get the diff', () => {
    const firstSize = {
      width: 100,
      height: 100,
    };
    const secondSize = {
      width: 150,
      height: 150,
    };
    const diff = {
      width: 50,
      height: 50,
    };

    expect(getDiff(firstSize, secondSize)).toEqual(diff);
  });
  it('should get the size in percentages', () => {
    const totalSize = {
      width: 200,
      height: 200,
    };
    const partSize = {
      width: 100,
      height: 100,
    };
    const percent = {
      width: 0.5,
      height: 0.5,
    };

    expect(getPercent(partSize, totalSize)).toEqual(percent);
  });
});
