import { useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';
import { getSizeProperty } from '../utils/size';

const useSizeProperties = () => {
  const { type } = useContext(LayoutContext);

  return getSizeProperty(type);
};

export default useSizeProperties;
