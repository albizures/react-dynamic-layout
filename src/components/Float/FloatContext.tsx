import React from 'react';

interface FloatContextValue {
  onMouseDown: (event: React.MouseEvent) => void;
}

const FloatContext = React.createContext<FloatContextValue>({
  onMouseDown: () => {
    throw new Error("You're trying to use an unimplemented context");
  },
});

const useFloatContext = (): FloatContextValue => React.useContext(FloatContext);

export { useFloatContext };
export default FloatContext;
