import { useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';
import { getSizeProperty, SizeProperty } from '../utils/size';

const useSizeProperties = (): SizeProperty => {
  const { type } = useContext(LayoutContext);

  return getSizeProperty(type);
};

export default useSizeProperties;
