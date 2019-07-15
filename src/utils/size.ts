import { Dimensions } from '../hooks/useDimensions';
import { LayoutType } from '../types';

interface SizeProperty {
  portion: string;
  total: string;
}

const getSizeProperty = (type: LayoutType): SizeProperty => {
  if (type === 'row') {
    return { portion: 'width', total: 'height' };
  }

  return { portion: 'height', total: 'width' };
};

const dimensionsAreZero = (dimensions: Dimensions): boolean =>
  dimensions.height === 0 && dimensions.width === 0;

export { dimensionsAreZero, getSizeProperty, SizeProperty };
