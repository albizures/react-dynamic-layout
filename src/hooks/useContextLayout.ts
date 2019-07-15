import { useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';

const useContextLayout = () => {
  return useContext(LayoutContext);
};

export { LayoutContext };
export default useContextLayout;
