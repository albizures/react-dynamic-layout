import { useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';

const useContextLayout = () => {
  return useContext(LayoutContext);
};

export default useContextLayout;
