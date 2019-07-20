import { useContext } from 'react';
import LayoutContext, { LayoutState } from '../contexts/LayoutContext';

const useContextLayout = (): LayoutState => {
  return useContext(LayoutContext);
};

export { LayoutContext };
export default useContextLayout;
